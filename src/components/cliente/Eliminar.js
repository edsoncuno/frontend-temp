import react from "react";
import { Button } from 'primereact/button'
import ApiCliente from "../../api/apiCliente";
import Loading from '../Loading';

const app = (props) => {
    const newApiCliente = new ApiCliente();
    const [loading, setLoading] = react.useState(false);
    const [cliente, setCliente] = react.useState({
        nombre: "", ruc: "", di: ""
    });

    react.useEffect(async () => {
        setLoading(true);
        const res = await newApiCliente.get(props.id);
        setCliente(res);
        setLoading(false);
    }, []);

    const eliminar = async () => {
        document.getElementById("btnEliminar").disabled = true;
        const res = await newApiCliente.delete(props.id);
        props.showToast(res.severity, res.detail);
        if (res.severity !== "success") {
            document.getElementById("btnEliminar").disabled = false;
        } else {
            document.getElementById("btnEliminar").disabled = false;
            props.ocultar();
        }
    }

    return (<react.Fragment>{loading ? <Loading /> : <div>
        <div className="text-center text-2xl font-bold">Eliminar</div>
        <div className="flex flex-column w">
            <div className='text-center text-xl'>Esta seguro de eliminar el cliente: "{cliente.nombre}" con RUC:{cliente.ruc} y DNI:{cliente.dni}?</div>
            <div className="flex flex-row justify-content-center">
                <Button label='Si' className='p-button-danger m-2' onClick={eliminar} id='btnEliminar' />
            </div>
        </div>
    </div>}</react.Fragment>);
}

export default app;