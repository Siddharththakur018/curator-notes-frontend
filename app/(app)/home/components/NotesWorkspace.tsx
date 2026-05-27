import EditorArea from "./editor/EditorArea";
import NotesListPanel from "./NotesListPanel";

const NotesWorkspace = () => {
  return (
    <div className="flex h-full min-h-0">
      <div className="w-[400px] border-r border-gray-200 bg-[#FAFAFB]">
        <NotesListPanel />
      </div>
      <div className="min-w-0 flex-1">
        <EditorArea />
      </div>
    </div>
  );
};

export default NotesWorkspace;
