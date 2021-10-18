"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = exports.name = void 0;
const express = require("express");
const utils = require("@core/utils");
const conf_1 = require("@core/conf");
;
const path = require("path");
exports.name = "admin"; //name of The renderer
exports.router = express.Router();
/**
 * Load Instance of a Module the call the handler
 * If the Handler is Async the data will send when the Promies is fullfiled
 * First the Folder with normal modules will check
 */
exports.router.use('/static', express.static('static'));
exports.router.use(express.urlencoded({
    extended: true
}));
exports.router.use(express.json());
exports.router.use((req, res, next) => {
    req["handlername"] = "admin"; // Set the handler Name
    next();
});
exports.router.get("/admin/getmodules", async (req, res) => {
    res.json({
        "modules": Object.keys(conf_1.conf["skeletons"])
    });
});
exports.router.all(['/admin/:module/:handler/:key', '/admin/:module/:handler', '/admin/:module/', "/admin*"], async (req, res) => {
    const user = await utils.getCurrentUser();
    if (user) {
        if (user["access"].indexOf("root") > -1) {
            res.sendFile(path.join(__dirname + "/views/index.html"));
        }
        else {
            console.log("no acces");
            res.end("401");
        }
    }
});
function render({ template = "index.hbs", skel = {}, statusCode = 200, res = null } = {}) {
    res.statusCode = statusCode;
    if (!template) {
        res.send("no template ");
    }
    if (utils.isArray(skel)) {
        res.render(template, {
            layout: false,
            skellist: skel
        });
    }
    else {
        console.log("send ??");
        res.render(template, {
            layout: false,
            skel: skel
        });
    }
}
