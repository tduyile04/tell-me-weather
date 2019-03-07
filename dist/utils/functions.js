"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const format_1 = __importDefault(require("date-fns/format"));
const constants_1 = require("./constants");
dotenv_1.default.config();
exports.makeUrl = (name, postalCode) => {
    const { API_KEY } = process.env;
    const zip = `${postalCode},${name}`;
    const modifiedUrl = `${constants_1.BASE_URL}?APPID=${API_KEY}&zip=${zip}`;
    return modifiedUrl;
};
const formatDate = (timestamp) => {
    const formattedTime = format_1.default(new Date(timestamp * 1000), 'MM/DD/YYYY hh:mm:ss');
    return formattedTime;
};
const formatWeather = (weather) => {
    let formattedWeather = "";
    weather.forEach(data => {
        formattedWeather += `${data.main} [${data.description}]`;
    });
    return formattedWeather;
};
exports.formatResult = (result) => {
    let formattedResult = "";
    formattedResult += formatWeather(result.weather) + "\n";
    formattedResult += formatDate(result.dt) + "\n";
    return formattedResult;
};
//# sourceMappingURL=functions.js.map