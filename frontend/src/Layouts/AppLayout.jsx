// Componente de diseño principal de la aplicación
import React, { useState, useEffect } from 'react';
import Navbar from '../Components/navegation/Navbar';
import Sidebar from '../Components/navegation/Sidebar';

const AppLayout = ({ children, usuario }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Ejemplo de datos de usuario
  const userData = {
    name: "María Castillo",
    role: "Administradora",
    initials: "MC",
    hasNotifications: true,
    notifications: [
      { title: 'Nueva asistencia registrada', time: 'Hace 5 minutos' },
      { title: 'Reporte mensual disponible', time: 'Hace 2 horas' },
      { title: 'Actualización del sistema', time: 'Ayer' },
    ]
  };

  // Cierra la barra lateral en ventanas pequeñas cuando se hace clic fuera
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // Configura el sidebar según el tamaño inicial de la ventana
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} userData={userData} />

      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} usuario={usuario} />
      <main className="pt-16 pl-0 lg:pl-64 transition-all duration-300 ease-in-out">
        <div className="p-6">{children}</div>
      </main>

      {/* Overlay para cerrar sidebar en móviles */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AppLayout;
