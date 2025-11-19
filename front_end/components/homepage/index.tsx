import '../../app/page';
import "./style.css";




export function HomePage() {
    return(
        <>
        <header>
            <div className="logo">UrbanMove</div>
            <nav className="nav-menu">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Carros ativos</a></li>
                    <li><a href="#">Visualizar carros</a></li>
                </ul>
            </nav>
        </header>
        
        <main>
            <section className="hero-section">
                <h1 className="hero-title">Bem-vindo à UrbanMove,! </h1>
                <p className="hero-subtitle">Sua locadora de veículos confiável e acessível.</p>
            </section>

            <section className="features-section">
                <div className="feature-card"></div>
                    <h2>Informações</h2>

            </section>

            <section className="contratos-section">
                
            </section>


        </main>
        </>
    )
}