import React from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { ModernSpinner } from './Spiner';
import { cloneElement } from 'react'; // 👈 para clonar el componente

const ProtectedRoute = ({ element, allowedRoles = [], ...rest }) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [usuario, setUsuario] = React.useState(null);

    React.useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('http://localhost:4000/protected', { withCredentials: true });

                if (response.status === 200) {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    const user = response.data.user;
                    setIsAuthenticated(true);
                    setUsuario(user);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <ModernSpinner />
            </div>
        );
    }

    if (!isAuthenticated) return <Navigate to="/" />;

    if (allowedRoles.length > 0 && !allowedRoles.includes(usuario.rol)) {
        return <Navigate to="/unauthorized" />;
    }

    return cloneElement(element, { ...rest, usuario });
};

export default ProtectedRoute;
