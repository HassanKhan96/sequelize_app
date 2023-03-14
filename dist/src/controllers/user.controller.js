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
exports.updateUser = exports.deleteUser = exports.getUserById = exports.getUsers = void 0;
const models_1 = __importDefault(require("../models"));
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
        const result = yield models_1.default.user.findByPk(id, {
            attributes: { exclude: ["password"] },
        });
        if (!result)
            return res.status(404).send("user not found");
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
exports.getUserById = getUserById;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = models_1.default.user.destroy({ where: { id } });
        if (result)
            res.status(200).send("user deleted successfully");
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!req.body)
            return res.status(400).send("Bad request.");
        const result = yield models_1.default.user.update(req.body, {
            where: { id },
            returning: true,
            plain: true,
        });
        if (!result.length)
            throw new Error("Sorry cannot update user");
        const _a = result[1].toJSON(), { password } = _a, updatedData = __rest(_a, ["password"]);
        return res.status(200).send(updatedData);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.updateUser = updateUser;
