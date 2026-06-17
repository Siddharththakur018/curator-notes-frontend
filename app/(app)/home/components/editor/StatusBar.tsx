type Props = {
  characters: number;
};

export const StatusBar = ({ characters }: Props) => {
  return (
    <div className="flex items-center justify-between border-t border-white/10 bg-[#252523] px-4 py-2 text-[11px] text-[#8B8A84]">
      <span>{characters} characters</span>
    </div>
  );
};
