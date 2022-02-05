import React from "react";
import Loading from "./../Loading";
import { getItem } from './../../api/apiItem';

export default class Ver extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: {
                categoria: '',
                nombre: '',
                unidadDeMedida: '',
                marca: '',
                modelo: '',
                descripcion: ''
            }
        };
    }

    async fetchData() {
        this.setState({ data: await getItem(this.props.id) });
    }

    componentDidMount() {
        this.fetchData();
        this.setState({ loading: false });
    }

    render() {
        return (
            <React.Fragment>
                {this.state.loading ? <Loading /> : <React.Fragment>
                    <div className="text-center text-2xl font-bold">Item</div>
                    <div className="flex flex-column">
                        <div className="m-2 text-xl">Categoria: {this.state.data.categoria}</div>
                        <div className="m-2 text-xl">Nombre: {this.state.data.nombre}</div>
                        <div className="m-2 text-xl">Unidad de Medida: {this.state.data.unidadDeMedida}</div>
                        <div className="m-2 text-xl">Marca: {this.state.data.marca}</div>
                        <div className="m-2 text-xl">Modelo: {this.state.data.modelo}</div>
                        <div className="m-2 text-xl">Descripcion: {this.state.data.descripcion}</div>
                    </div>
                </React.Fragment>}
            </React.Fragment >
        );
    }
}