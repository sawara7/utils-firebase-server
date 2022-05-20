"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRealTimeDatabase = void 0;
const mongodb_utils_1 = require("mongodb-utils");
const __1 = require("..");
function getRealTimeDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        const mongo = new mongodb_utils_1.MongodbManagerClass('firebase_realtimedatabase');
        let settings;
        if (yield mongo.connect()) {
            const res = yield mongo.find('settings');
            settings = res[0];
            __1.initializeApp(settings);
        }
        else {
            throw new Error('failed');
        }
        return new __1.RealtimeDatabaseClass();
    });
}
exports.getRealTimeDatabase = getRealTimeDatabase;
