import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
import { RootState } from '../../store';
import { addMessage, toggleChat, setTyping, setConversationState } from '../../store/slices/chatSlice';
import { setFilters, setSearchQuery } from '../../store/slices/productsSlice';

const ChatBot: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { messages, isOpen, isTyping, conversationState } = useSelector((state: RootState) => state.chat);
  const { items: products } = useSelector((state: RootState) => state.products);
  const [inputMessage, setInputMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    dispatch(addMessage({ text: inputMessage, sender: 'user' }));
    const userInput = inputMessage.toLowerCase().trim();
    setInputMessage('');

    // Show typing indicator
    dispatch(setTyping(true));

    // Process message based on conversation state
    setTimeout(() => {
      const botResponse = processUserMessage(userInput);
      dispatch(addMessage({ text: botResponse.message, sender: 'bot' }));
      
      if (botResponse.newState) {
        dispatch(setConversationState(botResponse.newState));
      }
      
      if (botResponse.navigate) {
        setTimeout(() => {
          botResponse.navigate!();
        }, 1000);
      }
      
      dispatch(setTyping(false));
    }, 1000);
  };

  const processUserMessage = (userInput: string) => {
    const state = conversationState;

    // Reset conversation if user says hello, hi, or restart
    if (userInput.includes('hello') || userInput.includes('hi') || userInput.includes('restart') || userInput.includes('start over')) {
      return {
        message: 'Hello! I\'m here to help you find the perfect product. What are you looking for today? You can say things like "shoes", "shirts", "jeans", "dresses", or "jackets".',
        newState: { step: 'category', category: '', size: '', color: '' }
      };
    }

    switch (state.step) {
      case 'category':
        return handleCategoryStep(userInput);
      case 'size':
        return handleSizeStep(userInput);
      case 'color':
        return handleColorStep(userInput);
      default:
        return handleGeneralQuery(userInput);
    }
  };

  const handleCategoryStep = (userInput: string) => {
    const categories = ['shoes', 'shirts', 'jeans', 'dresses', 'jackets'];
    const foundCategory = categories.find(cat => userInput.includes(cat));

    if (foundCategory) {
      const availableSizes = getAvailableSizes(foundCategory);
      return {
        message: `Great! I found ${foundCategory} for you. What size are you looking for? Available sizes: ${availableSizes.join(', ')}`,
        newState: { step: 'size', category: foundCategory, size: '', color: '' }
      };
    } else {
      return {
        message: 'I can help you find shoes, shirts, jeans, dresses, or jackets. Which category interests you?',
        newState: { step: 'category', category: '', size: '', color: '' }
      };
    }
  };

  const handleSizeStep = (userInput: string) => {
    const { category } = conversationState;
    const availableSizes = getAvailableSizes(category);
    const foundSize = availableSizes.find(size => 
      userInput.includes(size.toLowerCase()) || userInput === size.toLowerCase()
    );

    if (foundSize) {
      const availableColors = getAvailableColors(category, foundSize);
      if (availableColors.length > 0) {
        return {
          message: `Perfect! Size ${foundSize} it is. Now, what color would you prefer? Available colors: ${availableColors.join(', ')}`,
          newState: { step: 'color', category, size: foundSize, color: '' }
        };
      } else {
        return {
          message: `Sorry, size ${foundSize} is not available for ${category}. Available sizes are: ${availableSizes.join(', ')}`,
          newState: conversationState
        };
      }
    } else {
      return {
        message: `Please choose from available sizes: ${availableSizes.join(', ')}`,
        newState: conversationState
      };
    }
  };

  const handleColorStep = (userInput: string) => {
    const { category, size } = conversationState;
    const availableColors = getAvailableColors(category, size);
    const foundColor = availableColors.find(color => 
      userInput.includes(color.toLowerCase())
    );

    if (foundColor) {
      const matchingProducts = findMatchingProducts(category, size, foundColor);
      
      if (matchingProducts.length > 0) {
        // Apply filters and navigate
        const navigateToProducts = () => {
          dispatch(setFilters({
            category: [category],
            size: [size],
            color: [foundColor],
            brand: [],
            priceRange: [0, 10000],
            rating: 0
          }));
          dispatch(setSearchQuery(''));
          navigate('/products');
          dispatch(toggleChat()); // Close chat
        };

        return {
          message: `Excellent! I found ${matchingProducts.length} ${category} in size ${size} and ${foundColor} color. Let me show you the products now!`,
          newState: { step: 'category', category: '', size: '', color: '' },
          navigate: navigateToProducts
        };
      } else {
        return {
          message: `Sorry, I couldn't find any ${category} in size ${size} and ${foundColor} color. Would you like to try a different color? Available colors: ${availableColors.join(', ')}`,
          newState: conversationState
        };
      }
    } else {
      return {
        message: `Please choose from available colors: ${availableColors.join(', ')}`,
        newState: conversationState
      };
    }
  };

  const handleGeneralQuery = (userInput: string) => {
    if (userInput.includes('help')) {
      return {
        message: 'I can help you find products! Just tell me what you\'re looking for. For example, say "shoes" and I\'ll guide you through finding the perfect pair.',
        newState: { step: 'category', category: '', size: '', color: '' }
      };
    }

    if (userInput.includes('size') || userInput.includes('sizing')) {
      return {
        message: 'I can help you with sizing! First, tell me what type of product you\'re looking for (shoes, shirts, jeans, dresses, or jackets), then I\'ll show you available sizes.',
        newState: { step: 'category', category: '', size: '', color: '' }
      };
    }

    if (userInput.includes('return') || userInput.includes('exchange')) {
      return {
        message: 'We offer a 30-day return policy! You can return or exchange any item within 30 days of purchase. The item should be in original condition with tags attached.',
        newState: conversationState
      };
    }

    if (userInput.includes('delivery') || userInput.includes('shipping')) {
      return {
        message: 'We provide free delivery on orders above ₹1000. Standard delivery takes 3-5 business days. Express delivery is available for an additional charge.',
        newState: conversationState
      };
    }

    if (userInput.includes('payment')) {
      return {
        message: 'We accept all major credit cards, debit cards, UPI, net banking, and cash on delivery. All payments are secure and encrypted.',
        newState: conversationState
      };
    }

    // Default response - start product search
    return {
      message: 'I\'d love to help you find the perfect product! What are you looking for today? You can say "shoes", "shirts", "jeans", "dresses", or "jackets" and I\'ll help you find exactly what you need.',
      newState: { step: 'category', category: '', size: '', color: '' }
    };
  };

  const getAvailableSizes = (category: string): string[] => {
    const categoryProducts = products.filter(p => p.category === category);
    const allSizes = categoryProducts.flatMap(p => p.sizes);
    return [...new Set(allSizes)].sort();
  };

  const getAvailableColors = (category: string, size: string): string[] => {
    const categoryProducts = products.filter(p => 
      p.category === category && p.sizes.includes(size)
    );
    const allColors = categoryProducts.flatMap(p => p.colors);
    return [...new Set(allColors)].sort();
  };

  const findMatchingProducts = (category: string, size: string, color: string) => {
    return products.filter(p => 
      p.category === category && 
      p.sizes.includes(size) && 
      p.colors.includes(color)
    );
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => dispatch(toggleChat())}
        className="fixed bottom-6 right-6 bg-pink-500 text-white p-4 rounded-full shadow-lg hover:bg-pink-600 transition-colors z-40"
      >
        <MessageCircle size={24} />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 w-80 bg-white rounded-lg shadow-xl z-40 transition-all duration-300 ${
      isMinimized ? 'h-12' : 'h-96'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-pink-500 text-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <MessageCircle size={20} />
          <span className="font-medium">Shopping Assistant</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="hover:bg-pink-600 p-1 rounded transition-colors"
          >
            <Minimize2 size={16} />
          </button>
          <button
            onClick={() => dispatch(toggleChat())}
            className="hover:bg-pink-600 p-1 rounded transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 h-64 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.sender === 'user'
                      ? 'bg-pink-500 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg rounded-bl-none text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2 p-4 border-t">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} />
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ChatBot;