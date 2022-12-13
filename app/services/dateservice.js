const jm = require("jalali-moment");

exports.dateparse = (date, format = 'YYYY/MM/DD') => {
   return jm(date).local("fa").format(format); 
};
