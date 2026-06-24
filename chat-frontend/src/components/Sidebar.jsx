import { ChatData } from "../context/ChatContext";
import { UserData } from "../context/UserContext";
import { LoadingSpinner } from "./Loading";
import { useNavigate } from "react-router-dom";
import {
  FiLogOut,
  FiMessageSquare,
  FiPlus,
  FiTrash2,
  FiX,
} from "react-icons/fi";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { chats, createChat, createLod, selected, setSelected, deleteChat } =
    ChatData();
  const { logoutHandler, user } = UserData();
  const navigate = useNavigate();

  const deleteChatHandler = (event, id) => {
    event.stopPropagation();

    if (confirm("Are you sure you want to delete this chat?")) {
      deleteChat(id);
    }
  };

  const selectChat = (id) => {
    setSelected(id);
    toggleSidebar();
  };

  return (
    <>
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-slate-950/40 md:hidden"
          onClick={toggleSidebar}
          aria-label="Close sidebar overlay"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-80 max-w-[85vw] flex-col border-r border-slate-200 bg-white transition-transform duration-200 md:relative md:z-auto md:w-80 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
          <div>
            <p className="text-sm font-semibold text-slate-950">
              MERN ChatBot
            </p>
            <p className="text-xs text-slate-500">
              {user?.email || "AI workspace"}
            </p>
          </div>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-md text-slate-500 hover:bg-slate-100 md:hidden"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            <FiX />
          </button>
        </div>

        <div className="p-4">
          <button
            type="button"
            onClick={createChat}
            disabled={createLod}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {createLod ? <LoadingSpinner /> : <FiPlus />}
            <span>{createLod ? "Creating" : "New chat"}</span>
          </button>
        </div>

        <div className="min-h-0 flex-1 px-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Recent chats
            </p>
            <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-500">
              {chats.length}
            </span>
          </div>

          <div className="thin-scrollbar flex max-h-full flex-col gap-2 overflow-y-auto pb-4">
            {chats.length > 0 ? (
              chats.map((chat) => (
                <button
                  key={chat._id}
                  type="button"
                  className={`group flex w-full items-center gap-3 rounded-md border px-3 py-3 text-left transition ${
                    selected === chat._id
                      ? "border-teal-200 bg-teal-50 text-teal-950"
                      : "border-transparent bg-slate-50 text-slate-700 hover:border-slate-200 hover:bg-white"
                  }`}
                  onClick={() => selectChat(chat._id)}
                >
                  <FiMessageSquare className="shrink-0 text-slate-400" />
                  <span className="min-w-0 flex-1 truncate text-sm">
                    {chat.latestMessage || "New Chat"}
                  </span>
                  <span
                    role="button"
                    tabIndex={0}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-slate-400 opacity-100 transition hover:bg-red-50 hover:text-red-600 md:opacity-0 md:group-hover:opacity-100"
                    onClick={(event) => deleteChatHandler(event, chat._id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        deleteChatHandler(event, chat._id);
                      }
                    }}
                    aria-label="Delete chat"
                  >
                    <FiTrash2 />
                  </span>
                </button>
              ))
            ) : (
              <div className="rounded-md border border-dashed border-slate-200 p-4 text-sm leading-6 text-slate-500">
                No chats yet. Create one and your history will appear here.
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-slate-200 p-4">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-md border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            onClick={() => logoutHandler(navigate)}
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
