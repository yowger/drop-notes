export const API_BASE_URL = import.meta.env.DEV
    ? import.meta.env.VITE_API_DEV_SERVER
    : import.meta.env.VITE_API_PROD_SERVER
