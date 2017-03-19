# python-traceback-jumper README

![icon](https://cdn.rawgit.com/linw1995/python-traceback-jumper/7bdc72b4/images/icon.svg)

 An extension for VSCode that jumps to the source by clicking python traceback

## Hot to use

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

### 1.0.4

-----------------------------------------------------------------------------------------------------------

### For more information

[Github python-traceback-jumper](https://github.com/linw1995/python-traceback-jumper)

**Enjoy!**
