import axios, { AxiosError } from "axios";
import { BASE_URL } from "./constants";

const getUrl = (searchText: string, page: number, pageSize: number) => {
  return `${BASE_URL}?q=${searchText}&per_page=${pageSize}&page=${page}`;
}

export const fetchResults = async (searchText: string, page: number, pageSize: number) => {
  try {
    const response = await axios.get(getUrl(searchText, page, pageSize));
    return response.data;
  } catch (error: any | AxiosError) {
    throw error;
  }
};
