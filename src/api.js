import axios from 'axios';
const url = process.env.NODE_ENV === 'development' ? "http://localhost:4200/api/products" : "https://pavansydney.github.io/CrudUsingReact";

export async function getData() {
    const response = await axios.get(`${url}`);
    // Assuming the product data is directly under response.data
    return response.data.products; // Adjust "products" to the actual key where the product data is stored
}

export async function postData(data) {
    return await axios.post(url, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function putData(id, data) {
    return await axios.put(`${url}/${id}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}


export async function deleteData(id) {
    return await axios.delete(`${url}/${id}`);
}