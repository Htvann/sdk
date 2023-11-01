import { IMain } from "../types";
import { requestUrl } from "./config/axios.config";

export const gethello = async (value: IMain) => {
  const httpApi = new requestUrl("https://jsonplaceholder.typicode.com");
  return await httpApi.get<{ id: string }[]>("/posts");
};
