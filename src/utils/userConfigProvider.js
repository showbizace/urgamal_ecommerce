import { UserConfigContext } from "./userConfigContext";

export const UserConfigProvider = ({ preferenceConfig, children }) => {
  return (
    <UserConfigContext.Provider value={{ preferenceConfig }}>
      {children}
    </UserConfigContext.Provider>
  );
};
