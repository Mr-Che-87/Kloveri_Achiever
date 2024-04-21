import axios, { AxiosResponse } from "axios";
import { IUser } from "../types/IUser";
const API_URL = "http://127.0.0.1:8000/api/v1";

// Определяем типы для данных, которые возвращает API
//interface UserData {
// ...определения свойств в соответствии с тем, что возвращает API
//}

interface UserAchievements {
  // ...определения свойств в соответствии с тем, что возвращает API
}

// Параметр userId теперь строго типизирован как строка
export const fetchUserData = (
  userId: string
): Promise<AxiosResponse<IUser>> => {
  return axios.get<IUser>(`${API_URL}/user/${userId}/get/`);
};

// Аналогично, параметр userId типизирован, и функция возвращает промис с ответом Axios
export const fetchUserAchievements = (
  userId: string
): Promise<AxiosResponse<UserAchievements>> => {
  return axios.get<UserAchievements>(
    `${API_URL}/user-achiev/${userId}/list/get/`
  );
};
