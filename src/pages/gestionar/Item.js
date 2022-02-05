import React from "react";
import Gestionar from './../../components/item/Gestionar';

export default function Item() {
    return (
        <React.Fragment>
            <div className="text-center text-6xl font-bold text-800 font-italic">Gestionar Item</div>
            <Gestionar />
        </React.Fragment>
    );
}