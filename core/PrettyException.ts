import { ExceptionStack } from "./ExceptionStack";
import { 
    IException,
    IRawException,
    IExceptionType,
    IExceptionStack } from "./Contracts";


export class ExceptionType implements IExceptionType
{
    public FullName: string;
    public Name: string;
    public Namespace: string;

    public constructor(type: string)
    {
        try
        {
            this.FullName = type;
            let split = type.split('.');
            this.Name = split.pop();
            this.Namespace = split.join('.');
        }
        catch (ex)
        {
            //// TODO: logging and monitoring
        }
    }
}

export class PrettyException implements IException
{
    public Message: string;
    public Stack: Array<IExceptionStack>;
    public Type: IExceptionType;
    public OuterId: number;
    public Id: number;

    public constructor(rawException: IRawException)
    {
        try
        {
            this.Id = parseInt(rawException.id);
            this.OuterId = parseInt(rawException.outerId);
            this.Message = rawException.message;
            this.Type = new ExceptionType(rawException.type);
            this.Stack = [];
            rawException.parsedStack.forEach(stack =>
            {
                this.Stack.push(new ExceptionStack(stack));
            });
        }
        catch (ex)
        {
            //// TODO: logging and monitoring
        }
    }
}