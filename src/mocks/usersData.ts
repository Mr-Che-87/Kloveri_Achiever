export interface IUser {
  id: number;
  name: string;
  fullname: string;
  avatar: string;
  role: "admin"  | "worker";  //admin(id 0)  |  worker(id 1) - фикса
  email: string;
  profession: string;
  age: number;
  birthday: string    //ебала с датой  //Date
  registration_day: string;  //ебала с датой //Date
  number: string;
  gender: "male" | "female";
  [key: string]: any; 
  // Оставляем *company и *site для будущего использования
  // teams будет использоваться позже
}

export const mockUserData: IUser = {
  id: 1,
  name: "Заглушка Моковская",
  fullname: "Моковская Заглушка Фронтендовна",
  avatar: "/static/fotos/avatar1.jpg",
  role: "worker",   
  email: "mock@company.com",
  profession: "Developer",
  age: 35,
  birthday: "1989-03-02",   //ебала с датой:  //birthday: new Date("1989-03-02"),
  registration_day: "2017-05-04",   //ебала с датой:   //registration_day: new Date("2017-05-04"),
  number: "КК 330011",
  gender: "female",
  // company и site добавим позже, когда они будут необходимы
};
