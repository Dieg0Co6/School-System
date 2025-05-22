
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


export default function TablaDocenteCrud({selectAll, handleSelectAll, requestSort, sortConfig, loading, currentDocentes, selectedDocentes, handleSelectDocente, formatDate, abrirModalEditarDocente, abrirModalEliminarDocente}) {
    return (
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
                                            <EditIcon />
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
    )
}