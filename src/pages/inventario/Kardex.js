import React from "react";
import Tabla from './../../components/kardex/Kardex';

export default function Kardex() {
    return (
        <React.Fragment>
            <div className="text-center text-6xl font-bold text-800 font-italic">Kardex</div>
            <Tabla />
        </React.Fragment>
    );
}