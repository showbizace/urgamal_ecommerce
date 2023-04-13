import { useEffect, useState } from "react";
import { UserConfigContext } from "./userConfigContext";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";

const userToken = getCookie("token");
const userConfigs = getCookie("preference_config");

export const UserConfigProvider = ({ children }) => {
  const router = useRouter();
  //state
  const [auth, setAuth] = useState(false);
  const [configId, setConfigId] = useState(null);

  // auth
  const login = () => setAuth(true);
  const logout = () => setAuth(false);

  const preference_cookie = (val) => {
    setCookie("preference_config", val);
    setConfigId(val);
  };

  //useEffect
  useEffect(() => {
    if (!userConfigs) {
      if (router.pathname === "/home") {
        setConfigId(null);
        return;
      }
      setConfigId(1);
      setCookie("preference_config", 1);
    } else {
      setConfigId(userConfigs);
    }
    if (userToken) {
      setAuth(true);
    }
  }, []);

  return (
    <UserConfigContext.Provider
      value={{
        preferenceConfig: userConfigs ? userConfigs : null,
        auth,
        login,
        logout,
        configId,
        preference_cookie,
      }}
    >
      {children}
    </UserConfigContext.Provider>
  );
};
