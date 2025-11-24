import { Airequest } from "../types/AIrequest";
import { ENV } from "@/config/env";
import axios from "axios";

const API_URL = ENV.API_URL_AI;

export const aiResponse = async (prompt: Airequest) => {

    console.log("Sending AI Request:", prompt);

    const response = await axios.post(API_URL, prompt);

    return response;
}