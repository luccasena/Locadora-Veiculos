"use client";
import { useRouter } from "next/navigation";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from "@mui/material";
import Modal from '@mui/material/Modal';
import { useEffect, useState, useRef } from "react";
import { getCarById } from "@/services/CarService";
import { getAllContracts } from "@/services/ContractService";
import { deleteContract } from "@/services/ContractService";
import { getUserById } from "@/services/userService";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import "./style.css";
import "../../home/style.css"

import { Contract, ContractAdminView } from "../../../types/Contract";
import { HeaderPageAdmin } from "@/components/headerPageAdmin";
import { FooterPage } from '@/components/FooterPage';

export default function ManageContractsPage() {;
    const isMountedRef  = useRef(true);
    const [contracts, setContracts]     = useState<ContractAdminView[]>([]);
    const [selectedRow, setSelectedRow] = useState<ContractAdminView | null>(null);
    const [openModal, setOpenModal]     = useState(false);
    const [modalType,   setModalType]   = useState("");
    const [errors, setErrors]           = useState<Record<string, string[]>>({});

    const handleDelete = async (contractId: number) => {
        if (selectedRow) {
            const confirmDelete = window.confirm(`Tem certeza que deseja deletar o contrato ${selectedRow.id}?`);
            if (confirmDelete) {
                await deleteContract(contractId);
                // guard against updating state after unmount
                if (!isMountedRef.current) return;
                alert("Contrato deletado com sucesso!");
                setOpenModal(false);
            }
        }
    };

    const columns: GridColDef<ContractAdminView>[] = [
        
        {
            field: "actions",
            headerName: "Ações",
            width: 120,
            sortable: false,
            renderCell: (params) => (
                <>
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
        { field: 'Car', headerName: 'Carro', width: 90 },
        { field: 'Client', headerName: 'Cliente', width: 200 },
        {
            field: 'StartDate',
            headerName: 'Início do Contrato',
            width: 160,
            valueFormatter: (value: string) =>
                new Date(value).toLocaleDateString("pt-BR"),
        },
        {
            field: 'EndDate',
            headerName: 'Fim do Contrato',
            width: 160,
            valueFormatter: (value: string) =>
                new Date(value).toLocaleDateString("pt-BR"),
            
        },
    ];

    useEffect(() => {           
    
        async function fetchContracts() {
            try {
                const response: Contract[] = await getAllContracts();
                const contractsWithDetails: ContractAdminView[] = [];
                for (const contract of response) {

                    const carResponse = await getCarById(contract.idCar);
                    const userResponse = await getUserById(contract.idClient);
                
                    contractsWithDetails.push({
                        ...contract,
                        Car: `${carResponse.data.carName} ${carResponse.data.carBrand}`,
                        Client: `ID: ${userResponse.data.id} - ${userResponse.data.name} ${userResponse.data.lastname}`
                    });
                }
                

                if (isMountedRef.current) {
                    setContracts(contractsWithDetails);
                }
            } catch (error) {
                console.error("Erro ao buscar contratos:", error);
            }
        }
        fetchContracts();

    }, []);
        
    return (
    <>
        <HeaderPageAdmin />
        <main>
            <section className="hero-section">
                <h1 className="hero-title">Área do Administrador</h1>
                <p  className="hero-subtitle">Gerenciando Contratos.</p>
            </section>
            <section className="features-section" style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: "40px",

                }}>
                <div>
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
                            rows={contracts}
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
                {modalType === "delete" && selectedRow && (
                    <div className="modal-content">
                        <h2>Deletar Contrato</h2>
                        <p>Tem certeza que deseja deletar o contrato {selectedRow.id}?</p>
                        <div className="modal-actions">
                            <button 
                                className="btn-cancel"
                                onClick={() => setOpenModal(false)}
                            >
                                Cancelar
                            </button>
                            <button 
                                className="btn-delete"
                                onClick={() => handleDelete(selectedRow.id)}
                            >
                                Deletar
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