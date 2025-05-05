import React from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import {ModernSpinner} from './Spiner'; // Asegúrate de que la ruta sea correcta

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [authCheckComplete, setAuthCheckComplete] = React.useState(false);

    React.useEffect(() => {
        const checkAuth = async () => {
            try {
                // Hacer una solicitud al backend para verificar si el usuario está autenticado
                const response = await axios.get('http://localhost:4000/protected', { withCredentials: true });

                if (response.status === 200) {
                    // Espera artificial de 2 segundos después de verificar autenticación
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                // Aquí solo marcamos que la verificación se completó, pero NO apagamos loading todavía
                setAuthCheckComplete(true);
            }
        };
        checkAuth();
    }, []);

    // Esta función se llamará cuando el spinner llegue al 100%
    const handleLoadComplete = () => {
        setLoading(false); // Ahora sí apagamos el loading para proceder con la redirección
    };

    // Si authCheckComplete es true pero loading todavía es true, significa que
    // la verificación terminó y ahora estamos esperando al spinner
    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <ModernSpinner onLoadComplete={handleLoadComplete} />
            </div>
        );
    }

    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;