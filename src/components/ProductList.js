import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get("http://localhost:8080/api/product/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products", error);
      });
  }, []);

  const deleteProduct = (id) => {
    api
      .delete(`http://localhost:8080/api/product/products/${id}`)
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting product", error);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Product List</h1>
      <div className="mb-3 text-right">
        <Link to="/products/create" className="btn btn-primary">
          Create New Product
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  {product.image_url ? (
                    <img
                      src={`http://localhost:8080${product.image_url}`}
                      alt={product.name}
                      style={{ width: "80px", height: "80px" }}
                      className="img-thumbnail"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>
                  <Link
                    to={`/products/edit/${product.id}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
