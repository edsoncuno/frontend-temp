import Api from './Api';

export const postUnidadDeMedida = async (json) => {
    const newApi = new Api();
    const res = await newApi.post('/unidadDeMedida', json);
    return res;
}

export const getUnidadesDeMedida = async () => {
    const newApi = new Api();
    const res = await newApi.get('/unidadDeMedida');
    return res;
}

export const getUnidadDeMedida = async (id) => {
    const newApi = new Api();
    const res = await newApi.get('/unidadDeMedida/' + id);
    return res;
}

export const deleteUnidadDeMedida = async (id) => {
    const newApi = new Api();
    const res = await newApi.delete('/unidadDeMedida/' + id);
    return res;
}