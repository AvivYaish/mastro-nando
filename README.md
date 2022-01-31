# Nand2Tetris IDE

![Logo](images/icon.png)

## Introduction

This is is a [Visual Studio Code](https://code.visualstudio.com/) extension for
[Nand2Tetris](https://www.nand2tetris.org/) development based on
[Zohar Lee](https://github.com/leafvmaple/)'s
["Nand2Tetris Tools"](https://github.com/leafvmaple/vscode-nand2tetris) and
[Stefano Volpe](https://github.com/FoxySeta)'s
["Mastro NANDo"](https://github.com/foxyseta/nand-ide).

It incoporates [HUJI's version](https://github.com/AvivYaish/nand2tetris_HUJI)
of Nand2Tetris' Software Suite with various Visual Studio Code functionalities.
Features unique to HUJI's version, such as shifts, are fully supported.

This extension is meant for students, instructors, and self-learners who want
to enhance their Nand2Tetris experience.

## Features

### Commands

Name | Icon | Requires Nand to Tetris Software Suite | Description
---- | ---- | ------------------------------- | -----------
Run code | ![Run Code button](images/button.png) | ✔︎ | Runs your current file (supports `.hdl`, `.asm`, `.hack` and `.vm` files) via CLI. Needs a `.tst` file in the same folder to work.
Stop running | | ✔︎ | Aborts code execution
Translate code | ![Translate Code button](images/button2.png) | ✔︎ | Translate your current file (supports `.asm` and `jack` files) via CLI
Open Hardware Simulator | | ✔︎ | Runs the Hardware Simulator via GUI
Open CPU Emulator | | ✔︎ | Runs the CPU Simulator via GUI
Open VM Emulator | | ✔︎ | Runs the VM Emulator via GUI
Assembler | | ✔︎ | Runs the Assembler via GUI
Compile directory | | ✔︎ | Compiles the directory of your current file (supports `.jack` files)
Zip course source | | | Compresses your solution to a zip archive

### Languages and icon theme

Language | File Extensions | Grammar | Snippets | Icon
-------- | --------------- | ------- | -------- | ----
Hardware Description Language | `.hdl` | ✔︎ | ✔︎ | ✔︎
Test scripts format | `.tst` | ✔︎ | ✔︎ | ✔︎
Compare and output files format | `.cmp`, `.out` | ✔︎ | | ✔︎
Hack Assembly | `.asm` | ✔︎ | ✔︎ | 
Hack Machine Language | `.hack` | ✔︎ | | ✔︎
Hack Virtual Machine Language | `.vm` | ✔︎ | ✔︎ | ✔︎
Jack Language | `.jack` | ✔︎ | ✔︎ | ✔︎

Any icons not listed in the table above have been included in VS Code's built-in icon theme
[Seti](https://github.com/microsoft/vscode/tree/master/extensions/theme-seti).

## Prerequisites

1. [Visual Studio Code](https://code.visualstudio.com/Download)

1. [Java Runtime Environment](https://www.java.com/en/download/) is optional, used for running the Software Suite.

1. [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
   is highly recommended for those using HUJI's READMEs.

There is no need to manually install Nand2Tetris' Software Suite, as
it is already included in the extension itself.

## Installation

Visit VSCode's [Marketplace](https://marketplace.visualstudio.com/items?itemName=AvivYaish.nand-ide).
