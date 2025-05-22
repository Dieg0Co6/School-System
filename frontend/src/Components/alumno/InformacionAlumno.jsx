
export default function InformacionAlumno({filteredAlumnos, selectedAlumnos}) {
    return (
        <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-500">
                <span className="font-medium">{filteredAlumnos.length}</span> alumnos encontrados
            </div>
            <div className="text-sm text-gray-500">
                <span className="font-medium">{selectedAlumnos.length}</span> seleccionados
            </div>
        </div>
    )
}