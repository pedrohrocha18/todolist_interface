import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useApi from "../../hooks/useApi";
import { auth, signInWithEmailAndPassword } from "../../../firebaseConfig";
import useAuthStore from "../../components/navbar/authStore";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [failedAttempts, setFailedAttempts] = useState(0);
  const navigate = useNavigate();
  const { sendRequest } = useApi();
  const login = useAuthStore((state) => state.login);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const idToken = await userCredential.user.getIdToken();

      const responseData = await sendRequest(
        "/user/login",
        "POST",
        { email, password, token: idToken },
        { "Content-Type": "application/json" }
      );

      if (responseData.message === "Login bem-sucedido!") {
        toast.success("Login efetuado com sucesso!");

        login(responseData.token);

        localStorage.setItem("authToken", responseData.token);

        setTimeout(() => {
          navigate("/dashboard");
        }, 2200);
      } else {
        throw new Error(responseData.error || "Erro inesperado no login.");
      }
    } catch (error) {
      setFailedAttempts((prev) => prev + 1);
      toast.error("E-mail ou senha inválidos! Tente novamente.");

      if (failedAttempts + 1 >= 3) {
        toast.info(
          "Você tentou 3 vezes. Caso tenha esquecido sua senha, clique no link abaixo."
        );
      }
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgotpassword");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 style={{ fontSize: "25px", marginBottom: "25px" }}>Login</h1>
      <form
        className="flex flex-col gap-4 items-center"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email">
          E-mail:
          <input
            style={{ color: "black" }}
            className="h-8 ml-3"
            type="email"
            name="email"
            id="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            style={{ color: "black" }}
            className="h-8 ml-3"
            type="password"
            name="password"
            id="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <button
          type="submit"
          style={{
            background: "white",
            color: "black",
            width: "80px",
            borderRadius: "4px",
          }}
        >
          Login
        </button>
      </form>
      {failedAttempts >= 3 && (
        <div className="mt-4">
          <a
            href="#"
            onClick={handleForgotPassword}
            style={{ color: "white", textDecoration: "underline" }}
          >
            Redefinir senha
          </a>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Login;
