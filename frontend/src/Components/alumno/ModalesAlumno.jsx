import { useState, useEffect } from 'react';
import axios from 'axios';
import './alumno.css';

export function ModalCrearAlumno({ cerrarModalCrearAlumno, modalExiting, actualizarAlumnos, onAlumnoCreado }) {
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
            cerrarModalCrearAlumno();

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
            cerrarModalCrearAlumno();

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
                className={`modal-overlay ${modalExiting ? '' : 'active'}`}
                onClick={cerrarModalCrearAlumno}
            ></div>

            <div className={`modal-content ${modalExiting ? 'modal-exit' : 'modal-enter'}`}>
                <div className="modal-header">
                    <h2 className="modal-title">
                        <svg xmlns="http://www.w3.org/2000/svg" className="modal-icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        Nuevo Alumno
                    </h2>
                    <button onClick={cerrarModalCrearAlumno} className="close-button">
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
                                onClick={cerrarModalCrearAlumno}
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

export function ModalEditarAlumno({ cerrarModalEditarAlumno, modalExitingEditar, dniAlumnoEditar, actualizarAlumnos, onAlumnoEditado }) {
    const [formData, setFormData] = useState({
        id_usuario: '',
        codigo_alumno: '',
        dni: '',
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        fecha_nacimiento: '',
        email: '',
        ciclo: '',
        carrera: ''
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
                            id_usuario: alumno.id_usuario || '',
                            codigo_alumno: alumno.codigo_alumno || '',
                            dni: alumno.dni || '',
                            nombre: alumno.nombre || '',
                            apellido_paterno: alumno.apellido_paterno || '',
                            apellido_materno: alumno.apellido_materno || '',
                            fecha_nacimiento: alumno.fecha_nacimiento ? alumno.fecha_nacimiento.split('T')[0] : '',
                            email: alumno.email || '',
                            ciclo: alumno.ciclo || '',
                            carrera: alumno.carrera || ''
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
            await axios.patch(`http://localhost:4000/alumnos/${formData.id_usuario}`, formData);
            cerrarModalEditarAlumno();
            setTimeout(() => {
                if (onAlumnoEditado) onAlumnoEditado(true);
                if (actualizarAlumnos) actualizarAlumnos();
            }, 300);
        } catch (error) {
            console.error('Error al editar el alumno:', error);
            cerrarModalEditarAlumno();
            setTimeout(() => {
                if (onAlumnoEditado) onAlumnoEditado(false);
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
                        <svg xmlns="http://www.w3.org/2000/svg" className="modal-icon" viewBox="0 0 24 24">
                            <rect x="2" y="2" width="20" height="20" rx="2" fill="none" stroke="currentColor" stroke-width="2" />
                            <path d="M14.5 5.5L18.5 9.5L9.5 18.5H5.5V14.5L14.5 5.5Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
                            <line x1="12" y1="8" x2="16" y2="12" stroke="currentColor" stroke-width="2" />
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
                                {submitting ? 'Editando...' : 'Editar Alumno'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export function ModalEliminarAlumno({ cerrarModalEliminarAlumno, modalExitingEliminar, idUsuarioEliminar, actualizarAlumnos, onAlumnoEliminado }) {
    const [submitting, setSubmitting] = useState(false);

    const handleEliminar = async () => {
        setSubmitting(true);
        try {
            await axios.delete(`http://localhost:4000/alumnos/${idUsuarioEliminar}`);
            cerrarModalEliminarAlumno();
            setTimeout(() => {
                if (onAlumnoEliminado) onAlumnoEliminado(true);
                if (actualizarAlumnos) actualizarAlumnos();
            }, 300);
        } catch (error) {
            console.error('Error al eliminar el alumno:', error);
            setTimeout(() => {
                if (onAlumnoEliminado) onAlumnoEliminado(false);
            }, 300);
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <div className="modal-container">
            <div
                className={`modal-overlay ${modalExitingEliminar ? '' : 'active'}`}
                onClick={cerrarModalEliminarAlumno}
            ></div>

            <div className={`modal-content modal-small ${modalExitingEliminar ? 'modal-exit' : 'modal-enter'}`}>
                <div className="modal-header">
                    <h2 className="modal-title">
                        <svg xmlns="http://www.w3.org/2000/svg" className="modal-icon" viewBox="0 0 24 24">
                            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Advertencia
                    </h2>
                    <button onClick={cerrarModalEliminarAlumno} className="close-button">
                        ✕
                    </button>
                </div>

                <div className="modal-body">
                    <div className="confirm-delete">
                        <p className="warning-message">¿Estás seguro de que deseas eliminar este alumno?</p>
                        <p className="warning-text">Esta acción no se puede deshacer.</p>
                    </div>
                </div>

                <div className="modal-footer">
                    <button
                        className="modal-button cancel"
                        type="button"
                        onClick={cerrarModalEliminarAlumno}
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
    )
}