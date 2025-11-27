"use client";
import { FooterPage } from "@/components/FooterPage";
import { HeaderPage } from "@/components/headerPage";
import "@styles/contracts.css";
import { useEffect, useState } from "react";
import { Contract } from "@/types/Contract";
import { Contracts } from "../../services/ContractService";

export default function ContractsPage() {

    const [contracts, setContracts] = useState<Contract[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadContracts = async () => {
            try {
                const data = await Contracts();
                setContracts(data);
            } catch (err) {
                setError("Erro ao carregar contratos.");
            } finally {
                setLoading(false);
            }
        };

        loadContracts();
    }, []);

    if (loading) return <p>Carregando contratos...</p>;
    if (error) return <p>{error}</p>;
    return (
        <>
        <HeaderPage />

        
            <h1>Contratos de Carros</h1>

            {contracts.length === 0 && <p>Nenhum contrato encontrado.</p>}

            <ul>
                {contracts.map(contract => (
                    <li key={contract.id} style={{ marginBottom: 12 }}>
                        <strong>ID:</strong> {contract.id} <br />
                        <strong>Cliente:</strong> {contract.idClient} <br />
                        <strong>Carro:</strong> {contract.idCar} <br />
                        <strong>Início:</strong> {new Date(contract.StartDate).toLocaleDateString()} <br />
                        <strong>Fim:</strong> {new Date(contract.EndDate).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        <FooterPage />
        </>
    )
        }