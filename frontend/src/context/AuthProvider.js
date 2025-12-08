import { AuthContext } from "@/context/AuthContext";

export const AuthProvider = ({ children}) => {

    return <AuthContext.Provider value={}>{children}</AuthContext.Provider>
}