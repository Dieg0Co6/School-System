import React, { useState, useEffect } from "react";
import axios from "axios";
import AppLayout from "../AppLayout";
import './alumno.css';

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

export default function AlumnoCrud() {
    const [alumnos, setAlumnos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [selectedAlumnos, setSelectedAlumnos] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);

    // Obtener datos de alumnos
    useEffect(() => {
        setLoading(true);
        axios.get("http://localhost:4000/alumnos")
            .then((response) => {
                setAlumnos(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error al obtener los alumnos", err);
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

    const abrirModal = () => setMostrarModal(true);
    const cerrarModal = () => setMostrarModal(false);

    // Aplicar ordenamiento
    const sortedAlumnos = React.useMemo(() => {
        let sortableItems = [...alumnos];
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
    }, [alumnos, sortConfig]);

    // Aplicar búsqueda
    const filteredAlumnos = React.useMemo(() => {
        return sortedAlumnos.filter(alumno => {
            return (
                alumno.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                alumno.apellido_paterno?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                alumno.apellido_materno?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                alumno.carrera?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                alumno.codigo_alumno?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
    }, [sortedAlumnos, searchTerm]);

    // Paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAlumnos = filteredAlumnos.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredAlumnos.length / itemsPerPage);

    // Cambiar página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Manejar selección de checkbox
    const handleSelectAlumno = (id_usuario) => {
        if (selectedAlumnos.includes(id_usuario)) {
            setSelectedAlumnos(selectedAlumnos.filter(alumnoId => alumnoId !== id_usuario));
        } else {
            setSelectedAlumnos([...selectedAlumnos, id_usuario]);
        }
    };

    // Manejar selección de todos
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedAlumnos([]);
        } else {
            setSelectedAlumnos(currentAlumnos.map(alumno => alumno.id_usuario));
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
        <AppLayout>
            <div className="w-full p-6 bg-white rounded-lg shadow-sm">
                {/* Cabecera */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Gestión de Alumnos</h1>
                    <p className="text-gray-600">Administra información de todos los alumnos registrados en el sistema</p>
                </div>

                {/* Barra de acciones */}
                <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                    <div className="relative w-full md:w-100 border border-gray-300 rounded-lg">
                        <input
                            type="text"
                            className="w-full pl-10 pr-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Buscar alumno..."
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
                            onClick={abrirModal}
                            onMouseOver={(e) => e.currentTarget.classList.add('shadow-lg')}
                        >
                            <span>Nuevo Alumno</span>
                            <span>+</span>
                        </button>
                    </div>
                </div>

                {/* Información */}
                <div className="flex justify-between items-center mb-4">
                    <div className="text-sm text-gray-500">
                        <span className="font-medium">{filteredAlumnos.length}</span> alumnos encontrados
                    </div>
                    <div className="text-sm text-gray-500">
                        <span className="font-medium">{selectedAlumnos.length}</span> seleccionados
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
                                    onClick={() => requestSort('codigo_alumno')}
                                >
                                    <div className="flex items-center gap-1">
                                        Código
                                        {sortConfig.key === 'codigo_alumno' && (
                                            <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                                        )}
                                    </div>
                                </th>
                                <th
                                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => requestSort('carrera')}
                                >
                                    <div className="flex items-center gap-1">
                                        Carrera
                                        {sortConfig.key === 'carrera' && (
                                            <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                                        )}
                                    </div>
                                </th>
                                <th
                                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => requestSort('ciclo')}
                                >
                                    <div className="flex items-center gap-1">
                                        Ciclo
                                        {sortConfig.key === 'ciclo' && (
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
                            ) : currentAlumnos.length === 0 ? (
                                <tr>
                                    <td colSpan="10" className="px-6 py-16 text-center text-gray-500">
                                        No se encontraron alumnos
                                    </td>
                                </tr>
                            ) : (
                                currentAlumnos.map((alumno) => (
                                    <tr key={alumno.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-4">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                                checked={selectedAlumnos.includes(alumno.id_usuario)}
                                                onChange={() => handleSelectAlumno(alumno.id_usuario)}
                                            />
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-9 w-9 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium uppercase">
                                                    {alumno.nombre ? alumno.nombre.charAt(0) : "A"}
                                                </div>
                                                <div className="ml-3">
                                                    <div className="font-medium text-gray-900">{`${alumno.nombre} ${alumno.apellido_paterno} ${alumno.apellido_materno}` || 'N/A'}</div>
                                                    <div className="text-sm text-gray-500">{alumno.email || 'Sin email'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800">
                                                {alumno.codigo_alumno || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{alumno.carrera || 'N/A'}</div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-center">
                                            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 font-medium">
                                                {alumno.ciclo || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(alumno.created_at)}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(alumno.updated_at)}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-right">
                                            <div className="flex justify-center gap-2">
                                                <button className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-100 transition-colors" title="Ver">
                                                    <ViewIcon />
                                                </button>
                                                <button className="text-yellow-600 hover:text-yellow-900 p-1 rounded-full hover:bg-yellow-100 transition-colors" title="Editar">
                                                    <EditIcon />
                                                </button>
                                                <button className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100 transition-colors" title="Eliminar">
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
                {filteredAlumnos.length > 0 && (
                    <div className="flex justify-between items-center mt-6">
                        <div className="text-sm text-gray-500">
                            Mostrando <span className="font-medium">{indexOfFirstItem + 1}</span> a <span className="font-medium">
                                {Math.min(indexOfLastItem, filteredAlumnos.length)}
                            </span> de <span className="font-medium">{filteredAlumnos.length}</span> resultados
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
                {selectedAlumnos.length > 0 && (
                    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-lg shadow-lg px-6 py-3 flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-700">
                            {selectedAlumnos.length} {selectedAlumnos.length === 1 ? 'alumno' : 'alumnos'} seleccionado{selectedAlumnos.length !== 1 ? 's' : ''}
                        </span>
                        <div className="h-6 border-l border-gray-300"></div>
                        <button className="text-sm text-blue-600 hover:text-blue-800">Exportar seleccionados</button>
                        <button className="text-sm text-red-600 hover:text-red-800">Eliminar seleccionados</button>
                    </div>
                )}
            </div>

            {/* Modal para nuevo alumno */}
            {mostrarModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Fondo oscuro con desenfoque */}
                    <div
                        className="absolute inset-0 bg-gray-800 bg-opacity-10 transition-opacity duration-300"
                        onClick={cerrarModal}
                    ></div>

                    {/* Contenedor del modal con animación */}
                    <div className="relative z-10 w-full max-w-lg p-6 bg-white rounded-2xl shadow-2xl transform transition-all duration-500 ease-out scale-100 opacity-100 translate-y-0 animate-slideIn">
                        {/* Encabezado */}
                        <div className="flex items-center justify-between pb-4 border-b">
                            <h2 className="text-2xl font-semibold text-gray-800">Nuevo Alumno</h2>
                            <button
                                onClick={cerrarModal}
                                className="text-gray-400 hover:text-gray-600 transition"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Cuerpo */}
                        <div className="py-5 space-y-4">
                            <p className="text-gray-600 text-center">Aquí irá tu formulario 👌</p>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end gap-3 pt-5 border-t">
                            <button
                                onClick={cerrarModal}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
                            >
                                Cancelar
                            </button>
                            <button
                                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}