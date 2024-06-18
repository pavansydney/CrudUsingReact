import React, { useEffect, useState } from 'react';
import ProductList from "./productlist";
import { deleteData, getData, putData, postData } from './api';
import ProductForm from "./Form";
import Footer from "./Footer";

const App = () => {
    const [products, setProducts] = useState([]);
    const [edit, setEdit] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [initialForm, setForm] = useState({ name: '', price: '', category: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [sortCriteria, setSortCriteria] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Adjust as needed

    useEffect(() => {
        getAllProducts();
    }, []);

    async function getAllProducts() {
        const response = await getData();
        setProducts(response.data);
    }

    async function addProduct(product) {
        let data = { name: product.name, price: product.price, category: product.category };
        if (edit) await putData(product.id, data);
        else await postData(data);
        getAllProducts();
        setOpenForm(false);
    }

    async function deleteProduct(id) {
        await deleteData(id);
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
    const currentItems = products
      .sort((a, b) => {
        if (sortOrder === 'asc') {
          return a[sortCriteria].localeCompare(b[sortCriteria], 'en', { numeric: true });
        } else {
          return b[sortCriteria].localeCompare(a[sortCriteria], 'en', { numeric: true });
        }
      })
      .filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(indexOfFirstItem, indexOfLastItem);

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
            <div>
              <select value={sortCriteria} onChange={(e) => setSortCriteria(e.target.value)} className="form-select mb-3">
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="category">Category</option>
              </select>
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="form-select mb-3">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
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
            <div>{renderPageNumbers}</div>
            <Footer />
        </div>
    );
};

export default App;