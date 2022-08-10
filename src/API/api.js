const host = "http://localhost:5000";
export const Request_User = {
  register: `${host}/auth/register`, //post
  login: `${host}/auth/login`, //post
  topvoucher: `${host}/voucher/top`, //get
  findvoucher: `${host}/voucher/find`, //get
  getsearchvoucher: (text) => {
    return `${host}/voucher/search/${text}`;
  },
  filtervoucher: (key, page) => {
    return `${host}/voucher/filter?key=${key}&&page=${page}`;
  }, //get + query
  submitpaypal: `${host}/payment`, //post
};
export const Request_Admin = {
  getAllvoucher: `${host}/voucher?`,
  postNewvoucher: `${host}/voucher`,
  putUpdatevoucher: `${host}/voucher`,
  deleteVoucherById: `${host}/voucher`,
  getvoucherbykey: `${host}/voucher?`, //get (categorykey="all||key name"&&page="")
  getallvoucher: `${host}/voucher`, //get
  getDetailpostByVoucherid: (voucherid) => {
    return `${host}/detailpost?voucherid=${voucherid}`;
  }, //querybyID voucherid=
  postDetailpost: `${host}/detailpost`, //verify admin,body= {voucherid,type,content}
  putDetailpost: `${host}/detailpost`, //verify admin,detailpostid=_id, updatebody={voucherid,type,content}
  deleteDetailpost: `${host}/detailpost`, //verify admin,body _id
  getcategory: `${host}/category`,
  getPost: `${host}/post`,
  postPost: `${host}/post`, //verify admin ,body ={categoryid,title,content,author}
  putPost: `${host}/post`, //verify admin , body = {categoryid,title,author}
  deletePost: `${host}/post`, //verify admin , body _id
};
