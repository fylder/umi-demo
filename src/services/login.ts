import { host } from '@/config/api';
import { request } from 'umi';

export interface FromDataType {
  username: string;
  password: string;
}

// 获取token
export async function fecthAccountToken(params: FromDataType) {
  return request(`${host}/user/login`, {
    method: 'POST',
    mode: 'cors',
    requestType: 'form',
    headers: {
      Authorization: 'Basic ZnlsZGVyOm15X3NlY3JldA==',
    },
    data: {
      grant_type: 'password',
      username: params.username,
      password: params.password,
    },
  });
}
