import React from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import {PacmanLoader} from 'react-spinners';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(null);
    const [loading, setLoading] = React.useState(true); // Estado de carga

    React.useEffect(() => {
        const checkAuth = async () => {
            try {
                // Hacer una solicitud al backend para verificar si el usuario está autenticado
                const response = await axios.get('http://localhost:4000/protected', { withCredentials: true });

                if (response.status === 200) {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false); // Cambia el estado de carga cuando termine la verificación
            }
        };
        checkAuth();
    }, []);

    if (loading) {
        // Podrías mostrar un spinner mientras se verifica la autenticación
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <PacmanLoader/>
        </div>;
    }

    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;