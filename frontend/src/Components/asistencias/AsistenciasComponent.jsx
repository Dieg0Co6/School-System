import AppLayout from "../../Layouts/AppLayout"
import { useState, useEffect } from "react";
import axios from "axios";
import { CgDetailsMore } from "react-icons/cg";

export function AsistenciaComponent({ usuario }) {
    const [formData, setFormData] = useState({
        facultad: '',
        especialidad: ''
    });
    const [facultades, setFacultades] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());


    // Actualizar la hora cada segundo
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);


    // Formatear la hora para Perú (UTC-5)
    const formatPeruTime = (date) => {
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
            timeZone: 'America/Lima'
        };
        return new Intl.DateTimeFormat('es-PE', options).format(date);
    };

    // Cargar datos iniciales al montar el componente
    useEffect(() => {
        const obtenerDatosIniciales = async () => {
            try {
                const [facultadesRes, especialidadesRes] = await Promise.all([
                    axios.get('http://localhost:4000/asistencias/facultades'),
                    axios.get('http://localhost:4000/asistencias/especialidades'),
                ]);
                setFacultades(facultadesRes.data.facultades);
                setEspecialidades(especialidadesRes.data.especialidades);
            } catch (error) {
                console.error('Error al cargar datos iniciales:', error);
            }
        };

        obtenerDatosIniciales();
    }, []);

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Si cambia la facultad, resetear especialidad
        if (name === 'facultad') {
            setFormData({
                facultad: value,
                especialidad: ''
            });
            // Limpiar cursos cuando cambia la facultad
            setCursos([]);
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    // Filtrar especialidades según la facultad seleccionada
    useEffect(() => {
        const filtrarEspecialidades = async () => {
            if (formData.facultad) {
                const facultadSeleccionada = facultades.find(f => f.abrev_facultad === formData.facultad);
                if (facultadSeleccionada) {
                    try {
                        const res = await axios.get(`http://localhost:4000/docentes/filtro/facultad-especialidad?id_facultad=${facultadSeleccionada.id_facultad}`);
                        setEspecialidades(res.data.especialidades);
                        setFormData(prev => ({ ...prev, especialidad: '' })); // Resetear especialidad cuando cambia la facultad
                        setCursos([]); // Limpiar cursos cuando cambia la facultad
                    } catch (error) {
                        console.error('Error al filtrar especialidades:', error);
                    }
                }
            }
        };

        filtrarEspecialidades();
    }, [formData.facultad, facultades]);

    // Obtener facultad cuando se selecciona una especialidad primero
    useEffect(() => {
        const obtenerFacultadDeEspecialidad = async () => {
            if (formData.especialidad && !formData.facultad) {
                const especialidadSeleccionada = especialidades.find(e => e.nom_especialidad === formData.especialidad);
                if (especialidadSeleccionada) {
                    try {
                        const res = await axios.get(`http://localhost:4000/docentes/filtro/facultad-especialidad?id_especialidad=${especialidadSeleccionada.id_especialidad}`);
                        setFacultades(res.data.facultad);
                    } catch (error) {
                        console.error('Error al obtener facultad:', error);
                    }
                }
            }
        };

        obtenerFacultadDeEspecialidad();
    }, [formData.especialidad, formData.facultad, especialidades]);

    // Cargar cursos cuando se seleccionan tanto facultad como especialidad
    useEffect(() => {
        const cargarCursos = async () => {
            if (formData.facultad && formData.especialidad) {
                setLoading(true);
                try {
                    const facultadSeleccionada = facultades.find(f => f.abrev_facultad === formData.facultad);
                    const especialidadSeleccionada = especialidades.find(e => e.nom_especialidad === formData.especialidad);

                    if (facultadSeleccionada && especialidadSeleccionada) {
                        const res = await axios.get(`http://localhost:4000/asistencias/cursos`, {
                            params: {
                                id_facultad: facultadSeleccionada.id_facultad,
                                id_especialidad: especialidadSeleccionada.id_especialidad
                            }
                        });
                        setCursos(res.data.cursos || []);
                    }
                } catch (error) {
                    console.error('Error al cargar cursos:', error);
                    setCursos([]);
                } finally {
                    setLoading(false);
                }
            }
        };

        cargarCursos();
    }, [formData.facultad, formData.especialidad, facultades, especialidades]);

    return (
        <AppLayout usuario={usuario}>
            <div className="w-full p-6 bg-white rounded-lg shadow-sm">
                {/* Cabecera */}
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Gestión de Asistencias</h1>
                        <p className="text-gray-600">Administra información de todas las asistencias registradas en el sistema</p>
                    </div>
                    <div className="text-right ">
                        <div className="text-2xl font-bold text-gray-800">{formatPeruTime(currentTime)}</div>
                        <div className="text-sm text-gray-500">Hora en Perú</div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-between mb-6 gap-2">
                    <div className="w-max">
                        <select
                            name="facultad"
                            value={formData.facultad}
                            onChange={handleChange}
                            required
                            className="p-[0.7rem] px-4 border border-gray-300 rounded-lg text-[0.95rem] w-full bg-gray-50 transition-colors duration-200 focus:border-gray-500"
                        >
                            <option value="">Seleccionar facultad</option>
                            {facultades.map((fac) => (
                                <option key={fac.id_facultad} value={fac.abrev_facultad}>
                                    {fac.nom_facultad}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="w-1/2">
                        <select
                            name="especialidad"
                            value={formData.especialidad}
                            onChange={handleChange}
                            required
                            disabled={!formData.facultad}
                            className={`p-[0.7rem] px-4 border rounded-lg text-[0.95rem] w-full transition-colors duration-200 
                                ${!formData.facultad
                                    ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                                    : "bg-gray-50 border-gray-300 focus:border-gray-500"}
                            `}
                        >
                            <option value="">Seleccionar Especialidad</option>
                            {especialidades.map((esp) => (
                                <option key={esp.id_especialidad} value={esp.nom_especialidad}>
                                    {esp.nom_especialidad}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                {usuario.rol === "ADMINISTRADOR" && (
                    <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        N°
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Código
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Curso
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Facultad
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Carrera
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Ciclo
                                    </th>
                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Detalles
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-16 text-center text-gray-500">
                                            <div className="flex justify-center items-center">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                                <span className="ml-2">Cargando cursos...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : cursos.length > 0 ? (
                                    cursos.map((curso, index) => (
                                        <tr key={curso.id_curso} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                {index + 1}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                {curso.abreviatura}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">
                                                {curso.nombre}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                {formData.facultad}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                {formData.especialidad}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                {curso.ciclo}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-center cursor-pointer flex justify-center leading-5 font-semibold rounded-full text-black">
                                                {/* <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-200 text-black`}>
                                                    
                                                </span> */}
                                                <CgDetailsMore size={20} onClick={()=>{}} />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-16 text-center text-gray-500">
                                            {formData.facultad && formData.especialidad
                                                ? "No se encontraron cursos para la facultad y especialidad seleccionadas"
                                                : "Seleccione una facultad y especialidad para ver los cursos"}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}


                {usuario.rol === "ALUMNO" && (
                    <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        N°
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Código
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Curso
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Facultad
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Carrera
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Ciclo
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Asistencias
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        % Asistencias
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan="8" className="px-6 py-16 text-center text-gray-500">
                                            <div className="flex justify-center items-center">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                                <span className="ml-2">Cargando cursos...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : cursos.length > 0 ? (
                                    cursos.map((curso, index) => (
                                        <tr key={curso.id_curso} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                {index + 1}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                {curso.abreviatura}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">
                                                {curso.nombre}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                {formData.facultad}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                {formData.especialidad}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                {curso.ciclo}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                {curso.asistencias || '0'}/{curso.total_sesiones || '0'}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${parseFloat(curso.porcentaje_asistencia || 0) >= 70
                                                    ? 'bg-green-100 text-green-800'
                                                    : parseFloat(curso.porcentaje_asistencia || 0) >= 50
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {curso.porcentaje_asistencia || '0'}%
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="px-6 py-16 text-center text-gray-500">
                                            {formData.facultad && formData.especialidad
                                                ? "No se encontraron cursos para la facultad y especialidad seleccionadas"
                                                : "Seleccione una facultad y especialidad para ver los cursos"}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}