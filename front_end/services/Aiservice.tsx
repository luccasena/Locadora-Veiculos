import { Airequest } from "../types/AIrequest";
import { ENV } from "@/config/env";
import axios from "axios";

const API_URL = ENV.NEXT_PUBLIC_API_URL_AI;

// Para o serviço de AI, mantemos o axios normal pois usa uma URL diferente
export const aiResponse = async (prompt: Airequest) => {
    const response = await axios.post(API_URL, prompt, {
        withCredentials: true
    });

    return response;
}