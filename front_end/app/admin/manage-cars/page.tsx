"use client";
import { useRouter } from "next/navigation";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from "@mui/material";
import Modal from '@mui/material/Modal';
import { useEffect, useState, useRef } from "react";
import { getAllCars } from "../../../services/CarService";
import { Edit, Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { HeaderPageAdmin } from "@/components/headerPageAdmin";
import { FooterPage } from '@/components/FooterPage';

import "./style.css";
import "../../home/style.css"

import { Car } from "@/types/car/Car";
import { CarUpdate } from "../../../types/car/CarUpdate";
import { RegisterCarData } from "../../../types/car/RegisterCarData";
import { updateCar } from "../../../services/CarService";
import { deleteCar } from "../../../services/CarService";
import { createCar } from "../../../services/CarService";

export default function ManageCarsPage() {
    const router        = useRouter();
    const isMountedRef  = useRef(true);
    const [cars,        setCars]        = useState<Car[]>([]);
    const [carEdit,     setCarEdit]     = useState<Car>();
    const [carCreate,   setCarCreate]   = useState<Car>();
    const [selectedRow, setSelectedRow] = useState<Car | null>(null);
    const [openModal,   setOpenModal]   = useState(false);
    const [modalType,   setModalType]   = useState("");

    const refetchCars = async () => {
        try {
            const res = await getAllCars();
            if (isMountedRef.current) setCars(res.data);
        } catch (e) {
            console.error(e);
        }
    };

    const handleEdit = (car: Car) => {
        setSelectedRow(car);
        setCarEdit({ ...car });
        setModalType("edit");
        setOpenModal(true);
    };

    const handleDelete = async (carId: number) => {
        if (selectedRow) {
            const confirmDelete = window.confirm(`Tem certeza que deseja deletar o carro ${selectedRow.carName} ${selectedRow.carBrand}?`);
            if (confirmDelete) {
                await deleteCar(carId);
                if (!isMountedRef.current) return;
                alert("Carro deletado com sucesso!");
                setOpenModal(false);
                await refetchCars(); // refresh list
            }
        }
    };

    const handleCreate = () => {
        setModalType("create");
        setOpenModal(true);
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (modalType === "edit") {
            setCarEdit((prevCar) => {
            if (!prevCar) return prevCar;
                return {
                    ...prevCar,
                    [name]: value,
                };
            });
        }

        if (modalType === "create") {
            setCarCreate(prevCar => ({
                ...prevCar!,
                [name]: value
            }));
        }

    }  

    const handleSaveUpdate =  async (car: Car) => {
        // perform update
        const carUpdate: CarUpdate = {
            carBrand: car.carBrand,
            carName: car.carName,
            carCategory: car.carCategory,
            fuelType: car.fuelType,
            Year: parseInt(car.Year.toString(), 10),
            Price: parseFloat(car.Price.toString())
        };

        if (car.id != null) {
            await updateCar(carUpdate, car.id);
            if (!isMountedRef.current) return;
            alert("Dados atualizados!");
            setOpenModal(false);
            await refetchCars(); // refresh list
        }
    };

    const handleSaveCreate =  async (car: Car) => {

        const carCreate: RegisterCarData = {
            carBrand: car.carBrand,
            carName: car.carName,
            carCategory: car.carCategory,
            fuelType: car.fuelType,
            Year: parseInt(car.Year.toString(), 10),
            Price: parseFloat(car.Price.toString())
        };

        if (car.id !== null) {
            await createCar(carCreate);
            if (!isMountedRef.current) return;
            alert("Carro criado com sucesso!");
            setOpenModal(false);
            await refetchCars(); // refresh list
        }
    };

    const columns: GridColDef<Car>[] = [
        
        {
            field: "actions",
            headerName: "Ações",
            width: 120,
            sortable: false,
            renderCell: (params) => (
                <>
                    <IconButton 
                    color="primary" 
                    onClick={() => {handleEdit(params.row)}}
                    >
                    <Edit />
                    </IconButton>

                    <IconButton 
                    color="error" 
                    onClick={() => {
                        setSelectedRow(params.row);
                        handleDelete(params.row.id)}
                    }
                    >
                    <Delete />
                    </IconButton>
                </>
            )
        },
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'carName', headerName: 'Nome do Carro', width: 150},
        { field: 'carBrand', headerName: 'Marca', width: 150},
        { field: 'carCategory', headerName: 'Categoria', width: 110},
        { field: 'Year', headerName: 'Ano', width: 160},
        { field: 'Price', headerName: 'Preço Diária (R$)', width: 160},  
        {
            field: 'createdAt',
            headerName: 'Criado em',
            width: 160,
            valueFormatter: (value: string) =>
                new Date(value).toLocaleDateString("pt-BR"),
        },
        {
            field: 'updatedAt',
            headerName: 'Atualizado em',
            width: 160,
            valueFormatter: (value: string) =>
                new Date(value).toLocaleDateString("pt-BR"),
        }
    ];

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    useEffect(() => {
        refetchCars();
        return () => { isMountedRef.current = false; };
    }, []);
 
    useEffect(() => {
        getAllCars()
            .then((res) => {
            if (isMountedRef.current) {
                setCars(res.data);
            }
            })
            .catch(console.error);
    }, []);
        
    return (
    <>
        <HeaderPageAdmin />
        <main>
            <section className="hero-section">
                <h1 className="hero-title">Área do Administrador</h1>
                <p  className="hero-subtitle">Gerenciando Carros.</p>
            </section>
            <section className="features-section" style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: "40px",

                }}>
                <div>
                    <Fab color="primary" aria-label="add" sx={{ margin: "10px"}} onClick={handleCreate}>
                        <AddIcon />
                    </Fab>
                    <Box
                        sx={{
                            height: 750,
                            width: "100%",
                            maxWidth: "1200px",
                            backgroundColor: "#fff",
                            borderRadius: 2,
                            padding: 2,
                            boxShadow: 3,

                            "& .MuiDataGrid-cell": {
                            fontSize: "0.95rem",
                            color: "#333",
                            fontWeight: 400,
                            },

                            "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "#f4f4f4",
                            color: "#222",
                            fontWeight: "bold",
                            fontSize: "1rem",
                            },

                            "& .MuiDataGrid-row:hover": {
                            backgroundColor: "#fafafa",
                            }
                        }}
                        >

                        <DataGrid
                            rows={cars}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { pageSize: 10, page: 0 }
                                }
                            }}
                            pageSizeOptions={[5, 10, 20]}
                            disableRowSelectionOnClick
                        />
                    </Box>
                </div>
            </section>
        </main>
        <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
        >
            <div className="modal-overlay">
                {modalType === "edit" && selectedRow && (
                    <div className="modal-container">
                        <IconButton
                            aria-label="close"
                            onClick={() => setOpenModal(false)}
                            className="modal-close-btn"
                        >
                            <CloseIcon />
                        </IconButton>
                        <h2>Editando Carro: {selectedRow.carName} {selectedRow.carBrand}</h2>
                        <h3>Informações da conta</h3>

                        <div className="form-edit-car-admin">
                            <label>Nome do Carro</label>
                            <input name="carName" value={carEdit?.carName || ""} onChange={handleChange}></input> 

                            <label>Marca</label>
                            <input name="carBrand" value={carEdit?.carBrand || ""} onChange={handleChange}></input> 

                            <label>Categoria</label>
                            <input name="carCategory" value={carEdit?.carCategory || ""} onChange={handleChange}></input> 

                            <label>Ano</label>
                            <input type="number" name="Year" value={carEdit?.Year || ""} onChange={handleChange}></input> 

                            <label>Preço Diária (R$)</label>
                            <input type="number" name="Price" value={carEdit?.Price || ""} onChange={handleChange}></input> 

                            <label>Combustível</label>
                            <input name="fuelType" value={carEdit?.fuelType || ""} onChange={handleChange}></input> 

                            <button onClick={() => carEdit && handleSaveUpdate(carEdit)}>
                                Salvar alterações
                            </button>
                        </div>

                    </div>
                )}
                {modalType === "create" && (
                    <div className="modal-container">

                        <IconButton
                            aria-label="close"
                            onClick={() => setOpenModal(false)}
                            className="modal-close-btn"
                        >
                            <CloseIcon />
                        </IconButton>

                        <h2>Criando Carro: </h2>

                        <div className="form-edit-car-admin">
                            <label>Nome do Carro</label>
                            <input name="carName" onChange={handleChange}></input> 

                            <label>Marca</label>
                            <input name="carBrand" onChange={handleChange}></input> 

                            <label>Categoria</label>
                            <input name="carCategory" onChange={handleChange}></input> 

                            <label>Ano</label>
                            <input type="number" name="Year" onChange={handleChange}></input> 

                            <label>Preço Diária (R$)</label>
                            <input type="number" name="Price" onChange={handleChange}></input> 

                            <label>Combustível</label>
                            <input name="fuelType" onChange={handleChange}></input> 

                            <button onClick={() => carCreate && handleSaveCreate(carCreate)}>
                                Criar Carro
                            </button>
                        </div>

                    </div>
                )}
            </div>
        </Modal>
        <FooterPage />
    </>
);
}