export interface IConnection {
  id: string;
  created_date: string;
  modified_date: string;
  data: {
    user_id: string;
    achievement: {
      achievement_id: string;
      data: {
        tag: string | null;
        rank: number;
        color: string | null;
        image: string;
        title: string;
        description: string;
        achiev_style: string;
      };
      created_date: string;
      modified_date: string;
    };
  };
}

