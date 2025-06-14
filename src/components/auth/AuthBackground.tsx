
export function AuthBackground() {
  return (
    <>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full blur-2xl"></div>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute top-20 right-20 w-8 h-8 bg-blue-400/20 rounded-full animate-bounce"></div>
      <div className="absolute bottom-32 right-32 w-6 h-6 bg-purple-400/30 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-40 w-4 h-4 bg-pink-400/25 rounded-full animate-ping"></div>
    </>
  );
}
