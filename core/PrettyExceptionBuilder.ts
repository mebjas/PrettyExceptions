import { IException, IRawException } from "./Contracts";
import { PrettyException } from "./PrettyException"

export class PrettyExceptionBuilder
{
    private singleException: Array<PrettyException>;
    public constructor(rawExceptions: Array<IRawException>)
    {
        this.singleException = [];
        this.parser(rawExceptions);
    }

    private parser(rawExceptions: Array<IRawException>)
    {
        let _this = this;
        rawExceptions.forEach(rawEx => {
            _this.singleException.push(new PrettyException(rawEx));
        });
    }

    public Print(target: HTMLElement)
    {
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
    }
}