import axios, { AxiosResponse } from "axios";
import { IUser } from "../types/IUser";
import { IAchieve } from "../types/IAchieve";
import { IConnection } from "../types/IConnection";
//import { IConnection } from "../types/IConnection";

const API_URL = "https://api.achiever.skroy.ru"; //обновлённый базовый URL


//Profiles//
//GET-Получение списка всех пользователей
export const fetchGetAllUsers = (): Promise<AxiosResponse> => {
  return axios.get(`${API_URL}/profiles/`,{
    headers:{
      "ORGANIZATION-ID": "642dc1e1-162d-4cb5-a3d1-7f4fcbcb5389"
      
    }
  });
};


// POST-Добавление нового пользователя                      
export const fetchPostUser = (
  userData: IUser
): Promise<AxiosResponse<IUser>> => {
  return axios.post<IUser>(`${API_URL}/profiles/`, userData);
};

// GET-Получение данных одного пользователя по ID
export const fetchGetUserData = (
  // userId: string,
  profileId: string,
  // token: string
): Promise<AxiosResponse<IUser>> => {
  return axios.get<IUser>(`${API_URL}/profiles/${profileId}/`)
};

// PATCH-Обновление данных существующего пользователя  
export const fetchUpdateUser = (
  profile_id: string,
  formData: FormData,
): Promise<AxiosResponse<IUser>> => {
  console.log("Отправка запроса на обновление данных пользователя:", formData);
  return axios.patch<IUser>(`${API_URL}/profiles/${profile_id}/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

// DELETE-Удаление пользователя по ID                           
export const fetchDeleteUser = (profile_id: string, organizationId: string): Promise<AxiosResponse> => {
  console.log(`Sending request to delete user ${profile_id} with organizationId ${organizationId}`);
  return axios.delete(`${API_URL}/profiles/${profile_id}/`, {
    headers:{
      "ORGANIZATION-ID":organizationId
    }
  })
 
};


// get- link возвращает связь с организацией по link_id
export const fetchGetLink = (
  profile_id: string,
  organizationId: string,

) => {
  return axios.get(`https://api.achiever.skroy.ru/link/${profile_id}/`,{
headers: {
  "Content-Type": "application/json",
  "ORGANIZATION-ID": organizationId
}
  })
}



// PATCH-Link 
export const fetchUpdateLink = (
  link_id: string, 
  formData:FormData,
) => {
  return axios.patch(`https://api.achiever.skroy.ru/link/${link_id}/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};


//Achievements library//
// GET-Получение всей библиотеки наград
export const fetchGetAchieveLibrary = (): Promise<
  AxiosResponse<IAchieve[]>
> => {
  return axios.get<IAchieve[]>(`${API_URL}/achievements/`,{
    headers:{
      "ORGANIZATION-ID": "642dc1e1-162d-4cb5-a3d1-7f4fcbcb5389"
    }
  });
};

// POST-Добавление новой награды в библиотеку
export const fetchPostAchieveLibrary = (
  achieveData: FormData
): Promise<AxiosResponse<IAchieve>> => {
  return axios.post<IAchieve>(`${API_URL}/achievements/`, achieveData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "ORGANIZATION-ID": "642dc1e1-162d-4cb5-a3d1-7f4fcbcb5389"
    },
  });
};

// GET-Получение достижения по ID                              //потом
export const fetchGetAchieveById = (
  achieveId: string
): Promise<AxiosResponse<IAchieve>> => {
  return axios.get<IAchieve>(`${API_URL}/achievements/${achieveId}`);
};

// PATCH-Обновление достижения по ID                          //потом
export const fetchUpdateAchieve = (
  achieveId: string,
  achieveData: IAchieve
): Promise<AxiosResponse<IAchieve>> => {
  return axios.patch<IAchieve>(
    `${API_URL}/achievements/${achieveId}/`,
    achieveData
  );
};

// DELETE-Удаление достижения по ID                        
export const fetchDeleteAchieve = (
  achieveId: string
): Promise<AxiosResponse> => {
  return axios.delete(`${API_URL}/achievements/${achieveId}/`);
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



//Connections//
// GET-Получение списка всех связей всех пользователей с достижениями     //хз зачем, потом  
export const fetchGetUserAchievements = (): Promise<
  AxiosResponse<IConnection>
> => {
  return axios.get<IConnection>(`${API_URL}/user-achievements/`);
};

// POST-Создание связи между пользователем и достижением           
export const fetchPostUserAchieve = (
  userId: string,
  achieveId: string
): Promise<AxiosResponse<IConnection>> => {
  //console.log("АPI-POST: Добавление соединения пользователя с userId", userId, "с ачивкой achieveId:", achieveId);
  return axios.post<IConnection>(`${API_URL}/user-achievements/`, { 
    user_id: userId, 
    achievement_id: achieveId 
  });
};

// GET-Получение списка достижений пользователя по ID
export const fetchGetIDUserAchieve = (
  userAchievementId: string
): Promise<AxiosResponse> => {    //убрал <IConnection> - ибо в интефейсе он объект, а нужен массив(на код не влияет, но TS ругается)
  return axios.get(               //убрал <IConnection>
    `${API_URL}/user-achievements/${userAchievementId}/`
  );
};

// PATCH-Обновление связи между пользователем и достижением по ID       //хз зачем, потом  
export const fetchUpdateUserAchievement = (
  userAchievementId: string,
  updates: Partial<IConnection>
): Promise<AxiosResponse<IConnection>> => {
   return axios.patch<IConnection>(
    `${API_URL}/user-achievements/${userAchievementId}/`,
    updates
  );
};

// DELETE-Удаление связи между пользователем и достижением по ID      
export const fetchDeleteUserAchievement = (
  id: string,
): Promise<AxiosResponse<IConnection>> => {
  console.log("АПИ Выполняется запрос на удаление ачивки с id:", id);
  return axios.delete<IConnection>(`${API_URL}/user-achievements/${id}/`);
};
