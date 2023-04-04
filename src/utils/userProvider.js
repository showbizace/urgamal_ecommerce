import { UserContext } from "./userContext";

export const UserProvider = ({ props, children }) => {
	return <UserContext.Provider value={{ props }}>{children}</UserContext.Provider>;
};
