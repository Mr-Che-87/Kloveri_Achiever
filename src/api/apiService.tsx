import axios, { AxiosResponse } from "axios";
import { IUser } from "../types/IUser";
import { IAchieve } from "../types/IAchieve";
import { IUserAchievements } from "../types/IUserAchievements";
//import { IConnection } from "../types/IConnection";

const API_URL = "https://reg.achiever.skroy.ru"; //обновлённый базовый URL


//Profiles//
// GET-Получение списка всех пользователей
export const fetchGetAllUsers = (): Promise<AxiosResponse> => {
  return axios.get(`${API_URL}/profiles/`);
};
/* //СТАРОЕ (не удалять пока)
export const fetchGetUserData = (userRoleId: string) => {  //userRoleId(0 - админ, 1 - работник) 
  return axios.get(`${API_URL}/user/${userRoleId}`);    
};  */

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

// PATCH-Обновление данных существующего пользователя  //ДЕЛАТЬ!!!
export const fetchUpdateUser = (
  userId: string,
  userData: IUser
): Promise<AxiosResponse<IUser>> => {
  console.log("Отправка запроса на обновление данных пользователя:", userData);
  return axios.patch<IUser>(`${API_URL}/profiles/${userId}`, userData);
};

// DELETE-Удаление пользователя по ID     //ДЕЛАТЬ!!!
export const fetchDeleteUser = (userId: string): Promise<AxiosResponse> => {
  return axios.delete(`${API_URL}/profiles/${userId}`);
};




//Achievements library//
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

// PATCH-Обновление достижения по ID      //ДЕЛАТЬ!!!
export const fetchUpdateAchieve = (
  achieveId: string,
  achieveData: IAchieve
): Promise<AxiosResponse<IAchieve>> => {
  return axios.patch<IAchieve>(
    `${API_URL}/achievements/${achieveId}`,
    achieveData
  );
};

// DELETE-Удаление достижения по ID           //ДЕЛАТЬ!!!
export const fetchDeleteAchieve = (
  achieveId: string
): Promise<AxiosResponse> => {
  return axios.delete(`${API_URL}/achievements/${achieveId}`);
};






//НИЧЁ НЕ ПЕРЕНАСТРОЕНО  - ДЕЛАТЬ:
//Connections//
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
/* //СТАРОЕ
//POST-запрос user-achiev(соединяет юзера и награду):
export const fetchPostUserAchieve = (userId: string, achieveId: string): Promise<AxiosResponse> => {
  //console.log("АPI-POST: Добавление соединения юзера с ачивкой с achieveId", achieveId, "пользователю с userId:", userId);
  return axios.post(`${API_URL}/user-achiev/create/`, { user_uuid: userId, achiev_uuid: achieveId });
};

//?????????GET-запрос user-achiev (возвращает СОЕДИНЕНИЕ между юзером и наградой ПО ЕЁ ИДЕНТИФИКАТОРУ - {uuid}):
export const fetchGetIDUserAchieve = (userId: string): Promise<AxiosResponse> => {
  //console.log("АPI-GET: Загрузка ачивок пользователя с userId", userId);
  return axios.get(`${API_URL}/user-achiev/${userId}/`);  
};  //работает через жопу!!! (возможно проблема в отображении дублирующихся ачивок)

//НЕ РАБОТАЕТ!!!!
//????DELETE-запрос  user-achiev/deactivate (удаляет СОЕДИНЕНИЕ юзера и награды)
export const fetchDeleteUserAchieve = (connectUuid: string): Promise<AxiosResponse<void>> => {
  console.log("АPI-DELETE: Удаление соединения с connectUuid", connectUuid);
   return axios.delete<void>(`${API_URL}/user-achiev/deactivate/${connectUuid}/`); //где connectUuid - это общий id СОЕДИНЕНИЯ user_uuid и achiev_uuid из fetchPostUserAchieve
};
//или
export const fetchDeleteUserAchieve = (uuid: string, achieveId: string): Promise<AxiosResponse<void>> => {
    console.log("АPI-DELETE: Удаление соединения юзера  с achieveId", achieveId, "пользователю с uuid:", uuid);
    return axios.delete<void>(`${API_URL}/user-achiev/deactivate/`, { user_uuid: uuid, achiev_uuid: achieveId });  // где user_uuid и achiev_uuid - из соединения  из fetchPostUserAchieve 
};
*/ 












/*
//хз, надо ли??  
  //определяем типы для данных, которые возвращает API:
interface UserData {
  // ...определения свойств в соответствии с тем, что возвращает API
}
interface UserAchievements {
  // ...определения свойств в соответствии с тем, что возвращает API
}
*/