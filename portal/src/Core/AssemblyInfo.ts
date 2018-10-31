import { IAssemblyInfo } from './Contracts'

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
            const split = assembly.split(",");
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
        const split = kvstring.trim().split("=");
        return split[1].trim();
    }
}

export default AssemblyInfo;