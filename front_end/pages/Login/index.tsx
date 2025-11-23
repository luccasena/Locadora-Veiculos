import '../../app/page';
import "./style.css";



export function Login() {
    return(
        <>
        <main>
            <div className="form-card"/>
                <h2>Login</h2>
                <form>
                    <div className="input-group">
                        <input type="text" className="input-field" placeholder="Nome" />
                    </div>
                    <div className="input-group">
                        <span className="input-icon icon icon-locked"></span>
                        <input type="password" className="input-field" placeholder="Senha"/>
                    </div>
                    <div className="box-btn">
                        <button className="btn-login">Entrar</button>
                        <a href="#" className="btn-login">Cadastrar</a>
                    </div>
                </form>
        </main>
        </>
    )
}