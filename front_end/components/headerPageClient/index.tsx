"use client";
import { useRouter } from 'next/navigation';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';
import styles from '@/components/headerPageClient/style.module.css';

export function HeaderPageClients() {
    const router = useRouter();
    return(
        <header className={styles["home-user"]}>
            <div className={styles["logo"]}>UrbanMove</div>
            <nav className={styles["nav-menu"]}>
                <ul>
                    <li style={{cursor: "pointer"}}><a onClick={() => router.push("/Home")}>Home</a></li>
                    <li style={{cursor: "pointer"}}><a onClick={() => router.push("/Contratos")}>Contratos</a></li>
                    <li style={{cursor: "pointer"}}><a onClick={() => router.push("/Cars")}>Visualizar carros</a></li>
                </ul>
            </nav>
            <Link href="/" className={styles["logout"]}> <LogoutIcon sx={{ color: "white" }}/> </Link>
        </header>
    )
}
