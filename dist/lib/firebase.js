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
exports.getRealTimeDatabase = getRealTimeDatabase;
const utils_mongodb_1 = require("utils-mongodb");
const __1 = require("..");
function getRealTimeDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        const mongo = new utils_mongodb_1.MongodbManagerClass('firebase_realtimedatabase');
        let settings;
        if (yield mongo.connect()) {
            const res = yield mongo.find('settings');
            if (!res.result || !res.data)
                throw new Error('failed get settings from mongoDB');
            settings = res.data[0];
            (0, __1.initializeApp)(settings);
        }
        else {
            throw new Error('failed getRealtimeDatabase');
        }
        return new __1.RealtimeDatabaseClass();
    });
}
