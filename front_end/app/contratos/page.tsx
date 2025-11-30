"use client";

import { useEffect, useState } from "react";
import { FooterPage } from "@/components/FooterPage";
import { HeaderPageClients } from "@/components/headerPageClient";
import "./style.css";
import type { Contract } from "@/types/Contract";
import { getContracts } from "../../services/ContractService";

export default function ContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContracts() {
      try {
        const data = await getContracts(); 
        setContracts(data); 
      } catch (error) {
        console.error("Erro ao buscar contratos:", error);
      } finally {
        setLoading(false);
      }
    }

    loadContracts();
  }, []);

  return (
    <>
      <HeaderPageClients />

      <h1>Contratos de Carros</h1>

      {loading && <p>Carregando...</p>}

      {!loading && contracts.length === 0 && (
        <p className="sla">Nenhum contrato encontrado.</p>
      )}

      {!loading && contracts.length > 0 && (
        <ul>
          {contracts.map((contract) => (
            <li key={contract.id} style={{ marginBottom: 12 }}>
              <strong>ID:</strong> {contract.id} <br />
              <strong>Cliente:</strong> {contract.idClient} <br />
              <strong>Carro:</strong> {contract.idCar} <br />
              <strong>Início:</strong>{" "}
              {new Date(contract.StartDate).toLocaleDateString()} <br />
              <strong>Fim:</strong>{" "}
              {new Date(contract.EndDate).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}

      <FooterPage />
    </>
  );
}
