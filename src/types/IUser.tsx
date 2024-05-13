export interface IUser {
  profile_id?: string | undefined;   
  profile_type?: string | undefined;   //"anonymous"
  profile_code?: string | undefined;  //"anonymous:a40a62fa-ee5e-4036-ae37-6c4329cffca1"
  first_name?: string | undefined;
  last_name?: string | undefined;
  middle_name?: string | undefined;
  birth_date?: string | undefined;
  sex?: string | undefined;   // "male" | "female" 
  contact_phone?: [
    {
      title?: string | undefined;      //"phone"
      value?: string | undefined;        //"123233133"
    }
    // далее через азпятую можно добавлять другие контакты (домофон, таксофон и тп)
  ],
  contact_email?: [
    {
      title?: string | undefined;    //"email",
      value?: string | undefined;    //"user@example.com"
    }  
    // далее через азпятую можно добавлять другие контакты (соцсети и тп)
  ],
  photo_main?: string | undefined;   //"https://www.example.com/media/imag/photo_main.jpg" - ПУСТОЙ url!!!
  photo_small?: string | undefined;        //"https://i.ibb.co/VgV2MMG/photo-5276016257260443726-m.jpg"
  project_info?: {
    achiever?: string | undefined;          //"project"
    other_info?: {
      proffesion?: string | undefined;         //"backend"
//СЮДА МЫ,ВРОДЕ КАК, САМИ ДОЛЖНЫ ЗАСУНУТЬ СВОЙСТВА ТИПА "дата начала работы", "код подразделения" и тп!!!
    }
  },
  project_id?: string | undefined;        //"8b46d901-b709-41d3-9248-0f7a4d2a07c9"

}

/*
//СТАРОЕ
export interface IUser {
  uuid?: string | undefined;
  name?: string | undefined;
  fullname?: string | undefined;
  email?: string | undefined;
  age?: number | undefined;
  company?: string | undefined;
  site?: string | undefined;
  foto?: string | undefined;
  birthday?: string | undefined;
  gender?: string | undefined;
  registration_day?: string | undefined;
  proffesion?: string | undefined;
  number?: string | undefined;
}
*/