import { useState, useEffect } from 'react';
import axios from 'axios';
import './docente.css';

export function ModalCrearDocente({ cerrarModalCrearDocente, modalExiting, actualizarDocentes, onDocenteCreado }) {
    const [formData, setFormData] = useState({
        codigo_docente: '',
        dni: '',
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        fecha_nacimiento: '',
        email: '',
        password: '',
        facultad: '',
        especialidad: ''
    });

    const [submitting, setSubmitting] = useState(false);
    const [facultades, setFacultades] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await axios.post('http://localhost:4000/docentes', formData);
            cerrarModalCrearDocente();
            setTimeout(() => {
                if (onDocenteCreado) {
                    onDocenteCreado(true);
                }

                // Actualiza la lista de docentes
                if (actualizarDocentes) {
                    actualizarDocentes();
                }
            }, 300);

        } catch (error) {
            console.error('Error en la solicitud:', error);
            cerrarModalCrearDocente();

            setTimeout(() => {
                // Informa que hubo un error
                if (onDocenteCreado) {
                    onDocenteCreado(false);
                }
            }, 300);
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        const obtenerDatosIniciales = async () => {
            try {
                const [facultadesRes, especialidadesRes] = await Promise.all([
                    axios.get('http://localhost:4000/docentes/facultades'),
                    axios.get('http://localhost:4000/docentes/especialidades'),
                ]);
                setFacultades(facultadesRes.data.facultades);
                setEspecialidades(especialidadesRes.data.especialidades);
            } catch (error) {
                console.error('Error al cargar datos iniciales:', error);
            }
        };

        obtenerDatosIniciales();
    }, []);

    useEffect(() => {
        const filtrarEspecialidades = async () => {
            if (formData.facultad) {
                const facultadSeleccionada = facultades.find(f => f.abrev_facultad === formData.facultad);
                if (facultadSeleccionada) {
                    try {
                        const res = await axios.get(`http://localhost:4000/docentes/filtro/facultad-especialidad?id_facultad=${facultadSeleccionada.id_facultad}`);
                        setEspecialidades(res.data.especialidades);
                    } catch (error) {
                        console.error('Error al filtrar especialidades:', error);
                    }
                }
            }
        };

        filtrarEspecialidades();
    }, [formData.facultad]);


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
    }, [formData.especialidad]);


    return (
        <div className="modal-container">
            <div
                className={`modal-overlay ${modalExiting ? '' : 'active'}`}
                onClick={cerrarModalCrearDocente}
            ></div>

            <div className={`modal-content ${modalExiting ? 'modal-exit' : 'modal-enter'}`}>
                <div className="modal-header">
                    <h2 className="modal-title">
                        <svg xmlns="http://www.w3.org/2000/svg" className="modal-icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        Nuevo Docente
                    </h2>
                    <button onClick={cerrarModalCrearDocente} className="close-button">
                        ✕
                    </button>
                </div>

                <div className="modal-body">
                    <form className="modal-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Código de Docente</label>
                                <input type="text"
                                    name="codigo_docente"
                                    value={formData.codigo_docente}
                                    onChange={handleChange}
                                    placeholder="Ej: DOC000" required />
                            </div>
                            <div className="form-group">
                                <label>Dni</label>
                                <input type="text"
                                    name="dni"
                                    value={formData.dni}
                                    onChange={handleChange}
                                    placeholder="Ej: 99999999" required maxLength={8} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Nombres</label>
                                <input type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    placeholder="Nombres del docente" required />
                            </div>
                            <div className="form-group">
                                <label>Apellido Paterno</label>
                                <input type="text"
                                    name="apellido_paterno"
                                    value={formData.apellido_paterno}
                                    onChange={handleChange}
                                    placeholder="Apellido paterno" required />
                            </div>
                        </div>
                        <div className='form-row'>
                            <div className="form-group">
                                <label>Apellido Materno</label>
                                <input type="text"
                                    name="apellido_materno"
                                    value={formData.apellido_materno}
                                    onChange={handleChange}
                                    placeholder="Apellido materno" required />
                            </div>
                            <div className="form-group">
                                <label>Fecha de Nacimiento</label>
                                <input type="date"
                                    name="fecha_nacimiento"
                                    value={formData.fecha_nacimiento}
                                    onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Correo Electrónico</label>
                                <input type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="correo@ejemplo.com" required />
                            </div>
                            <div className="form-group">
                                <label>Contraseña</label>
                                <input type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="************" required />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Facultad</label>
                                <select
                                    name="facultad"
                                    value={formData.facultad}
                                    onChange={handleChange} required
                                >
                                    <option value="">Seleccionar facultad</option>
                                    {facultades.map((fac) => (
                                        <option key={fac.id_facultad} value={fac.abrev_facultad}>
                                            {fac.nom_facultad}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Especialidad</label>
                                <select
                                    name="especialidad"
                                    value={formData.especialidad}
                                    onChange={handleChange} required
                                >
                                    <option value="">Seleccionar carrera</option>
                                    {especialidades.map((esp) => (
                                        <option key={esp.id_especialidad} value={esp.nom_especialidad}>
                                            {esp.nom_especialidad}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="modal-button cancel"
                                type="button"
                                onClick={cerrarModalCrearDocente}
                                disabled={submitting}
                            >
                                Cancelar
                            </button>
                            <button
                                className="modal-button confirm"
                                type="submit"
                                disabled={submitting}
                            >
                                {submitting ? 'Guardando...' : 'Guardar Docente'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


export function ModalEditarDocente({ cerrarModalEditarDocente, modalExitingEditar, dniDocenteEditar, actualizarDocentes, onDocenteEditado }) {
    const [formData, setFormData] = useState({
        id_usuario: '',
        codigo_docente: '',
        dni: '',
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        fecha_nacimiento: '',
        email: '',
        facultad: '',
        especialidad: ''
    });

    const [submitting, setSubmitting] = useState(false);
    const [facultades, setFacultades] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);


    useEffect(() => {
        const obtenerDatosIniciales = async () => {
            try {
                const [facultadesRes, especialidadesRes] = await Promise.all([
                    axios.get('http://localhost:4000/docentes/facultades'),
                    axios.get('http://localhost:4000/docentes/especialidades'),
                ]);
                setFacultades(facultadesRes.data.facultades);
                setEspecialidades(especialidadesRes.data.especialidades);
            } catch (error) {
                console.error('Error al cargar datos iniciales:', error);
            }
        };

        obtenerDatosIniciales();
    }, []);

    useEffect(() => {
        if (dniDocenteEditar) {
            // Aquí traemos los datos del docente
            axios.get(`http://localhost:4000/docentes/${dniDocenteEditar}`)
                .then(response => {
                    if (response.data.length > 0) {
                        const docente = response.data[0];
                        setFormData({
                            id_usuario: docente.id_usuario,
                            codigo_docente: docente.codigo_docente,
                            dni: docente.dni,
                            nombre: docente.nombre,
                            apellido_paterno: docente.apellido_paterno,
                            apellido_materno: docente.apellido_materno,
                            fecha_nacimiento: docente.fecha_nacimiento
                                ? docente.fecha_nacimiento.split('T')[0]
                                : '',
                            email: docente.email,
                            facultad: docente.facultad,
                            especialidad: docente.especialidad
                        });
                    }
                })
                .catch(error => {
                    console.error('Error al cargar el docente:', error);
                });
        }
    }, [dniDocenteEditar]);

    useEffect(() => {
        const filtrarEspecialidades = async () => {
            if (formData.facultad) {
                const facultadSeleccionada = facultades.find(f => f.abrev_facultad === formData.facultad);
                if (facultadSeleccionada) {
                    try {
                        const res = await axios.get(`http://localhost:4000/docentes/filtro/facultad-especialidad?id_facultad=${facultadSeleccionada.id_facultad}`);
                        setEspecialidades(res.data.especialidades);
                    } catch (error) {
                        console.error('Error al filtrar especialidades:', error);
                    }
                }
            }
        };

        filtrarEspecialidades();
    }, [formData.facultad]);


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
    }, [formData.especialidad]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Añade un console.log para ver exactamente qué datos se están enviando
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            // Agrega este console.log para ver qué datos estás enviando
            console.log("Datos a enviar:", formData);
            console.log("ID de usuario:", formData.id_usuario);

            const response = await axios.patch(`http://localhost:4000/docentes/${formData.id_usuario}`, formData);
            console.log("Respuesta del backend:", response.data);

            // No cierres el modal inmediatamente para poder ver si hay errores
            // Solo ciérralo si todo fue exitoso
            if (response && response.status === 200) {
                cerrarModalEditarDocente();
                setTimeout(() => {
                    if (onDocenteEditado) onDocenteEditado(true);
                    if (actualizarDocentes) actualizarDocentes();
                }, 300);
            }
        } catch (error) {
            console.error('Error al editar el docente:', error);
            // Muestra más detalles del error
            if (error.response) {
                console.error('Detalles del error:', error.response.data);
            }
            cerrarModalEditarDocente();
            setTimeout(() => {
                if (onDocenteEditado) onDocenteEditado(false);
            }, 300);
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <div className="modal-container">
            <div
                className={`modal-overlay ${modalExitingEditar ? '' : 'active'}`}
                onClick={cerrarModalEditarDocente}
            ></div>

            <div className={`modal-content ${modalExitingEditar ? 'modal-exit' : 'modal-enter'}`}>
                <div className="modal-header">
                    <h2 className="modal-title">
                        <svg xmlns="http://www.w3.org/2000/svg" className="modal-icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        Editar Docente
                    </h2>
                    <button onClick={cerrarModalEditarDocente} className="close-button">
                        ✕
                    </button>
                </div>

                <div className="modal-body">
                    <form className="modal-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Código de Docente</label>
                                <input type="text"
                                    name="codigo_docente"
                                    value={formData.codigo_docente}
                                    onChange={handleChange}
                                    placeholder="Ej: DOC000" required />
                            </div>
                            <div className="form-group">
                                <label>Dni</label>
                                <input type="text"
                                    name="dni"
                                    value={formData.dni}
                                    onChange={handleChange}
                                    placeholder="Ej: 99999999" required maxLength={8} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Nombres</label>
                                <input type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    placeholder="Nombres del docente" required />
                            </div>
                            <div className="form-group">
                                <label>Apellido Paterno</label>
                                <input type="text"
                                    name="apellido_paterno"
                                    value={formData.apellido_paterno}
                                    onChange={handleChange}
                                    placeholder="Apellido paterno" required />
                            </div>
                        </div>
                        <div className='form-row'>
                            <div className="form-group">
                                <label>Apellido Materno</label>
                                <input type="text"
                                    name="apellido_materno"
                                    value={formData.apellido_materno}
                                    onChange={handleChange}
                                    placeholder="Apellido materno" required />
                            </div>
                            <div className="form-group">
                                <label>Fecha de Nacimiento</label>
                                <input type="date"
                                    name="fecha_nacimiento"
                                    value={formData.fecha_nacimiento}
                                    onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Correo Electrónico</label>
                                <input type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="correo@ejemplo.com" required />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Facultad</label>
                                <select
                                    name="facultad"
                                    value={formData.facultad}
                                    onChange={handleChange} required
                                >
                                    <option value="">Seleccionar facultad</option>
                                    {facultades.map((fac) => (
                                        <option key={fac.id_facultad} value={fac.abrev_facultad}>
                                            {fac.nom_facultad}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Especialidad</label>
                                <select
                                    name="especialidad"
                                    value={formData.especialidad}
                                    onChange={handleChange} required
                                >
                                    <option value="">Seleccionar carrera</option>
                                    {especialidades.map((esp) => (
                                        <option key={esp.id_especialidad} value={esp.nom_especialidad}>
                                            {esp.nom_especialidad}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="modal-button cancel"
                                type="button"
                                onClick={cerrarModalEditarDocente}
                                disabled={submitting}
                            >
                                Cancelar
                            </button>
                            <button
                                className="modal-button confirm"
                                type="submit"
                                disabled={submitting}
                            >
                                {submitting ? 'Guardando...' : 'Editar Docente'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export function ModalEliminarDocente({ cerrarModalEliminarDocente, modalExitingEliminar, idUsuarioEliminar, actualizarDocentes, onDocenteEliminado }) {
    const [submitting, setSubmitting] = useState(false);

    const handleEliminar = async () => {
        setSubmitting(true);
        console.log('ID a eliminar:', idUsuarioEliminar);
        try {
            await axios.delete(`http://localhost:4000/docentes/${idUsuarioEliminar}`);
            cerrarModalEliminarDocente();
            setTimeout(() => {
                if (onDocenteEliminado) onDocenteEliminado(true);
                if (actualizarDocentes) actualizarDocentes();
            }, 300);
        } catch (error) {
            console.error('Error al eliminar el docente:', error);
            cerrarModalEliminarDocente();
            setTimeout(() => {
                if (onDocenteEliminado) onDocenteEliminado(false);
            }, 300);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="modal-container">
            <div
                className={`modal-overlay ${modalExitingEliminar ? '' : 'active'}`}
                onClick={cerrarModalEliminarDocente}
            ></div>

            <div className={`modal-content modal-small ${modalExitingEliminar ? 'modal-exit' : 'modal-enter'}`}>
                <div className="modal-header">
                    <h2 className="modal-title">
                        <svg xmlns="http://www.w3.org/2000/svg" className="modal-icon" viewBox="0 0 24 24">
                            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Advertencia
                    </h2>
                    <button onClick={cerrarModalEliminarDocente} className="close-button">
                        ✕
                    </button>
                </div>

                <div className="modal-body">
                    <div className="confirm-delete">
                        <p className="warning-message">¿Estás seguro de que deseas eliminar este docente?</p>
                        <p className="warning-text">Esta acción no se puede deshacer.</p>
                    </div>
                </div>

                <div className="modal-footer">
                    <button
                        className="modal-button cancel"
                        type="button"
                        onClick={cerrarModalEliminarDocente}
                        disabled={submitting}
                    >
                        Cancelar
                    </button>
                    <button
                        className="modal-button delete"
                        type="button"
                        onClick={handleEliminar}
                        disabled={submitting}
                    >
                        {submitting ? 'Eliminando...' : 'Sí, Eliminar'}
                    </button>
                </div>
            </div>
        </div>
    );
}