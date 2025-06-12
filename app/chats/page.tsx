import React from "react";
import Image from "next/image";
import ChatIllustration from "@/public/6548.jpg";

const Chats = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br  dark:from-slate-900 dark:to-slate-800">
      <div className="relative size-80 mb-8">
        <Image
          src={ChatIllustration}
          alt="Chat Illustration"
          fill
          className="object-contain"
        />
      </div>
      <h1 className="text-3xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
        Select a Chat to Begin
      </h1>
      <p className="text-slate-600 dark:text-slate-300 text-center max-w-md">
        Choose a conversation from the sidebar to start messaging
      </p>
    </div>
  );
};

export default Chats;
