
export default function InformacionDocente({ filteredDocentes, selectedDocentes }) {
    return (
        <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-500">
                <span className="font-medium">{filteredDocentes.length}</span> docentes encontrados
            </div>
            <div className="text-sm text-gray-500">
                <span className="font-medium">{selectedDocentes.length}</span> seleccionados
            </div>
        </div>
    )
}