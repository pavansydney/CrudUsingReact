import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

function ProductList({ products, editProduct, deleteProduct }) {
    const [sortField, setSortField] = useState('');
    const [isAscending, setIsAscending] = useState(true);

    const sortFunction = (firstProduct, secondProduct) => {
        if (firstProduct[sortField] < secondProduct[sortField]) return isAscending ? -1 : 1;
        if (firstProduct[sortField] > secondProduct[sortField]) return isAscending ? 1 : -1;
        return 0;
    };

    const toggleSort = (field) => {
        if (sortField === field) {
            setIsAscending(!isAscending);
        } else {
            setSortField(field);
            setIsAscending(true);
        }
    };

    const renderSortIcon = (field) => {
        const isActive = sortField === field;
        return (
            <>
                <FontAwesomeIcon icon={faSortUp} style={{ color: isActive && isAscending ? 'black' : 'lightgrey' }} />
                <FontAwesomeIcon icon={faSortDown} style={{ color: isActive && !isAscending ? 'black' : 'lightgrey' }} />
            </>
        );
    };

    return (
        <table className='table m-3'>
            <thead>
                <tr>
                    <th style={{ cursor: 'pointer' }} onClick={() => toggleSort('name')}>
                        Name {renderSortIcon('name')}
                    </th>
                    <th style={{ cursor: 'pointer' }} onClick={() => toggleSort('price')}>
                        Price {renderSortIcon('price')}
                    </th>
                    <th style={{ cursor: 'pointer' }} onClick={() => toggleSort('category')}>
                        Category {renderSortIcon('category')}
                    </th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.sort(sortFunction).map((product, index) => (
                    <tr key={product.id} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff' }}>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>
                            <button className='btn btn-primary m-1' onClick={() => editProduct(product)}>Edit</button>
                            <button className="btn btn-danger m-1" onClick={() => deleteProduct(product.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ProductList;