import { saveAccessToken } from '@/config/oauth-store';
import { fecthAccountToken } from '@/services/login';

/** 定义 状态数据 */
export type StateType = {
  action: string;
  info: string;
  access_token: string;
};

// Define the initial state using that type
export const initialState: StateType = {
  action: 'response',
  info: 'ahh',
  access_token: '',
};

export default {
  namespace: 'login',
  state: initialState,
  effects: {
    *loginAhh({ payload }: any, { call, put }: any) {
      let responseToken;
      try {
        responseToken = yield call(fecthAccountToken, payload); // 获取token_access
        // console.log('response', responseToken);
      } catch (error: any) {
        console.log('get token error:', error);
        responseToken = error.data;
      }
      if (responseToken.access_token) {
        console.log('登录成功');
        yield saveAccessToken(
          responseToken.access_token,
          responseToken.expires_in,
        );
      } else {
        console.log('登录失败');
      }
      // const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'loginResult',
        payload: { access_token: responseToken.access_token },
      });
    },
  },
  reducers: {
    login: (state: any, { payload }: any) => {
      console.log('state:', state);
      initialState.info = payload.id;
      let resp = { ...state, ...initialState };
      console.log('resp:', resp);
      return { ...initialState };
      //   return state.filter((item) => item.id !== id);
    },
    loginResult: (state: any, { payload }: any) => {
      console.log('loginResult state:', payload);
      return { ...initialState, access_token: payload.access_token };
    },
  },
};
