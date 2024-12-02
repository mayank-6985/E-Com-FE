import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

const EditProduct = () => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    category_id: "", // Added category_id field
    image: null,
    image_url: "", // This will hold the current image URL to display
  });

  const [categories, setCategories] = useState([]); // State to store categories

  // Fetch categories when the component mounts
  useEffect(() => {
    api
      .get("/category")
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error("Error fetching categories", error);
      });
  }, []);

  useEffect(() => {
    // Fetch product data on component mount
    api
      .get(`/product/products/${id}`)
      .then((response) => {
        setProduct({
          ...response.data,
          image_url: response.data.image_url,
        });
      })
      .catch((error) => {
        console.error("Error fetching product data", error);
      });

    // Fetch categories
    api
      .get("/category")
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error("Error fetching categories", error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("stock", product.stock);
    formData.append("category_id", product.category_id);
    formData.append("image", product.image || "");

    api
      .put(`/product/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        navigate("/"); // Redirect to the product list after updating
      })
      .catch((error) => {
        console.error("Error updating product", error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 rounded">
        <h1 className="text-center mb-4 text-primary">Edit Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-6">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={product.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-6">
              <label htmlFor="price" className="form-label">
                Price:
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className="form-control"
                value={product.price}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-6">
              <label htmlFor="description" className="form-label">
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                value={product.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-6">
              <label htmlFor="stock" className="form-label">
                Stock:
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                className="form-control"
                value={product.stock}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-6">
              <label htmlFor="category_id" className="form-label">
                Category:
              </label>
              <select
                id="category_id"
                name="category_id"
                className="form-control"
                value={product.category_id}
                onChange={handleInputChange}
              >
                <option value="">Select Category</option>
                {categories.map((category_id) => (
                  <option key={category_id.id} value={category_id.id}>
                    {category_id.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-6">
              <label htmlFor="image" className="form-label">
                Image:
              </label>
              <input
                type="file"
                id="image"
                name="image"
                className="form-control"
                onChange={handleImageChange}
              />
            </div>
            <div className="col-12 mt-3">
              {product.image_url && (
                <div>
                  <p>Current Image:</p>
                  <img
                    src={`http://localhost:8080${product.image_url}`}
                    alt="Product"
                    className="img-fluid rounded"
                    style={{ maxWidth: "150px", maxHeight: "150px" }}
                  />
                </div>
              )}
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-4">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
