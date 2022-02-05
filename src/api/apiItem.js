import Api from './Api';

export const postItem = async (json) => {
    const newApi = new Api();
    const res = await newApi.post('/item', json);
    return res;
}

export const getItems = async () => {
    const newApi = new Api();
    const res = await newApi.get('/item');
    return res;
}

export const getItem = async (id) => {
    const newApi = new Api();
    const res = await newApi.get('/item/' + id);
    return res;
}

export const deleteItem = async (id) => {
    const newApi = new Api();
    const res = await newApi.delete('/item/' + id);
    return res;
}

export const putItem = async (id, json) => {
    const newApi = new Api();
    const res = await newApi.put('/item/' + id, json);
    return res;
}