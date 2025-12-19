"use client";
import { useRouter } from "next/navigation";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from "@mui/material";
import Modal from '@mui/material/Modal';
import { useEffect, useState, useRef } from "react";
import { Edit, Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import styles from"@/app/Home/style.module.css"

import { User } from "@/types/user/User";
import { registerSchema } from "@/schemas/validations";
import { RegisterUserData } from "@/types/user/RegisterUser";
import { UserUpdate } from "@/types/user/UserUpdate";
import { getUsers } from "@/services/userService";
import { registerUser }  from '@/services/userService';
import { updateUser } from '@/services/userService';
import { deleteUser } from '@/services/userService';
import { HeaderPageAdmin } from "@/components/headerPageAdmin";
import { FooterPage } from '@/components/FooterPage';

export default function ManageClientsPage() {
    
    const isMountedRef  = useRef(true);
    const [users, setUsers]             = useState<User[]>([]);
    const [userEdit, setUserEdit]       = useState<User>();
    const [userCreate, setUserCreate]   = useState<User>({} as User); // initialize create state
    const [selectedRow, setSelectedRow] = useState<User | null>(null);
    const [openModal, setOpenModal]     = useState(false);
    const [modalType,   setModalType]   = useState("");
    const [errors, setErrors]           = useState<Record<string, string[]>>({});

    const refetchUsers = async () => {
        try {
            const res = await getUsers();
            if (isMountedRef.current) setUsers(res.data);
        } catch (e) {
            console.error(e);
        }
    };

    const handleCreate = () => {
      // limpa erros e estado antes de abrir
        setModalType("create");
        setErrors({});
        setUserCreate({
            name: "",
            cpf: "",
            password: "",
            phone: "",
            lastname:  "", 
            email: "",
        } as User);
        setOpenModal(true);
    };

    const handleEdit = (user: User) => {
        setErrors({});
        setSelectedRow(user);
        setUserEdit({ ...user });
        setModalType("edit");
        setOpenModal(true);
    };

    const handleDelete = async (userId: number) => {
        
    if (selectedRow) {
        const confirmDelete = window.confirm(`Tem certeza que deseja deletar o usuário ${selectedRow.name} ${selectedRow.lastname}?`);
        if (confirmDelete) {
            console.log("Deleting user with ID:", userId);
            await deleteUser(userId);
            // guard against updating state after unmount
            if (!isMountedRef.current) return;
            alert("Usuário deletado com sucesso!");
            setOpenModal(false);
        }
    }
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (modalType === "edit") {
        setUserEdit((prevUser) => {
            if (!prevUser) return prevUser;
            return {
            ...prevUser,
            [name]: value,
            };
        });
        }

        if (modalType === "create") {
        setUserCreate((prevUser) => {
            const base = prevUser ?? ({} as User);
            return {
            ...base,
            [name]: value,
            };
            });
    }}  

    const handleSaveUpdate = async (user: User) => {
        const result = registerSchema.safeParse({
            name: user.name,
            lastname: user.lastname,
            cpf: user.cpf,
            email: user.email,
            phone: user.phone,
            password: user.password,
        });

        if (!result.success) {
            setErrors(result.error.flatten().fieldErrors);
            return;
        }

        setErrors({});
        const userUpdate: UserUpdate = {
            name: user.name,
            cpf: user.cpf,
            password: user.password,
            phone: user.phone,
            lastname: user.lastname,
            email: user.email,
        };

        if (user.id != null) {
            await updateUser(userUpdate, user.id);
            if (!isMountedRef.current) return;
            alert("Dados atualizados!");
            await refetchUsers();
        }
        setOpenModal(false);
    };

    const handleSaveCreate = async (user: User) => {


        const validation = registerSchema.safeParse({
            name: user.name,
            lastname: user.lastname,
            cpf: user.cpf,
            email: user.email,
            phone: user.phone,
            password: user.password,
        });

        if (!validation.success) {
            setErrors(validation.error.flatten().fieldErrors);
            return;
        }

        setErrors({});
        const userCreatePayload: RegisterUserData = {
            name: user.name,
            cpf: user.cpf,
            password: user.password,
            phone: user.phone,
            lastname: user.lastname,
            email: user.email,
        };

        await registerUser(userCreatePayload);
        if (!isMountedRef.current) return;
        alert("Usuário criado com sucesso!");
        setOpenModal(false);
        await refetchUsers(); 
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
        { field: 'cpf', headerName: 'CPF', width: 150},
        { field: 'email', headerName: 'E-mail', width: 150},
        { field: 'name', headerName: 'Nome', type: 'string', width: 110},
        { field: 'lastname', headerName: 'Sobrenome', description: 'This column has a value getter and is not sortable.', width: 160},
        { field: 'phone', headerName: 'Telefone', description: 'This column has a value getter and is not sortable.', width: 160},  
        { field: 'password', headerName: 'Senha', description: 'This column has a value getter and is not sortable.', width: 160},
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
        refetchUsers();
        return () => { isMountedRef.current = false; };
    }, []);

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    useEffect(() => {
        getUsers()
            .then((res) => {
            if (isMountedRef.current) {
                setUsers(res.data);
            }
            })
            .catch(console.error);
    }, []);
        
    return (
    <div className={styles["home-scope"]}>
        <HeaderPageAdmin />
        <main>
            <section className={styles["hero-section"]}>
                <h1 className={styles["hero-title"]}>Área do Administrador</h1>
                <p  className={styles["hero-subtitle"]}>Gerenciando Clientes.</p>
            </section>
            <section className={styles["features-section"]} style={{
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
            open={openModal}
            onClose={() => setOpenModal(false)}
        >
            <div className={styles["modal-overlay"]}>
                {modalType === "edit" && selectedRow && (
                    <div className={styles["modal-container"]}>

                        <IconButton
                            aria-label="close"
                            onClick={() => setOpenModal(false)}
                            className="modal-close-btn"
                        >
                            <CloseIcon />
                        </IconButton>

                        <h2>Editando Usuário: {selectedRow.name} {selectedRow.lastname}</h2>
                        
                        <h3>Informações da conta</h3>

                        <div className={styles["form-edit-user-admin"]}>
                            <label>Nome</label>
                            <input name="name" value={userEdit?.name || ""} onChange={handleChange}></input> 
                            {errors.name && <p className={styles["error-text"]}>{errors.name.join(", ")}</p>}

                            <label>Sobrenome</label>
                            <input name="lastname" value={userEdit?.lastname || ""} onChange={handleChange}></input>
                            {errors.lastname && <p className={styles["error-text"]}>{errors.lastname.join(", ")}</p>}
                            <label>CPF</label>
                            <input name="cpf" value={userEdit?.cpf || ""} onChange={handleChange}></input> 
                            {errors.cpf && <p className={styles["error-text"]}>{errors.cpf.join(", ")}</p>}

                            <label>Email</label>
                            <input name="email" value={userEdit?.email || ""} onChange={handleChange}></input> 
                            {errors.email && <p className={styles["error-text"]}>{errors.email.join(", ")}</p>}
                            <label>Telefone</label>
                            <input name="phone" value={userEdit?.phone || ""} onChange={handleChange}></input> 
                            {errors.phone && <p className={styles["error-text"]}>{errors.phone.join(", ")}</p>}

                            <label>Senha</label>
                            <input type="password" name="password" value={userEdit?.password || ""} onChange={handleChange}></input> 
                            {errors.password && <p className={styles["error-text"]}>{errors.password.join(", ")}</p>}
                            <button onClick={() => userEdit && handleSaveUpdate(userEdit)}>
                                Salvar alterações
                            </button>
                        </div>

                    </div>
                )}
                {modalType === "create" && (
                    <div className={styles["modal-container"]}>
                        <IconButton
                            aria-label="close"
                            onClick={() => setOpenModal(false)}
                            className={styles["modal-close-btn"]}
                        >
                            <CloseIcon />
                        </IconButton>

                        <h2>Criando Usuário</h2>

                        <div className={styles["form-edit-user-admin"]}>
                          <label>Nome</label>
                          <input name="name" value={userCreate?.name || ""} onChange={handleChange} />
                          {errors.name && <p className={styles["error-text"]}>{errors.name.join(", ")}</p>}

                          <label>Sobrenome</label>
                          <input name="lastname" value={userCreate?.lastname || ""} onChange={handleChange} />
                          {errors.lastname && <p className={styles["error-text"]}>{errors.lastname.join(", ")}</p>}
                          <label>CPF</label>
                          <input name="cpf" value={userCreate?.cpf || ""} onChange={handleChange} />
                          {errors.cpf && <p className={styles["error-text"]}>{errors.cpf.join(", ")}</p>}

                          <label>Email</label>
                          <input name="email" value={userCreate?.email || ""} onChange={handleChange} />
                          {errors.email && <p className={styles["error-text"]}>{errors.email.join(", ")}</p>}
                          <label>Telefone</label>
                          <input name="phone" value={userCreate?.phone || ""} onChange={handleChange} />
                          {errors.phone && <p className={styles["error-text"]}>{errors.phone.join(", ")}</p>}

                          <label>Senha</label>
                          <input type="password" name="password" value={userCreate?.password || ""} onChange={handleChange} />
                          {errors.password && <p className={styles["error-text"]}>{errors.password.join(", ")}</p>}

                          <button onClick={() => userCreate && handleSaveCreate(userCreate)}>
                            Salvar alterações
                          </button>
                        </div>
                    </div>
                )};
            </div>
        </Modal>
        <FooterPage />
    </div>
);
}