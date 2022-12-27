"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express = __importStar(require("express"));
const UserService = __importStar(require("../shared/services/user.service"));
const uuid_1 = require("uuid");
exports.usersRouter = express.Router();
//** GET items. */
exports.usersRouter.get("/", async (req, res) => {
    try {
        const users = await UserService.findAll();
        res.status(200).send(users);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
//** GET items/:n  */
exports.usersRouter.get("/sorted-users/:limit", async (req, res) => {
    const limit = parseInt(req.params.limit);
    try {
        const users = await UserService.getAutoSuggestList(limit);
        if (users) {
            return res.status(200).send(users);
        }
        res.status(404).send("users not found");
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
//** GET items/:id */ 
exports.usersRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const user = await UserService.find(id);
        if (user) {
            return res.status(200).send(user);
        }
        res.status(404).send("user not found");
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
//** POST items */ 
exports.usersRouter.post("/", async (req, res) => {
    try {
        const user = req.body;
        const newItem = await UserService.createUser(user);
        res.status(201).json(newItem);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
//** PUT items/:id */
exports.usersRouter.put("/:id", async (req, res) => {
    const id = (0, uuid_1.v4)();
    try {
        const userUpdate = req.body;
        const existingUser = await UserService.find(id);
        if (existingUser) {
            const updatedItem = await UserService.updateUser(id, userUpdate);
            return res.status(200).json(updatedItem);
        }
        const newItem = await UserService.createUser(userUpdate);
        res.status(201).json(newItem);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
//** DELETE items/:id */
exports.usersRouter.delete("/:id", async (req, res) => {
    try {
        const id = (0, uuid_1.v4)();
        await UserService.deleteUser(id);
        res.sendStatus(204);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
