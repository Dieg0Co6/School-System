function CardCursoAsignado({ curso, index }) {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md border border-gray-100">
            {/* Header del curso */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                    <div className="h-12 w-12 rounded-lg bg-red-100 text-red-500 flex items-center justify-center font-semibold text-lg">
                        {/* {curso.nombre.charAt(0)} */} {index + 1}
                    </div>
                    <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-800">{curso.nombre}</h3>
                        <p className="text-sm text-gray-500">Código: {curso.id_curso}</p>
                    </div>
                </div>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Activo
                </span>
            </div>

            {/* Información del profesor */}
            <div className="mb-4">
                <div className="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {/* <span className="text-sm text-gray-600">Prof. {curso.profesor}</span> */}
                </div>

                <div className="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {/* <span className="text-sm text-gray-600">{curso.horario}</span> */}
                </div>

                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {/* <span className="text-sm text-gray-600">{curso.aula}</span> */}
                </div>
            </div>

            {/* Estadísticas rápidas */}
            <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800"></p>
                    <p className="text-xs text-gray-500">Estudiantes</p>
                </div>
                
            </div>

            {/* Botones de acción */}
            <div className="flex gap-2">
                <button className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">
                    Ver Detalles
                </button>
                <button className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default CardCursoAsignado;