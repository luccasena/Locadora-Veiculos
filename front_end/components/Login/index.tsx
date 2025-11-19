import '../../app/page';
import "./style.css";



export function Login() {
    return(
        <div className="form-card">
      
        <div className="form-card-2">
            
            <form className="form">
            
                <h2 className="title-login">Login</h2>
                 
                <div className="field">
             
                    <span className="input-icon icon icon-user-1"></span>
                    <input type="text" className="input-field" placeholder="Nome" />
                
                </div>

                <div className="field">
                    
                    <span className="input-icon icon icon-locked"></span>
                    <input type="password" className="input-field" placeholder="Senha"/>
                
                </div>

                <div className="box-btn">
                    
                    <button className="btn-login">Entrar</button>
                    <a href="#" className="btn-login">Cadastrar</a>
                
                </div>
                                        
            </form>
            
        </div>

    </div>
    )
}