import axios from "axios";
import type {LoginAutomatico} from "../types/User/LoginAutomatico";
import type {NomeUsuario} from "../types/User/NomeUsuario";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';


export const realizarLogin = async (loginautomatico: LoginAutomatico) : Promise<NomeUsuario> => {

    const response = await axios.post<NomeUsuario>(`${API_URL}/automatico/login`, loginautomatico);


    return response.data;
}