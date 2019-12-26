export interface CardData {
  id?: string;
  ulid: string;
  authName?: string;
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
  name: string;
  careteDate: string | number;
  authName: string;
  authId: string;
  desc?: string;
  ulid: string;
  type: string;
  cards: CardData[];
}

export type CategorysData = CategoryData[];
export type CardsData = CardData[];
