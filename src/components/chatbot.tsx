import React, { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import './Chatbot.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  MessageModel
} from '@chatscope/chat-ui-kit-react';

const API_KEY = "sk-proj-m5kQn9yWrjj219vUAQZrT3BlbkFJnzc7aPtd8sbEMmHm5dDK";
const RATE_LIMIT_DELAY_MS = 5000;

interface ChatMessage {
  message: string;
  sender: "ChatGPT" | "user";
  direction: "incoming" | "outgoing";
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sender: "ChatGPT",
      direction: "incoming",
    },
  ]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);

  const handleSendRequest = async (message: string) => {
    
    if (isSendingMessage) {
        console.log("Rate limit exceeded. Please wait before sending another message.");
        return;

      }
      setIsSendingMessage(true);

      const newMessage: ChatMessage = {
      message,
      sender: "user",
      direction: "outgoing",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsTyping(true);

    const controller = new AbortController();
    setAbortController(controller);

    try {
      const response = await processMessageToChatGPT([...messages, newMessage], controller);
      const content = response.choices[0]?.message?.content;
      if (content) {
        const chatGPTResponse: ChatMessage = {
          message: content,
          sender: "ChatGPT",
          direction: "incoming",
        };
        setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error processing message:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setIsTyping(false);
    }
  };

  const handleStopRequest = () => {
    if (abortController) {
      abortController.abort();
      setIsTyping(false);
    }
  };

  async function processMessageToChatGPT(chatMessages: ChatMessage[], controller: AbortController) {
    const apiMessages = chatMessages.map((messageObject) => {
      const role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
      return { role, content: messageObject.message };
    });

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        { role: "system", content: "I'm a Student using ChatGPT for learning" },
        ...apiMessages,
      ],
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  return (
    <div className="App">
      <button className="chatbot-toggle" onClick={() => setIsChatbotOpen(!isChatbotOpen)}>
        {isChatbotOpen ? 'Close Chatbot' : 'Open Chatbot'}
      </button>
      {isChatbotOpen && (
        <div className="chatbot-container">
          <div style={{ position: "relative", height: "500px", width: "400px" }}>
            <MainContainer>
              <ChatContainer className="chat-container">
                <MessageList
                  scrollBehavior="smooth"
                  typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
                >
                  {messages.map((message, i) => (
                    <Message
                      key={i}
                      model={{
                        message: message.message,
                        sentTime: "just now",
                        sender: message.sender,
                        direction: message.direction,
                        position: "normal",
                      }}
                    />
                  ))}
                </MessageList>
                <MessageInput className="message-input" placeholder="Send a Message" onSend={handleSendRequest} />
                <button className="stop-button" onClick={handleStopRequest}>Stop</button>
              </ChatContainer>
            </MainContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;

// import React, { useState } from 'react';
// import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
// import './Chatbot.css';
// import {
//   MainContainer,
//   ChatContainer,
//   MessageList,
//   Message,
//   MessageInput,
//   TypingIndicator
// } from '@chatscope/chat-ui-kit-react';

// const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

// interface ChatMessage {
//   message: string;
//   sender: "ChatGPT" | "user";
//   direction: "incoming" | "outgoing";
// }

// const Chatbot: React.FC = () => {
//   const [messages, setMessages] = useState<ChatMessage[]>([
//     {
//       message: "Hello, I'm ChatGPT! Ask me anything!",
//       sender: "ChatGPT",
//       direction: "incoming",
//     },
//   ]);
//   const [isTyping, setIsTyping] = useState<boolean>(false);
//   const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);
//   const [abortController, setAbortController] = useState<AbortController | null>(null);
//   const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);

//   const handleSendRequest = async (message: string) => {
//     if (isSendingMessage) {
//       console.log("Rate limit exceeded. Please wait before sending another message.");
//       return;
//     }
//     setIsSendingMessage(true);

//     const newMessage: ChatMessage = {
//       message,
//       sender: "user",
//       direction: "outgoing",
//     };

//     setMessages((prevMessages) => [...prevMessages, newMessage]);
//     setIsTyping(true);

//     const controller = new AbortController();
//     setAbortController(controller);

//     let retries = 5;
//     const retryDelay = (attempt: number) => Math.pow(2, attempt) * 1000; // Exponential backoff

//     while (retries > 0) {
//       try {
//         const response = await processMessageToChatGPT([...messages, newMessage], controller);
//         const content = response.choices[0]?.message?.content;
//         if (content) {
//           const chatGPTResponse: ChatMessage = {
//             message: content,
//             sender: "ChatGPT",
//             direction: "incoming",
//           };
//           setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
//           break; // Exit the loop on success
//         }
//       } catch (error) {
//         if (error instanceof Error) {
//           if (error.message.includes('429')) {
//             console.error("Rate limit exceeded. Retrying...");
//             await new Promise(res => setTimeout(res, retryDelay(5 - retries))); // Wait before retrying
//             retries -= 1;
//             continue;
//           } else {
//             console.error("Error processing message:", error.message);
//             break;
//           }
//         } else {
//           console.error("Unexpected error:", error);
//           break;
//         }
//       }
//     }

//     setIsTyping(false);
//     setIsSendingMessage(false);
//   };

//   const handleStopRequest = () => {
//     if (abortController) {
//       abortController.abort();
//       setIsTyping(false);
//     }
//   };

//   async function processMessageToChatGPT(chatMessages: ChatMessage[], controller: AbortController) {
//     const apiMessages = chatMessages.map((messageObject) => {
//       const role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
//       return { role, content: messageObject.message };
//     });

//     const apiRequestBody = {
//       model: "gpt-3.5-turbo",
//       messages: [
//         { role: "system", content: "I'm a Student using ChatGPT for learning" },
//         ...apiMessages,
//       ],
//     };

//     const response = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${API_KEY}`, // Ensure correct header format
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(apiRequestBody),
//       signal: controller.signal
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     return response.json();
//   }

//   return (
//     <div className="App">
//       <button className="chatbot-toggle" onClick={() => setIsChatbotOpen(!isChatbotOpen)}>
//         {isChatbotOpen ? 'Close Chatbot' : 'Open Chatbot'}
//       </button>
//       {isChatbotOpen && (
//         <div className="chatbot-container">
//           <div style={{ position: "relative", height: "500px", width: "400px" }}>
//             <MainContainer>
//               <ChatContainer className="chat-container">
//                 <MessageList
//                   scrollBehavior="smooth"
//                   typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
//                 >
//                   {messages.map((message, i) => (
//                     <Message
//                       key={i}
//                       model={{
//                         message: message.message,
//                         sentTime: "just now",
//                         sender: message.sender,
//                         direction: message.direction,
//                         position: "normal",
//                       }}
//                     />
//                   ))}
//                 </MessageList>
//                 <MessageInput className="message-input" placeholder="Send a Message" onSend={handleSendRequest} />
//               </ChatContainer>
//             </MainContainer>
//             <button className="stop-button" onClick={handleStopRequest}>Stop</button> {/* Moved outside ChatContainer */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatbot;
