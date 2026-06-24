export const LoadingSpinner = () => {
  return (
    <div className="inline-block h-5 w-5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
  );
};

export const LoadingBig = () => {
  return (
    <div className="flex min-h-64 items-center justify-center">
      <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <span className="h-3 w-3 animate-bounce rounded-full bg-teal-600 [animation-delay:-0.3s]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-teal-600 [animation-delay:-0.15s]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-teal-600" />
      </div>
    </div>
  );
};

export const LoadingSmall = () => {
  return (
    <div className="flex items-center gap-2">
      <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-teal-600 [animation-delay:-0.3s]" />
      <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-teal-600 [animation-delay:-0.15s]" />
      <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-teal-600" />
    </div>
  );
};
