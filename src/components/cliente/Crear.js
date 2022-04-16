import react from "react";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import ApiCliente from "../../api/apiCliente";

const app = (props) => {
    const newApiCliente = new ApiCliente();
    const [nombre, setNombre] = react.useState("");
    const [ruc, setRuc] = react.useState("");
    const [dni, setDni] = react.useState("");

    const handleSumit = async () => {
        document.getElementById("btnRegistrar").disabled = true;
        const res = await newApiCliente.post({ nombre: nombre, ruc: ruc, dni: dni });
        props.showToast(res.severity, res.detail);
        if (res.severity !== "success") {
            document.getElementById("btnRegistrar").disabled = false;
        } else {
            document.getElementById("btnRegistrar").disabled = false;
            props.ocultar();
        }
    }

    return (<react.Fragment>
        <div className="text-center text-2xl font-bold">Registrar</div>
        <div>
            <div className="p-float-label flex flex-column m-2">
                <InputText value={nombre} onChange={(e) => setNombre(e.target.value)} autoFocus />
                <label>Nombre</label>
            </div>
            <div className="p-float-label flex flex-column m-2">
                <InputText value={ruc} onChange={(e) => setRuc(e.target.value)} />
                <label>Ruc</label>
            </div>
            <div className="p-float-label flex flex-column m-2">
                <InputText value={dni} onChange={(e) => setDni(e.target.value)} />
                <label>Dni</label>
            </div>
            <div className="flex justify-content-center m-2">
                <Button label="Guardar" id="btnRegistrar" onClick={handleSumit} />
            </div>
        </div>
    </react.Fragment>);
}

export default app;