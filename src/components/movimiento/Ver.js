import React from "react";
import Loading from "./../Loading";
import { getMovimiento } from './../../api/apiMovimiento';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: {
                tipo: '',
                fecha: '',
                hora: '',
                categoria: '',
                nombre: '',
                cantidad: '',
                unidadDeMedida: '',
                descripcion: '',
                precioDeCompraPorUnidad: '',
                precioDeCompraTotal: '',
                proveedor: ''
            }
        };
    }

    async fetchData() {
        const movimiento = await getMovimiento(this.props.id);
        movimiento.hora = this.toHora(movimiento.fecha);
        movimiento.fecha = this.toFecha(movimiento.fecha);
        this.setState({ data: movimiento });
    }

    componentDidMount() {
        this.fetchData();
        this.setState({ loading: false });
    }
    toFecha(fecha) {
        let date = new Date(String(fecha));
        let day = date.getDate();
        let month = date.getMonth() + 1;
        if (day <= 9) {
            day = '0' + day;
        }
        if (month <= 9) {
            month = '0' + month;
        }
        return day + '/' + month + '/' + date.getFullYear();
    }
    toHora(fecha) {
        let date = new Date(String(fecha));
        return date.getHours() + ':' + date.getMinutes();
    }

    render() {
        return (
            <React.Fragment>
                {this.state.loading ? <Loading /> : <React.Fragment>
                    <div className="text-center text-2xl font-bold">Movimiento</div>
                    <div className="flex flex-column">
                        <div className="m-2 text-xl">Tipo: {this.state.data.tipo}</div>
                        <div className="m-2 text-xl">Fecha: {this.state.data.fecha}</div>
                        <div className="m-2 text-xl">Hora: {this.state.data.hora}</div>
                        <div className="m-2 text-xl">Categoria del item: {this.state.data.categoria}</div>
                        <div className="m-2 text-xl">Nombre del item: {this.state.data.nombre}</div>
                        <div className="m-2 text-xl">Cantidad: {this.state.data.cantidad}</div>
                        <div className="m-2 text-xl">Unidad de Medida: {this.state.data.unidadDeMedida}</div>
                        {this.state.data.tipo === 'salida' ? null : <div className="m-2 text-xl">Precio de compra unitario: {this.state.data.precioDeCompraPorUnidad}</div>}
                        {this.state.data.tipo === 'salida' ? null : <div className="m-2 text-xl">Total: {this.state.data.precioDeCompraTotal}</div>}
                        {this.state.data.tipo === 'salida' ? null : <div className="m-2 text-xl">Proveedor: {this.state.data.proveedor}</div>}
                        <div className="m-2 text-xl">Descripcion: {this.state.data.descripcion}</div>
                    </div>
                </React.Fragment>}
            </React.Fragment >
        );
    }
}