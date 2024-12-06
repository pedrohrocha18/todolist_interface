import { useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "https://todolist-back-rust.vercel.app",
});

const useAxios = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

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
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  return { data, error, sendRequest };
};

export default useAxios;
