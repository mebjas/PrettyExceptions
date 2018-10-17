import { 
    IRawParsedStack,
    IExceptionStack,
    ILineInfo,
    IFileInfo,
    IMethodInfo,
    IAssemblyInfo } from "./Contracts";

export class LineInfo implements ILineInfo
{
    public LineOfCode: number;
    public Level: number;

    public constructor(line: number, level: number)
    {
        this.LineOfCode = line;
        this.Level = level;
    }
}

export class AssemblyInfo implements IAssemblyInfo
{
    public FullName: string;
    public Name: string;
    public Version: string;
    public Culture: string;
    public PubllicKeyToken: string;

    public constructor(assembly: string)
    {
        try
        {
            let split = assembly.split(",");
            this.FullName = assembly;

            //// Assembly Name
            this.Name = split[0].trim();

            //// Version
            this.Version = this.getValueFromKeyValueString(split[1]);
            this.Culture = this.getValueFromKeyValueString(split[2]);
            this.PubllicKeyToken = this.getValueFromKeyValueString(split[3]);
        }
        catch (ex)
        {
            //// TODO: logging and monitoring
        }
    }

    private getValueFromKeyValueString(kvstring: string) :string
    {
        let split = kvstring.trim().split("=");
        return split[1].trim();
    }
}

export class FileInfo implements IFileInfo
{
    public FileName: string;
    public PrettyFileName: string;
    public PrettyFilePath: string;
    public Assembly: IAssemblyInfo;

    public constructor(fileName: string, assembly: string)
    {
        try
        {
            let split = fileName.split('\\');
            this.FileName = fileName;
            this.PrettyFileName = split[split.length - 1];
            this.findPrettyFilePath(); 
            this.Assembly = new AssemblyInfo(assembly);
        }
        catch (ex)
        {
            //// TODO: logging and monitoring
        }
    }

    private findPrettyFilePath() {
        //// TODO: based on this.FileName
        this.PrettyFilePath = null;
    }
}

export class MethodInfo implements IMethodInfo
{
    public Name: string;
    public PrettyName: string;

    public constructor(name: string)
    {
        try
        {
            this.Name = name;
            let split = name.split('.');
            this.PrettyName = split[split.length - 1];
        }
        catch (ex)
        {
            //// TODO: logging and monitoring
        }
    }
}

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