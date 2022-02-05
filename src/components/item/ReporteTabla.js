import react from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default class App extends react.Component {
    render() {
        return (
            <react.Fragment>
                <DataTable value={this.props.items} showGridlines className='m-3'>
                    <Column header="Nombre" field='nombre' />
                    <Column header="Cantidad" field='cantidad' />
                    <Column header="Porcentaje" field='porcentaje' />
                </DataTable>
            </react.Fragment>
        );
    }
}