import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const CreateCategory = () => {
  const [category, setCategory] = useState({
    name: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .post("http://localhost:8080/api/category", category)
      .then(() => {
        navigate("/categories"); // Redirect after creating category
      })
      .catch((error) => {
        console.error("Error creating category", error);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Create New Category</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={category.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Create Category
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
