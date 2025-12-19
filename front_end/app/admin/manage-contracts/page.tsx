"use client";
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

import styles from"@/app/Home/style.module.css"

import { Contract, ContractAdminView } from "../../../types/Contract";
import { HeaderPageAdmin } from "@/components/headerPageAdmin";
import { FooterPage } from '@/components/FooterPage';

export default function ManageContractsPage() {;
    const isMountedRef  = useRef(true);
    const [contracts, setContracts]     = useState<ContractAdminView[]>([]);
    const [selectedRow, setSelectedRow] = useState<ContractAdminView | null>(null);
    const [openModal, setOpenModal]     = useState(false);
    const [modalType,   setModalType]   = useState("");

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

        async function fetchContractsMoc() {
    try {
        // Simula um delay de rede de 1 segundo (opcional, bom para testar loading)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Dados Mockados já no formato final de ContractAdminView
        const mockContracts: any[] = [ // Troque 'any' por 'ContractAdminView' se tiver a tipagem importada
            {
                id: 1,
                idCar: 101,
                idClient: 50,
                startDate: "2023-11-01",
                endDate: "2023-11-05",
                value: 1200.00,
                status: "ACTIVE",
                // Campos calculados simulados:
                Car: "Toyota Corolla",
                Client: "ID: 50 - João Silva"
            },
            {
                id: 2,
                idCar: 102,
                idClient: 51,
                startDate: "2023-11-10",
                endDate: "2023-11-12",
                value: 850.50,
                status: "COMPLETED",
                // Campos calculados simulados:
                Car: "Honda Civic",
                Client: "ID: 51 - Maria Souza"
            },
            {
                id: 3,
                idCar: 105,
                idClient: 52,
                startDate: "2023-12-01",
                endDate: "2023-12-10",
                value: 2500.00,
                status: "PENDING",
                // Campos calculados simulados:
                Car: "Fiat Pulse",
                Client: "ID: 52 - Carlos Pereira"
            }
        ];

        // Atualiza o estado se o componente ainda estiver montado
        if (isMountedRef.current) {
            setContracts(mockContracts);
        }

    } catch (error) {
        console.error("Erro ao buscar contratos (Mock):", error);
    }
}

        // fetchContracts();
        fetchContractsMoc();

    }, []);
        
    return (
    <div className={styles["home-scope"]}>
        <HeaderPageAdmin />
        <main>
            <section className={styles["hero-section"]}>
                <h1 className={styles["hero-title"]}>Área do Administrador</h1>
                <p  className={styles["hero-subtitle"]}>Gerenciando Contratos.</p>
            </section>
            <section className={styles["features-section"]} style={{
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
            <div className={styles["modal-overlay"]}>
                {modalType === "delete" && selectedRow && (
                    <div className={styles["modal-content"]}>
                        <h2>Deletar Contrato</h2>
                        <p>Tem certeza que deseja deletar o contrato {selectedRow.id}?</p>
                        <div className={styles["modal-actions"]}>
                            <button 
                                className={styles["btn-cancel"]}
                                onClick={() => setOpenModal(false)}
                            >
                                Cancelar
                            </button>
                            <button 
                                className={styles["btn-delete"]}
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
        </div>
    );
}