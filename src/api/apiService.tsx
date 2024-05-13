import axios, { AxiosResponse } from "axios";
//import { IUser } from "../types/IUser";
//import { IAchieve } from "../types/IAchieve";
//import { IConnection } from "../types/IConnection";

const API_URL = "https://reg.achiever.skroy.ru";  //"http://127.0.0.1:8000/api/v1" - старый адрес в swagger


//GET-запрос user(возвращает список юзеров и их данные):
export const fetchGetUserData = (userRoleId: string) => {  //userRoleId(0 - админ, 1 - работник) 
  // console.log("АPI-GET: Загружен список данных юзеров с RoleId:", userRoleId);
  
  return axios.get(`${API_URL}/profiles/${userRoleId}`);    
  
};
//как будет реестр:  POST-запрос user  -  1) добавляет нового юзера
//как будет реестр:  POST-запрос user  -  2) изменяет данные существующего юзера 



//GET-запрос achiev-lib(возвращает всю библиотеку наград):
export const fetchGetAchieveLibrary = () => {
  // console.log("АPI-GET: Загружена вся библиотека наград");
  return axios.get(`${API_URL}/achievements/`);
};

//POST-запрос achiev-lib/create (записывает в библиотеку новую награду):
export const fetchPostAchieveInLibrary = (formData: FormData): Promise<AxiosResponse> => {
  return axios.post(`${API_URL}/achievements/{id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
/*
//(потом)GET-запрос achiev-lib(возвращает награду ПО ЕЁ ИДЕНТИФИКАТОРУ - {uuid}):
export const fetchGetIDAchieveLibrary = () => {
  return axios.get(`${API_URL}/achiev-lib/{uuid}/`);
};
*/



//POST-запрос user-achiev(соединяет юзера и награду):
export const fetchPostUserAchieve = (userId: string, achieveId: string): Promise<AxiosResponse> => {
  console.log("АPI-POST: Добавление соединения юзера с ачивкой с achieveId", achieveId, "пользователю с userId:", userId);
  return axios.post(`${API_URL}/user-achievements/`, { user_uuid: userId, achiev_uuid: achieveId });
};

//?????????GET-запрос user-achiev (возвращает СОЕДИНЕНИЕ между юзером и наградой ПО ЕЁ ИДЕНТИФИКАТОРУ - {uuid}):
export const fetchGetIDUserAchieve = (userId: string): Promise<AxiosResponse> => {
  console.log("АPI-GET: Загрузка ачивок пользователя с userId", userId);
  return axios.get(`${API_URL}/user-achievements/${userId}/`);  
};  //работает через жопу!!! (возможно проблема в отображении дублирующихся ачивок)


/*  НЕ РАБОТАЕТ!!!!
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
export const fetchDeleteUserAchieve=(id: string):Promise<void>=>{
  if(!id || !API_URL){
    throw new Error("Ошибка: connectUuid или API_URL не определены.")
  }
  console.log("API-DELETE: Ачивка удалина")

  return axios.delete(`${API_URL}/user-achievements/${id}`)
  .then(() =>{
    console.log("Ачивка удалена с сервера");

    return Promise.resolve()
  })
  .catch((error) =>{
    console.log("Ошибка при удалении ачивки с сервера", error)
  })
}


//(потом)GET-запрос user-achiev(cписок имеющихся у юзера наград):  - ЗАЧЕМ ОН ВООБЩЕ????
export const fetchGetUserAchieve = (): Promise<AxiosResponse> => {  
  return axios.get(`${API_URL}/user-achievements/`);  
};











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
