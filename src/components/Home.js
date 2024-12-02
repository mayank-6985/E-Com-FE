import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import api from "../api";

const Home = () => {
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    // Fetch total categories
    api
      .get("/category")
      .then((response) => {
        setTotalCategories(response.data.categories.length);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    // Fetch total products
    api
      .get("http://localhost:8080/api/product/products")
      .then((response) => {
        setTotalProducts(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleLogout = () => {
    // Clear the auth token and redirect to login page
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 text-center mb-4">
          <h1 className="display-4 text-primary">Admin Dashboard</h1>
          <p className="lead">
            Welcome to the admin portal! Manage your products and categories
            efficiently.
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm border-primary">
            <div className="card-body text-center">
              <h5 className="card-title text-primary">Total Categories</h5>
              <p className="card-text display-3">{totalCategories}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm border-success">
            <div className="card-body text-center">
              <h5 className="card-title text-success">Total Products</h5>
              <p className="card-text display-3">{totalProducts}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Manage Links Row */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <Link
            to="/categories"
            className="btn btn-lg btn-outline-primary btn-block shadow-sm"
          >
            Manage Categories
          </Link>
        </div>
        <div className="col-md-6 mb-3">
          <Link
            to="/products"
            className="btn btn-lg btn-outline-success btn-block shadow-sm"
          >
            Manage Products
          </Link>
        </div>
      </div>

      {/* Logout Button */}
      <div className="row">
        <div className="col-12 text-center">
          <button
            onClick={handleLogout}
            className="btn btn-danger btn-lg shadow-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
