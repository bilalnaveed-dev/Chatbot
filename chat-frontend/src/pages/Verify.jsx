import { useState } from "react";
import { UserData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/Loading";
import { ChatData } from "../context/ChatContext";
import { FiKey, FiShield } from "react-icons/fi";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const { verifyUser, btnLoading } = UserData();
  const { fetchChats } = ChatData();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    verifyUser(Number(otp), navigate, fetchChats);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f7fb] px-4 py-8 text-slate-950">
      <form
        className="w-full max-w-md rounded-md border border-slate-200 bg-white p-6 shadow-sm"
        onSubmit={submitHandler}
      >
        <div className="mb-6 grid h-12 w-12 place-items-center rounded-md bg-teal-50 text-xl text-teal-700">
          <FiShield />
        </div>
        <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
          Check your inbox
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">
          Enter verification code
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Use the one-time code sent to your email to unlock your chat
          workspace.
        </p>

        <label className="mt-8 block text-sm font-medium" htmlFor="otp">
          One-time code
        </label>
        <div className="mt-2 flex items-center gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-100">
          <FiKey className="text-slate-400" />
          <input
            type="text"
            inputMode="numeric"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            className="h-12 flex-1 bg-transparent text-sm tracking-widest outline-none placeholder:text-slate-400"
            placeholder="000000"
            required
          />
        </div>

        <button
          className="mt-6 flex h-12 w-full items-center justify-center rounded-md bg-teal-600 px-4 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={btnLoading || !otp}
        >
          {btnLoading ? <LoadingSpinner /> : "Verify and continue"}
        </button>
      </form>
    </main>
  );
};

export default Verify;
