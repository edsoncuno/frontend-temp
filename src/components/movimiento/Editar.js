import React from "react";
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import Loading from './../Loading';
import { getMovimiento } from './../../api/apiMovimiento';
import { getProveedores } from './../../api/apiProveedor';
import { putMovimiento } from './../../api/apiMovimiento';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            form: {
                tipo: '',
                proveedor: null,
                cantidad: '',
                nombre: '',
                precioDeCompraPorUnidad: '',
                unidadDeMedida: null,
                descripcion: '',
                marca: '',
                modelo: ''
            },
            dataProveedores: null
        };
    }

    async fetchData() {
        this.setState({ form: await getMovimiento(this.props.id) });
        this.setState({ dataProveedores: await getProveedores() });
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
            document.getElementById("btnEditar").disabled = true;
            const res = await putMovimiento(this.props.id, this.state.form);
            if (res.error) {
                this.props.showToast('error', res.name, res.message);
                document.getElementById("btnEditar").disabled = false;
            } else {
                this.props.showToast('success', res.name, res.message);
                document.getElementById("btnEditar").disabled = false;
                this.props.ocultar();
            }
        }
        return (
            <React.Fragment>
                {this.state.loading || this.state.form.tipo === 'ajuste' ? <Loading /> : <React.Fragment>
                    <div className="text-center text-2xl font-bold">Editar</div>
                    <div className='flex flex-column'>
                        {this.state.form.tipo === 'salida' ? null : <div className="p-float-label flex flex-row">
                            <Dropdown name="proveedor" value={this.state.form.proveedor} onChange={handleChange} options={this.state.dataProveedores} optionLabel="nombre" optionValue="nombre" autoFocus />
                            <label>Proveedor</label>
                        </div>}
                        <div className="flex flex-column m-2">
                            Cantidad: {this.state.form.cantidad}
                        </div>
                        {this.state.form.tipo === 'salida' ? null : <div className="p-float-label flex flex-column m-2">
                            <InputText name='precioDeCompraPorUnidad' value={this.state.form.precioDeCompraPorUnidad} onChange={handleChange} />
                            <label>Precio de compra por unidad</label>
                        </div>}
                        {this.state.form.tipo === 'salida' ? null : <div className="flex flex-column m-2">
                            Precio de compra total: {(this.state.form.cantidad * this.state.form.precioDeCompraPorUnidad).toFixed(2)}
                        </div>}
                        <div className="p-float-label flex flex-column m-2">
                            <InputTextarea autoResize name="descripcion" value={this.state.form.descripcion} onChange={handleChange} />
                            <label>Descripción</label>
                        </div>
                        <div className="flex flex-row justify-content-center">
                            <Button label="Guadar Cambios" id="btnEditar" onClick={handleSumit} />
                        </div>
                    </div>
                </React.Fragment>}
            </React.Fragment>
        );
    }
}