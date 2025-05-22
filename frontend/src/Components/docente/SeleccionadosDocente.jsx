

export default function SeleccionadosDocente({selectedDocentes}) {
    return (
        <>
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
        </>
    )
}