export default class Api {
    #baseURl = 'http://localhost:5000';

    async get(route) {
        const res = await fetch(this.#baseURl + route);
        const data = await res.json();
        return data;
    }

    async post(route, json) {
        const res = await fetch(this.#baseURl + route, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        });
        const data = await res.json();
        return data;
    }

    async delete(route) {
        const res = await fetch(this.#baseURl + route, { method: "DELETE" });
        const data = await res.json();
        return data;
    }

    async put(route, json) {
        const res = await fetch(this.#baseURl + route, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        });
        const data = await res.json();
        return data;
    }
}