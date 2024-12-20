import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useApi from "../../hooks/useApi";
import { auth, signInWithEmailAndPassword } from "../../../firebaseConfig";
import useAuthStore from "../../components/navbar/authStore";

import Loader from "../../components/loader/Loader";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      // Primeiro, verifica se o usuário existe na API
      const response = await sendRequest("/user/exists", "POST", { email });

      // Se o usuário não existir, redireciona para a criação de conta
      if (response.status === 404) {
        setIsLoading(false);
        toast.error(
          "Usuário não encontrado. Redirecionando para criar uma conta."
        );
        setTimeout(() => {
          navigate("/register");
        }, 4500);
        return;
      }

      // Se o usuário existir, tenta fazer login com o Firebase
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

      if (responseData) {
        setIsLoading(false);
      } else {
        setIsLoading(true);
      }

      if (responseData.error) {
        throw { error: responseData.status };
      }

      // Verifica a resposta da API
      if (responseData.status === 200) {
        toast.success("Login efetuado com sucesso!");
        login(responseData.token);

        localStorage.setItem("authToken", responseData.token);

        setTimeout(() => {
          navigate("/dashboard");
        }, 2200);
      } else {
        toast.error("Erro ao fazer login. Tente novamente.");
      }
    } catch (error) {
      const fireBaseError = error.message;

      if (fireBaseError.includes("auth/invalid-credential")) {
        setIsLoading(false);
        setFailedAttempts((prev) => prev + 1);
        toast.error("Senha inválida!");
      }

      if (fireBaseError.includes("auth/too-many-requests")) {
        setIsLoading(false);
        toast.error(
          "Você realizou muitas tentativas de login. Por favor, aguarde alguns minutos antes de tentar novamente."
        );
      }

      if (failedAttempts + 1 >= 3) {
        const email = document.querySelector("input[type='email']");
        const password = document.querySelector("input[type='password']");
        const button = document.querySelector("button[type='submit']");

        if ((email, password, button)) {
          email.disabled = true;
          password.disabled = true;
          button.disabled = true;
        }

        setIsLoading(false);
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
      <Loader isLoading={isLoading} />
    </div>
  );
};

export default Login;
