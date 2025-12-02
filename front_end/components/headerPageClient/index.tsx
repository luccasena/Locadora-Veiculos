import "@/components/headerPageClient/style.css";
import { useRouter } from 'next/navigation';

export function HeaderPageClients() {
    const router = useRouter();
    return(
                <header>
                    <div className="logo">UrbanMove</div>
                    <nav className="nav-menu">
                        <ul>
                            <li style={{cursor: "pointer"}}><a onClick={() => router.push("/home")}>Home</a></li>
                            <li style={{cursor: "pointer"}}><a onClick={() => router.push("/contratos")}>Contratos</a></li>
                            <li style={{cursor: "pointer"}}><a onClick={() => router.push("/home")}>Visualizar carros</a></li>
                        </ul>
                    </nav>
                </header>
    )
}