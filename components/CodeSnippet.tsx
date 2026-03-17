import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeSnippetProps {
    language: string;
    codeString: string;
    className?: string
}

const customStyle = {
    // scrollbarWidth: "thin",
    lineHeight: "1.5",
    fontSize: "1rem",
    backgroundColor: "#131C29",
    //   height: "92%",
    scrollbarColor: "#404040 #1E1E1E",
    scrollBehavior: "smooth",
    marginTop: 0,
};

const CodeSnippet = ({ language, codeString, className }: CodeSnippetProps) => {
    return (
        <div className={`w-[50%] pl-6 bg-[#1E1E1E bg-[#131C29] pt-2 ${className}`}>
            <div className="h-px w-[90%] mc-auto bg-neutral-700 mb-4 rounded-xl"/>
            <SyntaxHighlighter
                language={language}
                style={vscDarkPlus}
                //@ts-ignore
                customStyle={customStyle}
            >
                {codeString}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeSnippet;