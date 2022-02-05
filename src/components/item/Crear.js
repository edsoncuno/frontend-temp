import React from "react";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button';
import Loading from "./../Loading";
import { Dropdown } from 'primereact/dropdown';
import { getCategorias } from "./../../api/apiCategoria";
import { getUnidadesDeMedida } from './../../api/apiUnidadDeMedida';
import { postItem } from './../../api/apiItem';

export default class Crear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            form: {
                categoria: null,
                nombre: '',
                unidadDeMedida: null,
                descripcion: '',
                marca: '',
                modelo: ''
            },
            dataCategorias: null,
            dataUnidadesDeMedida: null
        };
    }

    async fetchData() {
        this.setState({ dataCategorias: await getCategorias() });
        this.setState({ dataUnidadesDeMedida: await getUnidadesDeMedida() });
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
            const res = await postItem(this.state.form);
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
                    <div className="text-center text-2xl font-bold">Registrar</div>
                    <div className="flex flex-row">
                        <div className="p-float-label flex flex-column m-2">
                            <Dropdown name="categoria" value={this.state.form.categoria} onChange={handleChange} options={this.state.dataCategorias} optionLabel="nombre" optionValue="nombre" autoFocus />
                            <label>Categoria*</label>
                        </div>
                        <div className="p-float-label flex flex-column m-2">
                            <InputText name="nombre" value={this.state.form.nombre} onChange={handleChange} />
                            <label>Nombre*</label>
                        </div>
                    </div>
                    <div className="flex flex-row w-full">
                        <div className="p-float-label flex flex-column m-2">
                            <Dropdown name="unidadDeMedida" value={this.state.form.unidadDeMedida} onChange={handleChange} options={this.state.dataUnidadesDeMedida} optionLabel="nombre" optionValue="nombre" />
                            <label>Unidad de Medida*</label>
                        </div>
                        <div className="p-float-label flex flex-column m-2">
                            <InputText name="marca" value={this.state.form.marca} onChange={handleChange} />
                            <label>Marca</label>
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className="p-float-label flex flex-column m-2 w-full">
                            <InputText name="modelo" value={this.state.form.modelo} onChange={handleChange} />
                            <label>Modelo</label>
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className="p-float-label flex flex-column m-2 w-full">
                            <InputTextarea autoResize name="descripcion" value={this.state.form.descripcion} onChange={handleChange} />
                            <label>Descripción</label>
                        </div>
                    </div>
                    <div className="flex justify-content-center m-2">
                        <Button label="Guardar" id="btnRegistrar" onClick={handleSumit} />
                    </div>
                </React.Fragment>}
            </React.Fragment >
        );
    }
}