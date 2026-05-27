import React from "react";

type Props = {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
};

export const ToolbarButton = ({
  onClick,
  active,
  title,
  children,
}: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      aria-pressed={active}
      className={`
        relative flex items-center justify-center
        w-8 h-8 rounded-md text-sm
        transition-colors duration-100
        border-none outline-none
        ${
          active
            ? "bg-blue-50 text-blue-600"
            : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800"
        }
      `}
    >
      {children}
    </button>
  );
};