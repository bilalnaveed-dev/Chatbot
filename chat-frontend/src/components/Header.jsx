import { ChatData } from "../context/ChatContext";

const Header = () => {
  const { chats, selected } = ChatData();
  const currentChat = chats.find((chat) => chat._id === selected);

  return (
    <header className="border-b border-slate-200 bg-white px-4 py-5 md:px-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
            AI assistant
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
            {currentChat?.latestMessage && currentChat.latestMessage !== "New Chat"
              ? currentChat.latestMessage
              : "How can I help today?"}
          </h1>
        </div>
        <p className="text-sm text-slate-500">
          {chats.length === 0
            ? "Create a chat to begin"
            : `${chats.length} saved ${chats.length === 1 ? "chat" : "chats"}`}
        </p>
      </div>
    </header>
  );
};

export default Header;
