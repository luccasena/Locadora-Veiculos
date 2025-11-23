import { airequest } from "@/types/Airequest";
import { ENV } from "@/config/env";
import axios from "axios";

const API_URL = ENV.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const aiResponse = async (prompt: airequest) : Promise<airequest> => {

    const response = await axios.post<airequest>(`${API_URL}/ai-route/`, prompt);

    return response.data;
}