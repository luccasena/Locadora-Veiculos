"use client";
import { useEffect, useState, useRef } from "react";
import { FooterPage } from "@/components/FooterPage";
import { HeaderPageClients } from "@/components/headerPageClient";
import "./style.css";
import type { Contract } from "@/types/Contract";
import { getContractsUser } from "../../services/ContractService";
import { getCarById } from "../../services/CarService";
import { getUserById } from "../../services/userService";
import { ContractAdminView } from "../../types/Contract";


export default function ContractsPage() {
    const [contracts, setContracts] = useState<ContractAdminView[]>([]);
    const [loading, setLoading] = useState(true);
    const isMountedRef  = useRef(true);

     useEffect(() => {           
     
         async function fetchContracts() {
             try {
                 const response: Contract[] = await getContractsUser();
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
             setLoading(false);
         }
         fetchContracts();
        }, []);
    return (
      <>
        <HeaderPageClients />

        <h1 className="h1contratos">Contratos de Carros</h1>

        {loading && <p className="loading-contratos">Carregando...</p>}

        {!loading && contracts.length === 0 && (
          <p className="no-contratos">Nenhum contrato encontrado.</p>
        )}

        {!loading && contracts.length > 0 && (
          <ul className="ul-contratos">
            {contracts.map((contract) => (
              <li className="li-contratos" key={contract.id}  style={{ marginBottom: 12 ,fontSize: "1.6rem" }} >
                <h2>Carro:</h2> {contract.Car}
                <h2>Cliente:</h2> {contract.Client}
                <h2>Início:</h2>{" "}
                {new Date(contract.StartDate).toLocaleDateString()} 
                <h2>Fim:</h2>{" "}
                {new Date(contract.EndDate).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}

        <FooterPage />
      </>
    );
}
