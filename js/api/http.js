import { BASE_URL } from "./config.js";


export class ApiError extends Error {
    constructor(message, status, data) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.data = data;
    }
}

function buildMessage(data, status) {
    if (data?.errores) {
        return Object.entries(data.errores)
            .map(([campo, msg]) => `${campo}: ${msg}`)
            .join("\n");
    }
    return data?.message || `Error ${status}`;
}


export async function request(path, { method = "GET", body, headers = {}, signal } = {}) {
    const esFormData = body instanceof FormData;
    const token = localStorage.getItem("token");

    const config = {
        method,
        headers: {
            "Accept": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` }),
            ...(body !== undefined && !esFormData && { "Content-Type": "application/json" }),
            ...headers,
        },
        signal,
    };

    if (body !== undefined) {
        config.body = esFormData ? body : JSON.stringify(body);
    }
    console.log("body enviado", body)
    console.log("serializado", config.body)

    let response;
    try {
        response = await fetch(`${BASE_URL}${path}`, config);
    } catch (networkError) {
        throw new ApiError("No se pudo conectar con el servidor", 0, null);
    }

    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
        ? await response.json()
        : await response.text();

        console.log(`${response.status} ${method} ${path}`, data);

  if (!response.ok) {
    console.error(`[${method} ${path}] ${response.status}`, data);
    const message = buildMessage(data, response.status);
    throw new ApiError(message, response.status, data);
}

    return data;
}

export const get = (path, options) => request(path, { ...options, method: "GET" });
export const post = (path, body, options) => request(path, { ...options, method: "POST", body });
export const put = (path, body, options) => request(path, { ...options, method: "PUT", body });
export const patch = (path, body, options) => request(path, { ...options, method: "PATCH", body });
export const del = (path, options) => request(path, { ...options, method: "DELETE" });