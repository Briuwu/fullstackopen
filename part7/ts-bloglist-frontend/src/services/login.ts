import axios from "axios";
const baseUrl = "/api/login";
import { Credentials } from "@/types";

const login = async (credentials: Credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
