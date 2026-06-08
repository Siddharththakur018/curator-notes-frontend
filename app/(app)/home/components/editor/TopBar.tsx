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
    <div className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-100 bg-neutral-50/60">
      <div className="flex items-center gap-2 text-xs text-neutral-400">
        <Icons.Save />

        <span>{saveLabel}</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white text-xs font-medium text-neutral-600 hover:bg-neutral-50 transition-colors"
        >
          <Icons.Share /> Share
        </button>
      </div>
    </div>
  );
};
