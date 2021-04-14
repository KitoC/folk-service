"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var shared = {
    dialect: "postgres"
};
exports["default"] = {
    development: __assign(__assign({}, shared), { use_env_variable: "DATABASE_URL" }),
    test: __assign(__assign({}, shared), { use_env_variable: "DATABASE_URL_TEST", logging: false }),
    production: __assign(__assign({}, shared), { use_env_variable: "DATABASE_URL" })
};
