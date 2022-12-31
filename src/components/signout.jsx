import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context"

const SignOut = ({ redirect }) => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        logOut();
        navigate(redirect);
    }, [logOut, navigate]);

    return null;
};

export default SignOut;