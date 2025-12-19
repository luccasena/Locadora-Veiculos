import style from './style.module.css';
import { useRouter } from 'next/navigation';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';

export function HeaderPageAdmin() {
    const router = useRouter();
    return(
            <header className={style["home-admin"]}>
                <div className={style["logo"]}>UrbanMove</div>
                <nav className={style["nav-menu"]}>
                    <ul>
                        <li>
                            <Link href="/Home" style={{cursor: "pointer"}}>Home</Link>
                        </li>
                        <li>
                            <Link href="/Cars" style={{cursor: "pointer"}}>Visualizar carros</Link>
                        </li>         
                    </ul>
                </nav>
                 <Link href="/" className={style["logout"]}> <LogoutIcon sx={{ color: "white" }}/> </Link>
            </header>
            
    )
}
