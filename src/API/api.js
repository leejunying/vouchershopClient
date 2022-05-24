const host = "http://localhost:5000";
export const Request_User = {
  register: `${host}/auth/register`,
  login: `${host}/auth/login`,
  topvoucher: `${host}/voucher/top`,
  voucher: `${host}/voucher/find`,
};

export const Request_Admin = {
  voucher: `${host}/voucher?`,
};
