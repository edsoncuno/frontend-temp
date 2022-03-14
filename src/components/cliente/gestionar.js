import react from "react";
import ApiCliente from './../../api/apiCliente';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const app = () => {

    const newApiCliente = new ApiCliente();
    //const [loading, setLoading] = react.useRef(false);
    //const [list, setList] = react.useRef([]);
    //const [isVisibleDialog, setIsVisibleDialog] = react.useRef(false);
    //const [action, setAction] = react.useRef(null);
    //const [idCliente, setIdCliente] = react.useRef(null);

    const refresh = async () => {
        //setLoading(true);
        //const data = 
        await newApiCliente.getAll();
        //setList(data);
        //setLoading(false);
    }

    react.useEffect(async () => {
        await refresh();
    }, []);

    // <DataTable className="atras" value={list} loading={loading} showGridlines scrollable scrollHeight="28rem" rowHover size="small" scrollDirection="vertical" columnResizeMode="expand" resizableColumns emptyMessage="No se ha registrado ninguna categoria" header={header}>
    return (<react.Fragment>
        <DataTable>
            <Column header="Nombre" field="nombre" />
        </DataTable>
    </react.Fragment>);
}

export default app;