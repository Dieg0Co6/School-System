import AppLayout from '../../Layouts/AppLayout';
/* import "bootstrap/dist/css/bootstrap.min.css"; */

function DashComp({ usuario }) {

    return (
        <AppLayout usuario={usuario}>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Panel de Control</h1>
      
      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-lg bg-red-100 text-red-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-1">Estudiantes Totales</p>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">1,285</h3>
          <p className="flex items-center text-sm text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            4.5% vs mes anterior
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-lg bg-red-100 text-red-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-1">Profesores Totales</p>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">1,285</h3>
          <p className="flex items-center text-sm text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            4.5% vs mes anterior
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-lg bg-red-100 text-red-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-1">Estudiantes Totales</p>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">1,285</h3>
          <p className="flex items-center text-sm text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            4.5% vs mes anterior
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-lg bg-red-100 text-red-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-1">Estudiantes Totales</p>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">1,285</h3>
          <p className="flex items-center text-sm text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            4.5% vs mes anterior
          </p>
        </div>
        {/* Agrega más tarjetas de estadísticas según sea necesario */}
      </div>
      
      {/* Tabla de asistencias recientes */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-semibold text-gray-800">Registro de Asistencias Recientes</h2>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Ver todo
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estudiante</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clase</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {/* Filas de ejemplo */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center font-medium">
                      JR
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Juan Rodríguez</div>
                      <div className="text-sm text-gray-500">ID: #8732</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Matemáticas</div>
                  <div className="text-sm text-gray-500">Prof. García</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">30 Mar, 2025</div>
                  <div className="text-sm text-gray-500">08:15 AM</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Presente
                  </span>
                </td>
              </tr>
              
              {/* Puedes agregar más filas según sea necesario */}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
    );
}

export default DashComp;
