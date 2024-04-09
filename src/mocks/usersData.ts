export interface IUser {
  id: number;
  name: string;
  fullname: string;
  avatar: string;
  role: "user" | "admin";
  email: string;
  profession: string;
  age: number;
  birthday: Date;
  registration_day: Date;
  number: string;
  gender: "male" | "female";
  [key: string]: any; 
  // Оставляем *company и *site для будущего использования
  // teams будет использоваться позже
}

export const mockUserData: IUser = {
  id: 1,
  name: "Иван Сергеевич",
  fullname: "Михайлов Иван Сергеевич",
  avatar: "/static/fotos/avatar1.jpg",
  role: "admin",
  email: "ivan.mikhailov@company.com",
  profession: "Developer",
  age: 35,
  birthday: new Date("1989-03-02"),
  registration_day: new Date("2017-05-04"),
  number: "КК 330011",
  gender: "male",
  // company и site добавим позже, когда они будут необходимы
};
