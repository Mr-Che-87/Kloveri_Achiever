export interface IAchieve {
  uuid(uuid: any): void;
  id: string;
  created_date: string;
  modified_date: string;

  data: {
    tag: string;
    rank: number;
    color: string;
    image: string;
    title: string;
    description: string;
    achiev_style: string;
  };
}


