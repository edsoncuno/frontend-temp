import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import { getItems } from './../../api/apiItem';
import { Toast } from 'primereact/toast';
import Crear from './Crear';

export default class Items extends React.Component {
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

        const ocultar = () => {
            this.setState({ isVisible: false });
            actualizar();
        }

        const actualizar = async () => {
            this.setState({ loading: true });
            this.setState({ list: await getItems() });
            this.setState({ loading: false });
        }

        const actions = (data) => {
            return (
                <React.Fragment>
                    <Button className='m-1' icon="pi pi-plus" label="Entrada" title='Registrar entrada' onClick={() => { entrada(data._id) }}></Button>
                    <Button className='m-1' icon="pi pi-plus" label="Salida" title='Registrar salida' onClick={() => { salida(data._id) }}></Button>
                </React.Fragment>
            );
        }

        const entrada = (id) => {
            this.setState({ id: id });
            this.setState({ action: 'entrada' });
            this.setState({ isVisible: true });
        }

        const salida = (id) => {
            this.setState({ id: id });
            this.setState({ action: 'salida' });
            this.setState({ isVisible: true });
        }

        return (
            <React.Fragment>
                <Toast ref={(el) => this.toast = el} />
                <Dialog visible={this.state.isVisible} modal={false} onHide={() => { this.setState({ isVisible: false }) }}>
                    {this.state.action === 'entrada' ? <Crear ocultar={ocultar} showToast={showToast} id={this.state.id} tipo={this.state.action} /> : null}
                    {this.state.action === 'salida' ? <Crear ocultar={ocultar} showToast={showToast} id={this.state.id} tipo={this.state.action} /> : null}
                </Dialog>
                <DataTable style={{ position: 'sticky' }} value={this.state.list} loading={this.state.loading} showGridlines scrollable scrollHeight="28rem" rowHover size="small" scrollDirection="vertical" columnResizeMode="expand" resizableColumns emptyMessage="No se ha registrado ningun item">
                    <Column header="Categoria" field="categoria" />
                    <Column header="Nombre" field="nombre" />
                    <Column header="Stock" field="stock" />
                    <Column header="Acciones" field="_id" body={actions} />
                </DataTable>
            </React.Fragment>
        );
    }
}