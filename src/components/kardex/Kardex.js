import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { Button } from "primereact/button";
import { getMovimientos } from './../../api/apiMovimiento';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import Ver from './../movimiento/Ver';
import Editar from './../movimiento/Editar';

export default class Kardex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            list: [],
            isVisible: false,
            action: null,
            id: '',
            filters: { 'global': { value: null, matchMode: FilterMatchMode.CONTAINS } },
            globalFilterValue: ''
        }
    }

    async fetchData() {
        this.setState({
            list: await getMovimientos()
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
        const onGlobalFilterChange = (e) => {
            const value = e.target.value;
            let filters = { ...this.state.filters };
            filters['global'].value = value;
            this.setState({ filters, globalFilterValue: value });
        }
        const header = () => {
            return (
                <div className="flex flex-row justify-content-end">
                    <span className="p-input-icon-left mx-2">
                        <i className="pi pi-search" />
                        <InputText value={this.state.globalFilterValue} onChange={onGlobalFilterChange} placeholder="Buscar" />
                    </span>
                </div>
            );
        }
        const actions = (data) => {
            return (
                <React.Fragment>
                    <div className='flex justify-content-start'>
                        <Button className='mx-2' icon="pi pi-search" title='Ver detalles del movimiento' onClick={() => { ver(data._id) }}></Button>
                        <Button className='mx-2' icon="pi pi-pencil" title='Editar datos del movimiento' onClick={() => { registrarSalida(data._id) }}></Button>
                    </div>
                </React.Fragment>
            );
        }
        const ver = (id) => {
            this.setState({ id: id });
            this.setState({ action: 'ver' });
            this.setState({ isVisible: true });
        }

        const registrarSalida = (id) => {
            this.setState({ id: id });
            this.setState({ action: 'editar' });
            this.setState({ isVisible: true });
        }
        const actualizar = async () => {
            this.setState({ loading: true });
            this.setState({ list: await getMovimientos() });
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
                    {this.state.action === 'ver' ? <Ver id={this.state.id} /> : null}
                    {this.state.action === 'editar' ? <Editar ocultar={ocultar} showToast={showToast} id={this.state.id} /> : null}
                </Dialog>
                <DataTable className="atras" value={this.state.list} loading={this.state.loading} showGridlines scrollable scrollHeight="28rem" rowHover size="small" scrollDirection="vertical" columnResizeMode="expand" resizableColumns emptyMessage="No se ha registrado ningun movimiento" header={header} filters={this.state.filters}>
                    <Column header="Movimiento" field="tipo" />
                    <Column header="Categoria" field="categoria" />
                    <Column header="Nombre" field="nombre" />
                    <Column header="Fecha" field="fecha" />
                    <Column header="Cantidad" field="cantidad" />
                    <Column header="Unidad de Medida" field="unidadDeMedida"></Column>
                    <Column header="Stock" field="stock"></Column>
                    <Column header="Proveedor" field="proveedor"></Column>
                    <Column header="Acciones" field="_id" body={actions} />
                </DataTable>
            </React.Fragment>
        );
    }
}