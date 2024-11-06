import React, { useState } from 'react';
import { Send, Sparkle, Heart, Camera } from 'lucide-react';
import Image from 'next/image';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Olá! ✨ Sou a Papori, a Duende mais fixe do Pólo Norte! Posso criar mensagens e imagens mágicas! Experimenta dizer 'desenha um duende' ou conversa comigo! 🎄💖", 
      sender: "bot" 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const handleGenerateImage = async (prompt) => {
    setIsGeneratingImage(true);
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages(prev => [
          ...prev,
          { 
            id: prev.length + 1, 
            text: "Aqui está a tua imagem mágica! ✨🎨",
            imageUrl: data.url,
            sender: "bot" 
          }
        ]);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { 
          id: prev.length + 1, 
          text: "Ups! A minha varinha de desenhar precisa de mais pó mágico! 🎨❌", 
          sender: "bot" 
        }
      ]);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleSend = async () => {
    if (inputText.trim()) {
      const userMessage = { id: messages.length + 1, text: inputText, sender: "user" };
      setMessages(prev => [...prev, userMessage]);
      setInputText('');

      if (inputText.toLowerCase().includes('desenha') || 
          inputText.toLowerCase().includes('gera uma imagem') ||
          inputText.toLowerCase().includes('cria uma imagem')) {
        setIsGeneratingImage(true);
        await handleGenerateImage(inputText);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: inputText })
        });

        const data = await response.json();
        
        if (response.ok) {
          setMessages(prev => [
            ...prev,
            { id: prev.length + 1, text: data.response, sender: "bot" }
          ]);
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        setMessages(prev => [
          ...prev,
          { 
            id: prev.length + 1, 
            text: "Ups! A minha varinha mágica está sem pilhas! Volto já num instante! ✨💫", 
            sender: "bot" 
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto bg-gradient-to-b from-pink-50 to-purple-50 p-4">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-2xl shadow-lg">
        <div className="flex items-center gap-3">
          <Sparkle className="h-8 w-8 text-yellow-300" />
          <h1 className="text-2xl font-bold">Papori</h1>
        </div>
        {isLoading || isGeneratingImage ? (
          <Heart className="h-8 w-8 animate-pulse text-pink-200" />
        ) : (
          <Heart className="h-8 w-8 text-pink-200" />
        )}
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 my-4 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-2">
                <Sparkle className="h-5 w-5 text-white" />
              </div>
            )}
            <div
              className={`p-4 rounded-2xl max-w-[80%] shadow-md ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-br-none'
                  : 'bg-white text-gray-800 rounded-bl-none'
              }`}
            >
              {message.text}
              {message.imageUrl && (
                <div className="relative w-full aspect-square mt-2">
                  <Image 
                    src={message.imageUrl} 
                    alt="Imagem gerada pela Papori"
                    fill
                    className="rounded-xl object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
        {(isLoading || isGeneratingImage) && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl shadow-md">
              <div className="flex items-center space-x-2">
                {isGeneratingImage ? (
                  <>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" />
                      <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                    <span className="text-sm text-purple-500">A criar a tua imagem mágica...</span>
                  </>
                ) : (
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" />
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white/70 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
        <div className="flex gap-3">
          <button
            onClick={() => setInputText(prev => prev + "Desenha ")}
            className="bg-purple-100 text-purple-500 p-4 rounded-xl hover:bg-purple-200 transition-all"
            title="Gerar uma imagem"
          >
            <Camera className="h-6 w-6" />
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escreve a tua mensagem ou pede-me para desenhar algo... ✨"
            className="flex-1 p-4 border border-purple-200 rounded-xl focus:outline-none focus:border-pink-400 bg-white/50 backdrop-blur-sm transition-all"
            disabled={isLoading || isGeneratingImage}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || isGeneratingImage}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl hover:opacity-90 transition-all shadow-md disabled:opacity-50"
            aria-label="Enviar mensagem"
          >
            <Send className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;