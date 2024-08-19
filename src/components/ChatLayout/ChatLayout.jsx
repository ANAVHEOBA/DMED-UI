// src/components/ChatLayout.js
import React, { useState } from 'react';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';

const ChatLayout = () => {
  const [activeChat, setActiveChat] = useState(null);

  return (
    <div className="flex h-screen">
      <ChatSidebar setActiveChat={setActiveChat} />
      <ChatWindow activeChat={activeChat} />
    </div>
  );
};

export default ChatLayout;
