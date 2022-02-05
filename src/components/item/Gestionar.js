import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import { getItems } from './../../api/apiItem';
import { Toast } from 'primereact/toast';
import Crear from './Crear';
import Ver from './Ver';
import Eliminar from "./Eliminar";
import Editar from './Editar';
import EditarStock from './EditarStock';

export default class Gestionar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            list: [],
            isVisible: false,
            action: null,
            id: ''
        }
    }

    async fetchData() {
        this.setState({
            list: await getItems()
        });
    }

    componentDidMount() {
        this.fetchData();
        this.setState({ loading: false });
    }

    render() {

        const showToast = (tipo, titulo, mensaje) => {
            this.toast.show({
                severity: tipo,
                summary: titulo,
                detail: mensaje,
                life: 3000
            });
        }

        const actions = (data) => {
            return (
                <React.Fragment>
                    <Button className='m-1' icon="pi pi-search" title='Ver detalles del item' onClick={() => { ver(data._id) }}></Button>
                    <Button className='m-1' icon="pi pi-pencil" title='Editar el item' onClick={() => { editar(data._id) }}></Button>
                    <Button className='m-1 bg-pink-500' icon="pi pi-times" title="Eliminar item" onClick={() => { eliminar(data._id) }} />
                    <Button className='m-1 bg-pink-500' icon="pi pi-pencil" title='Editar el stock del item' onClick={() => { stock(data._id) }}></Button>
                </React.Fragment>
            );
        }

        const header = () => {
            return (
                <React.Fragment>
                    <Button className='m-2' icon="pi pi-plus" title="Agregar un item" onClick={crear} />
                    <Button className='m-2' icon="pi pi-refresh" title="Actualizar lista" onClick={actualizar} />
                </React.Fragment>
            );
        }

        const crear = () => {
            this.setState({ isVisible: true });
            this.setState({ action: 'crear' });
        }

        const ver = (id) => {
            this.setState({ id: id });
            this.setState({ action: 'ver' });
            this.setState({ isVisible: true });
        }

        const editar = (id) => {
            this.setState({ id: id });
            this.setState({ action: 'editar' });
            this.setState({ isVisible: true });
        }

        const eliminar = (id) => {
            this.setState({ id: id });
            this.setState({ action: 'eliminar' });
            this.setState({ isVisible: true });
        }

        const stock = (id) => {
            this.setState({ id: id });
            this.setState({ action: 'stock' });
            this.setState({ isVisible: true });
        }

        const actualizar = async () => {
            this.setState({ loading: true });
            this.setState({ list: await getItems() });
            this.setState({ loading: false });
        }

        const ocultar = () => {
            this.setState({ isVisible: false });
            actualizar();
        }

        return (
            <React.Fragment>
                <Toast ref={(el) => this.toast = el} />
                <Dialog visible={this.state.isVisible} modal={false} onHide={() => { this.setState({ isVisible: false }) }}>
                    {this.state.action === 'crear' ? <Crear ocultar={ocultar} showToast={showToast} /> : null}
                    {this.state.action === 'ver' ? <Ver id={this.state.id} /> : null}
                    {this.state.action === 'editar' ? <Editar ocultar={ocultar} showToast={showToast} id={this.state.id} /> : null}
                    {this.state.action === 'eliminar' ? <Eliminar ocultar={ocultar} showToast={showToast} id={this.state.id} /> : null}
                    {this.state.action === 'stock' ? <EditarStock ocultar={ocultar} showToast={showToast} id={this.state.id} /> : null}
                </Dialog>
                <DataTable style={{ position: 'sticky' }} value={this.state.list} loading={this.state.loading} showGridlines scrollable scrollHeight="25rem" rowHover size="small" scrollDirection="vertical" columnResizeMode="expand" resizableColumns emptyMessage="No se ha registrado ningun item" header={header}>
                    <Column header="Categoria" field="categoria" />
                    <Column header="Nombre" field="nombre" />
                    <Column header="Acciones" field="_id" body={actions} />
                </DataTable>
            </React.Fragment>
        );
    }
}