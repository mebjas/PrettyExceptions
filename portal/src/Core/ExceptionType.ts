import { IExceptionType } from './Contracts'

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
            const split: string[] = type.split('.');
            this.Name = split.pop() || "";
            this.Namespace = split.join('.');
        }
        catch (ex)
        {
            //// TODO: logging and monitoring
        }
    }
}

export default ExceptionType;