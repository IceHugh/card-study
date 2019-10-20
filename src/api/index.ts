import { CardData } from 'types';
import Ajax from './fetch_until';
import { CategoryData } from 'types';

interface AuthParams {
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
  syncCategory(data: CategoryData) {
    return Ajax.post('category/sync', {
      json: data,
    });
  },
  getCategorys() {
    return Ajax.get('categorys');
  },
  login(data: AuthParams) {
    return Ajax.post('auth/login', {
      json: data,
    });
  },
  signin(data: AuthParams) {
    return Ajax.post('auth/signin', {
      json: data,
    });
  },
};
