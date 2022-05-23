import React from "react";

export const Button: React.FC<{ onClick: () => any; className?: string }> = ({
    children,
    onClick,
    className,
}) => (
    <div
        className={`Button ${className}`}
        onClick={(ev) => {
            onClick();

            ev.preventDefault();
            ev.stopPropagation();
        }}
    >
        {children}
    </div>
);
