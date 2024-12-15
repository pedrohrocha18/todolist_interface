import React, { useState } from "react";
import useApi from "../../hooks/useApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
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
    const endpoint = "/user/forgotpassword";
    const method = "POST";
    const headers = { "Content-Type": "application/json" };

    try {
      const responseData = await sendRequest(
        endpoint,
        method,
        formData,
        headers
      );

      if (responseData.status === 200) {
        toast.success("Link de redefinição de senha gerado com sucesso!");
        setTimeout(() => {
          navigate("/login");
        }, 3300);
      }

      if (responseData.error) {
        throw { error: responseData.status };
      }
    } catch (error) {
      const errorCode = error["error"];

      switch (errorCode) {
        case 400:
          toast.error("E-mail é obrigatório!");
          break;
        case 404:
          toast.error("Usuário não encontrado!");
          break;
        case 500:
          toast.error(
            "Erro ao gerar link de redefinição de senha. Verifique o e-mail digitado!"
          );
          break;
        default:
          toast.error("Ocorreu um erro inesperado.");
          break;
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 style={{ fontSize: "23px", marginBottom: "25px" }}>
        Recuperar Senha
      </h1>
      <form
        className="flex flex-col gap-4 items-center"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email">
          {" "}
          E-mail:
          <input
            style={{ color: "black", width: "300px" }}
            className="h-8 ml-3"
            type="email"
            name="email"
            id="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <button
          type="submit"
          style={{
            background: "white",
            color: "black",
            marginTop: "15px",
            width: "100px",
            borderRadius: "4px",
          }}
        >
          Enviar Link
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
