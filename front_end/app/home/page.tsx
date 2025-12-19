"use client";
import { useRouter } from 'next/navigation';
import {  useEffect, useState } from "react";
import styles from "./style.module.css";

import { FooterPage } from '@/components/FooterPage';
import { HeaderPageClients } from "@/components/headerPageClient";
import { HeaderPageAdmin } from "@/components/headerPageAdmin";
import { AdminCard } from '@/components/adminCard';
import { FileText, Car, Users } from 'lucide-react';

import { updateUser } from "@/services/userService";
import { UserUpdate } from "@/types/user/UserUpdate";

export default function HomePage() {

    const [user, setUser] =  useState({
        id: 1,
        name: "Usuario",
        lastname: "Teste", 
        cpf: "123.456.789-00",
        email: "user@gmail.com",
        phone: "83 99999-9999",
        password: "user123"
    });
    const [userType, setUserType] = useState<string | null>(null);
    const [savedName, setSavedName] = useState("Usuario Teste");

    const router = useRouter();

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

            // const storedUser = localStorage.getItem("user");
            const type = localStorage.getItem("userType");

            setUserType(type);
            /*
            if (storedUser) {
                setUser(JSON.parse(storedUser));
                setSavedName(JSON.parse(storedUser).name); 
            }
            */
        };
        fetchUserData();
    }, []);

    return(
        <div className={styles["home-scope"]}>
        
            {userType === "administrador" && (
            <>
                <HeaderPageAdmin />
                <main>
                    <section className={styles["hero-section"]}>
                        <h1 className={styles["hero-title"]}>Área do Administrador</h1>
                        <p  className={styles["hero-subtitle"]}>Gerencie usuários, veículos e contratos aqui.</p>
                    </section>
                    <section>
                        <div className={styles["features-section"]}>
                            <div style={{
                                        display: "flex", 
                                        justifyContent: "space-around",
                                        gap: "2rem",
                                        marginTop: "4rem",
                                    }}>
                                
                                <AdminCard 
                                title="Contratos" 
                                icon={<FileText className={styles["text-white"]} size={48} />}
                                onClick={() => router.push('Admin/manage-contracts')}
                                />

                                <AdminCard 
                                title="Carros" 
                                icon={<Car className={styles["text-white"]} size={48} />}
                                onClick={() => router.push('Admin/manage-cars')}
                                />

                                <AdminCard 
                                title="Clientes" 
                                icon={<Users className={styles["text-white"]} size={48} />}
                                onClick={() => router.push('Admin/manage-clients')}
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
                    <section className={styles["hero-section"]}>
                        <h1 className={styles["hero-title"]}>Bem-vindo à UrbanMove, {savedName}! </h1>
                        <p className={styles["hero-subtitle"]}>Sua locadora de veículos confiável e acessível.</p>
                    </section>
                    <section className={styles["features-section"]}>
                        <div className={styles["feature-card"]}></div>
                            <section className={styles["features-section"]}>
                                <h2>Informações da conta</h2>
                                <div className={styles["user-form"]}>
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
