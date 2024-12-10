import React, { useEffect } from "react";
import authStore from "../../components/navbar/authStore";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const { isAuthenticated } = authStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Você precisa fazer login primeiro!");
      setTimeout(() => {
        navigate("/login");
      }, 3500);
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      {!isAuthenticated ? (
        <>
          <ToastContainer />{" "}
        </>
      ) : (
        <div>
          <h1>Bem vindo a Dashboard To-do list</h1>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default Dashboard;
