import Form from "./Form"
import Table from "./Table"
import { useEffect, useState } from "react"
import { getData, deleteData, postData, putData } from './api'


function App() {
  const [products, setProducts] = useState([])
  const [openForm, setOpenForm] = useState(false)
  const [edit, setEdit] = useState(false);
  const [initialForm, setForm] = useState({
    title : '',
    body : ''
  })
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

  let addProduct = async (product) => {
    let data = {
      title : product.title,
      body : product.body
    }
    if(edit){
      await putData(product.id,data);
    }
    else {
      await postData(data);
    getProductdetails();
    setOpenForm(false);
    }
  }

  let editProduct = async (data) => {
    setForm(data);
    setOpenForm(true);
    setEdit(true);
  }

  let showForm = () => {
    setOpenForm(true);
    setForm({
      title:'',
      body:''
    })
  }

  let closeForm = () => {
    setOpenForm(false);
  }

  return (
    <div className="wrapper m-5 w-50">
      <h2 className="text-primary">CRUD OPERATIONS</h2>
      <button className="btn btn-primary" onClick={() => {
        showForm()
      }}>Add Product</button>
      <Table products={products} delete={deleteProduct} edit={editProduct}></Table>
      {
        openForm && <Form closeForm={closeForm} data={initialForm} add={addProduct}></Form>
      }
    </div>

  )
}

export default App