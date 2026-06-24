import { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { ChatData } from "../context/ChatContext";
import { LoadingBig, LoadingSmall } from "../components/Loading";
import {
  FiMenu,
  FiMessageSquare,
  FiSend,
  FiUser,
  FiZap,
} from "react-icons/fi";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const messageContainerRef = useRef();

  const {
    fetchResponse,
    messages,
    prompt,
    setPrompt,
    newRequestLoading,
    loading,
    chats,
    createChat,
    createLod,
    selected,
  } = ChatData();

  const submitHandler = (e) => {
    e.preventDefault();
    fetchResponse();
  };

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo({
        top: messageContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, newRequestLoading]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f4f7fb] text-slate-950">
      <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(false)} />

      <main className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 text-slate-700"
            aria-label="Open sidebar"
          >
            <FiMenu />
          </button>
          <span className="text-sm font-semibold">MERN ChatBot</span>
          <span className="h-10 w-10" />
        </div>

        <Header />

        <section
          ref={messageContainerRef}
          className="thin-scrollbar flex-1 overflow-y-auto px-4 py-6 md:px-8"
        >
          <div className="mx-auto flex max-w-4xl flex-col gap-5">
            {loading ? (
              <LoadingBig />
            ) : messages.length > 0 ? (
              messages.map((message) => (
                <div key={message._id || `${message.question}-${message.answer}`}>
                  <article className="ml-auto mb-4 flex max-w-[85%] gap-3 rounded-md bg-slate-950 p-4 text-white shadow-sm">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-white/10 text-lg">
                      <FiUser />
                    </div>
                    <p className="whitespace-pre-wrap text-sm leading-6">
                      {message.question}
                    </p>
                  </article>

                  <article className="mr-auto flex max-w-[92%] gap-3 rounded-md border border-slate-200 bg-white p-4 text-slate-800 shadow-sm">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-teal-50 text-lg text-teal-700">
                      <FiZap />
                    </div>
                    <p className="whitespace-pre-wrap text-sm leading-6">
                      {message.answer}
                    </p>
                  </article>
                </div>
              ))
            ) : (
              <div className="mx-auto mt-14 max-w-xl text-center">
                <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-md bg-teal-50 text-2xl text-teal-700">
                  <FiMessageSquare />
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                  Start a focused conversation
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Ask a question, draft content, debug code, or explore an idea.
                  Your conversation will stay saved in the sidebar.
                </p>
                {chats.length === 0 && (
                  <button
                    type="button"
                    onClick={createChat}
                    disabled={createLod}
                    className="mt-6 rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {createLod ? "Creating..." : "Create first chat"}
                  </button>
                )}
              </div>
            )}

            {newRequestLoading && (
              <div className="mr-auto max-w-[92%] rounded-md border border-slate-200 bg-white p-4 shadow-sm">
                <LoadingSmall />
              </div>
            )}
          </div>
        </section>

        <div className="border-t border-slate-200 bg-white px-4 py-4 md:px-8">
          <form
            onSubmit={submitHandler}
            className="mx-auto flex max-w-4xl items-end gap-3 rounded-md border border-slate-200 bg-slate-50 p-2 shadow-sm"
          >
            <textarea
              className="max-h-36 min-h-12 flex-1 resize-none bg-transparent px-3 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
              placeholder={
                selected
                  ? "Message your assistant..."
                  : "Create a chat to start messaging..."
              }
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={!selected || newRequestLoading}
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submitHandler(e);
                }
              }}
            />
            <button
              type="submit"
              disabled={!selected || !prompt.trim() || newRequestLoading}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-teal-600 text-lg text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              aria-label="Send message"
            >
              <FiSend />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Home;
