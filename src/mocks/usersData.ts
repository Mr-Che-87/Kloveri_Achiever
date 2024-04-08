export interface IUser {
  id: number;
  name: string;
  fullname: string;
  avatar: string;
  role: "user" | "admin";
  email: string;
  profession: string;
  age: number;
  birthday: string;
  registration_day: string;
  number: string;
  gender: "male" | "female";
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
  birthday: "02.03.1989",
  registration_day: "04.05.2017",
  number: "КК 330011",
  gender: "male",
  // company и site добавим позже, когда они будут необходимы
};
