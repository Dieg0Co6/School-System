import AppLayout from "../../Layouts/AppLayout"
import CabeceraLayout from "../../Layouts/CabeceraLayout"
import CardCursoAsignado from "../../Components/cursos_asignados/CardCursosAsignados"
import { useEffect, useState } from "react"
import axios from "axios"
const modulo = "Cursos Asignados"
const descripcion = "Aquí se encuentran todos los cursos a los que se encuentra asignado"

export default function CursosAsignadosPage({usuario}){
    const [Cursos, setCursos] = useState([]);
    const ciclo_academico = "2025-I";
    const id_docente = 5;
    useEffect(() => {
        axios.get(`http://localhost:4000/cursosasignados/${ciclo_academico}/${id_docente}`)
            .then(response => {
                setCursos(response.data);
            })
            .catch(error => {
                console.error('Error al cargar especialidades:', error);
            });
    }, []);

    
    // Ejemplo de datos de cursos
    

    return(
        <AppLayout usuario={usuario}>
            <CabeceraLayout modulo={modulo} descripcion={descripcion}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Cursos.map((curso, index) => (
                    <CardCursoAsignado key={index} curso={curso} index={index} />
                ))}
            </div>
            </CabeceraLayout>
        </AppLayout>
    )
}