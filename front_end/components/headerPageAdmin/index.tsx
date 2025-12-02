import "@/components/headerPageAdmin/style.css";
import { useRouter } from 'next/navigation';


export function HeaderPageAdmin() {
    const router = useRouter();
    return(
            <header>
                <div className="logo">UrbanMove</div>
                <nav className="nav-menu">
                    <ul>
                        <li style={{cursor: "pointer"}}><a onClick={() => router.push("/home")}>Home</a></li>
                        <li style={{cursor: "pointer"}}><a onClick={() => router.push("/home")}>Visualizar carros</a></li>
                    </ul>
                </nav>
            </header>
    )
}