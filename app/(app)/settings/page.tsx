"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Archive,
  ArrowLeft,
  Bell,
  BrainCircuit,
  Check,
  ChevronDown,
  CircleUserRound,
  CloudDownload,
  Coins,
  FileText,
  KeyRound,
  Laptop,
  LockKeyhole,
  LogOut,
  Mail,
  Moon,
  Palette,
  Save,
  Settings2,
  ShieldCheck,
  Sparkles,
  Trash2,
  Type,
  UserRound,
  WandSparkles,
} from "lucide-react";
import { useAuth } from "@/context/useAuth";
import { showErrorToast } from "@/utils/toast";

type SettingsSection =
  | "profile"
  | "appearance"
  | "notes"
  | "ai"
  | "notifications"
  | "privacy";

type Preferences = {
  density: "comfortable" | "compact";
  editorWidth: "focused" | "wide";
  fontSize: "small" | "medium" | "large";
  autoSave: boolean;
  spellCheck: boolean;
  archiveAfterDays: string;
  aiSuggestions: boolean;
  aiTone: "balanced" | "concise" | "detailed";
  digest: boolean;
  productUpdates: boolean;
  reminderEmails: boolean;
};

const DEFAULT_PREFERENCES: Preferences = {
  density: "comfortable",
  editorWidth: "focused",
  fontSize: "medium",
  autoSave: true,
  spellCheck: true,
  archiveAfterDays: "never",
  aiSuggestions: true,
  aiTone: "balanced",
  digest: true,
  productUpdates: false,
  reminderEmails: true,
};

const STORAGE_KEY = "curator-settings";

const navigation: {
  id: SettingsSection;
  label: string;
  description: string;
  icon: typeof UserRound;
}[] = [
  {
    id: "profile",
    label: "Profile",
    description: "Personal details",
    icon: UserRound,
  },
  {
    id: "appearance",
    label: "Appearance",
    description: "Your workspace",
    icon: Palette,
  },
  {
    id: "notes",
    label: "Notes & editor",
    description: "Writing defaults",
    icon: FileText,
  },
  {
    id: "ai",
    label: "Curator AI",
    description: "AI preferences",
    icon: BrainCircuit,
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Digests & alerts",
    icon: Bell,
  },
  {
    id: "privacy",
    label: "Privacy & data",
    description: "Security & export",
    icon: ShieldCheck,
  },
];

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full border transition ${
        checked
          ? "border-[#D9D6EA]/60 bg-[#D9D6EA]"
          : "border-white/10 bg-[#1F1F1E]"
      }`}
    >
      <span
        className={`absolute top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full transition-all ${
          checked
            ? "left-[21px] bg-[#373785] text-white"
            : "left-0.5 bg-[#77756F] text-transparent"
        }`}
      >
        <Check className="h-3 w-3" strokeWidth={3} />
      </span>
    </button>
  );
}

function SettingRow({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: typeof UserRound;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-white/[0.07] px-5 py-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex min-w-0 items-start gap-3.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-[#1F1F1E] text-[#A7A49C]">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#F4F3EF]">{title}</p>
          <p className="mt-1 max-w-xl text-sm leading-5 text-[#8B8A84]">
            {description}
          </p>
        </div>
      </div>
      <div className="shrink-0 pl-[50px] sm:pl-0">{children}</div>
    </div>
  );
}

function Card({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#272725] shadow-[0_18px_50px_rgba(0,0,0,0.14)]">
      <div className="border-b border-white/[0.07] px-5 py-4 sm:px-6">
        <h2 className="text-sm font-bold text-white">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm leading-5 text-[#8B8A84]">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function SegmentedControl<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  label: string;
}) {
  return (
    <div
      aria-label={label}
      className="inline-flex rounded-lg border border-white/[0.08] bg-[#1F1F1E] p-1"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
            value === option.value
              ? "bg-[#D9D6EA] text-[#373785] shadow-sm"
              : "text-[#8B8A84] hover:text-white"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const { user, appUser, logout } = useAuth();
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("profile");
  const [preferences, setPreferences] =
    useState<Preferences>(DEFAULT_PREFERENCES);
  const [savedPreferences, setSavedPreferences] =
    useState<Preferences>(DEFAULT_PREFERENCES);
  const accountName = appUser?.name || user?.displayName || "";
  const [displayName, setDisplayName] = useState(accountName);
  const [savedName, setSavedName] = useState(accountName);
  const [isReady, setIsReady] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    const initializationTimer = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = {
            ...DEFAULT_PREFERENCES,
            ...(JSON.parse(stored) as Partial<Preferences>),
          };
          setPreferences(parsed);
          setSavedPreferences(parsed);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsReady(true);
      }
    }, 0);

    return () => window.clearTimeout(initializationTimer);
  }, []);

  const hasChanges = useMemo(
    () =>
      displayName.trim() !== savedName ||
      JSON.stringify(preferences) !== JSON.stringify(savedPreferences),
    [displayName, preferences, savedName, savedPreferences],
  );

  const updatePreference = <K extends keyof Preferences>(
    key: K,
    value: Preferences[K],
  ) => {
    setPreferences((current) => ({ ...current, [key]: value }));
    setSavedAt(null);
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
      setSavedPreferences(preferences);
      setSavedName(displayName.trim());
      setDisplayName(displayName.trim());
      setSavedAt("Saved just now");
    } catch (error) {
      console.error(error);
      showErrorToast(error, { fallback: "Could not save your preferences." });
    } finally {
      window.setTimeout(() => setIsSaving(false), 350);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      router.replace("/login");
    } catch (error) {
      console.error(error);
      showErrorToast(error, { fallback: "Could not log you out." });
      setIsLoggingOut(false);
    }
  };

  const handleExport = () => {
    const payload = {
      product: "Curator Notes",
      exportedAt: new Date().toISOString(),
      account: {
        name: displayName || appUser?.name || user?.displayName || null,
        email: appUser?.email || user?.email || null,
        plan: appUser?.role || "USER",
      },
      preferences,
      note: "Your note content remains on the Curator service and is not included in this local preferences export.",
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `curator-settings-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const initials =
    (displayName || appUser?.email || user?.email || "C")
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  const remainingCredits = Math.max(0, appUser?.aiCredits ?? 0);
  const roleLabel =
    appUser?.role === "PREMIUM"
      ? "Curator Pro"
      : appUser?.role === "ADMIN"
        ? "Admin"
        : "Free plan";

  if (!isReady) {
    return (
      <div className="flex min-h-full items-center justify-center bg-[#1F1F1E]">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-white/10 border-t-[#D9D6EA]" />
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#1F1F1E] text-white">
      <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-[#222220]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/notes"
              aria-label="Back to notes"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-[#A7A49C] transition hover:border-[#D9D6EA]/30 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="h-6 w-px bg-white/[0.08]" />
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D9D6EA] text-[#373785]">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-bold leading-4">Curator</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#77756F]">
                  Settings
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 text-xs text-[#8B8A84] sm:flex">
              {savedAt ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  {savedAt}
                </>
              ) : hasChanges ? (
                "Unsaved changes"
              ) : (
                "Everything is up to date"
              )}
            </div>
            <button
              type="button"
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#D9D6EA] px-3.5 text-xs font-bold text-[#373785] transition hover:bg-[#C9C5E8] disabled:cursor-not-allowed disabled:opacity-45"
            >
              {isSaving ? (
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#373785]/25 border-t-[#373785]" />
              ) : (
                <Save className="h-3.5 w-3.5" />
              )}
              Save changes
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1440px] gap-8 px-4 py-7 sm:px-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:px-8 lg:py-10 xl:grid-cols-[270px_minmax(0,820px)_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="mb-3 flex items-center justify-between lg:hidden">
            <label
              htmlFor="settings-section"
              className="text-xs font-semibold uppercase tracking-[0.15em] text-[#77756F]"
            >
              Settings section
            </label>
          </div>
          <div className="relative lg:hidden">
            <select
              id="settings-section"
              value={activeSection}
              onChange={(event) =>
                setActiveSection(event.target.value as SettingsSection)
              }
              className="h-12 w-full appearance-none rounded-lg border border-white/[0.08] bg-[#272725] px-4 text-sm font-semibold text-white outline-none focus:border-[#D9D6EA]/50"
            >
              {navigation.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-4 h-4 w-4 text-[#8B8A84]" />
          </div>

          <nav className="hidden space-y-1 lg:block" aria-label="Settings">
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#6F6D68]">
              Preferences
            </p>
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition ${
                    isActive
                      ? "border-[#D9D6EA]/20 bg-[#D9D6EA]/10"
                      : "border-transparent text-[#8B8A84] hover:bg-white/[0.035] hover:text-white"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 ${
                      isActive ? "text-[#D9D6EA]" : ""
                    }`}
                  />
                  <span className="min-w-0">
                    <span
                      className={`block text-sm font-semibold ${
                        isActive ? "text-white" : ""
                      }`}
                    >
                      {item.label}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-[#6F6D68]">
                      {item.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="mt-7 hidden border-t border-white/[0.07] pt-5 lg:block">
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-[#8B8A84] transition hover:bg-red-400/[0.07] hover:text-red-300 disabled:opacity-50"
            >
              <LogOut className="h-4 w-4" />
              {isLoggingOut ? "Logging out..." : "Log out"}
            </button>
          </div>
        </aside>

        <div className="min-w-0">
          <div className="mb-7">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#D9D6EA]">
              <Settings2 className="h-3.5 w-3.5" />
              Workspace preferences
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {navigation.find((item) => item.id === activeSection)?.label}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#8B8A84]">
              {activeSection === "profile" &&
                "Manage the identity and plan connected to your Curator workspace."}
              {activeSection === "appearance" &&
                "Fine-tune how Curator feels while you read, think, and write."}
              {activeSection === "notes" &&
                "Choose sensible defaults for a quieter, faster writing flow."}
              {activeSection === "ai" &&
                "Control how Curator assists you and shapes its responses."}
              {activeSection === "notifications" &&
                "Keep the useful nudges and switch off everything else."}
              {activeSection === "privacy" &&
                "Review security details and manage a portable copy of your preferences."}
            </p>
          </div>

          <div className="space-y-5">
            {activeSection === "profile" ? (
              <>
                <Card
                  title="Account profile"
                  description="This information identifies you across your private workspace."
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#D9D6EA] text-lg font-black text-[#373785] shadow-[0_10px_30px_rgba(55,55,133,0.2)]">
                        {initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-lg font-bold text-white">
                          {displayName || "Curator member"}
                        </p>
                        <p className="mt-1 truncate text-sm text-[#8B8A84]">
                          {appUser?.email || user?.email || "Signed-in account"}
                        </p>
                      </div>
                      <span className="w-fit rounded-full border border-[#D9D6EA]/15 bg-[#D9D6EA]/10 px-3 py-1 text-xs font-bold text-[#D9D6EA]">
                        {roleLabel}
                      </span>
                    </div>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block text-xs font-semibold text-[#A7A49C]">
                          Display name
                        </span>
                        <div className="relative">
                          <CircleUserRound className="absolute left-3.5 top-3 h-4 w-4 text-[#6F6D68]" />
                          <input
                            value={displayName}
                            onChange={(event) => {
                              setDisplayName(event.target.value);
                              setSavedAt(null);
                            }}
                            placeholder="Your name"
                            className="h-10 w-full rounded-lg border border-white/[0.08] bg-[#1F1F1E] pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-[#5F5D59] focus:border-[#D9D6EA]/45 focus:ring-2 focus:ring-[#D9D6EA]/5"
                          />
                        </div>
                      </label>
                      <label className="block">
                        <span className="mb-2 block text-xs font-semibold text-[#A7A49C]">
                          Email address
                        </span>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-3 h-4 w-4 text-[#6F6D68]" />
                          <input
                            value={appUser?.email || user?.email || ""}
                            readOnly
                            aria-label="Email address"
                            className="h-10 w-full cursor-not-allowed rounded-lg border border-white/[0.06] bg-[#1F1F1E]/70 pl-10 pr-3 text-sm text-[#8B8A84] outline-none"
                          />
                        </div>
                      </label>
                    </div>
                    <p className="mt-4 text-xs leading-5 text-[#6F6D68]">
                      Display preferences are currently saved on this device.
                      Email changes require account verification and are not yet
                      available.
                    </p>
                  </div>
                </Card>

                <Card title="Plan & usage">
                  <SettingRow
                    icon={Coins}
                    title={`${remainingCredits.toLocaleString()} AI credits remaining`}
                    description="Credits are used when Curator summarizes, rewrites, or extracts insights."
                  >
                    <Link
                      href="/pricing"
                      className="inline-flex h-9 items-center rounded-lg border border-white/[0.1] bg-white/[0.035] px-3.5 text-xs font-bold text-[#D9D6EA] transition hover:border-[#D9D6EA]/30 hover:bg-[#D9D6EA]/10"
                    >
                      View plans
                    </Link>
                  </SettingRow>
                </Card>
              </>
            ) : null}

            {activeSection === "appearance" ? (
              <>
                <Card
                  title="Theme"
                  description="Curator is designed as a low-glare workspace for long thinking sessions."
                >
                  <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6">
                    <button
                      type="button"
                      className="relative overflow-hidden rounded-xl border border-[#D9D6EA]/35 bg-[#1F1F1E] p-4 text-left ring-2 ring-[#D9D6EA]/5"
                    >
                      <div className="mb-4 flex h-24 gap-2 overflow-hidden rounded-lg border border-white/[0.08] bg-[#252523] p-2">
                        <div className="w-1/3 rounded bg-[#1F1F1E]" />
                        <div className="flex-1 rounded bg-[#2D2D2A] p-2">
                          <div className="mb-2 h-2 w-2/3 rounded bg-[#D9D6EA]/70" />
                          <div className="h-1.5 w-full rounded bg-white/10" />
                          <div className="mt-1.5 h-1.5 w-4/5 rounded bg-white/10" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-white">Curator dark</p>
                          <p className="mt-1 text-xs text-[#77756F]">Active theme</p>
                        </div>
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D9D6EA] text-[#373785]">
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        </span>
                      </div>
                    </button>
                    <div className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-[#242422] p-4 opacity-55">
                      <div className="mb-4 flex h-24 items-center justify-center rounded-lg border border-dashed border-white/[0.1] bg-[#1F1F1E]">
                        <Laptop className="h-6 w-6 text-[#77756F]" />
                      </div>
                      <p className="text-sm font-bold text-white">System theme</p>
                      <p className="mt-1 text-xs text-[#77756F]">Coming soon</p>
                    </div>
                  </div>
                </Card>

                <Card title="Layout">
                  <SettingRow
                    icon={Type}
                    title="Interface density"
                    description="Adjust the spacing between controls, notes, and menus."
                  >
                    <SegmentedControl
                      value={preferences.density}
                      options={[
                        { value: "comfortable", label: "Comfortable" },
                        { value: "compact", label: "Compact" },
                      ]}
                      onChange={(value) => updatePreference("density", value)}
                      label="Interface density"
                    />
                  </SettingRow>
                  <SettingRow
                    icon={Laptop}
                    title="Editor width"
                    description="Focused keeps lines shorter; wide uses more of the screen."
                  >
                    <SegmentedControl
                      value={preferences.editorWidth}
                      options={[
                        { value: "focused", label: "Focused" },
                        { value: "wide", label: "Wide" },
                      ]}
                      onChange={(value) => updatePreference("editorWidth", value)}
                      label="Editor width"
                    />
                  </SettingRow>
                  <SettingRow
                    icon={Type}
                    title="Editor text size"
                    description="Choose a comfortable default size for writing and reading."
                  >
                    <SegmentedControl
                      value={preferences.fontSize}
                      options={[
                        { value: "small", label: "Small" },
                        { value: "medium", label: "Medium" },
                        { value: "large", label: "Large" },
                      ]}
                      onChange={(value) => updatePreference("fontSize", value)}
                      label="Editor text size"
                    />
                  </SettingRow>
                </Card>
              </>
            ) : null}

            {activeSection === "notes" ? (
              <Card
                title="Writing defaults"
                description="Set the behavior Curator uses for every new note."
              >
                <SettingRow
                  icon={Save}
                  title="Autosave notes"
                  description="Save changes quietly as you type so your work is never lost."
                >
                  <Toggle
                    checked={preferences.autoSave}
                    onChange={(value) => updatePreference("autoSave", value)}
                    label="Autosave notes"
                  />
                </SettingRow>
                <SettingRow
                  icon={Type}
                  title="Spell check"
                  description="Use your browser's spelling suggestions inside the editor."
                >
                  <Toggle
                    checked={preferences.spellCheck}
                    onChange={(value) => updatePreference("spellCheck", value)}
                    label="Spell check"
                  />
                </SettingRow>
                <SettingRow
                  icon={Archive}
                  title="Automatic archiving"
                  description="Move inactive notes out of the main library after a set period."
                >
                  <div className="relative">
                    <select
                      value={preferences.archiveAfterDays}
                      onChange={(event) =>
                        updatePreference("archiveAfterDays", event.target.value)
                      }
                      aria-label="Automatic archiving period"
                      className="h-9 appearance-none rounded-lg border border-white/[0.08] bg-[#1F1F1E] pl-3 pr-9 text-xs font-semibold text-[#D6D4CE] outline-none focus:border-[#D9D6EA]/40"
                    >
                      <option value="never">Never</option>
                      <option value="30">After 30 days</option>
                      <option value="90">After 90 days</option>
                      <option value="180">After 6 months</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-3.5 w-3.5 text-[#77756F]" />
                  </div>
                </SettingRow>
              </Card>
            ) : null}

            {activeSection === "ai" ? (
              <>
                <div className="overflow-hidden rounded-xl border border-[#D9D6EA]/15 bg-[linear-gradient(135deg,rgba(217,214,234,0.12),rgba(55,55,133,0.08))] p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D9D6EA] text-[#373785]">
                      <WandSparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">
                        AI that stays in your lane
                      </p>
                      <p className="mt-1.5 max-w-xl text-sm leading-6 text-[#A7A49C]">
                        Curator uses your note only when you ask for help. These
                        controls shape the response style without changing your
                        original writing.
                      </p>
                    </div>
                  </div>
                </div>
                <Card title="Assistance">
                  <SettingRow
                    icon={Sparkles}
                    title="Contextual suggestions"
                    description="Offer relevant summaries, connections, and next steps while you work."
                  >
                    <Toggle
                      checked={preferences.aiSuggestions}
                      onChange={(value) =>
                        updatePreference("aiSuggestions", value)
                      }
                      label="Contextual AI suggestions"
                    />
                  </SettingRow>
                  <SettingRow
                    icon={WandSparkles}
                    title="Default response style"
                    description="Choose how much detail Curator uses in summaries and rewrites."
                  >
                    <div className="relative">
                      <select
                        value={preferences.aiTone}
                        onChange={(event) =>
                          updatePreference(
                            "aiTone",
                            event.target.value as Preferences["aiTone"],
                          )
                        }
                        aria-label="Default AI response style"
                        className="h-9 appearance-none rounded-lg border border-white/[0.08] bg-[#1F1F1E] pl-3 pr-9 text-xs font-semibold capitalize text-[#D6D4CE] outline-none focus:border-[#D9D6EA]/40"
                      >
                        <option value="concise">Concise</option>
                        <option value="balanced">Balanced</option>
                        <option value="detailed">Detailed</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-3.5 w-3.5 text-[#77756F]" />
                    </div>
                  </SettingRow>
                  <SettingRow
                    icon={Coins}
                    title="AI credit balance"
                    description="Your available balance for summaries, rewrites, and insight extraction."
                  >
                    <span className="text-sm font-bold text-[#D9D6EA]">
                      {remainingCredits.toLocaleString()} credits
                    </span>
                  </SettingRow>
                </Card>
              </>
            ) : null}

            {activeSection === "notifications" ? (
              <Card
                title="Email preferences"
                description="Curator only sends messages you have explicitly chosen."
              >
                <SettingRow
                  icon={BrainCircuit}
                  title="Weekly knowledge digest"
                  description="A compact review of recent notes, resurfaced ideas, and useful connections."
                >
                  <Toggle
                    checked={preferences.digest}
                    onChange={(value) => updatePreference("digest", value)}
                    label="Weekly knowledge digest"
                  />
                </SettingRow>
                <SettingRow
                  icon={Bell}
                  title="Note reminders"
                  description="Gentle follow-ups for notes you marked to revisit or act on."
                >
                  <Toggle
                    checked={preferences.reminderEmails}
                    onChange={(value) =>
                      updatePreference("reminderEmails", value)
                    }
                    label="Note reminder emails"
                  />
                </SettingRow>
                <SettingRow
                  icon={Mail}
                  title="Product updates"
                  description="Occasional announcements about meaningful new Curator features."
                >
                  <Toggle
                    checked={preferences.productUpdates}
                    onChange={(value) =>
                      updatePreference("productUpdates", value)
                    }
                    label="Product update emails"
                  />
                </SettingRow>
              </Card>
            ) : null}

            {activeSection === "privacy" ? (
              <>
                <Card title="Security">
                  <SettingRow
                    icon={KeyRound}
                    title="Password & sign-in"
                    description="Your sign-in is secured through Firebase Authentication."
                  >
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                      <LockKeyhole className="h-3.5 w-3.5" />
                      Protected
                    </span>
                  </SettingRow>
                  <SettingRow
                    icon={ShieldCheck}
                    title="Private workspace"
                    description="Authenticated notes and settings are excluded from search indexing."
                  >
                    <span className="text-xs font-semibold text-[#D9D6EA]">
                      Private by default
                    </span>
                  </SettingRow>
                </Card>

                <Card
                  title="Your data"
                  description="Take a portable copy of the preferences stored on this device."
                >
                  <SettingRow
                    icon={CloudDownload}
                    title="Export preferences"
                    description="Download your account summary and local settings as a JSON file."
                  >
                    <button
                      type="button"
                      onClick={handleExport}
                      className="inline-flex h-9 items-center gap-2 rounded-lg border border-white/[0.1] bg-white/[0.035] px-3.5 text-xs font-bold text-[#D9D6EA] transition hover:border-[#D9D6EA]/30 hover:bg-[#D9D6EA]/10"
                    >
                      <CloudDownload className="h-3.5 w-3.5" />
                      Export
                    </button>
                  </SettingRow>
                </Card>

                <section className="overflow-hidden rounded-xl border border-red-400/15 bg-red-400/[0.025]">
                  <div className="border-b border-red-400/10 px-5 py-4 sm:px-6">
                    <h2 className="text-sm font-bold text-red-300">
                      Danger zone
                    </h2>
                    <p className="mt-1 text-sm text-[#8B8A84]">
                      Permanent account actions require extra care.
                    </p>
                  </div>
                  <SettingRow
                    icon={Trash2}
                    title="Delete account"
                    description="Account deletion is not available yet. Contact support if you need your account removed."
                  >
                    <button
                      type="button"
                      disabled
                      title="Account deletion is not available yet"
                      className="h-9 cursor-not-allowed rounded-lg border border-red-400/15 bg-red-400/[0.06] px-3.5 text-xs font-bold text-red-300 opacity-50"
                    >
                      Delete account
                    </button>
                  </SettingRow>
                </section>
              </>
            ) : null}

            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-[#272725] px-4 py-3 text-sm font-semibold text-[#A7A49C] transition hover:border-red-400/15 hover:text-red-300 disabled:opacity-50 lg:hidden"
            >
              <LogOut className="h-4 w-4" />
              {isLoggingOut ? "Logging out..." : "Log out of Curator"}
            </button>
          </div>
        </div>

        <aside className="hidden xl:block">
          <div className="sticky top-24 rounded-xl border border-white/[0.08] bg-[#272725] p-5">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#D9D6EA]/10 text-[#D9D6EA]">
              <Moon className="h-4.5 w-4.5" />
            </div>
            <p className="text-sm font-bold text-white">A calmer workspace</p>
            <p className="mt-2 text-sm leading-6 text-[#8B8A84]">
              Curator&apos;s defaults are deliberately quiet: dark surfaces,
              low-contrast borders, autosave, and only useful notifications.
            </p>
            <div className="mt-5 border-t border-white/[0.07] pt-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#6F6D68]">
                Need help?
              </p>
              <a
                href="mailto:support@curatornotes.com"
                className="mt-2 inline-flex text-xs font-semibold text-[#D9D6EA] transition hover:text-white"
              >
                support@curatornotes.com
              </a>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
