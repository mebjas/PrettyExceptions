import { AssemblyInfo } from './AssemblyInfo'
import { IAssemblyInfo, IFileInfo } from './Contracts'

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
            const split = fileName.split('\\');
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
        //// this.PrettyFilePath;
    }
}

export default FileInfo;