import React, { useState } from "react";
import SignInForm from "./LoginForm";
import SignUpForm from "./RegisterComp";
import './signInUp.css';

function SignsInUP() {
    const [type, setType] = useState("signIn");
    const handleOnClick = text => {
        if (text !== type) {
            setType(text);
            return;
        }
    };
    const containerClass =
        "container " + (type === "signUp" ? "right-panel-active" : "");
    return (
        <div className="font-sans text-center bg-[#f6f5f7] flex justify-center items-center flex-col font-montserrat h-screen -mt-5 mb-12">
            <div className={containerClass} id="container">
                <SignUpForm />
                <SignInForm />
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1 className="card-register">¡Bienvenido de nuevo!</h1>
                            <p>
                                Si ya tienes una cuenta, inicia sesión aquí
                            </p>
                            <button
                                className="bg-white text-red-500 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-red-100 hover:text-red-600 hover:scale-105 transition-all duration-300 border-2 border-white mt-4"
                                id="signIn"
                                onClick={() => handleOnClick("signIn")}
                            >
                                Inicia Sesión
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1 className="card-login">¿Aún no tienes una cuenta?</h1>
                            <p>
                                Regístrate para disfrutar de nuestra plataforma
                            </p>
                            <button
                                className="bg-white text-red-500 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-red-100 hover:text-red-600 hover:scale-105 transition-all duration-300 border-2 border-white mt-4"
                                id="signUp"
                                onClick={() => handleOnClick("signUp")}
                            >
                                Registrate
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignsInUP;