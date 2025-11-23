import "./style.css";
import React, { useState } from "react";

export function LoginCliente() {
  return (
    <div className="form-card">
      <div className="form-card-2">
        <form className="form">
          <h2 className="title-login">Login</h2>

          <div className="field">
            <span className="input-icon icon icon-locked"></span>
            <input type="email" className="input-field" placeholder="email" />
          </div>

          <div className="field">
            <span className="input-icon icon icon-locked"></span>
            <input
              type="password"
              className="input-field"
              placeholder="Senha"
            />
          </div>

          <div className="box-btn">
            <a href="#" className="btn-login">
              Entrar
            </a>
            <a href="#" className="btn-login">
              Cadastrar
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
