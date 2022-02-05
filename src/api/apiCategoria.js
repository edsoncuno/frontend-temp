import Api from './Api';

export const postCategoria = async (json) => {
    const newApi = new Api();
    const res = await newApi.post('/categoria', json);
    return res;
}

export const getCategorias = async () => {
    const newApi = new Api();
    const res = await newApi.get('/categoria');
    return res;
}

export const getCategoria = async (id) => {
    const newApi = new Api();
    const res = await newApi.get('/categoria/' + id);
    return res;
}

export const deleteCategoria = async (id) => {
    const newApi = new Api();
    const res = await newApi.delete('/categoria/' + id);
    return res;
}