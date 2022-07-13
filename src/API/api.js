const host = "http://localhost:5000";
export const Request_User = {
  register: `${host}/auth/register`, //post
  login: `${host}/auth/login`, //post
  topvoucher: `${host}/voucher/top`, //get
  findvoucher: `${host}/voucher/find`, //get
  filtervoucher: (key, page) => {
    return `${host}/voucher/filter?key=${key}&&page=${page}`;
  }, //get + query
  submitpaypal: `${host}/payment`, //post
};

export const Request_Admin = {
  getAllvoucher: `${host}/voucher?`,
  postNewvoucher: `${host}/voucher`,
  putUpdatevoucher: `${host}/voucher`,
  getcategory: `${host}/category`,
  getvoucherbykey: `${host}/voucher?`, //get (categorykey="all||key name"&&page="")
  getallvoucher: `${host}/voucher`, //get
};
