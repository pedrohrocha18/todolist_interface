import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";

import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { sendRequest } = useApi();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;

    try {
      const responseData = await sendRequest(
        "/user/register",
        "POST",
        { name, email, password },
        { "Content-Type": "application/json" }
      );

      if (responseData.message === "Usuário adicionado com sucesso!") {
        toast.success("Usuário criado com sucesso!");

        setTimeout(() => {
          navigate("/login");
        }, 2200);
      }
    } catch (error) {
      if (error.status === 400) {
        toast.error(
          "Todos os campos são obrigatórios ou o e-mail já está em uso. Verifique os dados e tente novamente."
        );
      } else if (error.status === 422) {
        toast.error("E-mail inválido.");
      } else if (error.status === 406) {
        toast.error(
          "A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais."
        );
      } else if (error.status === 500) {
        toast.error("Erro no servidor. Por favor, tente novamente mais tarde.");
      } else {
        toast.error("Ocorreu um erro desconhecido. Tente novamente.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 style={{ fontSize: "25px", marginBottom: "25px" }}>Criar Conta</h1>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-center"
        >
          <label htmlFor="name">
            {" "}
            Nome:
            <input
              style={{ color: "black" }}
              className="h-8 ml-3"
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="email">
            {" "}
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
            {" "}
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
            Criar
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
