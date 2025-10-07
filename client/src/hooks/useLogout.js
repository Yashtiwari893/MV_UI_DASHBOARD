import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
    const { setAuthUser } = useAuthContext();

    const logout = () => {
        try {
            // Local storage se user ka data hata do
            localStorage.removeItem("mv-digital-user");
            // Auth context ko null set kar do
            setAuthUser(null);
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error("Logout failed");
        }
    };

    return { logout };
};

export default useLogout;