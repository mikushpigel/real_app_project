import { useEffect } from "react";
import { useState } from "react";
import cardsService from "../services/cardService";

export const useCard = (id) => {
    const [card, setCard] = useState(null);

    useEffect(() => {
        const getCard = async () => {
            const { data } = await cardsService.getCard(id);
            console.log('await get card:', await cardsService.getCard(id));
            console.log('data card', data);

            setCard(data);
        }

        getCard();
    }, []);

    return card;
}

export default useCard;