import React from 'react'
import { useState, useEffect } from 'react'
import { getProducts } from 'services/apiServices';
import { deleteProduct } from 'services/apiServices';

function Products() {

  const [products, setProducts] = useState([{
    name: "",
    description: "",
    price: 0,
  }]);


  useEffect(() => { 

    const fetchProducts = async () => {
      try {
        const { data } = await getProducts();
        setProducts(data.products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
    <div className="container main-content">
      {/* <div className="container ">
        <div className="d-flex justify-content-center">
          <div className="input-group" style={{ maxWidth: 300 }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              aria-label="Search"
              aria-describedby="basic-addon1"
              onChange={handleSearch}
            />
          </div>
        </div>
      </div> */}
      {products.length === 0 && (
        <h1
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontStyle: "italic",
            color: "gray",
            fontSize: "25px",
          }}
        >
          No Products available
        </h1>
      )}
        {products.length > 0 && (
           <div className="table-responsive-wrapper"
           style={{ overflowX: "auto", marginTop: "20px" }}>
        <table
          className="category-table-c table-responsive table table-bordered"
          style={{ marginTop: "20px" }}
        >
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
                <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>
                  <a href={`/add-product?id=${product._id}`}><button className="btn btn-primary btn-primary-c btn-sm m-2"> 
                    <i className="bx bx-edit" />
                  </button></a>
                  <button
                    className="btn btn-danger btn-danger-c btn-sm m-2"
                    onClick={() => handleDelete(product._id)}
                  >
                    <i className="bx bx-trash" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
            </div>
      )}
      </div>
      <a href="/add-product"
          className="btn add-note-btn"
        >
          <span className="plus-sign">
            <i className="bx bx-bowl-rice"></i>
          </span>
        </a>

  </div>
  )
}

export default Products