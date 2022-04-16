import react from "react";
import ApiCliente from '../../api/apiCliente';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import Crear from "./Crear";
import Eliminar from "./Eliminar";
import Editar from "./Editar"

const app = () => {
    const newApiCliente = new ApiCliente();
    const [loading, setLoading] = react.useState(false);
    const [list, setList] = react.useState([]);
    const [isVisibleDialog, setIsVisibleDialog] = react.useState(false);
    const [action, setAction] = react.useState(null);
    const [idCliente, setIdCliente] = react.useState(null);
    const toast = react.useRef(null);

    const refresh = async () => {
        setLoading(true);
        const data = await newApiCliente.getAll();
        setList(data);
        setLoading(false);
    }

    react.useEffect(async () => {
        await refresh();
    }, []);

    const ocultar = () => {
        setIsVisibleDialog(false);
        refresh();
    }

    const showToast = (severity, detail) => {
        toast.current.show({ severity: severity, summary: '', detail: detail, life: 3000 });
    }

    const crear = () => {
        setIsVisibleDialog(true);
        setAction("crear");
    }

    const eliminar = (id) => {
        setIdCliente(id);
        setIsVisibleDialog(true);
        setAction("eliminar");
    }

    const editar = (id) => {
        setIdCliente(id);
        setIsVisibleDialog(true);
        setAction("editar");
    }

    const header = () => {
        return (<react.Fragment>
            <Button title="Agregar un nuevo cliente" icon="pi pi-plus" className='m-2' onClick={crear} />
            <Button title="Actualizar lista de clientes" icon="pi pi-refresh" className='m-2' onClick={refresh} />
        </react.Fragment>);
    }

    const actions = (data) => {
        return (
            <react.Fragment>
                <Button title="Editar cliente" icon="pi pi-pencil" className='m-2' onClick={() => { editar(data._id) }} />
                <Button title="Eliminar cliente" icon="pi pi-times" className='m-2 bg-pink-500' onClick={() => { eliminar(data._id) }} />
            </react.Fragment>
        );
    }

    return (<react.Fragment>
        <Toast ref={toast} position="top-center" />
        <Dialog visible={isVisibleDialog} modal={false} onHide={ocultar}>
            {action === 'crear' ? <Crear ocultar={ocultar} showToast={showToast} /> : null}
            {action === 'eliminar' ? <Eliminar ocultar={ocultar} showToast={showToast} id={idCliente} /> : null}
            {action === 'editar' ? <Editar ocultar={ocultar} showToast={showToast} id={idCliente} /> : null}
        </Dialog>
        <DataTable className="atras" value={list} loading={loading} header={header} rowHover emptyMessage="No se ha registrado ningún cliente">
            <Column header="Nombre" field="nombre" />
            <Column header="Ruc" field="ruc" />
            <Column header="Dni" field="dni" />
            <Column header="Acciones" field="_id" body={actions} />
        </DataTable>
    </react.Fragment>);
}

export default app;