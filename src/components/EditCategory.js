import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    name: "",
  });

  useEffect(() => {
    // Fetch category data by ID
    api
      .get(`http://localhost:8080/api/category/${id}`)
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching category data", error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .put(`http://localhost:8080/api/category/${id}`, category)
      .then(() => {
        navigate("/categories"); // Redirect after updating category
      })
      .catch((error) => {
        console.error("Error updating category", error);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Edit Category</h1>
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
          Update Category
        </button>
      </form>
    </div>
  );
};

export default EditCategory;
