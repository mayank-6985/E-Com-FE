import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CategoryList from "./components/CategoryList";
import CreateCategory from "./components/CreateCategory";
import CreateProduct from "./components/CreateProduct";
import EditCategory from "./components/EditCategory";
import EditProduct from "./components/EditProduct";
import Home from "./components/Home"; // Add Home component for navigation and insights
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import ProductList from "./components/ProductList";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  // Check for authentication status when app loads
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // If the authentication status is still being checked, you can return a loading spinner or nothing
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Home Route (Dashboard) */}
        <Route
          path="/"
          element={
            <PrivateRoute
              element={<Home />} // Home for insights and navigation
              isAuthenticated={isAuthenticated}
            />
          }
        />

        {/* Protected Routes for Products */}
        <Route
          path="/products"
          element={
            <PrivateRoute
              element={<ProductList />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/products/create"
          element={
            <PrivateRoute
              element={<CreateProduct />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/products/edit/:id"
          element={
            <PrivateRoute
              element={<EditProduct />}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        {/* Protected Routes for Categories */}
        <Route
          path="/categories"
          element={
            <PrivateRoute
              element={<CategoryList />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/categories/create"
          element={
            <PrivateRoute
              element={<CreateCategory />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/categories/edit/:id"
          element={
            <PrivateRoute
              element={<EditCategory />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
