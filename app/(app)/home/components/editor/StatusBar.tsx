type Props = {
  characters: number;
};

export const StatusBar = ({ characters }: Props) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-neutral-50/60 border-t border-neutral-100 text-[11px] text-neutral-400">
      <span>{characters} characters</span>
    </div>
  );
};