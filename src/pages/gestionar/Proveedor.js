import React from "react";
import Gestionar from './../../components/proveedor/Gestionar';

export default function Proveedor() {
    return (
        <React.Fragment>
            <div className="text-center text-6xl font-bold text-800 font-italic">Gestionar Proveedor</div>
            <Gestionar />
        </React.Fragment>
    );
}