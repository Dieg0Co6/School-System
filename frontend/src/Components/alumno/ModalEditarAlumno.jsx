import { useState, useEffect } from 'react';
import axios from 'axios';
import './alumno.css';

export default function ModalEditarAlumno({ cerrarModalEditarAlumno, modalExitingEditar, dniAlumnoEditar, actualizarAlumnos, onAlumnoCreado }) {
    const [formData, setFormData] = useState({
        codigo_alumno: '',
        dni: '',
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        fecha_nacimiento: '',
        email: '',
        ciclo: '',
        carrera: '',
        password: '',
    });
    
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (dniAlumnoEditar) {
            // Aquí traemos los datos del alumno
            axios.get(`http://localhost:4000/alumnos/${dniAlumnoEditar}`)
                .then(response => {
                    if (response.data.length > 0) {
                        const alumno = response.data[0]; // porque estás retornando un array
                        setFormData({
                            codigo_alumno: alumno.codigo_alumno || '',
                            dni: alumno.dni || '',
                            nombre: alumno.nombre || '',
                            apellido_paterno: alumno.apellido_paterno || '',
                            apellido_materno: alumno.apellido_materno || '',
                            fecha_nacimiento: alumno.fecha_nacimiento ? alumno.fecha_nacimiento.split('T')[0] : '',
                            email: alumno.email || '',
                            ciclo: alumno.ciclo || '',
                            carrera: alumno.carrera || '',
                            password: '', // Por seguridad, la contraseña no se precarga
                        });
                    }
                })
                .catch(error => {
                    console.error('Error al cargar el alumno:', error);
                });
        }
    }, [dniAlumnoEditar]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'ciclo' ? parseInt(value, 10) : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await axios.post('http://localhost:4000/alumnos', formData);
            cerrarModalEditarAlumno();
            
            setTimeout(() => {
                if (onAlumnoCreado) {
                    onAlumnoCreado(true);
                }
                
                // Actualiza la lista de alumnos
                if (actualizarAlumnos) {
                    actualizarAlumnos();
                }
            }, 300);
            
        } catch (error) {
            console.error('Error en la solicitud:', error);
            cerrarModalEditarAlumno();
            
            setTimeout(() => {
                // Informa que hubo un error
                if (onAlumnoCreado) {
                    onAlumnoCreado(false);
                }
            }, 300);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="modal-container">
            <div
                className={`modal-overlay ${modalExitingEditar ? '' : 'active'}`}
                onClick={cerrarModalEditarAlumno}
            ></div>

            <div className={`modal-content ${modalExitingEditar ? 'modal-exit' : 'modal-enter'}`}>
                <div className="modal-header">
                    <h2 className="modal-title">
                        <svg xmlns="http://www.w3.org/2000/svg" className="modal-icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        Editar Alumno
                    </h2>
                    <button onClick={cerrarModalEditarAlumno} className="close-button">
                        ✕
                    </button>
                </div>

                <div className="modal-body">
                    <form className="modal-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Código de Alumno</label>
                                <input type="text"
                                    name="codigo_alumno"
                                    value={formData.codigo_alumno}
                                    onChange={handleChange}
                                    placeholder="Ej: A12345" />
                            </div>
                            <div className="form-group">
                                <label>Dni</label>
                                <input type="text"
                                    name="dni"
                                    value={formData.dni}
                                    onChange={handleChange}
                                    placeholder="Ej: 99999999" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Nombres</label>
                                <input type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    placeholder="Nombres del alumno" />
                            </div>
                            <div className="form-group">
                                <label>Apellido Paterno</label>
                                <input type="text"
                                    name="apellido_paterno"
                                    value={formData.apellido_paterno}
                                    onChange={handleChange}
                                    placeholder="Apellido paterno" />
                            </div>
                        </div>
                        <div className='form-row'>
                            <div className="form-group">
                                <label>Apellido Materno</label>
                                <input type="text"
                                    name="apellido_materno"
                                    value={formData.apellido_materno}
                                    onChange={handleChange}
                                    placeholder="Apellido materno" />
                            </div>
                            <div className="form-group">
                                <label>Fecha de Nacimiento</label>
                                <input type="date"
                                    name="fecha_nacimiento"
                                    value={formData.fecha_nacimiento}
                                    onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Correo Electrónico</label>
                                <input type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="correo@ejemplo.com" />
                            </div>
                            <div className="form-group">
                                <label>Contraseña</label>
                                <input type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="************" />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Carrera</label>
                                <select
                                    name="carrera"
                                    value={formData.carrera}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccionar carrera</option>
                                    <option>Ingeniería de Sistemas</option>
                                    <option>Ingeniería Civil</option>
                                    <option>Administración</option>
                                    <option>Contabilidad</option>
                                    <option>Psicología</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Ciclo</label>
                                <select
                                    name="ciclo"
                                    value={formData.ciclo}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccionar ciclo</option>
                                    {[...Array(10)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>Ciclo {i + 1}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button 
                                className="modal-button cancel" 
                                type="button"
                                onClick={cerrarModalEditarAlumno}
                                disabled={submitting}
                            >
                                Cancelar
                            </button>
                            <button 
                                className="modal-button confirm" 
                                type="submit"
                                disabled={submitting}
                            >
                                {submitting ? 'Guardando...' : 'Guardar Alumno'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}