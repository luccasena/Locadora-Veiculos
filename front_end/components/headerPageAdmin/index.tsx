import "@/components/headerPageAdmin/style.css";
import { useRouter } from 'next/navigation';


export function HeaderPageAdmin() {
    const router = useRouter();
    return(
            <header>
                <div className="logo">UrbanMove</div>
                <nav className="nav-menu">
                    <ul>
                        <li style={{cursor: "pointer"}}><a onClick={() => router.push("/Home")}>Home</a></li>
                        <li style={{cursor: "pointer"}}><a onClick={() => router.push("/Cars")}>Visualizar carros</a></li>
                    </ul>
                </nav>
            </header>
    )
}