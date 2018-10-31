// src/Core/ExceptionStack.ts

import { 
    IExceptionStack,
    IFileInfo,
    ILineInfo,
    IMethodInfo,
    IRawParsedStack,
} from "./Contracts";

import FileInfo from './FileInfo'
import LineInfo from './LineInfo'
import MethodInfo from './MethodInfo'

export class ExceptionStack implements IExceptionStack
{
    public Line: ILineInfo;
    public File: IFileInfo;
    public Method: IMethodInfo;

    public constructor(rawStack: IRawParsedStack)
    {
        try
        {
            this.Line = new LineInfo(rawStack.line, rawStack.level);
            this.File = new FileInfo(rawStack.fileName, rawStack.assembly);
            this.Method = new MethodInfo(rawStack.method);
        }
        catch (ex)
        {
            //// TODO: logging and monitoring
        }
    }
}

export default ExceptionStack;