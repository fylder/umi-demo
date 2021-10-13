/** 定义 状态数据 */
export type StateType = {
  action: string;
  info: string;
};

// Define the initial state using that type
export const initialState: StateType = {
  action: 'response',
  info: 'ahh',
};

export default {
  namespace: 'book',
  state: initialState,
  reducers: {
    query: (state: any, { payload }: any) => {
      console.log('state:', state);
      initialState.info = payload.id;
      let resp = { ...state, ...initialState };
      console.log('resp:', resp);
      return { ...initialState };
      //   return state.filter((item) => item.id !== id);
    },
  },
};
