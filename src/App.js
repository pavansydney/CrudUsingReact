import Form from "./Form"
import Table from "./Table"
import { useEffect, useState } from "react"
import { getData, deleteData } from './api'
import { Button } from "bootstrap"


function App() {
  const [products, setProducts] = useState([])
  useEffect(
    () => {
      getProductdetails()
    }, []
  )

  let getProductdetails = async () => {
    let res = await getData();
    setProducts(res.data);
  }

  let deleteProduct = async (id) => {
    await deleteData(id);
    getProductdetails();
  }

  return (
    <div className="wrapper m-5 w-50">
      <h2 className="text-primary">CRUD OPERATIONS</h2>
      <button className="btn btn-primary">Add Product</button>
      <Table products={products} delete={deleteProduct}></Table>
      <Form></Form>
    </div>

  )
}

export default App