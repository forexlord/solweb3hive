import { ChatMessage, AnonymousChatMessage } from "@/store/chat";
import React from "react";
import ReactMarkdown from "react-markdown";

const Messages = ({
  messages,
}: {
  messages: ChatMessage[] | AnonymousChatMessage[];
}) => {
  return messages.map((message, index) =>
    message.type === "prompt" ? (
      <div
        key={index}
        className={`${"bg-[#F4F5F7] text-black w-[50%] self-end"} p-5 rounded-lg`}
      >
        <p>{message.content}</p>
      </div>
    ) : (
      <ReactMarkdown className="bg-[#E1FF01] text-black w-[50%] self-start p-5 rounded-lg">
        {message.content}
      </ReactMarkdown>
    )
  );
};

export default Messages;
