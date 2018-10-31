// src/Core/MethodInfo.ts
import { IMethodInfo } from "./Contracts";

export class MethodInfo implements IMethodInfo
{
    public Name: string;
    public PrettyName: string;

    public constructor(name: string)
    {
        try
        {
            const split = name.split('.');
            this.Name = name;
            this.PrettyName = split[split.length - 1];
        }
        catch (ex)
        {
            //// TODO: logging and monitoring
        }
    }
}

export default MethodInfo;