import AppLayout from "../../Layouts/AppLayout";
import CabeceraLayout from "../../Layouts/CabeceraLayout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ModalCrearDocente, ModalEditarDocente, ModalEliminarDocente } from "../../Components/docente/ModalesDocente";
import BarraAccionDocente from "../../Components/docente/BarraAccionDocente";
import InformacionDocente from "../../Components/docente/InformacionDocente";
import TablaDocenteCrud from "../../Components/docente/TablaDocenteCrud";
import PaginacionDocente from "../../Components/docente/PaginacionDocente";
import SeleccionadosDocente from "../../Components/docente/SeleccionadosDocente";

const modulo = "Docentes"
const descripcion = "Administra información de todos los docentes registrados en el sistema"

export default function DocentePage({ usuario }) {
    const [docentes, setDocentes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [selectedDocentes, setSelectedDocentes] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [mostrarModalCrearDocente, setMostrarModalCrearDocente] = useState(false);
    const [dniDocenteEditar, setDniDocenteEditar] = useState(null);
    const [idUsuarioEliminar, setIdUsuarioEliminar] = useState(null);
    const [mostrarModalEditarDocente, setMostrarModalEditarDocente] = useState(false);
    const [mostrarModalEliminarDocente, setMostrarModalEliminarDocente] = useState(false);
    const [modalExitingEditar, setModalExitingEditar] = useState(false);
    const [modalExitingEliminar, setModalExitingEliminar] = useState(false);
    const [modalExiting, setModalExiting] = useState(false);
    const [alert, setAlert] = useState({ show: false, message: "", type: "" });

    // Obtener datos de los docentes
    useEffect(() => {
        setLoading(true);
        axios.get("http://localhost:4000/docentes")
            .then((response) => {
                setDocentes(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error al obtener los docentes", err);
                setLoading(false);
            });
    }, []);

    // Manejar ordenamiento
    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const actualizarDocentes = () => {
        setLoading(true);
        axios.get("http://localhost:4000/docentes")
            .then((response) => {
                setDocentes(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error al obtener los docentes", err);
                setLoading(false);
                showAlert("Error al cargar los docentes. Por favor, intente nuevamente.", "error");
            });
    };

    const abrirModalCrearDocente = () => setMostrarModalCrearDocente(true);

    const cerrarModalCrearDocente = () => {
        setModalExiting(true);
        setTimeout(() => {
            setMostrarModalCrearDocente(false);
            setModalExiting(false);
        }, 500);
    };

    const onDocenteCreado = (success = true) => {
        if (success) {
            showAlert("Docente creado correctamente", "success");
        } else {
            showAlert("Error al crear el docente. Inténtalo de nuevo.", "error");
        }
    };

    const onDocenteEditado = (success = true) => {
        if (success) {
            showAlert("Docente editado correctamente", "success");
        } else {
            showAlert("Error al editar el docente. Inténtalo de nuevo.", "error");
        }
    };

    const onDocenteEliminado = (success = true) => {
        if (success) {
            showAlert("Docente eliminado correctamente", "success");
        } else {
            showAlert("Error al eliminar el docente. Inténtalo de nuevo.", "error");
        }
    };

    const abrirModalEditarDocente = (dni) => {
        setDniDocenteEditar(dni);
        setMostrarModalEditarDocente(true);
    };

    const cerrarModalEditarDocente = () => {
        setModalExitingEditar(true);
        setTimeout(() => {
            setMostrarModalEditarDocente(false);
            setModalExitingEditar(false);
        }, 500);
    }

    const abrirModalEliminarDocente = (id_usuario) => {
        setIdUsuarioEliminar(id_usuario);
        setMostrarModalEliminarDocente(true);
    };

    const cerrarModalEliminarDocente = () => {
        setModalExitingEliminar(true);
        setTimeout(() => {
            setMostrarModalEliminarDocente(false);
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
    const sortedDocente = React.useMemo(() => {
        let sortableItems = [...docentes];
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
    }, [docentes, sortConfig]);

    // Aplicar búsqueda
    const filteredDocentes = React.useMemo(() => {
        return sortedDocente.filter(docente => {
            return (
                docente.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                docente.apellido_paterno?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                docente.apellido_materno?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                docente.codigo_docente?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                docente.facultad?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                docente.especialidad?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                `${docente.nombre} ${docente.apellido_paterno} ${docente.apellido_materno}`.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
    }, [sortedDocente, searchTerm]);

    // Paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentDocentes = filteredDocentes.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredDocentes.length / itemsPerPage);

    // Cambiar página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Manejar selección de checkbox
    const handleSelectDocente = (id_usuario) => {
        if (selectedDocentes.includes(id_usuario)) {
            setSelectedDocentes(selectedDocentes.filter(docenteId => docenteId !== id_usuario));
        } else {
            setSelectedDocentes([...selectedDocentes, id_usuario]);
        }
    };

    // Manejar selección de todos
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedDocentes([]);
        } else {
            setSelectedDocentes(currentDocentes.map(docente => docente.id_usuario));
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
                <BarraAccionDocente abrirModalCrearDocente={abrirModalCrearDocente} itemsPerPage={itemsPerPage} searchTerm={searchTerm} setItemsPerPage={setItemsPerPage} setSearchTerm={setSearchTerm} />
                <InformacionDocente filteredDocentes={filteredDocentes} selectedDocentes={selectedDocentes} />
                <TablaDocenteCrud sortConfig={sortConfig} selectedDocentes={selectedDocentes} selectAll={selectAll} requestSort={requestSort} loading={loading} handleSelectDocente={handleSelectDocente} handleSelectAll={handleSelectAll} formatDate={formatDate} currentDocentes={currentDocentes} abrirModalEditarDocente={abrirModalEditarDocente} abrirModalEliminarDocente={abrirModalEliminarDocente} />
                <PaginacionDocente currentPage={currentPage} filteredDocentes={filteredDocentes} indexOfFirstItem={indexOfFirstItem} indexOfLastItem={indexOfLastItem} paginate={paginate} totalPages={totalPages} />
                <SeleccionadosDocente selectedDocentes={selectedDocentes} />
            </CabeceraLayout>
            {/* Modal para agregar nuevo docente */}
            {mostrarModalCrearDocente && (
                <ModalCrearDocente
                    cerrarModalCrearDocente={cerrarModalCrearDocente}
                    modalExiting={modalExiting}
                    onDocenteCreado={onDocenteCreado}
                    actualizarDocentes={actualizarDocentes}
                />
            )}

            {/* Modal para editar docente */}
            {mostrarModalEditarDocente && (
                <ModalEditarDocente
                    dniDocenteEditar={dniDocenteEditar}
                    cerrarModalEditarDocente={cerrarModalEditarDocente}
                    modalExitingEditar={modalExitingEditar}
                    onDocenteEditado={onDocenteEditado}
                    actualizarDocentes={actualizarDocentes}
                />
            )}

            {/* Modal para eliminar docente */}
            {mostrarModalEliminarDocente && (
                <ModalEliminarDocente
                    idUsuarioEliminar={idUsuarioEliminar}
                    cerrarModalEliminarDocente={cerrarModalEliminarDocente}
                    modalExitingEliminar={modalExitingEliminar}
                    onDocenteEliminado={onDocenteEliminado}
                    actualizarDocentes={actualizarDocentes}
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