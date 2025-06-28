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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUsersDataSeed = void 0;
/* eslint-disable prettier/prettier */
var client_1 = require("@prisma/client");
var bcrypt = require("bcrypt");
var generateUsersDataSeed = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    var _b, _c, _d, _e, _f, _g, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                _b = {
                    email: 'mehdi@nac.tn',
                    name: 'mehdi'
                };
                return [4 /*yield*/, bcrypt.hash('mehdi123', 10)];
            case 1:
                _a = [
                    (_b.password = _j.sent(),
                        _b.role = client_1.Role.SUPER_ADMIN,
                        _b)
                ];
                _c = {
                    email: 'admin@admin.com',
                    name: 'admin'
                };
                return [4 /*yield*/, bcrypt.hash('azerty123=', 10)];
            case 2:
                _a = _a.concat([
                    (_c.password = _j.sent(),
                        _c.role = client_1.Role.ADMIN,
                        _c)
                ]);
                _d = {
                    email: 'admin2@admin2.com',
                    name: 'admin2'
                };
                return [4 /*yield*/, bcrypt.hash('yosri2', 10)];
            case 3:
                _a = _a.concat([
                    (_d.password = _j.sent(),
                        _d.role = client_1.Role.ADMIN,
                        _d)
                ]);
                _e = {
                    email: 'client@client.com',
                    name: 'client'
                };
                return [4 /*yield*/, bcrypt.hash('client=', 10)];
            case 4:
                _a = _a.concat([
                    (_e.password = _j.sent(),
                        _e.role = client_1.Role.CLIENT,
                        _e.adminId = 2,
                        _e)
                ]);
                _f = {
                    email: 'client1@client1.com',
                    name: 'client1'
                };
                return [4 /*yield*/, bcrypt.hash('client1', 10)];
            case 5:
                _a = _a.concat([
                    (_f.password = _j.sent(),
                        _f.role = client_1.Role.CLIENT,
                        _f.adminId = 2,
                        _f)
                ]);
                _g = {
                    email: 'client2@client2.com',
                    name: 'client2'
                };
                return [4 /*yield*/, bcrypt.hash('GrlYCngpyQA=', 10)];
            case 6:
                _a = _a.concat([
                    (_g.password = _j.sent(),
                        _g.role = client_1.Role.CLIENT,
                        _g.adminId = 2,
                        _g)
                ]);
                _h = {
                    email: 'client3@client3.com',
                    name: 'client3'
                };
                return [4 /*yield*/, bcrypt.hash('hW8KvPpXdw4=', 10)];
            case 7: return [2 /*return*/, _a.concat([
                    (_h.password = _j.sent(),
                        _h.role = client_1.Role.CLIENT,
                        _h.adminId = 3,
                        _h)
                ])];
        }
    });
}); };
exports.generateUsersDataSeed = generateUsersDataSeed;
