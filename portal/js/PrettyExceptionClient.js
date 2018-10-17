var LineInfo = /** @class */ (function () {
    function LineInfo(line, level) {
        this.LineOfCode = line;
        this.Level = level;
    }
    return LineInfo;
}());

var AssemblyInfo = /** @class */ (function () {
    function AssemblyInfo(assembly) {
        try {
            var split = assembly.split(",");
            this.FullName = assembly;
            //// Assembly Name
            this.Name = split[0].trim();
            //// Version
            this.Version = this.getValueFromKeyValueString(split[1]);
            this.Culture = this.getValueFromKeyValueString(split[2]);
            this.PubllicKeyToken = this.getValueFromKeyValueString(split[3]);
        }
        catch (ex) {
            //// TODO: logging and monitoring
        }
    }
    AssemblyInfo.prototype.getValueFromKeyValueString = function (kvstring) {
        var split = kvstring.trim().split("=");
        return split[1].trim();
    };
    return AssemblyInfo;
}());

var FileInfo = /** @class */ (function () {
    function FileInfo(fileName, assembly) {
        try {
            var split = fileName.split('\\');
            this.FileName = fileName;
            this.PrettyFileName = split[split.length - 1];
            this.findPrettyFilePath();
            this.Assembly = new AssemblyInfo(assembly);
        }
        catch (ex) {
            //// TODO: logging and monitoring
        }
    }
    FileInfo.prototype.findPrettyFilePath = function () {
        //// TODO: based on this.FileName
        this.PrettyFilePath = null;
    };
    return FileInfo;
}());

var MethodInfo = /** @class */ (function () {
    function MethodInfo(name) {
        try {
            this.Name = name;
            var split = name.split('.');
            this.PrettyName = split[split.length - 1];
        }
        catch (ex) {
            //// TODO: logging and monitoring
        }
    }
    return MethodInfo;
}());

var ExceptionStack = /** @class */ (function () {
    function ExceptionStack(rawStack) {
        try {
            this.Line = new LineInfo(rawStack.line, rawStack.level);
            this.File = new FileInfo(rawStack.fileName, rawStack.assembly);
            this.Method = new MethodInfo(rawStack.method);
        }
        catch (ex) {
            //// TODO: logging and monitoring
        }
    }
    return ExceptionStack;
}());

var ExceptionType = /** @class */ (function () {
    function ExceptionType(type) {
        try {
            this.FullName = type;
            var split = type.split('.');
            this.Name = split.pop();
            this.Namespace = split.join('.');
        }
        catch (ex) {
            //// TODO: logging and monitoring
        }
    }
    return ExceptionType;
}());

var PrettyException = /** @class */ (function () {
    function PrettyException(rawException) {
        var _this = this;
        try {
            this.Id = parseInt(rawException.id);
            this.OuterId = parseInt(rawException.outerId);
            this.Message = rawException.message;
            this.Type = new ExceptionType(rawException.type);
            this.Stack = [];
            rawException.parsedStack.forEach(function (stack) {
                _this.Stack.push(new ExceptionStack(stack));
            });
        }
        catch (ex) {
            //// TODO: logging and monitoring
        }
    }
    return PrettyException;
}());

var PrettyExceptionBuilder = /** @class */ (function () {
    function PrettyExceptionBuilder(rawExceptions) {
        this.singleException = [];
        this.parser(rawExceptions);
    }
    PrettyExceptionBuilder.prototype.parser = function (rawExceptions) {
        var _this = this;
        rawExceptions.forEach(function (rawEx) {
            _this.singleException.push(new PrettyException(rawEx));
        });
    };
    PrettyExceptionBuilder.prototype.Print = function (target) {
        this.singleException.forEach(exception =>
        {
            console.log(exception);
            var block = "<div class='exception-block'>"
            + "<h4 title='" +exception.Type.FullName +"'>" +exception.Type.Name
            + "<br><code style='font-size:10pt'>" +exception.Message +"</code>"
            + "</h4>"
            + "<div class='line-break'></div>";

            var lastSkipped = false;
            exception.Stack.forEach(stack => {
                try {
                    var innerBlock = "<div class='exception-stack-block'>"
                    if (stack.File.Assembly ) {
                        innerBlock += "<b>" + stack.File.Assembly.Name +"</b> /";
                        innerBlock += stack.File.PrettyFileName + " / ";
                        lastSkipped = false;
                    } else {
                        if (!lastSkipped) {
                            block += "<div class='skip-exception-block'></div>";
                            lastSkipped = true;
                        }

                        return;
                    }

                    innerBlock += stack.Method.PrettyName
                    + " / " + stack.Line.LineOfCode
                    + "</div>";
                    block += innerBlock;
                }
                catch (ex) {
                    console.error(ex);
                    console.log(stack);
                }
            });

            block += "</div>";
            target.innerHTML += block;
        });
    };
    return PrettyExceptionBuilder;
}());

document.getElementById("input_add").onclick = function (evt) {
    var id = document.getElementById("input_id").value;
    var rawex = document.getElementById("input_re").value;
    var peb = new PrettyExceptionBuilder(JSON.parse(rawex));
    peb.Print(document.getElementById("workspace"));
    evt.preventDefault();
};
