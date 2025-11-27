"use client";
import { useRouter } from "next/navigation";
import { DataGrid, GridColDef  } from '@mui/x-data-grid';
import { Box } from "@mui/material";
import Modal from '@mui/material/Modal';
import { useEffect, useState } from "react";
import { getUsers } from "@/services/userService";
import { Edit, Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import "./style.css";
import "../../home/style.css"

import { User } from "../../../types/user/User";
import { UserUpdate } from "../../../types/user/UserUpdate";
import { updateUser } from '@/services/userService';
import { deleteUser } from '@/services/userService';

export default function ManageClientsPage() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [userEdit, setUserEdit] = useState<User>();
    const [selectedRow, setSelectedRow] = useState<User | null>(null);
    const [openEditModal, setOpenEditModal] = useState(false);

    const handleEdit = (user: User) => {
        setSelectedRow(user);
        setUserEdit(user); // aqui !
        setOpenEditModal(true);
    };

    const handleDelete = async (userId: number) => {
        if (selectedRow) {
            const confirmDelete = window.confirm(`Tem certeza que deseja deletar o usuário ${selectedRow.name} ${selectedRow.lastname}?`);
            if (confirmDelete) {
                await deleteUser(userId);
                alert("Usuário deletado com sucesso!");
                setOpenEditModal(false);
            }
        }
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserEdit((prevUser) => {
            if (!prevUser) return prevUser;
            return {
                ...prevUser,
                [name]: value,
            };
        });
    }  

    const handleSave =  async (user: User) => {
        alert("Dados atualizados!");

        const userUpdate: UserUpdate = {
            cpf: user.cpf,
            email: user.email,
            name: user.name,
            lastname: user.lastname,
            phone: user.phone,
            password: user.password
        }

        if (user.id !== null) {
            await updateUser(userUpdate, user.id);
        }
    };

    const columns: GridColDef<User>[] = [
        
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
        {
            field: 'cpf',
            headerName: 'CPF',
            width: 150,
        },
        {
            field: 'email',
            headerName: 'E-mail',
            width: 150,
        },
        {
            field: 'name',
            headerName: 'Nome',
            type: 'string',
            width: 110,
        },
        {
            field: 'lastname',
            headerName: 'Sobrenome',
            description: 'This column has a value getter and is not sortable.',
            width: 160,
        },
        {
            field: 'phone',
            headerName: 'Telefone',
            description: 'This column has a value getter and is not sortable.',
            width: 160,
        },
        {
            field: 'password',
            headerName: 'Senha',
            description: 'This column has a value getter and is not sortable.',
            width: 160,
        },
        {
            field: 'createdAt',
            headerName: 'Criado em',
            valueGetter: (params) =>
                new Date(params).toLocaleDateString("pt-BR"),
            width: 160,
        },
        {
            field: 'updatedAt',
            headerName: 'Atualizado em',
            valueGetter: (params) =>
                new Date(params).toLocaleDateString("pt-BR"),
            width: 160,
        }
        ];
    
    useEffect(() => {
        const fetchClients = async () => {
            const response = await getUsers();
            setUsers(response.data);
        }
        fetchClients();
    }, []);
    
    return (
    <>
        <header>
            <div onClick={() => router.push("../home")} style={{cursor: "pointer"}} className="logo">UrbanMove</div>
        </header>
        <main>
            <section className="hero-section">
                <h1 className="hero-title">Área do Administrador</h1>
                <p  className="hero-subtitle">Gerenciando Clientes.</p>
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
                            rows={users}
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
            open={openEditModal}
            onClose={() => setOpenEditModal(false)}
        >
            <div className="modal-overlay">
                {selectedRow && (
                    <div className="modal-container">

                        <IconButton
                            aria-label="close"
                            onClick={() => setOpenEditModal(false)}
                            className="modal-close-btn"
                        >
                            <CloseIcon />
                        </IconButton>

                        <h2>Editando Usuário: {selectedRow.name} {selectedRow.lastname}</h2>
                        
                        <h3>Informações da conta</h3>

                        <div className="form-edit-user-admin">
                            <label>Nome</label>
                            <input name="name" value={userEdit?.name || ""} onChange={handleChange}></input> 

                            <label>Sobrenome</label>
                            <input name="lastname" value={userEdit?.lastname || ""} onChange={handleChange}></input> 

                            <label>CPF</label>
                            <input name="cpf" value={userEdit?.cpf || ""} onChange={handleChange}></input> 

                            <label>Email</label>
                            <input name="email" value={userEdit?.email || ""} onChange={handleChange}></input> 

                            <label>Telefone</label>
                            <input name="phone" value={userEdit?.phone || ""} onChange={handleChange}></input> 

                            <label>Senha</label>
                            <input type="password" name="password" value={userEdit?.password || ""} onChange={handleChange}></input> 

                            <button onClick={() => userEdit && handleSave(userEdit)}>
                                Salvar alterações
                            </button>
                        </div>

                    </div>
                )}
            </div>
        </Modal>
    </>
);
}