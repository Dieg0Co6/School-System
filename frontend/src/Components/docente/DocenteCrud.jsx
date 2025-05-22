import React, { useState, useEffect } from "react";
import axios from "axios";
import AppLayout from "../../Layouts/AppLayout";
import { ModalCrearDocente, ModalEditarDocente, ModalEliminarDocente } from "./ModalesDocente";
import Alert from "./../notification/Notification";
/* import './alumno.css'; */

// Iconos personalizados
const SearchIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const EditIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const DeleteIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ViewIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);


export function DocenteCrud({usuario}) {
    const [docentes, setDocentes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [selectedDocentes, setSelectedDocentes] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [mostrarModalCrearDocente, setMostrarModalCrearDocente] = useState(false);
    const [dniDocenteEditar, setDniDocenteEditar] = useState(null);
    const [idUsuarioEliminar, setIdUsuarioEliminar] = useState(null);
    const [mostrarModalEditarDocente, setMostrarModalEditarDocente] = useState(false);
    const [mostrarModalEliminarDocente, setMostrarModalEliminarDocente] = useState(false);
    const [modalExitingEditar, setModalExitingEditar] = useState(false);
    const [modalExitingEliminar, setModalExitingEliminar] = useState(false);
    const [modalExiting, setModalExiting] = useState(false);
    const [alert, setAlert] = useState({ show: false, message: "", type: "" });
    
    // Obtener datos de los docentes
    useEffect(() => {
        setLoading(true);
        axios.get("http://localhost:4000/docentes")
            .then((response) => {
                setDocentes(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error al obtener los docentes", err);
                setLoading(false);
            });
    }, []);

    // Manejar ordenamiento
    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const actualizarDocentes = () => {
        setLoading(true);
        axios.get("http://localhost:4000/docentes")
            .then((response) => {
                setDocentes(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error al obtener los docentes", err);
                setLoading(false);
                showAlert("Error al cargar los docentes. Por favor, intente nuevamente.", "error");
            });
    };    

    const abrirModalCrearDocente = () => setMostrarModalCrearDocente(true);

    const cerrarModalCrearDocente = () => {
        setModalExiting(true);
        setTimeout(() => {
            setMostrarModalCrearDocente(false);
            setModalExiting(false);
        }, 500);
    };

    const onDocenteCreado = (success = true) => {
        if (success) {
            showAlert("Docente creado correctamente", "success");
        } else {
            showAlert("Error al crear el docente. Inténtalo de nuevo.", "error");
        }
    };

    const onDocenteEditado = (success = true) => {
        if (success) {
            showAlert("Docente editado correctamente", "success");
        } else {
            showAlert("Error al editar el docente. Inténtalo de nuevo.", "error");
        }
    };

    const onDocenteEliminado = (success = true) => {
        if (success) {
            showAlert("Docente eliminado correctamente", "success");
        } else {
            showAlert("Error al eliminar el docente. Inténtalo de nuevo.", "error");
        }
    };

    const abrirModalEditarDocente = (dni) => {
        setDniDocenteEditar(dni);
        setMostrarModalEditarDocente(true);
    };

    const cerrarModalEditarDocente = () => {
        setModalExitingEditar(true);
        setTimeout(() => {
            setMostrarModalEditarDocente(false);
            setModalExitingEditar(false);
        }, 500);
    }

    const abrirModalEliminarDocente = (id_usuario) => {
        setIdUsuarioEliminar(id_usuario);
        setMostrarModalEliminarDocente(true);
    };

    const cerrarModalEliminarDocente = () => {
        setModalExitingEliminar(true);
        setTimeout(() => {
            setMostrarModalEliminarDocente(false);
            setModalExitingEliminar(false);
        }, 500);
    }

    //Funcion para mostrar alertas
    const showAlert = (message, type = "info") => {
        setAlert({ show: true, message, type });
    };

    const closeAlert = () => {
        setAlert({ ...alert, show: false });
    };

    // Aplicar ordenamiento
    const sortedDocente = React.useMemo(() => {
        let sortableItems = [...docentes];
        if (sortConfig.key) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [docentes, sortConfig]);

    // Aplicar búsqueda
    const filteredDocentes = React.useMemo(() => {
        return sortedDocente.filter(docente => {
            return (
                docente.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                docente.apellido_paterno?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                docente.apellido_materno?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                docente.codigo_docente?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                docente.facultad?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                docente.especialidad?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                `${docente.nombre} ${docente.apellido_paterno} ${docente.apellido_materno}`.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
    }, [sortedDocente, searchTerm]);
    
    // Paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentDocentes = filteredDocentes.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredDocentes.length / itemsPerPage);

    // Cambiar página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Manejar selección de checkbox
    const handleSelectDocente = (id_usuario) => {
        if (selectedDocentes.includes(id_usuario)) {
            setSelectedDocentes(selectedDocentes.filter(docenteId => docenteId !== id_usuario));
        } else {
            setSelectedDocentes([...selectedDocentes, id_usuario]);
        }
    };

    // Manejar selección de todos
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedDocentes([]);
        } else {
            setSelectedDocentes(currentDocentes.map(docente => docente.id_usuario));
        }
        setSelectAll(!selectAll);
    };

    // Formatear fecha
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AppLayout usuario={usuario}>
            <div className="w-full p-6 bg-white rounded-lg shadow-sm">
                {/* Cabecera */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Gestión de Docentes</h1>
                    <p className="text-gray-600">Administra información de todos los docentes registrados en el sistema</p>
                </div>

                {/* Barra de acciones */}
                <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                    <div className="relative w-full md:w-100 border border-gray-300 rounded-lg">
                        <input
                            type="text"
                            className="w-full pl-10 pr-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Buscar docente..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="absolute left-3 top-2.5 text-gray-400">
                            <SearchIcon />
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <select
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={itemsPerPage}
                            onChange={(e) => setItemsPerPage(Number(e.target.value))}
                        >
                            <option value={5}>5 por página</option>
                            <option value={10}>10 por página</option>
                            <option value={20}>20 por página</option>
                        </select>

                        <button
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow hover:from-blue-700 hover:to-blue-800 transition-all"
                            onClick={abrirModalCrearDocente}
                            onMouseOver={(e) => e.currentTarget.classList.add('shadow-lg')}
                        >
                            <span>Nuevo Docente</span>
                            <span>+</span>
                        </button>
                    </div>
                </div>

                {/* Información */}
                <div className="flex justify-between items-center mb-4">
                    <div className="text-sm text-gray-500">
                        <span className="font-medium">{filteredDocentes.length}</span> docentes encontrados
                    </div>
                    <div className="text-sm text-gray-500">
                        <span className="font-medium">{selectedDocentes.length}</span> seleccionados
                    </div>
                </div>

                {/* Tabla */}
                <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                            checked={selectAll}
                                            onChange={handleSelectAll}
                                        />
                                    </div>
                                </th>
                                <th
                                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => requestSort('nombre')}
                                >
                                    <div className="flex items-center gap-1">
                                        Nombre
                                        {sortConfig.key === 'nombre' && (
                                            <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                                        )}
                                    </div>
                                </th>
                                <th
                                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => requestSort('codigo_docente')}
                                >
                                    <div className="flex items-center gap-1">
                                        Código
                                        {sortConfig.key === 'codigo_docente' && (
                                            <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                                        )}
                                    </div>
                                </th>
                                <th
                                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => requestSort('facultad')}
                                >
                                    <div className="flex items-center gap-1">
                                        Facultad
                                        {sortConfig.key === 'facultad' && (
                                            <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                                        )}
                                    </div>
                                </th>
                                <th
                                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => requestSort('especialidad')}
                                >
                                    <div className="flex items-center gap-1">
                                        Especialidad
                                        {sortConfig.key === 'especialidad' && (
                                            <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                                        )}
                                    </div>
                                </th>
                                <th
                                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => requestSort('created_at')}
                                >
                                    <div className="flex items-center gap-1">
                                        Creado en
                                        {sortConfig.key === 'created_at' && (
                                            <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                                        )}
                                    </div>
                                </th>
                                <th
                                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => requestSort('updated_at')}
                                >
                                    <div className="flex items-center gap-1">
                                        Actualizado en
                                        {sortConfig.key === 'updated_at' && (
                                            <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                                        )}
                                    </div>
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan="10" className="px-6 py-16 text-center">
                                        <div className="flex justify-center items-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                                            <span className="ml-3 text-gray-500">Cargando datos...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : currentDocentes.length === 0 ? (
                                <tr>
                                    <td colSpan="10" className="px-6 py-16 text-center text-gray-500">
                                        No se encontraron docentes
                                    </td>
                                </tr>
                            ) : (
                                currentDocentes.map((docente) => (
                                    <tr key={docente.id_usuario} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-4">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                                checked={selectedDocentes.includes(docente.id_usuario)}
                                                onChange={() => handleSelectDocente(docente.id_usuario)}
                                            />
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-9 w-9 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium uppercase">
                                                    {docente.nombre ? docente.nombre.charAt(0) : "A"}
                                                </div>
                                                <div className="ml-3">
                                                    <div className="font-medium text-gray-900">{(docente.nombre && docente.apellido_paterno && docente.apellido_materno)
                                                            ? `${docente.nombre} ${docente.apellido_paterno} ${docente.apellido_materno}` : 'N/A'}</div>
                                                    <div className="text-sm text-gray-500">{docente.email || 'Sin email'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800">
                                                {docente.codigo_docente || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{docente.facultad || 'N/A'}</div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap max-w-[200px] overflow-hidden text-ellipsis">
                                            <div className="text-sm font-medium text-gray-900 truncate">{docente.especialidad || 'N/A'}</div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(docente.created_at)}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(docente.updated_at)}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-right">
                                            <div className="flex justify-center gap-2">
                                                <button className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-100 transition-colors" title="Ver">
                                                    <ViewIcon />
                                                </button>
                                                <button className="text-yellow-600 hover:text-yellow-900 p-1 rounded-full hover:bg-yellow-100 transition-colors" title="Editar"
                                                    onClick={() => abrirModalEditarDocente(docente.dni)}>
                                                    <EditIcon/>
                                                </button>
                                                <button className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100 transition-colors" title="Eliminar"
                                                    onClick={() => abrirModalEliminarDocente(docente.id_usuario)}>
                                                    <DeleteIcon />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Paginación */}
                {filteredDocentes.length > 0 && (
                    <div className="flex justify-between items-center mt-6">
                        <div className="text-sm text-gray-500">
                            Mostrando <span className="font-medium">{indexOfFirstItem + 1}</span> a <span className="font-medium">
                                {Math.min(indexOfLastItem, filteredDocentes.length)}
                            </span> de <span className="font-medium">{filteredDocentes.length}</span> resultados
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => paginate(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className={`px-3 py-1 border rounded-md ${currentPage === 1
                                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                Anterior
                            </button>

                            {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
                                // Lógica para mostrar siempre los botones de página relevantes
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = idx + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = idx + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + idx;
                                } else {
                                    pageNum = currentPage - 2 + idx;
                                }

                                if (pageNum > 0 && pageNum <= totalPages) {
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => paginate(pageNum)}
                                            className={`px-3 py-1 border rounded-md ${currentPage === pageNum
                                                ? 'bg-blue-600 text-white border-blue-600'
                                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                }
                                return null;
                            })}

                            <button
                                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className={`px-3 py-1 border rounded-md ${currentPage === totalPages
                                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>
                )}

                {/* Acciones en lote */}
                {selectedDocentes.length > 0 && (
                    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-lg shadow-lg px-6 py-3 flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-700">
                            {selectedDocentes.length} {selectedDocentes.length === 1 ? 'docente' : 'docentes'} seleccionado{selectedDocentes.length !== 1 ? 's' : ''}
                        </span>
                        <div className="h-6 border-l border-gray-300"></div>
                        <button className="text-sm text-blue-600 hover:text-blue-800">Exportar seleccionados</button>
                        <button className="text-sm text-red-600 hover:text-red-800">Eliminar seleccionados</button>
                    </div>
                )}
            </div>

            {/* Modal para agregar nuevo docente */}
            {mostrarModalCrearDocente && (
                <ModalCrearDocente
                    cerrarModalCrearDocente={cerrarModalCrearDocente}
                    modalExiting={modalExiting}
                    onDocenteCreado={onDocenteCreado}
                    actualizarDocentes={actualizarDocentes}
                />
            )}

            {/* Modal para editar docente */}
            {mostrarModalEditarDocente && (
                <ModalEditarDocente 
                    dniDocenteEditar={dniDocenteEditar}
                    cerrarModalEditarDocente={cerrarModalEditarDocente}
                    modalExitingEditar={modalExitingEditar}
                    onDocenteEditado={onDocenteEditado}
                    actualizarDocentes={actualizarDocentes}
                />
            )}

            {/* Modal para eliminar docente */}
            {mostrarModalEliminarDocente && (
                <ModalEliminarDocente
                    idUsuarioEliminar={idUsuarioEliminar}
                    cerrarModalEliminarDocente={cerrarModalEliminarDocente}
                    modalExitingEliminar={modalExitingEliminar}
                    onDocenteEliminado={onDocenteEliminado}
                    actualizarDocentes={actualizarDocentes}
                />
            )}

            {/* Alerta */}
            {alert.show && (
                <Alert
                    message={alert.message}
                    type={alert.type}
                    onClose={closeAlert}
                />
            )}
        </AppLayout>
    );
}

export default DocenteCrud;