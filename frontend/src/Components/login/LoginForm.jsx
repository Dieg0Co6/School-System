import "../../App.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
/* import "bootstrap/dist/css/bootstrap.min.css"; */

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Enviar credenciales al backend
            const response = await axios.post(
                "http://localhost:4000/login",
                { email, password },
                {
                    withCredentials: true, // Asegura que la cookie sea enviada con la solicitud
                }
            );

            if (response.status === 200) {
                navigate("/inicio"); // Redirige al dashboard después de un login exitoso
            }
        } catch (err) {
            // Manejar errores de autenticación
            if (err.response && err.response.status === 401) {
                setError("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
            }
            else if (err.response && err.response.status === 500) {
                setError(err.response?.data?.message || "Usuario o contraseña incorrectos");
            } else {
                setError("Error de conexión. Por favor, intenta más tarde.");
            }
        }
    };

    return (
        <div className="absolute top-0 h-full transition-all duration-[600ms] ease-in-out left-0 w-1/2 z-20">
            <form className="bg-white flex items-center justify-center flex-col px-[50px] h-full text-center" onSubmit={handleSubmit}>
                <h1 className="font-bold m-0 text-2xl">Inicia Sesión</h1>
                <div className="my-5 flex justify-between w-50 mx-auto">
                    <a href="#" className="border border-gray-300 rounded-full inline-flex justify-center items-center mx-1 h-10 w-10 text-gray-800 text-sm no-underline my-[15px] social">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" class="bi bi-facebook" viewBox="0 0 16 16">
                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                        </svg>
                    </a>
                    <a href="#" className="border border-gray-300 rounded-full inline-flex justify-center items-center mx-1 h-10 w-10 text-gray-800 text-sm no-underline my-[15px] social">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" class="bi bi-google" viewBox="0 0 16 16">
                            <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                        </svg>
                    </a>
                    <a href="#" className="border border-gray-300 rounded-full inline-flex justify-center items-center mx-1 h-10 w-10 text-gray-800 text-sm no-underline my-[15px] social">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" class="bi bi-linkedin" viewBox="0 0 16 16">
                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                        </svg>
                    </a>
                </div>
                <span className="text-xs">o usar su correo electrónico</span>
                <input
                    className="bg-gray-200 border-none p-3 px-4 my-2 w-full input"
                    type="text"
                    id="typeUsernameX-2"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className="bg-gray-200 border-none p-3 px-4 my-2 w-full input"
                    type="password"
                    id="typePasswordX-2"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <a className="text-gray-800 text-sm no-underline my-[15px]" href="#">¿Olvidaste tu contraseña?</a>
                <button
                    data-mdb-button-init=""
                    data-mdb-ripple-init=""
                    type="submit"
                    className="rounded-[20px] border border-[#ff4b2b] bg-[#ff4b2b] text-white text-xs font-bold px-[45px] py-3 tracking-widest uppercase transition-transform duration-80 ease-in focus:outline-none active:scale-95"
                >
                    Entrar
                </button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
        </div>
    );
}

export default LoginForm;
