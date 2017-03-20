# python-traceback-jumper

![icon](https://cdn.rawgit.com/linw1995/python-traceback-jumper/7bdc72b4/images/icon.svg)

 An extension for VSCode that jumps to the source by clicking python traceback

## Hot to use

Installation
Launch VS Code Quick Open (Ctrl+P), paste the following command, and press enter.

```plain
ext install python-traceback-jumper
```

For enable python traceback jumper, add the following to your setting file:

```plain
"python.tracebackJumper.enable": true
```

Configure task like this

```json
{
    "command": "${config.python.pythonPath}",
    "isShellCommand": true,
    "args": ["${file}"],
    "showOutput": "always"
}
```

Run the task, when output has python Trackback, you can click the file path to the source

## Release Notes

### 1.0.5

-----------------------------------------------------------------------------------------------------------

### For more information

- [Github python-traceback-jumper](https://github.com/linw1995/python-traceback-jumper)

- [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=linw1995.python-traceback-jumper)

**Enjoy!**
