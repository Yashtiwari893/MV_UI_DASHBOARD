import { createContext, useContext, useState } from "react";

// 1. Naya "notice board" (Context) banana
export const AuthContext = createContext();

// 2. Ek aasan shortcut (custom hook) banana taaki hum baar baar useContext na likhein
export const useAuthContext = () => {
    return useContext(AuthContext);
}

// 3. Notice board ko manage karne wala main component (Provider)
export const AuthContextProvider = ({ children }) => {
    
    // Notice board par jo information (user ki details) store karni hai, uske liye state banayenge.
    // Hum initial value browser ki localStorage se lenge, taaki page refresh karne par user logout na ho jaye.
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("mv-digital-user")) || null);

    return (
        // Provider component notice board ki value (authUser, setAuthUser) ko apne sabhi children components ke liye available karata hai.
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
}