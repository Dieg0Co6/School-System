const SearchIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default function BarraAccionAlumno({setItemsPerPage, setSearchTerm, itemsPerPage, searchTerm, abrirModalCrearAlumno}) {
    return (
        < div className="flex flex-wrap justify-between items-center mb-6 gap-4" >
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
                    onClick={abrirModalCrearAlumno}
                    onMouseOver={(e) => e.currentTarget.classList.add('shadow-lg')}
                >
                    <span>Nuevo Alumno</span>
                    <span>+</span>
                </button>
            </div>
        </div >
    )
}