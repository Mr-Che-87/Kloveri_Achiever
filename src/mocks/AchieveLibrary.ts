import ImgAchievement from "@/assets/imgAchievementImg.png";

export interface IAchieve {
  id: number;
  title: string;
  image: string;
  added?: boolean; // Добавлено ли достижение. "?" - пока сделал его необязательным.
}

export const mockAchieveLibrary: IAchieve[] = [
  { id: 0, title: 'ачивка-1', image: ImgAchievement, added: true },
  {  id: 1, title: 'ачивка-2', image: ImgAchievement, added: true },
  { id: 2, title: 'ачивка-3', image: ImgAchievement, added: true },
  { id: 3, title: 'ачивка-4', image: ImgAchievement, added: true },
  { id: 4, title: 'ачивка-5', image: ImgAchievement, added: true },
  { id: 5, title: 'ачивка-6', image: ImgAchievement, added: false },
  { id: 6, title: 'ачивка-7', image: ImgAchievement, added: false },
  { id: 7, title: 'ачивка-8', image: ImgAchievement, added: false },
  { id: 8, title: 'ачивка-9', image: ImgAchievement, added: false },
  { id: 9, title: 'ачивка-10', image: ImgAchievement, added: false },
];


/*
// Функция для обновления свойства added в соответствии с id ачивки - НО ВСЁ РАВНО НЕ ЗАМЕНЯЕТ(БЕЗ СЕРВЕРА НЕРЕРАЛЬНО ПОХОДУ)
export const updateAchieveLibrary = (achieveId: number, added: boolean) => {
  mockAchieveLibrary.forEach((achieve) => {
    if (achieve.id === achieveId) {
      achieve.added = added;
    }
  });
};
*/