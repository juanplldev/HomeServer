// Dependencies
import {Navigate} from "react-router-dom";
// Files
import {useAuthStore} from "../../store/store.js";


export default function PrivateRoute({children})
{
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    
    return isAuthenticated ? children : <Navigate to="/login" />;
};