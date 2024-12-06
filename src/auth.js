import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig'; // Importando o auth do firebaseConfig

// Função para fazer login e obter o token de ID
export const loginUser = async (email, password) => {
  try {
    // Usando a instância do 'auth' importada diretamente do firebaseConfig
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Obtém o token de ID do Firebase
    const idToken = await user.getIdToken();

    // Retorna o token de ID para ser enviado ao servidor
    return idToken;
  } catch (error) {
    console.error("Erro ao autenticar:", error.message);
    throw new Error(error.message);
  }
};
