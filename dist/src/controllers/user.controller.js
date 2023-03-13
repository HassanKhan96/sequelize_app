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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getUsers = exports.addUser = void 0;
const models_1 = __importDefault(require("../models"));
const password_utils_1 = require("../utils/password.utils");
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { firstName, lastName, email, password } = req.body;
        const hash = yield (0, password_utils_1.hashPassword)(password);
        const result = models_1.default.user.build({
            firstName,
            lastName,
            email,
            password: hash,
        });
        yield result.save();
        const _a = result.toJSON(), { password: p } = _a, userData = __rest(_a, ["password"]);
        if (result)
            res.status(201).send(userData);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.addUser = addUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield models_1.default.user.findAll({
            attributes: { exclude: ["password"] },
        });
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield models_1.default.user.findByPK(id, {
            attributes: { exclude: ["password"] },
        });
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getUserById = getUserById;
