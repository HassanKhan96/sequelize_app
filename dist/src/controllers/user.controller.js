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
exports.updateUser = exports.deleteUser = exports.getUserById = exports.getUsers = void 0;
const services_1 = require("../services");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, services_1.findAllUsers)();
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
        const result = yield (0, services_1.findUserById)(id);
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
        const result = yield (0, services_1.deleteUserById)(id);
        if (!result)
            throw new Error("Cannot delete user.");
        return res.status(200).send("user deleted successfully");
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
        const result = yield (0, services_1.updateUserById)(id, req.body);
        if (!result.length)
            throw new Error("Sorry cannot update user");
        return res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.updateUser = updateUser;
