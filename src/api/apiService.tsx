import axios, { AxiosResponse } from "axios";

const API_URL = "https://reg.achiever.skroy.ru";  //"http://127.0.0.1:8000/api/v1" - старый адрес в swagger

// Определяем типы для данных, которые возвращает API:
interface UserData {
  // ...определения свойств в соответствии с тем, что возвращает API
}
interface UserAchievements {
  // ...определения свойств в соответствии с тем, что возвращает API
}


//GET-запрос user(возвращает список юзеров):
export const fetchGetUserData = (userId: string) => {  //userId(0 - админ, 1 - работник) 
  return axios.get(`${API_URL}/user/${userId}`);    //в старом было ещё /get/ в конце
};

//как будет сервак:  POST-запрос user  -  1) добавляет нового юзера
//как будет сервак:  POST-запрос user  -  2) изменяет данные существующего юзера 
 



//!!!!!!!!!!!!!!!GET-запрос achiev-lib(возвращает библиотеку наград):
export const fetchGetAchieveLibrary = () => {
  return axios.get(`${API_URL}/achiev-lib/list/get/`);
};

//(потом)POST-запрос achiev-lib(записывает в библиотеку новую награду):
export const fetchPostAchieveLibrary = () => {
  return axios.post(`${API_URL}/achiev-lib/post/`);
};

//(потом)GET-запрос achiev-lib(возвращает награду ПО ЕЁ ИДЕНТИФИКАТОРУ - {uuid}):
export const fetchGetIDAchieveLibrary = () => {
  return axios.get(`${API_URL}/achiev-lib/{uuid}/get/`);
};



//!!!!!!фильтр от Лёни??GET-запрос user-achiev(cписок имеющихся у юзера наград):
export const fetchGetUserAchievements = (userId: string): Promise<AxiosResponse<UserAchievements>> => {
//- аналогично userId типизирован, и функция возвращает промис с ответом Axios
  return axios.get<UserAchievements>(`${API_URL}/user-achiev/list/get/`);  
};

//!!!!!!фильтр от Лёни???POST-запрос user-achiev(соединяет юзера и награду):
export const fetchPostUserAchieve = (userId: string): Promise<AxiosResponse<UserAchievements>> => {
    return axios.get<UserAchievements>(`${API_URL}/user-achiev/post/`);  
  };

//(потом)GET-запрос user-achiev(возвращает соединение между юзером и наградой ПО ЕЁ ИДЕНТИФИКАТОРУ - {uuid}):
export const fetchGetIDUserAchieve = (userId: string): Promise<AxiosResponse<UserAchievements>> => {
  //- аналогично userId типизирован, и функция возвращает промис с ответом Axios
    return axios.get<UserAchievements>(`${API_URL}/user-achiev/list/get/`);  
  };
