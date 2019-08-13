import Ajax from './fetch_until';
interface LoginData {
  username: string,
  password: string
}
interface PostQuery {
  id?: string;
  title: string | null;
  content: string;
  desc?: string;
  tags?: string[];
  category?: string[];
  time?: Date | number;
}
interface PostsParams {
  tag?: string;
  category?: string;
}
interface PostId {
  'id': string;
}
export default {
  login(data: LoginData) {
    return Ajax.post('login', {
      json: data
    });
  },
  postPost(data: PostQuery) {
    return Ajax.post('post', {
      json: data,
    });
  },
  patchPost(data: PostQuery) {
    console.log(data);
    return Ajax.patch('post', {
      json: data,
    });
  },
  deletePost(data: PostId) {
    return Ajax.delete('post', {
      searchParams: {
        ...data,
      },
    });
  },
  getPosts() {
    return Ajax.get('posts');
  },
  getPostDetail(data: PostId) {
    return Ajax.get('post', {
      searchParams: {
        ...data,
      },
    });
  }
};
