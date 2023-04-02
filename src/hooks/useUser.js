import { getCookie } from "cookies-next";

export const useUserToken = () => getCookie("token");
