import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X } from 'lucide-react';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, sender: 'user' }]);
      setInputMessage('');
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "Thank you for your message. An agent will respond shortly.", sender: 'bot' }]);
      }, 1000);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="w-80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Live Chat</CardTitle>
            <Button variant="ghost" size="sm" onClick={toggleChat}><X size={18} /></Button>
          </CardHeader>
          <CardContent>
            <div className="h-64 overflow-y-auto mb-4">
              {messages.map((msg, index) => (
                <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <span className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <form onSubmit={sendMessage} className="flex w-full">
              <Input
                type="text"
                placeholder="Type a message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-grow mr-2"
              />
              <Button type="submit">Send</Button>
            </form>
          </CardFooter>
        </Card>
      ) : (
        <Button onClick={toggleChat} className="rounded-full w-12 h-12 flex items-center justify-center">
          <MessageCircle size={24} />
        </Button>
      )}
    </div>
  );
};

export default LiveChat;