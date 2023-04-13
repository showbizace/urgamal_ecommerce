import { useEffect, useState } from "react";
import { UserConfigContext } from "./userConfigContext";
import { getCookie } from "cookies-next";

const userToken = getCookie("token");
const userConfigs = getCookie("preference_config");
export const UserConfigProvider = ({ children }) => {
	const [auth, setAuth] = useState(false);
	const login = () => setAuth(true);
	const logout = () => setAuth(false);
	useEffect(() => {
		if (userToken) {
			setAuth(true);
		}
	}, []);
	return (
		<UserConfigContext.Provider
			value={{ preferenceConfig: userConfigs ? userConfigs : null, auth, login, logout }}>
			{children}
		</UserConfigContext.Provider>
	);
};
