import axios from 'axios';

const url = "https://jsonplaceholder.typicode.com/posts";
export async function getData(){
    return await axios.get(url)
}
export async function deleteData(id){
    return await axios.delete(`${url}/${id}`)
}
export async function postData(data){
    return await axios.post(url,data,{
        headers:{
            'Content-Type':'application/json'
        }
    });
}