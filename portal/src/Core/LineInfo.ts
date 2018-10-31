import { ILineInfo } from './Contracts'

export default class LineInfo implements ILineInfo
{
    public LineOfCode: number;
    public Level: number;

    public constructor(line: number, level: number)
    {
        this.LineOfCode = line;
        this.Level = level;
    }
}