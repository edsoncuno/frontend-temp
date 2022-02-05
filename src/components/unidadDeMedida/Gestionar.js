import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import Crear from './Crear';
import Eliminar from './Eliminar';
import { getUnidadesDeMedida } from './../../api/apiUnidadDeMedida';
import { Toast } from 'primereact/toast';

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
            list: await getUnidadesDeMedida()
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
                    <Button title="Eliminar unidad de medida" icon="pi pi-times" className='m-2 bg-pink-500' onClick={() => { eliminar(data._id) }} />
                </React.Fragment>
            );
        }

        const header = () => {
            return (
                <React.Fragment>
                    <Button title="Agregar una nueva unidad de medida" icon="pi pi-plus" className='m-2' onClick={crear} />
                    <Button title="Actualizar lista de unidades de medida" icon="pi pi-refresh" className='m-2' onClick={actualizar} />
                </React.Fragment>
            );
        }

        const crear = () => {
            this.setState({ isVisible: true });
            this.setState({ action: 'crear' });
        }

        const eliminar = (id) => {
            this.setState({ isVisible: true });
            this.setState({ action: 'eliminar' });
            this.setState({ id: id });
        }

        const actualizar = async () => {
            this.setState({ loading: true });
            this.setState({ list: await getUnidadesDeMedida() });
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
                    {this.state.action === 'eliminar' ? <Eliminar id={this.state.id} ocultar={ocultar} showToast={showToast} /> : null}
                </Dialog>
                <DataTable style={{ position: 'sticky' }} value={this.state.list} loading={this.state.loading} showGridlines scrollable scrollHeight="25rem" rowHover size="small" scrollDirection="vertical" columnResizeMode="expand" resizableColumns emptyMessage="No se ha resgistrado ninguna unidad de medida" header={header}>
                    <Column header="Nombre" field="nombre" />
                    <Column header="Acciones" field="_id" body={actions} />
                </DataTable>
            </React.Fragment>
        );
    }
}