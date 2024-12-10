import { create } from "zustand";

const useAuthStore = create((set) => {
  // Verifica se há um token armazenado no localStorage
  const storedToken = localStorage.getItem("token");
  const isAuthenticated = storedToken ? true : false;

  return {
    isAuthenticated: isAuthenticated,
    token: storedToken,
    login: (token) => {
      localStorage.setItem("token", token); // Armazena o token no localStorage
      set({ isAuthenticated: true, token });
    },
    logout: () => {
      localStorage.removeItem("token"); // Remove o token do localStorage
      set({ isAuthenticated: false, token: null });
    },
  };
});

export default useAuthStore;
