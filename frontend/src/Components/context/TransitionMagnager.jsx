import { useState, createContext, useContext } from 'react';
import {useNavigate } from 'react-router-dom';
import {TransitionSpinner} from '../Auth/Spiner';

// Contexto para manejar las transiciones globalmente
const TransitionContext = createContext();

// Nombres amigables para los módulos (puedes personalizar según tus rutas)
const moduleNames = {
    '/inicio': 'Inicio',
    '/asistencias': 'Gestión de Asistencias',
    '/estudiantes': 'Gestión de Estudiantes',
    '/docentes': 'Gestión de Docentes',
    '/reportes': 'Reportes',
    '/configuracion': 'Configuración del Sistema',
};

export function TransitionProvider({ children }) {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [targetModule, setTargetModule] = useState('');
    const [pendingNavigation, setPendingNavigation] = useState(null);
    const navigate = useNavigate();

    // Esta función será llamada por los componentes para iniciar una transición
    const startTransition = (to, moduleName) => {
        // Si ya estamos en transición, ignoramos la solicitud
        if (isTransitioning) return;

        // Determinamos el nombre del módulo
        const displayName = moduleName || moduleNames[to] || 'nuevo módulo';

        setTargetModule(displayName);
        setIsTransitioning(true);
        setPendingNavigation(to);
    };

    // Función que se ejecuta cuando la transición se completa
    const handleTransitionComplete = () => {
        if (pendingNavigation) {
            navigate(pendingNavigation);
            setPendingNavigation(null);
        }
        setIsTransitioning(false);
    };

    return (
        <TransitionContext.Provider value={{ startTransition }}>
            {children}
            {isTransitioning && (
                <TransitionSpinner
                    onTransitionComplete={handleTransitionComplete}
                    targetModule={targetModule}
                    duration={1200}
                />
            )}
        </TransitionContext.Provider>
    );
}

// Hook personalizado para usar el contexto de transición
export function useTransition() {
    return useContext(TransitionContext);
}