import axios from "axios";
import ApiClient from "./ApiClient";

export const getProduct = async (barcode: string) => {
  try {
    const response = await ApiClient.get(`/Product?barkod=${barcode}`);
    console.log("response: ", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios hata mesajı:", error.message);
    } else {
      console.error("Bilinmeyen hata:", error);
    }
  }
};
