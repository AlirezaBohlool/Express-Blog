const statistic = require("@models/statistice");
module.exports = {
  dashbord: async (req, res) => {
    const data = {
      totalUser: await statistic.totalUser(),
      totalComment:await statistic.totalComment(),
      totalPost : await statistic.totalPosts(),
      totalView : await statistic.totalView()
    };
    res.adminRender("admin/dashborad/index", { layout: "admin", ...data });
  },

};
