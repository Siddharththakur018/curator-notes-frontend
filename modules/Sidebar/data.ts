import { FileText, Star, Tag } from "lucide-react";

export const sidebarData = [
  {
    title: "All Notes",
    route: "/notes",
    icon: FileText,
  },
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
];