// export interface IUser {
//   uuid?: string | undefined;
//   first_name?: string | undefined;
//   last_name?: string | undefined;
//   email?: string | undefined;
//   age?: number | undefined;
//   company?: string | undefined;
//   site?: string | undefined;
//   foto?: string | undefined;
//   birthday?: string | undefined;
//   gender?: string | undefined;
//   registration_day?: string | undefined;
//   proffesion?: string | undefined;
//   number?: string | undefined;
// }
export interface IUser{
  profile_id: string  | undefined;
  first_name: string  | undefined;
  last_name: string  | undefined;
  middle_name: string  | undefined;
  birth_date: number  | undefined;
  sex: string  | undefined;
  photo_main: string  | undefined;
  photo_small: string  | undefined;
}
