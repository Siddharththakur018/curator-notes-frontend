import { Coins } from "lucide-react";
import { useAuth } from "@/context/useAuth";

const TOTAL_AI_CREDITS = 1000;

const AiCreditsCard = () => {
  const { appUser } = useAuth();
  const remainingAiCredits = Math.max(0, appUser?.aiCredits ?? 0);
  const usedAiCredits = Math.max(0, TOTAL_AI_CREDITS - remainingAiCredits);
  const creditPercent = Math.min(
    100,
    Math.max(0, (remainingAiCredits / TOTAL_AI_CREDITS) * 100),
  );

  return (
    <div className="rounded-lg border border-white/10 bg-[#2A2A28] p-3">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D9D6EA] text-[#373785]">
            <Coins className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">AI credits</p>
            <p className="text-xs text-[#8B8A84]">{usedAiCredits} used</p>
          </div>
        </div>
        <p className="text-sm font-bold text-[#D9D6EA]">
          {remainingAiCredits}/{TOTAL_AI_CREDITS}
        </p>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-[#1F1F1E]">
        <div
          className="h-full rounded-full bg-[#D9D6EA] transition-all"
          style={{ width: `${creditPercent}%` }}
        />
      </div>
    </div>
  );
};

export default AiCreditsCard;
