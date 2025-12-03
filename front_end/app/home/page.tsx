"use client";
import { useRouter } from 'next/navigation';
import {  useEffect, useState } from "react";
import "./style.css";

import { FooterPage } from '@/components/FooterPage';
import { HeaderPageClients } from "@/components/headerPageClient";
import { HeaderPageAdmin } from "@/components/headerPageAdmin";
import { AdminCard } from '@/components/adminCard';
import { FileText, Car, Users } from 'lucide-react';

import { updateUser } from "@/services/userService";
import { UserUpdate } from "@/types/user/UserUpdate";

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
    const [userType, setUserType] = useState<string | null>(null);
    const [savedName, setSavedName] = useState("");

    const router = useRouter();
   
    // Atualiza valores conforme digitação
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
        <div className='home-scope'>
        
            {userType === "administrador" && (
            <>
                <HeaderPageAdmin />
                <main>
                    <section className="hero-section">
                        <h1 className="hero-title">Área do Administrador</h1>
                        <p  className="hero-subtitle">Gerencie usuários, veículos e contratos aqui.</p>
                    </section>
                    <section>
                        <div className="features-section">
                            <div className="grid-admin">
                                
                                <AdminCard 
                                title="Contratos" 
                                icon={<FileText className="text-white" size={48} />}
                                onClick={() => router.push('admin/manage-contracts')}
                                />

                                <AdminCard 
                                title="Carros" 
                                icon={<Car className="text-white" size={48} />}
                                onClick={() => router.push('admin/manage-cars')}
                                />

                                <AdminCard 
                                title="Clientes" 
                                icon={<Users className="text-white" size={48} />}
                                onClick={() => router.push('admin/manage-clients')}
                                />

                            </div>
                        </div>
                    </section>
                </main>
            </>
            )}

            {userType === "cliente" && (
                <>
                <HeaderPageClients />

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
            
            <FooterPage/>
        </div>
    )
}
