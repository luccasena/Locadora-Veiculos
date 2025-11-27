"use client";
import { useRouter } from "next/navigation";
import "../../home/style.css"

export default function ManageCarsPage() {
    const router = useRouter();

    return (
            <>
                <header>
                    <div onClick={() => router.push("../home")} className="logo">UrbanMove</div>
                </header>
                <main>
                    <section className="hero-section">
                        <h1 className="hero-title">Área do Administrador</h1>
                        <p  className="hero-subtitle">Gerenciando Carros.</p>
                    </section>
                    <section>
                        <div className="features-section">
                            <div className="grid-admin">

                            </div>
                        </div>
                    </section>
                </main>
            </>
    );
}