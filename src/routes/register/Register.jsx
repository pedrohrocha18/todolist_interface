import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";

import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loader from "../../components/loader/Loader";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      // Primeiro, verifica se o usuário existe na API
      const findUser = await sendRequest("/user/exists", "POST", { email });

      if (findUser.status === 200) {
        toast.error("Já existe um usuário registrado com este e-mail.");
        setIsLoading(false);
        return;
      }

      const response = await sendRequest(
        "/user/register",
        "POST",
        { name, email, password },
        { "Content-Type": "application/json" }
      );

      if (response) {
        setIsLoading(false);
      } else {
        setIsLoading(true);
      }

      if (response.status === 201) {
        toast.success("Usuário criado com sucesso!");

        setTimeout(() => {
          navigate("/login");
        }, 2500);
      }

      if (response.error) {
        throw { error: response.status };
      }
    } catch (error) {
      const errorCode = error["error"];
      
      setIsLoading(false);

      switch (errorCode) {
        case 400:
          toast.error(
            "Todos os campos são obrigatórios. Verifique os dados e tente novamente."
          );
          break;
        case 406:
          toast.error(
            "A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais."
          );
          break;
        case 409:
          toast.error("O e-mail já está em uso.");
          break;
        case 422:
          toast.error("E-mail inválido.");
          break;
        case 500:
          toast.error(
            "Erro no servidor. Por favor, tente novamente mais tarde."
          );
          break;
        default:
          toast.error("Ocorreu um erro desconhecido. Tente novamente.");
          break;
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
      <Loader isLoading={isLoading} />
    </div>
  );
};

export default Register;
