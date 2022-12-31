import { useEffect } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import cardsService from "../services/cardService";

const DeleteCard = ({ redirect }) => {
    const navigate = useNavigate();
    const { id } = useParams();// נותן אובייקט עם כל הפרמטרים מתוך היו אר אל  

    useEffect(() => {
        if (!id) return;
        const deleteCard = async () => {
            await cardsService.deleteCard(id);
            toast('The card has been deleted')
            navigate(redirect);
        };

        deleteCard();
    }, [id, navigate]);

    return null;
};

export default DeleteCard;