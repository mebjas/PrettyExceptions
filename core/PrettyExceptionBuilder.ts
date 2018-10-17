import { IException, IRawException } from "./Contracts";
import { PrettyException } from "./PrettyException"

class PrettyExceptionBuilder
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

    public Print()
    {
        this.singleException.forEach(exception =>
        {
            console.log(exception);
        });
    }
}