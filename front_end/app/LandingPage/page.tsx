'use client';

import { useState } from 'react';

import { FooterPage } from '@/components/FooterPage';
import { HeaderPageLanding } from '@/components/headerPageLanding';
import ArrowRight from '@mui/icons-material/ArrowRight';
import styles from "./style.module.css";

export default function LandingPage() {
    const [theme, setTheme] = useState('light');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
        localStorage.setItem('theme', theme);
    };

    const brands = [
        { name: "BMW", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg" },
        { name: "Audi", logo: "https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg" },
        { name: "Honda", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg" },
        { name: "Toyota", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg" },
        { name: "Volkswagen", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Volkswagen_logo_2019.svg" },
        { name: "Nissan", logo: "https://upload.wikimedia.org/wikipedia/commons/archive/0/0f/20101117081357%21Nissan_logo.svg" },
        { name: "Ford", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Ford_Motor_Company_Logo.svg" },
        { name: "Hyundai", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Hyundai_Motor_Company_logo.svg" },
        { name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" },
        { name: "Kia", logo: "https://upload.wikimedia.org/wikipedia/commons/4/47/KIA_logo2.svg" },
        { name: "Volvo", logo: "https://upload.wikimedia.org/wikipedia/commons/5/54/Volvo_logo.svg" }
    ];;
    
    return (
        <div className={styles[`home-scope ${theme}`]}>
        <HeaderPageLanding
            theme={theme}
            toggleTheme={toggleTheme}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
        />
        
        <main>
            <section className={styles["hero-section"]} id="inicio">
                <div className={styles["hero-content"]}>
                    <h1 className={styles["hero-title"]}>
                    Alugue sem filas. <br />
                    <span className={styles["highlight"]}>Dirija sem burocracia.</span>
                    </h1>
                    <p className={styles["hero-subtitle"]}>
                    Esqueça a papelada. Na <span>UrbanMove</span>, você resolve tudo digitalmente e sai dirigindo em minutos.
                    </p>
                    <button className={styles["cta-button"]}>
                    Começar Agora <ArrowRight fontSize="large" />
                    </button>
                </div>
            </section>

            <div className={styles["carousel-container"]}>
                <p className={styles["section-label"]}>Marcas Premium Disponíveis</p>
                <div className={styles["carousel-track"]}>
                    {brands.map((brand, index) => (
                        <div className={styles["brand-logo"]} key={index}>
                            <img src={brand.logo} alt={brand.name} className={styles["brand-logo"]}/>
                        </div>
                    ))}
                </div>
            </div>
        </main>
        
        <FooterPage />
        </div>
    );
}