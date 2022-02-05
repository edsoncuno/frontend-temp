import react from "react";
import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getItems } from '../../api/apiItem';

export default class App extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataItems: null,
            data: null,
            title: 'Todos los items'
        }
    }
    async fetchData() {
        this.setState({ dataItems: await getItems() });
    }

    componentDidMount() {
        this.fetchData();
        this.setState({ dataItemsFiltradosAgregadosFormato: formatear(itemsFiltradosAgregados(this.state.dataItems)) });
        this.setState({ loading: false });
    }

    generarColorAleatorio() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    filtrarItems(items, categoria) {
        let list = [];
        if (tipo != null) {
            items.forEach((item) => {
                if (item.categoria === categoria) {
                    list.push(item);
                }
            });
        }
        return list;
    }
    generarTitulo(categoria) {
        if (categoria != null) {
            return 'Todos los items en la categoria : ' + categoria;
        } else {
            return 'Todos los items';
        }
    }
    generarData(itemsFiltradosPorcentajes) {
        const labels = [];
        const data = [];
        const backgroundColor = [];
        for (let i = 0; i < itemsFiltradosPorcentajes.length; i++) {
            labels.push(itemsFiltradosPorcentajes[i].nombre);
            data.push(itemsFiltradosPorcentajes[i].cantidad);
            backgroundColor.push(generarColorAleatorio());
        }

        const dataChart = {
            labels: labels,
            datasets: [
                {
                    data: data,
                    backgroundColor: backgroundColor
                }
            ]
        }
        return dataChart;
    }
    render() {
        const options = {
            plugins: {
                title: {
                    display: true,
                    text: this.state.title,
                    font: {
                        size: 30
                    }
                },
                legend: {
                    labels: {
                        color: '#000000'
                    },
                    position: 'right'
                }
            }
        }
        return (
            <react.Fragment>
                <div className='flex flex-row'>
                    <DataTable value={this.state.dataItemFiltrados} showGridlines className='m-3'>
                        <Column header="Nombre" field='nombre' />
                        <Column header="Cantidad" field='cantidad' />
                        <Column header="Porcentaje" field='porcentaje' />
                    </DataTable>
                    <Chart type="pie" data={this.state.data} options={options} />
                </div>
            </react.Fragment>
        );
    }
}