import { useState } from "react";
import ChatMessage from "./ChatMessage";

export default function ChatRoom() {
  const [messages, setMessages] = useState<string[]>([]);


  const [formValue, setFormValue] = useState<string>("");

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessages([...messages, formValue]);
    setFormValue("");
  }

  return (<>
    <main>

      {messages && messages.map((msg, index) => <ChatMessage key={index} message={msg} />)}

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button type="submit" disabled={!formValue}>🕊️</button>

    </form>
  </>)
}