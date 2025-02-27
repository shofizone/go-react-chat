import React, { useEffect, useState, useRef } from "react";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<
    { sender: string; content: string; timestamp: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false);
  const websocket = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Initialize WebSocket connection
    websocket.current = new WebSocket("ws://localhost:8080/ws");

    websocket.current.onopen = () => {
      console.log("Connected to WebSocket");
      setConnected(true);
    };

    websocket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [
        ...prev,
        {
          sender: "Other",
          content: message.content,
          timestamp: new Date().toISOString(),
        },
      ]);
    };

    websocket.current.onclose = () => {
      console.log("Disconnected from WebSocket");
      setConnected(false);
    };

    return () => {
      websocket.current?.close();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() && websocket.current?.readyState === WebSocket.OPEN) {
      const message = {
        content: input.trim(),
        timestamp: new Date().toISOString(),
      };

      websocket.current.send(JSON.stringify(message));

      setMessages((prev) => [
        ...prev,
        {
          sender: "You",
          content: input.trim(),
          timestamp: new Date().toISOString(),
        },
      ]);

      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4 dark:bg-gray-900">
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-t-lg">
        <h1 className="text-xl font-bold dark:text-white">Chat Room</h1>
        <div
          className={`text-sm ${connected ? "text-green-500" : "text-red-500"}`}
        >
          {connected ? "Connected" : "Disconnected"}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 p-2 rounded-lg ${
              msg.sender === "You"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-200 dark:bg-gray-700 mr-auto dark:text-white"
            } max-w-[70%]`}
          >
            <div className="font-bold text-sm">{msg.sender}</div>
            <div className="break-words">{msg.content}</div>
            <div className="text-xs opacity-75">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t dark:border-gray-700 p-4 bg-white dark:bg-gray-800 rounded-b-lg">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 p-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
                        dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          />
          <button
            onClick={sendMessage}
            disabled={!connected}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 
                        dark:disabled:bg-gray-600 dark:hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
