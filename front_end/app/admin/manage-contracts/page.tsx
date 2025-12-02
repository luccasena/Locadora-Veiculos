"use client";
import { useRouter } from "next/navigation";
import "../../home/style.css"
import { HeaderPageAdmin } from "@/components/headerPageAdmin";
import { FooterPage } from '@/components/FooterPage';

export default function ManageContractsPage() {
    const router = useRouter();

    return (
            <>
                <HeaderPageAdmin />
                <main>
                    <section className="hero-section">
                        <h1 className="hero-title">Área do Administrador</h1>
                        <p  className="hero-subtitle">Gerenciando Contratos.</p>
                    </section>
                    <section>
                        <div className="features-section">
                            <div className="grid-admin">

                            </div>
                        </div>
                    </section>
                </main>
                <FooterPage />
            </>
    );
}