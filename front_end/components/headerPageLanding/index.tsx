"use client";
import { Moon, Sun, LogIn, Menu, X} from 'lucide-react';

import { useRouter } from 'next/navigation';
import styles from "./style.module.css";

interface HeaderPageLandingProps {
    theme: string;
    toggleTheme: () => void;
    isMenuOpen: boolean;
    setIsMenuOpen: (open: boolean) => void;
}

export const HeaderPageLanding = ({theme, toggleTheme, isMenuOpen, setIsMenuOpen}: HeaderPageLandingProps) =>{
    const router = useRouter();
    return(
        <header className={styles[`home-scope ${theme}`]}>
            <div className={styles["logo"]}>UrbanMove</div>

            <nav className={styles["desktop-nav"]}>
                <ul>
                    <li><a>Início</a></li>
                    <li><a>Frota</a></li>
                    <li><a>Sobre</a></li>
                </ul>
            </nav>

            <div className={styles["actions"]}>
                <button onClick={toggleTheme} className={styles["icon-btn"]} aria-label="Alternar Tema">
                {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
                </button>
                
                <div className={styles["auth-buttons"]}>
                <button className={styles["btn-login"]} onClick={() => router.push("/Login")}>
                    <LogIn size={18} /> Login
                </button>
                <button className={styles["btn-login"]} onClick={() => router.push("/Register")}>
                    Cadastro
                </button>
                </div>

                <button className={styles["mobile-menu-btn"]} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {isMenuOpen && (
            <div className={styles["mobile-nav"]}>
                <ul>
                    <li><a href="#inicio" onClick={() => setIsMenuOpen(false)}>Início</a></li>
                    <li><a href="#frota" onClick={() => setIsMenuOpen(false)}>Frota</a></li>
                    <li><a href="#sobre" onClick={() => setIsMenuOpen(false)}>Sobre</a></li>
                    <li><hr/></li>
                    <li><a href="#login" onClick={() => setIsMenuOpen(false)}>Login</a></li>
                    <li><a href="#cadastro" onClick={() => setIsMenuOpen(false)}>Criar Conta</a></li>
                </ul>
                </div>
            )}
        </header>
    )
}