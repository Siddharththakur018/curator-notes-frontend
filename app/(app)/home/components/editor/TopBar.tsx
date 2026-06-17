import { Icons } from "./icons";

type Props = {
  saveStatus: "saved" | "saving" | "unsaved";
};

export const TopBar = ({ saveStatus }: Props) => {
  const saveLabel =
    saveStatus === "saved"
      ? "Saved just now"
      : saveStatus === "saving"
        ? "Saving..."
        : "Unsaved changes";

  return (
    <div className="flex items-center justify-between border-b border-white/10 bg-[#252523] px-4 py-2.5">
      <div className="flex items-center gap-2 text-xs text-[#8B8A84]">
        <Icons.Save />

        <span>{saveLabel}</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-[#C6C4BD] transition-colors hover:border-[#D9D6EA]/45 hover:text-white"
        >
          <Icons.Share /> Share
        </button>
      </div>
    </div>
  );
};
