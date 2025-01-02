"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cmds = cmds;
const start_1 = require("../funcs/start");
function cmds(cmd, rl) {
    if (cmd === 'exit') {
        rl.close();
        return true;
    }
    if (cmd === 'restart') {
        rl.close();
        console.clear();
        console.log('\x1b[32m%s\x1b[0m', 'The application had been restarted! :*');
        (0, start_1.start)();
        return true;
    }
    return false;
}
