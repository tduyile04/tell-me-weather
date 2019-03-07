"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const data_1 = require("./data");
const functions_1 = require("./utils/functions");
const getCurrentWeather = (locations, makeUrlFn) => __awaiter(this, void 0, void 0, function* () {
    const result = [];
    let promise;
    let modifiedUrl;
    let resolved;
    locations.forEach(({ postalCode, name }) => {
        modifiedUrl = makeUrlFn(name, postalCode);
        resolved = axios_1.default.get(modifiedUrl);
        result.push(resolved);
    });
    try {
        promise = yield Promise.all([...result]);
    }
    catch (err) {
        throw new Error(err);
    }
    return [...promise];
});
const displayWeatherResults = () => {
    getCurrentWeather(data_1.locationData, functions_1.makeUrl)
        .then((weatherResults) => {
        weatherResults.forEach((result, i) => {
            const data = result.data;
            console.log(functions_1.formatResult(data));
        });
    })
        .catch(error => {
        console.log(`Error: ${error.message}`);
    });
};
// ---- Print the result to stdout ----
displayWeatherResults();
//# sourceMappingURL=index.js.map