import ImgAchievement from "@/assets/imgAchievementImg.png";

export interface IAchieve {
  id: number;
  title: string;
  image: string;
  added?: boolean;   //добавлено ли достижение. "?" - пока сделал его необязательным
  tag?: string;
  rank?: number;
  color?: string | null;
  achiev_uuid?: string;
  description?: string;
}

export const mockAchieveLibrary: IAchieve[] = [

//ЛИБО ТУТ(либо в ModalAchieveLibrary) - GET-запрос на всю библиотеку ачивок fetchGetAchieveLibrary 

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
//ОТ ГЕНЫ:
import React, { useState, useEffect } from 'react';

//Обновленный интерфейс IAchieve с новыми полями
export interface IAchieve {
  id: string;
  title: string;
  image: string;
  added?: boolean;
  tag?: string;
  rank?: number;
  color?: string | null;
  achiev_uuid?: string;
  description?: string;
}

const MockAchieveLibrary: React.FC<{ targetIds: string[] }> = ({ targetIds }) => {
  const [achieveList, setAchieveList] = useState<IAchieve[]>([]);

  useEffect(() => {
    const fetchAchieveList = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/achiev-lib/list/get/');
        if (!response.ok) {
          throw new Error('Failed to fetch achieve list');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          const mappedData = data.map((item: any) => {
            if (item.data && Array.isArray(item.data.achiev) && item.data.achiev.length > 0) {
              const firstAchiev = item.data.achiev[0];
              return {
                id: item.id,
                title: firstAchiev.title,
                image: firstAchiev.image,
                added: false,
                tag: firstAchiev.tag,
                rank: firstAchiev.rank,
                color: firstAchiev.color,
                achiev_uuid: firstAchiev.achiev_uuid,
                description: firstAchiev.description
              };
            } else {
              console.error('Invalid data format:', item);
              return null; // Если данные некорректны, вернем null
            }
          }).filter(Boolean); // Фильтруем null значения из массива

          // Фильтруем список объектов по заданным id
          const filteredAchieveList = mappedData
  .filter((item) => item !== null && targetIds.includes(item.id))
  .map((item) => item as IAchieve);
          setAchieveList(filteredAchieveList);
        } else {
          throw new Error('Received data is not an array');
        }
      } catch (error) {
        console.error('Error fetching achieve list:', error);
      }
    };

    fetchAchieveList();
  }, [targetIds]); // Добавляем targetIds в зависимости, чтобы компонент обновлялся при изменении этого списка

  return (
     <div>
      {achieveList.map(achieve => (
        <div key={achieve.id}>
          <p>ID: {achieve.id}</p>
          <p>Title: {achieve.title}</p>
          <p>Tag: {achieve.tag}</p>
          <p>Rank: {achieve.rank}</p>
          <img src={achieve.image} alt="Achievement Image" width="80" height="80" />
          {achieve.added && <p>Added</p>}
        </div>
      ))}
    </div>
    
  );
};

export default MockAchieveLibrary;
*/
















// Функция для обновления свойства added в соответствии с id ачивки - НО ВСЁ РАВНО НЕ ЗАМЕНЯЕТ(БЕЗ СЕРВЕРА НЕРЕРАЛЬНО ПОХОДУ)
//export const updateAchieveLibrary = (achieveId: number, added: boolean) => {
//  mockAchieveLibrary.forEach((achieve) => {
//    if (achieve.id === achieveId) {
//      achieve.added = added;
////    }
//  });
//};
//