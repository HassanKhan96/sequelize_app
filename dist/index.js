"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const helmet_1 = __importDefault(require("helmet"));
const user_routes_1 = __importDefault(require("./src/routes/user.routes"));
const auth_routes_1 = __importDefault(require("./src/routes/auth.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = require("./src/middlewares/passport");
const app = (0, express_1.default)();
//middlewares
app.use((0, helmet_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "50mb" }));
//passport strategies
passport_1.default.use("access-token", passport_2.accessTokenStrategy);
passport_1.default.use("refresh-token", passport_2.refreshTokenStrategy);
//routes
app.use("/user", passport_1.default.authenticate("access-token", { session: false }), user_routes_1.default);
app.use("/auth", auth_routes_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});
