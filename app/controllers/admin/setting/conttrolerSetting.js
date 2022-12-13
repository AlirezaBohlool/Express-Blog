const settingModel = require("@models/setting");
exports.index = async (req, res) => {
  const setting = await settingModel.findAll();
  // console.log(setting)
  const optimizeSetting = {};
  setting.forEach((item) => {
    optimizeSetting[item.name] = item.value;
  });
  
  res.adminRender("admin/setting/index", {
    layout: "admin",
    optimizeSetting,
    helpers: {
      isChecked: function (value, options) {
        return parseInt(value) === 1 ? options.fn(this) : options.inverse(this);
      },
    },
  });
};

exports.register = async (req, res) => {
  const data = {
    title_web_sit: req.body.title_web_sit,
    content_web_sit: req.body.content_web_sit,
    discription: req.body.discription,
    everybody_register: req.body.everybody_register,
    everybody_register_comment: req.body.evrybody_register_comment,
  };

  const dataOptimize = {};
  // console.log(data);
  Object.keys(data).forEach((dataKeys) => {
    if (data[dataKeys] === "on") {
      data[dataKeys] = 1;
    } else if (data[dataKeys] === undefined) {
      data[dataKeys] = 0;
    } else {
      data[dataKeys] = data[dataKeys];
    }
    dataOptimize[dataKeys] = data[dataKeys];
  });
  // console.log("this register log")
  // console.log(dataOptimize);
  const result = await settingModel.update(dataOptimize);
  res.redirect("/admin/setting");
};
