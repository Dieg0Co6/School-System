import React, { useState, useEffect } from "react";
import BarraAccionAlumno from "../../Components/alumno/BarraAccionAlumno";
import InformacionAlumno from "../../Components/alumno/InformacionAlumno";
import TablaAlumnoCrud from "../../Components/alumno/TablaAlumnoCrud";
import AppLayout from "../../Layouts/AppLayout";
import CabeceraLayout from "../../Layouts/CabeceraLayout";
import PaginacionAlumno from "../../Components/alumno/PaginacionAlumno";
import SeleccionadosAlumno from "../../Components/alumno/SeleccionadosAlumno";
import axios from "axios";
import { ModalCrearAlumno, ModalEditarAlumno, ModalEliminarAlumno } from "../../Components/alumno/ModalesAlumno";

const modulo = "Alumnos"
const descripcion = "Administra información de todos los alumnos registrados en el sistema"

export default function AlumnoPage({ usuario }) {
    const [alumnos, setAlumnos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [selectedAlumnos, setSelectedAlumnos] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [mostrarModalCrearAlumno, setMostrarModalCrearAlumno] = useState(false);
    const [dniAlumnoEditar, setDniAlumnoEditar] = useState(null);
    const [idUsuarioEliminar, setIdUsuarioEliminar] = useState(null);
    const [mostrarModalEditarAlumno, setMostrarModalEditarAlumno] = useState(false);
    const [mostrarModalEliminarAlumno, setMostrarModalEliminarAlumno] = useState(false);
    const [modalExiting, setModalExiting] = useState(false);
    const [modalExitingEditar, setModalExitingEditar] = useState(false);
    const [modalExitingEliminar, setModalExitingEliminar] = useState(false);
    const [alert, setAlert] = useState({ show: false, message: "", type: "" });

    // Obtener datos de alumnos
    useEffect(() => {
        setLoading(true);
        axios.get("http://localhost:4000/alumnos")
            .then((response) => {
                setAlumnos(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error al obtener los alumnos", err);
                setLoading(false);
            });
    }, []);

    const actualizarAlumnos = () => {
        setLoading(true);
        axios.get("http://localhost:4000/alumnos")
            .then((response) => {
                setAlumnos(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error al obtener los alumnos", err);
                setLoading(false);
                showAlert("Error al cargar los alumnos. Por favor, intente nuevamente.", "error");
            });
    };

    const onAlumnoCreado = (success = true) => {
        if (success) {
            showAlert("Alumno creado correctamente", "success");
        } else {
            showAlert("Error al crear el alumno. Inténtalo de nuevo.", "error");
        }
    };

    const onAlumnoEditado = (success = true) => {
        if (success) {
            showAlert("Alumno editado correctamente", "success");
        } else {
            showAlert("Error al editar el alumno. Inténtalo de nuevo.", "error");
        }
    };

    const onAlumnoEliminado = (success = true) => {
        if (success) {
            showAlert("Alumno eliminado correctamente", "success");
        } else {
            showAlert("Error al eliminar el alumno. Inténtalo de nuevo.", "error");
        }
    };

    // Manejar ordenamiento
    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const abrirModalCrearAlumno = () => setMostrarModalCrearAlumno(true);

    const cerrarModalCrearAlumno = () => {
        setModalExiting(true);
        setTimeout(() => {
            setMostrarModalCrearAlumno(false);
            setModalExiting(false);
        }, 500); // coincide con la duración de la animación
    };

    const abrirModalEditarAlumno = (dni) => {
        setDniAlumnoEditar(dni);
        setMostrarModalEditarAlumno(true);
    };

    const cerrarModalEditarAlumno = () => {
        setModalExitingEditar(true);
        setTimeout(() => {
            setMostrarModalEditarAlumno(false);
            setModalExitingEditar(false);
        }, 500);
    }

    const abrirModalEliminarAlumno = (id_usuario) => {
        setIdUsuarioEliminar(id_usuario);
        setMostrarModalEliminarAlumno(true);
    };

    const cerrarModalEliminarAlumno = () => {
        setModalExitingEliminar(true);
        setTimeout(() => {
            setMostrarModalEliminarAlumno(false);
            setModalExitingEliminar(false);
        }, 500);
    }

    //Funcion para mostrar alertas
    const showAlert = (message, type = "info") => {
        setAlert({ show: true, message, type });
    };

    const closeAlert = () => {
        setAlert({ ...alert, show: false });
    };

    // Aplicar ordenamiento
    const sortedAlumnos = React.useMemo(() => {
        let sortableItems = [...alumnos];
        if (sortConfig.key) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [alumnos, sortConfig]);

    // Aplicar búsqueda
    const filteredAlumnos = React.useMemo(() => {
        return sortedAlumnos.filter(alumno => {
            return (
                alumno.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                alumno.apellido_paterno?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                alumno.apellido_materno?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                alumno.carrera?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                alumno.codigo_alumno?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                `${alumno.nombre} ${alumno.apellido_paterno} ${alumno.apellido_materno}`.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
    }, [sortedAlumnos, searchTerm]);

    // Paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAlumnos = filteredAlumnos.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredAlumnos.length / itemsPerPage);

    // Cambiar página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Manejar selección de checkbox
    const handleSelectAlumno = (id_usuario) => {
        if (selectedAlumnos.includes(id_usuario)) {
            setSelectedAlumnos(selectedAlumnos.filter(alumnoId => alumnoId !== id_usuario));
        } else {
            setSelectedAlumnos([...selectedAlumnos, id_usuario]);
        }
    };

    // Manejar selección de todos
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedAlumnos([]);
        } else {
            setSelectedAlumnos(currentAlumnos.map(alumno => alumno.id_usuario));
        }
        setSelectAll(!selectAll);
    };

    // Formatear fecha
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    return (
        <AppLayout usuario={usuario}>
            <CabeceraLayout modulo={modulo} descripcion={descripcion}>
                <BarraAccionAlumno abrirModalCrearAlumno={abrirModalCrearAlumno} searchTerm={searchTerm} itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} setSearchTerm={setSearchTerm}/>
                <InformacionAlumno filteredAlumnos={filteredAlumnos} selectedAlumnos={selectedAlumnos}/>
                <TablaAlumnoCrud sortConfig={sortConfig} selectedAlumnos={selectedAlumnos} selectAll={selectAll} requestSort={requestSort} loading={loading} handleSelectAlumno={handleSelectAlumno} handleSelectAll={handleSelectAll} formatDate={formatDate} currentAlumnos={currentAlumnos} abrirModalEditarAlumno={abrirModalEditarAlumno} abrirModalEliminarAlumno={abrirModalEliminarAlumno}/> 
                <PaginacionAlumno currentPage={currentPage} filteredAlumnos={filteredAlumnos} indexOfFirstItem={indexOfFirstItem} indexOfLastItem={indexOfLastItem} paginate={paginate} totalPages={totalPages} />
                <SeleccionadosAlumno selectedAlumnos={selectedAlumnos}/>
            </CabeceraLayout>
            {mostrarModalCrearAlumno && (
                <ModalCrearAlumno
                    cerrarModalCrearAlumno={cerrarModalCrearAlumno}
                    modalExiting={modalExiting}
                    actualizarAlumnos={actualizarAlumnos}
                    onAlumnoCreado={onAlumnoCreado}
                />
            )}

            {/*Modal para editar alumno */}
            {mostrarModalEditarAlumno && (
                <ModalEditarAlumno
                    cerrarModalEditarAlumno={cerrarModalEditarAlumno}
                    modalExitingEditar={modalExitingEditar}
                    dniAlumnoEditar={dniAlumnoEditar}
                    actualizarAlumnos={actualizarAlumnos}
                    onAlumnoEditado={onAlumnoEditado}
                />
            )}

            {/* Modal para eliminar alumno */}
            {mostrarModalEliminarAlumno && (
                <ModalEliminarAlumno
                    cerrarModalEliminarAlumno={cerrarModalEliminarAlumno}
                    modalExitingEliminar={modalExitingEliminar}
                    idUsuarioEliminar={idUsuarioEliminar}
                    actualizarAlumnos={actualizarAlumnos}
                    onAlumnoEliminado={onAlumnoEliminado}
                />
            )}

            {/* Alerta */}
            {alert.show && (
                <Alert
                    message={alert.message}
                    type={alert.type}
                    onClose={closeAlert}
                />
            )}
        </AppLayout>
    )
}