import React, { useEffect } from "react";
import "./notification.css";

const Alert = ({ message, type, onClose }) => {
    useEffect(() => {
        // Cierra la alerta automáticamente después de 5 segundos
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const bgColor = type === "success"
        ? "bg-green-50 border-green-500 text-green-700"
        : type === "error"
            ? "bg-red-50 border-red-500 text-red-700"
            : "bg-blue-50 border-blue-500 text-blue-700";

    const iconColor = type === "success"
        ? "text-green-500"
        : type === "error"
            ? "text-red-500"
            : "text-blue-500";

    return (
        <div className={`fixed top-6 right-6 z-50 max-w-md animate-slide-in-right`}>
            <div className={`flex items-center p-4 border-l-4 rounded-lg shadow-md ${bgColor}`}>
                {type === "success" ? (
                    <svg className={`w-6 h-6 mr-2 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                ) : type === "error" ? (
                    <svg className={`w-6 h-6 mr-2 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                ) : (
                    <svg className={`w-6 h-6 mr-2 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                )}
                <div className="ml-3 text-sm font-medium">{message}</div>
                <button
                    onClick={onClose}
                    className={`ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 ${iconColor} hover:bg-gray-100`}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Alert;