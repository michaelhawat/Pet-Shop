const moment = require("moment");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



class Utils {

    static formatDateSQL(date) {
        return moment(date, 'YYYY-MM-DD hh:mm').format("YYYY-MM-DD hh:mm");
    }
     static formatDaySQL(date) {
        return moment(date, 'YYYY-MM-DD').format("YYYY-MM-DD ");
    }
    static formatDate() {
        return moment().format("YYYY-MM-DD hh:mm");
    }

    static formatDay() {
        return moment().format("YYYY-MM-DD ");
    }
    static async hashedPassword(password) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }
}

module.exports = Utils;