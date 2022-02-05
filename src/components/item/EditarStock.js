import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { getItem } from './../../api/apiItem';
import { putStock } from './../../api/apiStock';

export default class EditarStock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            form: {
                categoria: '',
                nombre: '',
                stock: 0
            }
        };
    }

    async fetchData() {
        this.setState({ form: await getItem(this.props.id) });
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
            const res = await putStock(this.props.id, this.state.form);
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
                <div className="text-center text-2xl font-bold">Editar Stock</div>
                <div className='flex flex-column'>
                    <div className='flex flex-row'>
                        <div className="flex flex-column m-2">
                            Categoria del item: {this.state.form.categoria}
                        </div>
                        <div className="flex flex-column m-2">
                            Nombre del item: {this.state.form.nombre}
                        </div>
                    </div>
                    <div className="p-float-label flex flex-column m-2">
                        <InputText name='stock' value={this.state.form.stock} onChange={handleChange} />
                        <label>Stock</label>
                    </div>
                    <p className='text-pink-600 font-bold w-full'>
                        Advertencia: Este procedimiento se realiza
                        <br />
                        cuando el stock inicial es diferente de 0.
                        <br />
                        Tratar de evitar su uso por otros motivos.
                    </p>
                    <div className="flex justify-content-center m-2">
                        <Button label="Guardar Cambios" id='btnEditar' onClick={handleSumit} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}