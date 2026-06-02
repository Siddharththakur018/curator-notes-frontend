export type Note = {
  id: string;
  title: string;
  previewText: string;
  content: string;
  isFavorite?: boolean;
  isArchived?: boolean;
}
