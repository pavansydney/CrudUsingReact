import React, { useEffect, useState } from 'react';
import ProductList from "./productlist";
import { deleteData, getData, putData, postData } from './api';
import ProductForm from "./Form";
import Footer from "./Footer";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [edit, setEdit] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [initialForm, setForm] = useState({ name: '', price: '', category: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Adjust as needed
  // New state variable for maintenance mode
  const [isUnderMaintenance] = useState(true); // Set to true to activate maintenance mode

   // Correctly placed useEffect
   useEffect(() => {
    // Conditionally execute code inside useEffect
    if (!isUnderMaintenance) {
      // Your effect logic here, executed only when isUnderMaintenance is false
    }
  }, [isUnderMaintenance]); // Make sure to include isUnderMaintenance in the dependency array

  useEffect(() => {
    getAllProducts();
  }, []);

  // Conditional rendering based on maintenance state
  if (isUnderMaintenance) {
    return (
      <div className="maintenance-message" style={{ textAlign: 'center', marginTop: '20%' }}>
        <h1>Site Under Maintenance</h1>
        <p>We are currently performing scheduled maintenance. We will be back shortly. Thank you for your patience.</p>
        <Footer />
      </div>
    );
  }

  async function getAllProducts() {
    const response = await getData();
    setProducts(response);
  }

  async function addProduct(product) {
    let data = { name: product.name, price: Number(product.price), category: product.category };
    if (edit) {
      await putData(product.id, data);
      toast.success(`Product ${data.name} edited successfully`);
    }
    else {
      await postData(data);
      toast.success(`New Product with ${data.name} added successfully`);
    }
    getAllProducts();
    setOpenForm(false);
  }

  async function deleteProduct(id) {
    await deleteData(id);
    toast.success(`Product with Id ${id} deleted successfully`);
    getAllProducts();
  }

  function editProduct(value) {
    setEdit(true);
    setOpenForm(true);
    setForm(value);
  }

  function closeForm() {
    setOpenForm(false);
  }

  function showForm() {
    setForm({ name: '', price: '', category: '' });
    setOpenForm(true);
    setEdit(false);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Ensure products is an array before calling .filter and .slice
  const currentItems = Array.isArray(products) ? products
    .filter(product =>
      // Ensure product.name and product.category are strings
      (typeof product.name === 'string' && product.name.toLowerCase().includes(searchTerm)) ||
      (typeof product.category === 'string' && product.category.toLowerCase().includes(searchTerm))
    )
    .slice(
      // Ensure indexOfFirstItem and indexOfLastItem are numbers
      Number.isInteger(indexOfFirstItem) ? indexOfFirstItem : 0,
      Number.isInteger(indexOfLastItem) ? indexOfLastItem : products.length
    ) : [];

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const renderPageNumbers = [...Array(totalPages).keys()].map(number => (
    <button key={number + 1} onClick={() => setCurrentPage(number + 1)} className={currentPage === number + 1 ? 'active' : ''}>
      {number + 1}
    </button>
  ));

  return (
    <div className="wrapper m-5 w-50">
      <h2 className="text-danger text-center">REACT JS CRUD OPERATIONS</h2>
      <button className="btn btn-primary m-2 float-end" onClick={showForm}>Add new</button>
      <input
        type="text"
        placeholder="Search products..."
        className="form-control mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ProductList
        products={currentItems}
        deleteProduct={deleteProduct}
        editProduct={editProduct}
      />
      {openForm && <ProductForm add={addProduct} data={initialForm} close={closeForm} />}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
      <div>{renderPageNumbers}</div>
      <Footer />
    </div>
  );
};

export default App;