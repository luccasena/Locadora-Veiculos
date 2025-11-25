"use client";
import { use, useEffect, useState } from 'react';
import '../page';
import "./style.css";

import { updateUser } from '@/services/usuarioService';
import { UserUpdate } from '@/types/user/UserUpdate';

export default function HomePage() {

    const [user, setUser] =  useState({
        id: null,
        name: "",
        lastname: "", 
        cpf: "",
        email: "",
        phone: "",
        password: ""
    });

    // Atualiza valores conforme digitação
    const handleChange = async (e: any) => {
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
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);


    return(
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

            {localStorage.getItem("userType") === "administrador" && (
            <section className="hero-section">
                <h2>Área do Administrador</h2>
                <p>Gerencie usuários, veículos e contratos aqui.</p>
            </section>
            )}

            {localStorage.getItem("userType") === "cliente" && (
                <>
                    <section className="hero-section">
                        <h1 className="hero-title">Bem-vindo à UrbanMove, {user.name}! </h1>
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
                </>

            )}

            <section className="contratos-section">
                
            </section>

        </main>
        </>
    )
}