import axios, { AxiosResponse } from "axios";
import { IUser } from "../types/IUser";
import { IAchieve } from "../types/IAchieve";
import { IUserAchievements } from "../types/IUserAchievements";

const API_URL = "https://reg.achiever.skroy.ru"; // обновлённый базовый URL

// Profiles
// GET-Получение списка всех пользователей
export const fetchGetAllUsers = (): Promise<AxiosResponse> => {
  return axios.get(`${API_URL}/profiles/`);
};

// POST-Добавление нового пользователя
export const fetchPostUser = (
  userData: IUser
): Promise<AxiosResponse<IUser>> => {
  return axios.post<IUser>(`${API_URL}/profiles/`, userData);
};

// GET-Получение данных одного пользователя по ID
export const fetchGetUserData = (
  userId: string
): Promise<AxiosResponse<IUser>> => {
  return axios.get<IUser>(`${API_URL}/profiles/${userId}`);
};

// PATCH-Обновление данных существующего пользователя
export const fetchUpdateUser = (
  userId: string,
  userData: IUser
): Promise<AxiosResponse<IUser>> => {
  console.log("Отправка запроса на обновление данных пользователя:", userData);
  return axios.patch<IUser>(`${API_URL}/profiles/${userId}`, userData);
};

// DELETE-Удаление пользователя по ID
export const fetchDeleteUser = (userId: string): Promise<AxiosResponse> => {
  return axios.delete(`${API_URL}/profiles/${userId}`);
};

// Achievements library
// GET-Получение всей библиотеки наград
export const fetchGetAchieveLibrary = (): Promise<
  AxiosResponse<IAchieve[]>
> => {
  return axios.get<IAchieve[]>(`${API_URL}/achievements/`);
};

// POST-Добавление новой награды в библиотеку
export const fetchPostAchieveLibrary = (
  achieveData: FormData
): Promise<AxiosResponse<IAchieve>> => {
  return axios.post<IAchieve>(`${API_URL}/achievements/`, achieveData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// GET-Получение достижения по ID
export const fetchGetAchieveById = (
  achieveId: string
): Promise<AxiosResponse<IAchieve>> => {
  return axios.get<IAchieve>(`${API_URL}/achievements/${achieveId}`);
};

// PATCH-Обновление достижения по ID
export const fetchUpdateAchieve = (
  achieveId: string,
  achieveData: IAchieve
): Promise<AxiosResponse<IAchieve>> => {
  return axios.patch<IAchieve>(
    `${API_URL}/achievements/${achieveId}`,
    achieveData
  );
};

// DELETE-Удаление достижения по ID
export const fetchDeleteAchieve = (
  achieveId: string
): Promise<AxiosResponse> => {
  return axios.delete(`${API_URL}/achievements/${achieveId}`);
};

// Avatars and Backgrounds
// GET-Получение списка аватаров
export const fetchGetAvatars = (): Promise<AxiosResponse> => {
  return axios.get(`${API_URL}/avatar-images/`);
};

// GET-Получение списка фоновых изображений
export const fetchGetBackgrounds = (): Promise<AxiosResponse> => {
  return axios.get(`${API_URL}/templates-images/`);
};

// Connections
// GET-Получение списка всех связей пользователя с достижениями
export const fetchGetUserAchievements = (): Promise<
  AxiosResponse<IUserAchievements[]>
> => {
  return axios.get<IUserAchievements[]>(`${API_URL}/user-achievements/`);
};

// POST-Создание связи между пользователем и достижением
export const fetchPostUserAchieve = (
  userId: string,
  achieveId: string
): Promise<AxiosResponse<IUserAchievements>> => {
  return axios.post<IUserAchievements>(`${API_URL}/user-achievements/`, {
    userId,
    achieveId,
  });
};

// GET-Получение связи между пользователем и достижением по ID
export const fetchGetIDUserAchieve = (
  userAchievementId: string
): Promise<AxiosResponse<IUserAchievements>> => {
  return axios.get<IUserAchievements>(
    `${API_URL}/user-achievements/${userAchievementId}`
  );
};

// PATCH-Обновление связи между пользователем и достижением по ID
export const fetchUpdateUserAchievement = (
  userAchievementId: string,
  updates: Partial<IUserAchievements>
): Promise<AxiosResponse<IUserAchievements>> => {
  return axios.patch<IUserAchievements>(
    `${API_URL}/user-achievements/${userAchievementId}`,
    updates
  );
};

// DELETE-Удаление связи между пользователем и достижением по ID
export const fetchDeleteUserAchievement = (
  userAchievementId: string
): Promise<AxiosResponse> => {
  return axios.delete(`${API_URL}/user-achievements/${userAchievementId}`);
};
