"use client";
import { useState, useRef, useCallback } from "react";
import { Send, Paperclip, Smile } from "lucide-react";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  const handleSend = useCallback(() => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
    /* Reset textarea height */
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    textareaRef.current?.focus();
  }, [text, onSend]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  /* Auto-grow textarea */
  const handleInput = (e) => {
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
    setText(el.value);
  };

  return (
    <div className="border-t border-gray-100 bg-white px-3 py-3 sm:px-4">
      <div className="flex items-end gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 focus-within:border-green-400 focus-within:ring-2 focus-within:ring-green-100">

        {/* Attachment */}
        <button
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-gray-400 transition-colors hover:bg-gray-200 hover:text-green-600"
          aria-label="Attach file"
          type="button"
        >
          <Paperclip size={17} />
        </button>

        {/* Multi-line input */}
        <textarea
          ref={textareaRef}
          rows={1}
          value={text}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Type a message… (Enter to send, Shift+Enter for new line)"
          className="flex-1 resize-none bg-transparent py-1 text-sm text-gray-800 outline-none placeholder:text-gray-400"
          aria-label="Message input"
          aria-multiline="true"
        />

        {/* Emoji */}
        <button
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-gray-400 transition-colors hover:bg-gray-200 hover:text-orange-500"
          aria-label="Emoji picker"
          type="button"
        >
          <Smile size={17} />
        </button>

        {/* Send */}
        <button
          onClick={handleSend}
          disabled={!text.trim()}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-400 text-white shadow-sm transition-all hover:from-orange-600 hover:to-orange-500 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Send message"
          type="button"
        >
          <Send size={15} />
        </button>
      </div>

      <p className="mt-1 text-center text-[0.62rem] text-gray-400">
        Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
}
