import "@/components/headerPageAdmin/style.css";
import { useRouter } from 'next/navigation';


export function HeaderPageAdmin() {
    const router = useRouter();
    return(
            <header>
                <div className="logo">UrbanMove</div>
                <nav className="nav-menu">
                    <ul>
                        <li><button onClick={() => router.push("/home")}>Home</button></li>
                        <li><button onClick={() => router.push("/home")}>Visualizar carros</button></li>
                    </ul>
                </nav>
            </header>
    )
}