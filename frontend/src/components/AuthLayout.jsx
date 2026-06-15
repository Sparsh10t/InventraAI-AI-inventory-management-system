import React from "react";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-8">

      <div className="w-full max-w-6xl h-[85vh] bg-zinc-900 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.45)] flex">

        {/* Left Side */}
        <div className="w-1/2 relative hidden lg:block">

          <img
            src="/auth-banner.jpg"
            alt="Auth Banner"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-zinc-950/40" />

          <div className="absolute bottom-12 left-10 text-white">
            <h1 className="text-4xl font-semibold">
              Inventra AI
            </h1>

            <p className="mt-3 text-lg">
              Smart Inventory Management
            </p>
          </div>

        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 bg-zinc-900 flex items-center justify-center px-16">

          <div className="w-full max-w-md">

            <h2 className="text-4xl font-semibold text-white mb-2">
              {title}
            </h2>

            <p className="text-zinc-400 mb-10">
              {subtitle}
            </p>

            {children}

          </div>

        </div>

      </div>

    </div>
  );
};

export default AuthLayout;