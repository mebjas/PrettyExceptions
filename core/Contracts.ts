export interface IAssemblyInfo
{
    FullName: string;
    Name: string;
    Version: string;
    Culture: string;
    PubllicKeyToken: string;
}

export interface IFileInfo
{
    FileName: string;
    PrettyFileName: string;
    PrettyFilePath: string;
    Assembly: IAssemblyInfo;
}

export interface IMethodInfo
{
    Name: string;
    PrettyName: string;
}

export interface ILineInfo 
{
    LineOfCode: number;
    Level: number;
}

export interface IExceptionStack
{
    Line: ILineInfo;
    File: IFileInfo;
    Method: IMethodInfo;
}

export interface IExceptionType
{
    FullName: string;
    Name: string;
    Namespace: string;
}

export interface IException
{
    Message: string;
    Stack: Array<IExceptionStack>;
    Type: IExceptionType;
    OuterId: number;
    Id: number;
}

export interface IRawParsedStack
{
    assembly: string;
    fileName: string;
    level: number;
    line: number;
    method: string;
}

export interface IRawException
{
    id: string;
    message: string;
    outerId: string;
    parsedStack: Array<IRawParsedStack>;
    type: string;
}
