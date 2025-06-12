"use client";

import React from "react";
import { useParams } from "next/navigation";

const ChatHeader = () => {
  const params = useParams();

  if (!params.id) return null;

  return (
    <header className="py-6">
      <h1 className="ml-4">Chat Header</h1>
    </header>
  );
};

export default ChatHeader;
