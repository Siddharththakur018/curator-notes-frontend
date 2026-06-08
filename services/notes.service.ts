import axiosClient from "@/client/axios";

type CreateNotePayload = {
  title: string;
  previewText: string;
  content: unknown;
  isFavorite?: boolean;
  isArchived?: boolean;
  searchText: string;
};

type UpdateNotePayload = {
  title: string;
  previewText: string;
  content: unknown;
  isFavorite?: boolean;
  isArchived?: boolean;
  searchText: string;
};

export const createNote = async (payload: CreateNotePayload) => {
  const response = await axiosClient.post("/notes", payload);

  return response;
};

export const getAllNotes = async (search?: string) => {
  const response = await axiosClient.get("/notes", {
    params: {
      search,
    },
  });

  return response;
};

export const getNoteById = async (id: string) => {
  const response = await axiosClient.get(`/notes/${id}`);

  return response;
};

export const deleteNote = async (id: string) => {
  const response = await axiosClient.delete(`/notes/${id}`);

  return response;
};

export const updateNote = async (id: string, payload: UpdateNotePayload) => {
  const response = await axiosClient.put(`/notes/${id}`, payload);

  return response;
};
