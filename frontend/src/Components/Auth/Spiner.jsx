import { useState, useEffect } from 'react';

export function ModernSpinner({ onLoadComplete = () => { } }) {
    const [dots, setDots] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const dotsInterval = setInterval(() => {
            setDots(prev => (prev + 1) % 4);
        }, 600);

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                // Si ya está completo, mantén el 100%
                if (isComplete) return 100;

                // Incrementa el progreso en valores aleatorios para simular carga
                const newProgress = Math.min(prev + Math.random() * 8 + 2, 100);

                // Si llegamos exactamente al 100%, marca como completo
                if (newProgress === 100) {
                    setIsComplete(true);
                    // Llamamos a la función que maneja la entrada al sistema
                    setTimeout(() => {
                        onLoadComplete();
                    }, 800); // Pausa para mostrar el 100% antes de entrar
                }

                return newProgress;
            });
        }, 300);

        return () => {
            clearInterval(dotsInterval);
            clearInterval(progressInterval);
        };
    }, [isComplete, onLoadComplete]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            <div className="relative flex flex-col items-center">

                {/* Spinner principal */}
                <div className="relative w-24 h-24">
                    {/* Anillo exterior */}
                    <div className="absolute w-24 h-24 rounded-full border-4 border-red-500/20"></div>

                    {/* Anillo giratorio */}
                    <div className="absolute w-24 h-24 rounded-full border-4 border-transparent border-t-red-500 border-r-red-500/70 animate-spin"></div>

                    {/* Segundo anillo giratorio (dirección opuesta) */}
                    <div className="absolute w-16 h-16 top-4 left-4 rounded-full border-3 border-transparent border-b-red-500/80 animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>

                    {/* Círculo central */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-red-500 rounded-full"></div>

                </div>

                {/* Texto de carga que cambia cuando está completo */}
                <div className="mt-8 text-lg font-medium text-red-500">
                    {isComplete ? "¡Listo!" : `Cargando${'.'.repeat(dots)}`}
                </div>

                {/* Barra de progreso que avanza */}
                <div className="mt-4 w-48 h-1 bg-red-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-red-500 transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                {/* Mensaje adicional */}
                <div className="mt-3 text-sm text-gray-500">
                    {isComplete ? "Entrando al sistema..." : "Preparando tu sesión"}
                </div>
            </div>
        </div>
    );
}

export function TransitionSpinner({ onTransitionComplete, targetModule, duration = 1200 }) {
    // Cuando el componente se monta, configuramos un temporizador para completar la transición
    useEffect(() => {
        const timer = setTimeout(() => {
            onTransitionComplete();
        }, duration);

        return () => clearTimeout(timer);
    }, [onTransitionComplete, duration]);

    return (
        <div className="fixed inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-50">
            <div className="relative flex flex-col items-center">
                {/* Spinner principal */}
                <div className="relative w-24 h-24">
                    {/* Anillo exterior */}
                    <div className="absolute w-24 h-24 rounded-full border-4 border-red-500/20"></div>

                    {/* Anillo giratorio */}
                    <div className="absolute w-24 h-24 rounded-full border-4 border-transparent border-t-red-500 border-r-red-500/70 animate-spin"></div>

                    {/* Segundo anillo giratorio (dirección opuesta) */}
                    <div
                        className="absolute w-16 h-16 top-4 left-4 rounded-full border-3 border-transparent border-b-red-500/80 animate-spin"
                        style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}
                    ></div>

                    {/* Círculo central */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-red-500 rounded-full"></div>
                </div>

                {/* Texto informativo */}
                <div className="mt-8 text-lg font-medium text-red-500">
                    Cargando...
                </div>

                {/* Mensaje del módulo al que se dirige */}
                <div className="mt-3 text-sm text-gray-500">
                    Accediendo a {targetModule}
                </div>
            </div>
        </div>
    );
}