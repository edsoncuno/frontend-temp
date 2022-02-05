import React from "react";
import Loading from "./../Loading";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { getItem } from './../../api/apiItem';
import { getProveedores } from './../../api/apiProveedor';
import { postMovimiento } from './../../api/apiMovimiento';

export default class Crear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            form: {
                item_id: this.props.id,
                tipo: this.props.tipo,
                cantidad: '',
                proveedor: null,
                descripcion: '',
                precioDeCompraPorUnidad: ''
            },
            dataProveedores: [],
            dataItem: {
                unidadDeMedida: '',
                categoria: '',
                nombre: '',
                stock: 0
            }
        }
    }

    async fetchData() {
        this.setState({ dataProveedores: await getProveedores() });
        this.setState({ dataItem: await getItem(this.props.id) });
    }

    componentDidMount() {
        this.fetchData();
        this.setState({ loading: false });
    }

    render() {
        const handleChange = (e) => {
            this.setState({
                form: { ...this.state.form, [e.target.name]: e.target.value }
            });
        }
        const handleSumit = async () => {
            document.getElementById("btnRegistrar").disabled = true;
            const res = await postMovimiento(this.state.form);
            if (res.error) {
                this.props.showToast('error', res.name, res.message);
                document.getElementById("btnRegistrar").disabled = false;
            } else {
                this.props.showToast('success', res.name, res.message);
                document.getElementById("btnRegistrar").disabled = false;
                this.props.ocultar();
            }
        }
        return (
            <React.Fragment>
                {this.state.loading ? <Loading /> : <React.Fragment>
                    <div className="text-center text-2xl font-bold">Registrar {this.props.tipo}</div>
                    <div className='flex flex-row m-2'>
                        <div className="flex flex-column m-2">
                            Categoria del item: {this.state.dataItem.categoria}
                        </div>
                        <div className="flex flex-column m-2">
                            Nombre del item: {this.state.dataItem.nombre}
                        </div>
                    </div>
                    <div className="flex flex-row m-2">
                        <div className="p-float-label flex flex-column">
                            <InputText name="cantidad" value={this.state.form.cantidad} onChange={handleChange} autoFocus />
                            <label>Cantidad</label>
                        </div>
                        <div className="flex flex-wrap align-content-center m-2">
                            <label>Unidad de medida: {this.state.dataItem.unidadDeMedida}</label>
                        </div>
                    </div>
                    <div className="flex flex-row m-2">
                        <div className="flex flex-column m-2">
                            Stock actual: {this.state.dataItem.stock}
                        </div>
                        <div className="flex flex-column m-2">
                            Stock resultante: {this.props.tipo === 'salida' ? (Number(this.state.dataItem.stock) - Number(this.state.form.cantidad)) : (Number(this.state.dataItem.stock) + Number(this.state.form.cantidad))}
                        </div>
                    </div>
                    {this.props.tipo === 'salida' ? null : <div className="p-float-label flex flex-column m-2">
                        <InputText name="precioDeCompraPorUnidad" value={this.state.form.precioDeCompraPorUnidad} onChange={handleChange} />
                        <label>Precio de compra por unidad</label>
                    </div>}
                    {this.props.tipo === 'salida' ? null : <div className="flex flex-column m-2">
                        Precio de compra total: {(Number(this.state.form.cantidad) * Number(this.state.form.precioDeCompraPorUnidad)).toFixed(2)}
                    </div>}
                    {this.props.tipo === 'salida' ? null : <div className="p-float-label flex flex-column m-2">
                        <Dropdown name="proveedor" value={this.state.form.proveedor} onChange={handleChange} options={this.state.dataProveedores} optionLabel="nombre" optionValue="nombre" />
                        <label>Proveedor</label>
                    </div>}
                    <div className="p-float-label flex flex-column m-2">
                        <InputTextarea autoResize name="descripcion" value={this.state.form.descripcion} onChange={handleChange} />
                        <label>Descripción</label>
                    </div>
                    <div className="flex flex-column">
                        <div className="flex justify-content-center m-2">
                            <Button label="Guadar" id="btnRegistrar" onClick={handleSumit} />
                        </div>
                    </div>
                </React.Fragment>}
            </React.Fragment>
        );
    }

}