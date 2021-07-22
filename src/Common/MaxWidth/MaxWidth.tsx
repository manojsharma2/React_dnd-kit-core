import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> { }

const MaxWidth = (props: Props) => {
    return (
        <>
            <div>
                {props.children}
            </div>
        </>
    )
}
export default MaxWidth