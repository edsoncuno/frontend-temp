import react from "react";
import { Dropdown } from 'primereact/dropdown';
import Loading from './../Loading';
import { getCategorias } from './../../api/apiCategoria';
import { getItems } from './../../api/apiItem';
import Table from './ReporteTabla';

export default class App extends react.Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            categoria: null,
            dataCategorias: null,
            dataItems: null,
            dataItemsFiltrados: null,
            dataItemsFiltradosConPorcentaje: []
        }
    }
    async fetchData() {
        this.setState({ dataCategorias: await getCategorias() });
        this.setState({ dataItems: await getItems() });
    }
    componentDidMount() {
        this.fetchData();
        this.setState({ loading: false });
    }
    render() {
        const handleChange = (e) => {
            this.setState({ categoria: e.target.value });
            this.setState({ dataItemsFiltrados: filtrarItems(this.state.dataItems, e.target.value) });
            // para tabla
            this.setState({ dataItemsFiltradosConPorcentaje: agregarPorcentaje(filtrarItems(this.state.dataItems, e.target.value)) });
        }
        const filtrarItems = (items, categoria) => {
            let list = [];
            if (categoria != null) {
                items.forEach((item) => {
                    if (item.categoria === categoria) {
                        list.push(item);
                    }
                });
            }
            return list;
        }
        // para tabla
        const agregarPorcentaje = (items) => {
            let newItems = [];
            let sumatoria = 0;
            items.forEach((x) => {
                newItems.push({ nombre: x.nombre, cantidad: x.stock.cantidad });
                sumatoria = sumatoria + x.stock.cantidad;
            });
            newItems.forEach((x) => {
                x.porcentaje = (x.cantidad / sumatoria) * 100;
            });
            newItems.sort((x, y) => {
                return x.cantidad - y.cantidad
            }).reverse();
            return newItems;
        }
        return (
            <react.Fragment>
                {
                    this.state.loading ? <Loading /> : <div className="flex flex-column align-items-center">
                        <div className="text-center text-3xl font-bold text-800 font-italic">Reporte de Items</div>
                        <div className="p-float-label flex flex-column m-2 w-min">
                            <Dropdown name="categoria" value={this.state.categoria} onChange={handleChange} options={this.state.dataCategorias} optionLabel="nombre" optionValue="nombre" autoFocus />
                            <label>Categoria</label>
                        </div>
                        <div className="flex flex-row">
                            <Table items={this.state.dataItemsFiltradosConPorcentaje} />
                        </div>
                    </div>
                }
            </react.Fragment >
        );
    }
}