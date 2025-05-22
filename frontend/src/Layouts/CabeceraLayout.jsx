

export default function CabeceraLayout({ children, modulo, descripcion }) {
    return (
        <div className="w-full p-6 bg-white rounded-lg shadow-sm">
            {/* Cabecera */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Gestión de {modulo}</h1>
                <p className="text-gray-600">{descripcion}</p>
            </div>
            {children}
        </div>
    )
}