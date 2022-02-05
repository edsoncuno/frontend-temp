import React from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { postProveedor } from './../../api/apiProveedor';

export default class Crear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                nombre: ''
            }
        };
    }

    render() {

        const handleChange = (e) => {
            this.setState({
                form: { ...this.state.form, [e.target.name]: e.target.value }
            });
        }

        const handleSumit = async () => {
            document.getElementById("btnRegistrar").disabled = true;
            const res = await postProveedor(this.state.form);
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
                <div className="text-center text-2xl font-bold">Registrar</div>
                <div>
                    <div className="p-float-label flex flex-column m-2">
                        <InputText name="nombre" value={this.state.form.nombre} onChange={handleChange} autoFocus />
                        <label>Nombre*</label>
                    </div>
                    <div className="flex justify-content-center m-2">
                        <Button label="Guardar" id="btnRegistrar" onClick={handleSumit} />
                    </div>
                </div>
            </React.Fragment >
        );
    }
}