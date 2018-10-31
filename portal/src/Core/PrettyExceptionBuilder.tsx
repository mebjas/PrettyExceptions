// src/Core/PrettyExceptionBuilder.tsx

import * as React from 'react';
import { IExceptionStack, IRawException } from "./Contracts";
import { PrettyException } from "./PrettyException"

export class PrettyExceptionBuilder
{
    public isSet: boolean = false;

    private singleException: PrettyException[];
    private onAnnotationClicked: (val: string, typeOf: string) => void;

    public constructor(onAnnotationClicked?: (val: string, typeOf: string) => void)
    {
        this.singleException = [];
        this.onAnnotationClicked = (onAnnotationClicked) ? onAnnotationClicked : (val: string, typeOf: string) => {return;};

        this.GetInnerExceptionBlock = this.GetInnerExceptionBlock.bind(this);
        this.GetStackBlock = this.GetStackBlock.bind(this);
        this.Parse = this.Parse.bind(this);
        this.Print = this.Print.bind(this);
        this.OnAnnotationClick = this.OnAnnotationClick.bind(this);
    }

    public Parse(rawExceptions: IRawException[])
    {
        const thisRef = this;
        rawExceptions.forEach(rawEx => {
            thisRef.singleException.push(new PrettyException(rawEx));
        });

        this.isSet = true;
    }

    public Print(): JSX.Element
    {
        return (
            <div>
            {
                this.singleException.map(
                    (element, index) => this.GetInnerExceptionBlock(element, index))    
            }
            </div>
        );
    }

    private GetInnerExceptionBlock(exception: PrettyException, index: number): JSX.Element
    {
        return (
            <div className="exception-block" key={index}>
                <h4 title={exception.Type.FullName}>
                    <span 
                        className="annotation-allowed"
                        data-typeof="ExceptionType"
                        data-val={exception.Type.Name}
                        onClick={this.OnAnnotationClick}>
                        {exception.Type.Name}
                    </span>
                    <br />
                    <code style={{fontSize: 10}}>{exception.Message}</code>
                </h4>
                <div className="line-break" />
                {
                    exception.Stack.map((element, indexVal) => this.GetStackBlock(element, indexVal))
                }
            </div>
        );
    }

    private GetStackBlock(stack: IExceptionStack, index: number): JSX.Element
    {
        let assemblyName;
        let filePrettyName;

        if (stack.File.Assembly) {
            assemblyName = (
                <span>
                    <b 
                        data-typeof="AssemblyName"
                        data-val={stack.File.Assembly.Name}
                        onClick={this.OnAnnotationClick}
                        className="annotation-allowed">{stack.File.Assembly.Name}</b>
                    &nbsp;/
                </span>);

            filePrettyName = (
                <span>
                    <span 
                        data-typeof="FilePrettyName"
                        data-val={stack.File.PrettyFileName}
                        onClick={this.OnAnnotationClick}
                        className="annotation-allowed">{stack.File.PrettyFileName}</span>
                    &nbsp;/
                </span>);
        }

        return (
            <div className="exception-stack-block" key={index}>
                {assemblyName}
                {filePrettyName}
                <span 
                    data-typeof="MethodPrettyName"
                    data-val={stack.Method.PrettyName}
                    onClick={this.OnAnnotationClick}
                    className="annotation-allowed">{stack.Method.PrettyName}</span> /
                {stack.Line.LineOfCode}
            </div>);
    }

    private OnAnnotationClick(event: React.MouseEvent<HTMLButtonElement>) {
        const val: string = event.currentTarget.dataset.val || "";
        const typeOf: string = event.currentTarget.dataset.typeof || "";

        this.onAnnotationClicked(val, typeOf);
    }
}