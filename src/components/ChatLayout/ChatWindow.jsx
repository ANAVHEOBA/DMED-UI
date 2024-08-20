import React, { useState, useEffect } from 'react';
import WeaveDB from 'weavedb-sdk';
import { BsFillTelephoneFill, BsFillCameraVideoFill } from 'react-icons/bs';
import { useRouter } from 'next/router';

const ChatWindow = ({ activeChat }) => {
  const router = useRouter();
  const [db, setDb] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const initDB = async () => {
      const contractTxId = 'DznefHbFhcyqyjZ0aNGqsWwkjcwRDlraUR72EkXames'; // Replace with your actual contract ID
      const weavedb = new WeaveDB({ contractTxId });
      await weavedb.init();
      setDb(weavedb);
    };
    initDB();
  }, []);

  const sendMessage = async () => {
    if (!db || !newMessage.trim()) return;

    const message = {
      text: newMessage,
      sender: 'user', // You might want to use a real user ID here
      timestamp: new Date().toISOString(),
    };

    try {
      await db.add(message, 'anavheoba');
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const fetchMessages = async () => {
    if (!db) return;

    try {
      const result = await db.get('anavheoba', ['timestamp', 'desc']);
      setMessages(result);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    if (db) {
      fetchMessages();
      // Set up polling for updates
      const intervalId = setInterval(fetchMessages, 5000); // Poll every 5 seconds
      return () => clearInterval(intervalId);
    }
  }, [db]);

  const handleCallClick = () => {
    router.push('/Call');
  };

  const handleVideoClick = () => {
    router.push('/Video');
  };

  if (!activeChat) {
    return (
      <div className="w-3/4 flex items-center justify-center">
        <p className="text-gray-500 dark:text-dark-muted">Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="w-3/4 flex flex-col">
      <div className="p-5 bg-gray-100 dark:bg-dark-card border-b border-gray-200 dark:border-dark-input-border flex justify-between items-center">
        <div>
          <h3 className="font-semibold dark:text-white">{activeChat.name}</h3>
          <p className="text-sm text-gray-500 dark:text-dark-muted">{activeChat.specialization}</p>
        </div>
        <div className="flex space-x-4">
          <button
            className="p-2 bg-primary-green text-white rounded-md dark:bg-primary-yellow dark:text-black"
            onClick={handleCallClick}
          >
            <BsFillTelephoneFill className="w-5 h-5" />
          </button>
          <button
            className="p-2 bg-primary-green text-white rounded-md dark:bg-primary-yellow dark:text-black"
            onClick={handleVideoClick}
          >
            <BsFillCameraVideoFill className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex-1 p-5 bg-white dark:bg-dark-card overflow-y-auto">
        <div className="space-y-3">
          {messages.map((message, index) => (
            <div key={index} className={`flex items-start space-x-2 ${message.sender === 'user' ? 'justify-end' : ''}`}>
              <div className={`p-3 rounded-lg ${message.sender === 'user' ? 'bg-primary-green dark:bg-primary-yellow text-white dark:text-black' : 'bg-gray-100 dark:bg-dark-card'}`}>
                <p>{message.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 p-5">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          className="w-full p-3 border border-gray-200 rounded-lg dark:border-dark-input-border dark:bg-dark-card dark:text-white"
        />
        <button onClick={sendMessage} className="mt-2 p-2 bg-primary-green text-white rounded-md dark:bg-primary-yellow dark:text-black">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;

