import { useState } from "react";
import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:3001",
// });

const api = axios.create({
  baseURL: "https://todolist-back-rust.vercel.app",
});

const useAxios = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState();

  const sendRequest = async (
    endpoint,
    method = "GET",
    body = null,
    headers = {}
  ) => {
    setError(null);
    try {
      const response = await api({
        url: endpoint,
        method,
        data: body,
        headers,
      });
      setData(response.data);
      return { data: response.data, status: response.status };
    } catch (err) {
      setError(err?.response?.data || err.message);
      return {
        error: err?.response?.data || err.message,
        status: err?.response?.status,
      };
    }
  };

  return { data, error, sendRequest };
};

export default useAxios;
