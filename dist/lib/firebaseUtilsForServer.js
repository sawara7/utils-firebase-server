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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealtimeDatabaseClass = exports.initializeApp = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
function initializeApp(settings) {
    firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert({
            projectId: settings.project_id,
            clientEmail: settings.client_email,
            privateKey: settings.private_key
        }),
        databaseURL: settings.database_url
    });
}
exports.initializeApp = initializeApp;
class RealtimeDatabaseClass {
    constructor(basePath = "") {
        this.basePath = basePath;
        this.callbacks = {};
    }
    getReference(path = "") {
        const p = this.basePath + "/" + path;
        return firebase_admin_1.default.database().ref(p);
    }
    get(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield query.once('value');
            return res.val();
        });
    }
    set(path, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const ref = this.getReference(path);
            yield ref.set(value);
        });
    }
    update(path, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const ref = this.getReference(path);
            yield ref.update(value);
        });
    }
    delete(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const ref = this.getReference(path);
            yield ref.remove();
        });
    }
    push(path, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const ref = this.getReference(path);
            yield ref.push(value);
        });
    }
    register(query, type, callback) {
        let path = query.ref.key;
        if (!path)
            return;
        query.on(type, callback);
        if (this.callbacks[path]) {
            this.callbacks[path][type] = callback;
        }
        else {
            this.callbacks[path] = {};
            this.callbacks[path][type] = callback;
        }
    }
    unregister(query, type) {
        let path = query.ref.key;
        if (!path)
            return;
        query.off(type, this.callbacks[path][type]);
        delete this.callbacks[path][type];
    }
}
exports.RealtimeDatabaseClass = RealtimeDatabaseClass;
