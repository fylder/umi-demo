const ACCESS_TOKEN = 'wechat_access_token'; // 登录口令
const EXPIRES_IN = 'wechat_expires_in';
const UPLOAD_TOKEN = 'upload_token'; // 七牛上传口令
const UPLOAD_TOKEN_EXPIRES = 'upload_token_expires_in';

// 保存登录口令
export const saveAccessToken = (access_token: string, expires_in: number) => {
  localStorage.setItem(ACCESS_TOKEN, access_token);
  localStorage.wechat_expires_in = Date.now() + expires_in * 1000;
};

// 获取登录口令
export const selectAccessToken = (): string => {
  // token失效
  if (Date.now() > localStorage.wechat_expires_in) {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(EXPIRES_IN);
    return '';
  }
  let access_token = localStorage.getItem(ACCESS_TOKEN);
  if (access_token === null) {
    access_token = '';
  }
  return access_token;
};

// 保存上传口令
export const saveUploadToken = (upload_token: string, expires_in: number) => {
  localStorage.setItem(UPLOAD_TOKEN, upload_token);
  localStorage.upload_token_expires_in = Date.now() + expires_in * 1000;
};

// 获取上传口令
export const getUploadToken = (): string => {
  // token失效
  if (Date.now() > localStorage.upload_token_expires_in) {
    localStorage.removeItem(UPLOAD_TOKEN);
    localStorage.removeItem(UPLOAD_TOKEN_EXPIRES);
    return '';
  }
  let uplpad_token = localStorage.getItem(UPLOAD_TOKEN);
  if (uplpad_token === null) {
    uplpad_token = '';
  }
  return uplpad_token;
};
