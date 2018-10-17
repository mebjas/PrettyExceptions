define("Contracts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("ExceptionStack", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LineInfo = /** @class */ (function () {
        function LineInfo(line, level) {
            this.LineOfCode = line;
            this.Level = level;
        }
        return LineInfo;
    }());
    exports.LineInfo = LineInfo;
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
            return kvstring[1].trim();
        };
        return AssemblyInfo;
    }());
    exports.AssemblyInfo = AssemblyInfo;
    var FileInfo = /** @class */ (function () {
        function FileInfo(fileName, assembly) {
            try {
                var split = fileName.split('\\');
                this.FileName = fileName;
                this.PrettyFileName = split[split.length];
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
    exports.FileInfo = FileInfo;
    var MethodInfo = /** @class */ (function () {
        function MethodInfo(name) {
            try {
                this.Name = name;
                var split = name.split('.');
                this.PrettyName = name[name.length - 1];
            }
            catch (ex) {
                //// TODO: logging and monitoring
            }
        }
        return MethodInfo;
    }());
    exports.MethodInfo = MethodInfo;
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
    exports.ExceptionStack = ExceptionStack;
});
define("PrettyException", ["require", "exports", "ExceptionStack"], function (require, exports, ExceptionStack_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ExceptionType = /** @class */ (function () {
        function ExceptionType(type) {
            try {
                this.FullName = type;
                var split = type.split('.');
                this.Name = split[split.length - 1];
                split.pop();
                this.Name = split.join('.');
            }
            catch (ex) {
                //// TODO: logging and monitoring
            }
        }
        return ExceptionType;
    }());
    exports.ExceptionType = ExceptionType;
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
                    _this.Stack.push(new ExceptionStack_1.ExceptionStack(stack));
                });
            }
            catch (ex) {
                //// TODO: logging and monitoring
            }
        }
        return PrettyException;
    }());
    exports.PrettyException = PrettyException;
});
define("PrettyExceptionBuilder", ["require", "exports", "PrettyException"], function (require, exports, PrettyException_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PrettyExceptionBuilder = /** @class */ (function () {
        function PrettyExceptionBuilder(rawExceptions) {
            this.singleException = [];
            this.parser(rawExceptions);
        }
        PrettyExceptionBuilder.prototype.parser = function (rawExceptions) {
            var _this = this;
            rawExceptions.forEach(function (rawEx) {
                _this.singleException.push(new PrettyException_1.PrettyException(rawEx));
            });
        };
        PrettyExceptionBuilder.prototype.Print = function () {
            this.singleException.forEach(function (exception) {
                console.log(exception);
            });
        };
        return PrettyExceptionBuilder;
    }());
    exports.PrettyExceptionBuilder = PrettyExceptionBuilder;
});
define("PrettyClient", ["require", "exports", "PrettyExceptionBuilder"], function (require, exports, PrettyExceptionBuilder_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    document.getElementById("input_add").onclick = function (evt) {
        var id = document.getElementById("input_id").nodeValue;
        var rawex = document.getElementById("input_re").nodeValue;
        alert(id);
        var peb = new PrettyExceptionBuilder_1.PrettyExceptionBuilder(JSON.parse(rawex));
        peb.Print();
        evt.preventDefault();
    };
});
//# sourceMappingURL=prettyexceptionbuilder.js.map