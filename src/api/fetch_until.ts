import ky from 'ky';
import localForage from 'localforage';
import { toast } from 'react-toastify';

const api = ky.create({
  prefixUrl: process.env.REACT_APP_HOST,
  hooks: {
    beforeRequest: [
      async options => {
        const token = await localForage.getItem('token');
        const headers: any = options.headers;
        headers.set('Authorization', `Bearer ${token}`);
        console.log(options);
      },
    ],
    afterResponse: [
      async response => {
        console.log(response);
        const { ok, status } = response;
        if (ok) {
          if (status === 200) {
            const data = await response.json();
            if (data.code === '000000') {
              console.log(data);
              console.log(data instanceof Response);
              return data;
            } else {
              throw data;
            }
          } else {
            toast.error('系统异常');
            // throw new Error('Fetch error:');
          }
        } else {
          if (status === 401) {
            toast('登录失效，重新登录！', {
              onClick: () => {
                window.location.href = '';
              },
            });
          }
          toast.error('系统异常');
          // throw new Error(`Fetch error: ${response.statusText}`);
        }
      },
    ],
  },
  timeout: 3000,
  retry: 1,
});

export default api;
