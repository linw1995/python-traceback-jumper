# python-traceback-jumper

![icon](https://github.com/linw1995/python-traceback-jumper/blob/master/images/icon.png?raw=true)

 An extension for VSCode that jumps to the source by clicking python traceback

## This extension is invalid now.

 Due to the VSCode updating, this extension is invalid now. So this could be the last version. I checked the official documents and found a way to do that, as same as this extension. (2017-08-04)

 **This gist will show you how to do it!**

 [VSCode Task.json for Python Traceback.](https://gist.github.com/linw1995/225a8d0e1cd32a51e44b2aab3af3f1dc)

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
    "version": "1.0.0",
    "command": "${config.python.pythonPath}",
    "isShellCommand": true,
    "args": ["${file}"],
    "showOutput": "always"
}
```

Run the task, when output has python Trackback, you can click the file path to the source

## Release Notes

### 1.0.6 change icon

### 1.0.7 fix bug

### 1.0.8 change icon from .svg to .png

### 1.0.9 This extension is invalid now.

-----------------------------------------------------------------------------------------------------------

### For more information

- [Github python-traceback-jumper](https://github.com/linw1995/python-traceback-jumper)

- [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=linw1995.python-traceback-jumper)

**Enjoy!**
