import { useCallback, useRef, useState } from "react";
import { showErrorToast } from "@/utils/toast";

export const useAutosave = (onSave: () => Promise<void>) => {
  // used ref because of
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">(
    "saved",
  );

  // function that we need to call whenever someone writes in the note area
  const triggerAutosave = useCallback(() => {
    setSaveStatus("unsaved");
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(async () => {
      try {
        setSaveStatus("saving");
        await onSave();
        setSaveStatus("saved");
      } catch (error) {
        console.error(error);
        showErrorToast(error, { fallback: "Autosave failed." });
      }
    }, 1500);
  }, [onSave]);

  return { triggerAutosave, saveStatus };
};
