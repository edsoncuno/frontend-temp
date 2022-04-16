import react from "react";
import Loading from '../Loading';
import { getItem } from './../../api/apiItem';
import ApiCliente from "../../api/apiCliente";

const app = (props) => {

    const newApiCliente = new ApiCliente();
    const [loading, setLoading] = react.useState(false);
    const [clientes, setClientes] = react.useState([]);
    const [item, setItem] = react.useState([]);
    const [movimiento, setMovimiento] = react.useState({});

    react.useEffect(async () => {
        setLoading(true);
        setItem(await getItem(props.id));
        setClientes(await newApiCliente.getAll());
        setLoading(false);
    }, []);

    return (<react.Fragment>asd</react.Fragment>);
}

export default app;