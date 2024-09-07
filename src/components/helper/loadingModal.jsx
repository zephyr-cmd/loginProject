function LoadingModal() {
  return (
    <div>
      <div className="flex flex-row gap-4 text-white justify-center items-center">
        <div className="text-3xl">Redirecting to home page</div>
        <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:.7s]"></div>
        <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:.7s]"></div>
      </div>
    </div>
  );
}

export { LoadingModal };
