import { post } from "./http.js";

const BASE_URL = "/appointments";

export async function agendarCita(data) {
 const response = await post(BASE_URL, data); 
return response;
  
}