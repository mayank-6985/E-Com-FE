import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../api";

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    image: null,
    category_id: "",
  });

  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null); // for image preview
  const navigate = useNavigate();

  // Fetch categories when the component mounts
  useEffect(() => {
    api
      .get("http://localhost:8080/api/category")
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error("Error fetching categories", error);
      });
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle image input change and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: file });
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // set the image preview
    };
    if (file) {
      reader.readAsDataURL(file); // read the image file
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("stock", product.stock);
    formData.append("image", product.image); // Append the image file
    formData.append("category_id", product.category_id); // Append selected category

    api
      .post("http://localhost:8080/api/product/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error creating product", error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 rounded">
        <h1 className="text-center mb-4 text-primary">Create New Product</h1>
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
                placeholder="Enter product name"
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
                placeholder="Enter product price"
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
                placeholder="Enter product description"
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
                placeholder="Enter stock quantity"
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
                className="form-select"
                value={product.category_id}
                onChange={handleInputChange}
              >
                <option value="">Select Category</option>
                {categories &&
                  categories.length &&
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
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
              {imagePreview && (
                <div className="mt-3 text-center">
                  <img
                    src={imagePreview}
                    alt="Product Preview"
                    className="img-fluid rounded"
                    style={{ maxWidth: "200px", maxHeight: "200px" }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary mt-4">
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
