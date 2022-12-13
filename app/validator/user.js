exports.validatvalue = (req) => {
  const errors = [];

  if (req.body.ful_name === "") {
    errors.push("نام و نام خانوادگی شما نمی نواند خالی باشد");
  }
  if (req.body.email === "") {
    errors.push("ایمیل نمی تواند خالی باشد ");
  }
  if (req.body.password === "") {
    errors.push("کلمه عبور خود را وارد کنید ");
  }
  if (req.body.role === "") {
    errors.push(" پست کاربر را تعیین کنید");
  }
  
  return errors 
};
