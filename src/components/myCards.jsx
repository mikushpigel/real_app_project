import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMyCards } from "../hooks/useMyCards";
import Card from "./card";
import PageHeader from "./common/pageHeader";

const Mycards = () => {
    const cards = useMyCards();

    return (
        <>
            <PageHeader title='My Cards'
                description='your card are is the list below'
            />

            <div className="row">
                <Link to='/create-card'>Create a New Card</Link>
            </div>

            <div className="row">
                {!cards.length ? (
                    <p>No Cards...</p>
                ) : (
                    cards.map((card) => <Card key={card._id} card={card} />)
                )}
            </div>
        </>
    )
}

export default Mycards;