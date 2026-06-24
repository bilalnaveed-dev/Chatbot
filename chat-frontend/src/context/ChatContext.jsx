import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";
import toast from "react-hot-toast";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [newRequestLoading, setNewRequestLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [selected, setSelected] = useState(null);
  const [createLod, setCreateLod] = useState(false);
  const [loading, setLoading] = useState(false);

  async function fetchResponse() {
    const currentPrompt = prompt.trim();

    if (!currentPrompt) return toast.error("Write a prompt first");
    if (!selected) return toast.error("Create or select a chat first");

    setNewRequestLoading(true);
    setPrompt("");

    try {
      const { data } = await axios.post(
        `${server}/api/chat/${selected}/respond`,
        { prompt: currentPrompt },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      setMessages((prev) => [...prev, data.conversation]);
      setChats((prev) =>
        prev.map((chat) => (chat._id === selected ? data.updatedChat : chat))
      );
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
      setPrompt(currentPrompt);
    } finally {
      setNewRequestLoading(false);
    }
  }

  async function fetchChats() {
    try {
      const { data } = await axios.get(`${server}/api/chat/all`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setChats(data);
      setSelected((current) => current || data[0]?._id || null);
    } catch (error) {
      console.log(error);
    }
  }

  async function createChat() {
    setCreateLod(true);
    try {
      const { data } = await axios.post(
        `${server}/api/chat/new`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      setChats((prev) => [data, ...prev]);
      setSelected(data._id);
      setMessages([]);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setCreateLod(false);
    }
  }

  async function fetchMessages() {
    if (!selected) {
      setMessages([]);
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/chat/${selected}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setMessages(data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Unable to load messages");
    } finally {
      setLoading(false);
    }
  }

  async function deleteChat(id) {
    try {
      const { data } = await axios.delete(`${server}/api/chat/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      toast.success(data.message);
      setChats((prev) => {
        const nextChats = prev.filter((chat) => chat._id !== id);

        if (selected === id) {
          setSelected(nextChats[0]?._id || null);
        }

        return nextChats;
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [selected]);

  return (
    <ChatContext.Provider
      value={{
        fetchResponse,
        messages,
        prompt,
        setPrompt,
        newRequestLoading,
        chats,
        createChat,
        createLod,
        selected,
        setSelected,
        loading,
        setLoading,
        deleteChat,
        fetchChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatData = () => useContext(ChatContext);
