"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.omitPassword = omitPassword;
function omitPassword(user) {
    const userObj = { ...user };
    delete userObj.password;
    return userObj;
}
//# sourceMappingURL=omit-password.js.map