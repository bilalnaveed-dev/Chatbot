import { useState } from "react";
import { UserData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/Loading";
import { FiMail, FiShield } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const { loginUser, btnLoading } = UserData();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    loginUser(email, navigate);
  };

  return (
    <main className="grid min-h-screen bg-[#f4f7fb] px-4 py-8 text-slate-950 md:grid-cols-[1fr_520px] md:p-0">
      <section className="hidden items-center justify-center bg-slate-950 px-10 text-white md:flex">
        <div className="max-w-lg">
          <div className="mb-8 grid h-14 w-14 place-items-center rounded-md bg-teal-500 text-2xl">
            <FiShield />
          </div>
          <h1 className="text-5xl font-semibold tracking-tight">
            MERN ChatBot
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            A private chat workspace with email verification, saved history, and
            server-side AI responses.
          </p>
        </div>
      </section>

      <section className="flex items-center justify-center">
        <form
          className="w-full max-w-md rounded-md border border-slate-200 bg-white p-6 shadow-sm"
          onSubmit={submitHandler}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
            Welcome back
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            Sign in with email
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            We will send a one-time code to the email address you enter.
          </p>

          <label className="mt-8 block text-sm font-medium" htmlFor="email">
            Email address
          </label>
          <div className="mt-2 flex items-center gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-100">
            <FiMail className="text-slate-400" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
              placeholder="you@example.com"
              required
            />
          </div>

          <button
            className="mt-6 flex h-12 w-full items-center justify-center rounded-md bg-teal-600 px-4 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={btnLoading}
          >
            {btnLoading ? <LoadingSpinner /> : "Send verification code"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
