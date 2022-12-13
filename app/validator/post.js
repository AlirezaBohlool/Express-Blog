exports.validatvalue = (req) => {
  const errors = [];

  if (req.body.title === "") {
    errors.push("نام مطلب شما نمی نواند خالی باشد");
  }
  if (req.body.slug === "") {
    errors.push("نامک شما نمی تواند خالی باشد");
  }
  if (req.body.status === "") {
    errors.push("وضعیت مطلب خود را مشخص کنید");
  }
  if (req.body.content === "") {
    errors.push("توضیحات را نمیتواند خالی باشد");
  }
   console.log(errors)
  return errors 
};
