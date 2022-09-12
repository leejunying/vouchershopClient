export const host = "https://vouchershop-server.vercel.app";
// export const host = "http://localhost:5000";
export const Request_User = {
  register: `${host}/auth/register`, //post
  login: `${host}/auth/login`, //post
  topvoucher: `${host}/voucher/top`, //get
  findvoucher: `${host}/voucher/find`, //get
  getslidevoucher: `${host}/voucher/slide`,

  getsearchvoucher: (text) => {
    return `${host}/voucher/search/${text}`;
  },
  filtervoucher: (key, page, tag) => {
    return `${host}/voucher/filter?key=${key}&&page=${page}&&tag=${tag}`;
  },

  submitpayment: `${host}/payment`, //post
  getTopPost: `${host}/post/top`,

  //profile
  putPassword: `${host}/user/password`,
  putInfo: `${host}/user`,
  ///post
  getPost: `${host}/post`, //query by page
  getPostByID: (id) => {
    return `${host}/post/find?id=${id}`;
  },
  getprofile: (id) => {
    return `${host}/user/find?id=${id}`;
  },
  getcategory: `${host}/category`,
};
export const Request_Admin = {
  ///////voucher
  getAllvoucher: `${host}/voucher?`,
  postNewvoucher: `${host}/voucher`,
  putUpdatevoucher: `${host}/voucher`,
  deleteVoucherById: `${host}/voucher`,
  getvoucherbykey: `${host}/voucher?`, //get (categorykey="all||key name"&&page="")
  getallvoucher: `${host}/voucher`, //get
  getDetailpostByVoucherid: (voucherid) => {
    return `${host}/detailpost?voucherid=${voucherid}`;
  }, //querybyID voucherid=
  /////////detailpost
  postDetailpost: `${host}/detailpost`, //verify admin,body= {voucherid,type,content}
  putDetailpost: `${host}/detailpost`, //verify admin,detailpostid=_id, updatebody={voucherid,type,content}
  deleteDetailpost: `${host}/detailpost`, //verify admin,body _id
  /////////category
  getcategory: `${host}/category`,
  ///////Post
  getPost: `${host}/post`,
  postPost: `${host}/post`, //verify admin ,body ={categoryid,title,content,author}
  putPost: `${host}/post`, //verify admin , body = {categoryid,title,author}
  deletePost: `${host}/post`, //verify admin , body _id
  ///////Payment
  getCountPayment: `${host}/payment/count`,
  getPayment: `${host}/payment`,
  putPayment: `${host}/payment`,
  deletePayment: `${host}/payment`,
  ////User
  getAllUser: `${host}/user`, // need verify token
  deleteUser: `${host}/user`, // need verify token and user id
  putUpdateUser: `${host}/user`,
};
