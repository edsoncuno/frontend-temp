import React from "react";
import Gestionar from './../../components/categoria/Gestionar';

export default function TipoDeItem() {
    return (
        <React.Fragment>
            <div className="text-center text-6xl font-bold text-800 font-italic">Gestionar Categoria</div>
            <Gestionar />
        </React.Fragment>
    );
}