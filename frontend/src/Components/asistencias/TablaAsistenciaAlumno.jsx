

export default function TablaAsistenciaAlumno({cursos, loading, formData}) {
    return (
        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            N°
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Código
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Curso
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Facultad
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Carrera
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ciclo
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Asistencias
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            % Asistencias
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {loading ? (
                        <tr>
                            <td colSpan="8" className="px-6 py-16 text-center text-gray-500">
                                <div className="flex justify-center items-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                    <span className="ml-2">Cargando cursos...</span>
                                </div>
                            </td>
                        </tr>
                    ) : cursos.length > 0 ? (
                        cursos.map((curso, index) => (
                            <tr key={curso.id_curso} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                    {index + 1}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                    {curso.abreviatura}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">
                                    {curso.nombre}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                    {formData.facultad}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                    {formData.especialidad}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                    {curso.ciclo}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                    {curso.asistencias || '0'}/{curso.total_sesiones || '0'}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm">
                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${parseFloat(curso.porcentaje_asistencia || 0) >= 70
                                        ? 'bg-green-100 text-green-800'
                                        : parseFloat(curso.porcentaje_asistencia || 0) >= 50
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-red-100 text-red-800'
                                        }`}>
                                        {curso.porcentaje_asistencia || '0'}%
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="px-6 py-16 text-center text-gray-500">
                                {formData.facultad && formData.especialidad
                                    ? "No se encontraron cursos para la facultad y especialidad seleccionadas"
                                    : "Seleccione una facultad y especialidad para ver los cursos"}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}