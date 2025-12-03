import "@/components/headerPageClient/style.css";
import { useRouter } from 'next/navigation';

export function HeaderPageClients() {
    const router = useRouter();
    return(
        <header>
            <div className="logo">UrbanMove</div>
            <nav className="nav-menu">
                <ul>
                    <li style={{cursor: "pointer"}}><a onClick={() => router.push("/Home")}>Home</a></li>
                    <li style={{cursor: "pointer"}}><a onClick={() => router.push("/Contratos")}>Contratos</a></li>
                    <li style={{cursor: "pointer"}}><a onClick={() => router.push("/Cars")}>Visualizar carros</a></li>
                </ul>
            </nav>
        </header>
    )
}