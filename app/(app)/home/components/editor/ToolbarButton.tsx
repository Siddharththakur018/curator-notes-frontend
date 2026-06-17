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
            ? "bg-[#D9D6EA] text-[#373785]"
            : "text-[#8B8A84] hover:bg-white/5 hover:text-white"
        }
      `}
    >
      {children}
    </button>
  );
};
