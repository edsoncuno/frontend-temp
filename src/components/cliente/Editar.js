import react from "react";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import ApiCliente from "../../api/apiCliente";
import Loading from '../Loading';

const app = (props) => {
    const newApiCliente = new ApiCliente();
    const [loading, setLoading] = react.useState(false);
    const [nombre, setNombre] = react.useState("");
    const [ruc, setRuc] = react.useState("");
    const [dni, setDni] = react.useState("");

    react.useEffect(async () => {
        setLoading(true);
        const res = await newApiCliente.get(props.id);
        setNombre(res.nombre);
        setRuc(res.ruc);
        setDni(res.dni);
        setLoading(false);
    }, []);

    const handleSumit = async () => {
        document.getElementById("btnEditar").disabled = true;
        const res = await newApiCliente.put(props.id, { nombre: nombre, ruc: ruc, dni: dni });
        props.showToast(res.severity, res.detail);
        if (res.severity !== "success") {
            document.getElementById("btnEditar").disabled = false;
        } else {
            document.getElementById("btnEditar").disabled = false;
            props.ocultar();
        }
    }

    return (<react.Fragment>{loading ? <Loading /> : <div>
        <div className="text-center text-2xl font-bold">Editar</div>
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
                <Button label="Guardar cambios" id="btnEditar" onClick={handleSumit} />
            </div>
        </div>
    </div>}</react.Fragment>);
}

export default app;