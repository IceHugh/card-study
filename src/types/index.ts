export interface CardData {
  id?: string;
  ulid: string;
  auth?: string;
  title: string;
  desc: string;
  type: string;
  date?: string | number | Date;
  content: string;
  tags?: string | string[];
}
// export CardListData: CardData[];

export interface ItemData {
  center: {
    x: number;
    y: number;
  };
  content: string;
}

export interface CategoryData {
  category: string;
  date: string | number;
  auth: string;
  desc?: string;
  ulid: string;
  type: string;
  cards: CardData[];
}
