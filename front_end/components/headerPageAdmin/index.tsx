import  './style.css';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';

export function HeaderPageAdmin() {
    return(
            <header className="home-admin">
                <div className="logo">UrbanMove</div>
                <nav className="nav-menu">
                    <ul>
                        <li>
                            <Link href="/Home" style={{cursor: "pointer"}}>Home</Link>
                        </li>
                        <li>
                            <Link href="/Cars" style={{cursor: "pointer"}}>Visualizar carros</Link>
                        </li>         
                    </ul>
                </nav>
                 <Link href="/" className="logout"> <LogoutIcon sx={{ color: "white" }}/> </Link>
            </header>
            
    )
}
