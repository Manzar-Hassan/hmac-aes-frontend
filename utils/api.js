import axios from "axios";
import { encryptAES, generateHMAC } from "./security";

const API_BASE_URL = "http://127.0.0.1:8000";

const getBooks = async () => {
  const urlPath = "/books";
  const hmacSignature = generateHMAC(urlPath);

  try {
    const response = await axios.get(`${API_BASE_URL}${urlPath}`, {
      headers: {
        "X-HMAC": hmacSignature,
      },
    });

    console.log("GET Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("GET Error:", error.response?.data || error.message);
    return null;
  }
};

export async function addBook(bookData) {
    const encryptedData = encryptAES(bookData);
    const hmacSignature = generateHMAC(encryptedData);

    const payload = {
      data: encryptedData,
      hmac: hmacSignature,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/books`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("POST Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("POST Error:", error.response?.data || error.message);
      return null;
    }
  }

export { getBooks, addBook };
