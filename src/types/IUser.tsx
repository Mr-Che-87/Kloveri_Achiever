/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IUser {
<<<<<<< HEAD
  
=======
  link_id(link_id: any, formDataToSend: FormData): unknown;
  organization_id: string | undefined;
>>>>>>> dev3
  profile_id?: string | undefined;   
  profile_type?: string | undefined;        //"anonymous"
  profile_code?: string | undefined;
  login?: string | undefined;        //"anonymous:a40a62fa-ee5e-4036-ae37-6c4329cffca1"
  first_name?: string | undefined;
  last_name?: string | undefined;
  middle_name?: string | undefined;
  birth_date?: string | undefined;
  sex?: string | undefined;     //удалить           //"male"||"female" строго 
  phone?: string | undefined; 
  email?: string | undefined;    
  photo_main?: any;      //"https://i.ibb.co/dK1hhcD/big1.png"
  photo_small?: any;   //"https://i.ibb.co/VwzhZgk/small1.png"
  start_work_date?: string | undefined;
  specialty?: string | undefined;
  link_weight?: number | undefined;
<<<<<<< HEAD
  project_id?: string | undefined;        
=======
  project_id?: string | undefined; 
  password? : string | undefined;
     
>>>>>>> dev3

}


//"https://www.example.com/media/imag/photo_main.jpg" - ПУСТОЙ url для теста

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