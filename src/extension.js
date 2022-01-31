// @ts-check 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const commands_1 = require("./commands");
const commands = new commands_1.Commands();

function activate(context) {
    const run = vscode.commands.registerCommand("nand2tetris.run", (fileUri) => {
        commands.executeCommand(fileUri);
    });

    const stop = vscode.commands.registerCommand("nand2tetris.stop", () => {
        commands.stopCommand();
    });

    const translate = vscode.commands.registerCommand("nand2tetris.translate", (fileUri) => {
        commands.translateCommand(fileUri);
    });

    const hardware = vscode.commands.registerCommand("nand2tetris.hardware", (fileUri) => {
        commands.executeHardwareCommand();
    });

    const cpu = vscode.commands.registerCommand("nand2tetris.cpu", (fileUri) => {
        commands.executeCPUCommand();
    });

    const vm = vscode.commands.registerCommand("nand2tetris.vm", (fileUri) => {
        commands.executeVMCommand();
    });

    const assembler = vscode.commands.registerCommand("nand2tetris.assembler", (fileUri) => {
        commands.executeAssemblerCommand();
    });

    const zip = vscode.commands.registerCommand("nand2tetris.zip", () => {
        commands.zipCommand();
    });

    const compile = vscode.commands.registerCommand("nand2tetris.compiler", () => {
        commands.compilerDirectoryCommand();
    });
    context.subscriptions.push(run);
    context.subscriptions.push(translate);
    context.subscriptions.push(commands);
}

function deactivate() {
    commands.stopCommand();
}

exports.activate = activate;
exports.deactivate = deactivate;