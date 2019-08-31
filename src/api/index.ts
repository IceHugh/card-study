import { CardData } from 'types';
import Ajax from './fetch_until';
interface LoginData {
  username: string;
  password: string;
}
interface CardQueryId {
  id: string;
}
interface CardQueryTitle {
  title: string;
}
interface CardsQuery {
  catetory?: string;
}

export default {
  createCard(data: CardData) {
    return Ajax.post('card', {
      json: data,
    });
  },
  findCard(data: CardQueryId | CardQueryTitle) {
    return Ajax.get('card', {
      searchParams: {
        ...data,
      },
    });
  },
  findCards(data?: CardsQuery) {
    let config = {};
    if (data) {
      config = {
        searchParams: {
          ...data,
        },
      };
    }
    return Ajax.get('cards', config);
  },
};
