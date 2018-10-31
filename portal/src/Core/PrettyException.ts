// src/Core/PrettyException.ts

import { ExceptionStack } from "./ExceptionStack"
import { ExceptionType } from "./ExceptionType"

import { IException } from "./Contracts"
import { IExceptionStack } from "./Contracts"
import { IExceptionType } from "./Contracts"
import { IRawException } from "./Contracts"

export class PrettyException implements IException
{
    public Message: string;
    public Stack: IExceptionStack[];
    public Type: IExceptionType;
    public OuterId: number;
    public Id: number;

    public constructor(rawException: IRawException)
    {
        try
        {
            this.Id = parseInt(rawException.id, 0);
            this.OuterId = parseInt(rawException.outerId, 0);
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