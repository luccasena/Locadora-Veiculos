import "@/components/headerPage/style.css";



export function HeaderPage() {
    return(
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
    )
}