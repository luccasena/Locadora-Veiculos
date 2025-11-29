"use client";
import { FormEventHandler, use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '../page';
import "./style.css";

import { updateUser } from '@/services/userService';
import { UserUpdate } from '@/types/user/UserUpdate';



export default function HomePage() {
    const router = useRouter();

    const [user, setUser] =  useState({
        id: null,
        name: "",
        lastname: "", 
        cpf: "",
        email: "",
        phone: "",
        password: ""
    });
    const [userType, setUserType] = useState<string | null>(null);
    const [savedName, setSavedName] = useState("");
    const [manageType, setManageType] = useState("");

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        localStorage.setItem("user", JSON.stringify(user));
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

    useEffect(() => {
        const fetchUserData = async () => {
            const storedUser = localStorage.getItem("user");
            const type = localStorage.getItem("userType");

            setUserType(type);
            if (storedUser) {
                setUser(JSON.parse(storedUser));
                setSavedName(JSON.parse(storedUser).name); 
            }
        };


        fetchUserData();
    }, []);

    return(
        <>
        
            {userType === "administrador" && (
            <>
                <header>
                    <div className="logo">UrbanMove</div>
                </header>
                <main>
                    <section className="hero-section">
                        <h1 className="hero-title">Área do Administrador</h1>
                        <p  className="hero-subtitle">Gerencie usuários, veículos e contratos aqui.</p>
                    </section>
                    <section>
                        <div className="features-section">
                            <div className="grid-admin">
                                    <div className="feature-card-admin">
                                        <h3>Contratos</h3>
                                        <button type="button" style={{cursor: "pointer"}} onClick={() => router.push("/admin/manage-contracts")}>Gerenciar</button>
                                    </div>
                                    <div className="feature-card-admin">
                                        <h3>Carros</h3>
                                        <button type="button" style={{cursor: "pointer"}} onClick={() => router.push("/admin/manage-cars")}>Gerenciar</button>
                                    </div>
                                </div>
                                <div className="grid-admin">
                                    <div className="feature-card-admin">
                                        <h3>Clientes</h3>
                                        <button type="button" style={{cursor: "pointer"}} onClick={() => router.push("/admin/manage-clients")}>Gerenciar</button>
                                    </div>
                                    <div className="feature-card-admin">
                                        <h3>Assistente 24hrs</h3>
                                        <button type="button" style={{cursor: "pointer"}} onClick={() => router.push("/admin/ai-agent")}>Gerenciar</button>
                                    </div>     
                            </div>
                        </div>
                    </section>
                </main>
            </>
            )}

            {userType === "cliente" && (
                <>
                <header>
                    <div className="logo">UrbanMove</div>
                    <nav className="nav-menu">
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Carros ativos</a></li>
                            <li><a href="#">Visualizar carros</a></li>
                        </ul>
                    </nav>
                </header>

                <main>
                    <section className="hero-section">
                        <h1 className="hero-title">Bem-vindo à UrbanMove, {savedName}! </h1>
                        <p className="hero-subtitle">Sua locadora de veículos confiável e acessível.</p>
                    </section>
                    <section className="features-section">
                        <div className="feature-card"></div>
                            <section className="features-section">
                                <h2>Informações da conta</h2>
                                <div className="user-form">
                                    <label>Nome</label>
                                        <input name="name" value={user.name} onChange={handleChange} />
                                    <label>Sobrenome</label>
                                        <input name="lastname" value={user.lastname} onChange={handleChange} />
                                    <label>CPF</label>
                                        <input name="cpf" value={user.cpf} onChange={handleChange} />
                                    <label>Email</label>
                                        <input name="email" value={user.email} onChange={handleChange} />
                                    <label>Telefone</label>
                                        <input name="phone" value={user.phone} onChange={handleChange} />
                                    <label>Senha</label>
                                        <input type="password" name="password" value={user.password} onChange={handleChange} />
                                    <button onClick={handleSave}>Salvar alterações</button>
                                </div>
                            </section>
                    </section>
                </main>
                </>

            )}

        </>
    )
}