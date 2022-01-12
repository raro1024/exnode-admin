import * as express from "express";
import * as utils from '@core/utils';
import {
    conf
} from '@core/conf';
import {
    Error
} from "@core/errors";
import {
    User
} from "@core/modules/user";;


import path = require("path");
export const name = "admin" //name of The renderer
export const router = express.Router();

/**
 * Load Instance of a Module the call the handler
 * If the Handler is Async the data will send when the Promies is fullfiled
 * First the Folder with normal modules will check
 */
router.use('/static', express.static('static'));
router.use(express.urlencoded({
    extended: true
}))
router.use(express.json())
router.use((req, res, next) => {
    req["handlername"] = "admin"; // Set the handler Name
    next();
})
router.get("/admin/getmodules", async (req, res) => {
     res.json({
        "modules": Object.keys(conf["skeletons"])
    });
});
router.post("/admin/login/", async (req, res) => {
    console.log("Login in admin");
    if( await new User().verify(utils.getParams(req)))
    {
        res.sendFile(path.join(__dirname + "/views/index.html"));
    }
    else
    {
        console.log("User not found or Wrong PW");
        res.sendFile(path.join(__dirname + "/views/login.html"));
    }
   

})
router.all(['/admin/:module/:handler/:key', '/admin/:module/:handler', '/admin/:module/', "/admin*"], async (req, res) => {
  
    const user = await utils.getCurrentUser();
    console.log(user);
    if (user) {
        if (user["access"].indexOf("root") > -1) {
            res.sendFile(path.join(__dirname + "/views/index.html"));
        } else {
            console.log("no acces?>");
            res.end("401");

        }

    }
    else // No User we render the login page
    {
        console.log("no acces / no user");
        res.sendFile(path.join(__dirname + "/views/login.html"));
        //res.end("200");

    }

});



function render({
    template = "index.hbs",
    skel = {},
    statusCode = 200,
    res = null
} = {}) {
    res.statusCode = statusCode;
    if (!template) {
        res.send("no template ")
    }
    if (utils.isArray(skel)) {
        res.render(template, {
            layout: false,
            skellist: skel

        });

    } else {
        console.log("send ??");

        res.render(template, {
            layout: false,
            skel: skel

        });

    }

}