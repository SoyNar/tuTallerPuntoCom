import { post } from "./http.js";

const AUTH_ENDPOINT = "/auth";

export function registerUser(data) {
    return post(`${AUTH_ENDPOINT}/register`, data);
}

export function loginBackend(data) {
    return post(`${AUTH_ENDPOINT}/login`, data);
}