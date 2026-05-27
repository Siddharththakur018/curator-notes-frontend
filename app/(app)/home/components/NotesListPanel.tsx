import { getAllNotes } from "@/services/notes.service";
import { BookImage, Search } from "lucide-react";
import { useEffect, useState } from "react";

type Note = {
  id: string;
  title: string;
  previewText: string;
};

const NotesListPanel= () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllNotes()
      .then((response) => {
        console.log(response.data);
        setNotes(response.data.notes ?? []);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <>
      <section className="bg-[#EFEFFF] py-4 px-4 flex flex-col h-full">
        <div className="flex items-center bg-white px-2 py-4 rounded-full gap-2">
          <Search className="text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search Notes..."
            className="outline-none w-full"
          />
        </div>

        {loading ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-blue-800" />
          </div>
        ) : notes.length > 0 ? (
          <>
            {notes.map((note) => {
              return (
                <div key={note.id}>
                  <h2>{note.title}</h2>
                  <h2>{note.previewText}</h2>
                </div>
              );
            })}
          </>
        ) : (
          <>
            <div className="flex flex-1 flex-col items-center justify-center w-52 text-center mx-auto">
              <div className="bg-gray-300 rounded-full px-6 py-6">
                <BookImage className="text-gray-400" size={40} />
              </div>
              <p>No notes yet</p>
              <p>
                Your collection of thoughts will appear here once you start
                writing.
              </p>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default NotesListPanel;
