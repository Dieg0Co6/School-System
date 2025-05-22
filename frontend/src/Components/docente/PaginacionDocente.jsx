

export default function PaginacionDocente({filteredDocentes, indexOfFirstItem, indexOfLastItem, currentPage, totalPages, paginate}) {
    return (
        <>
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
        </>
    )
}