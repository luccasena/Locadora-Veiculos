import axios from "axios";
import type {LoginAutomatico} from "../types/user/LoginAutomatico";
import type {NomeUsuario} from "../types/user/NomeUsuario";
import { ENV } from "@/config/env";

const API_URL = ENV.API_URL_DATABASE;

export const realizarLogin = async (loginautomatico: LoginAutomatico) : Promise<NomeUsuario> => {

    const response = await axios.post<NomeUsuario>(`${API_URL}/automatico/login`, loginautomatico);

    return response.data;
}