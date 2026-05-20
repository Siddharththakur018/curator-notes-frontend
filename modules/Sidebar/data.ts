import { Star, Tag, ArchiveRestore, Bot } from "lucide-react";

export const sidebarData = [
  {
    title: "Favourite",
    route: "/favourites",
    icon: Star,
  },
  {
    title: "Tags",
    route: "/tags",
    icon: Tag,
  },
  {
    title: "Archive",
    route: "/archive",
    icon: ArchiveRestore,
  },
  {
    title: "AI Workspace",
    route: "/ai-workspace",
    icon: Bot,
  },
];