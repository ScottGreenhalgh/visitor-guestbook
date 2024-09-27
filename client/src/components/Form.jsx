import { useState } from "react";
import "../styles/Form.css";

const HOST = import.meta.env.VITE_HOST;

export default function Form({ setGetMsg }) {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch(`${HOST}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, message }),
    });
    const resData = await res.json();
    setMessage("");
    setUsername("");
    if (res.ok) {
      console.log("Message success", resData);
      setGetMsg(true);
    } else {
      console.log("Message failed", resData);
    }
  };
  return (
    <form aria-live="polite" onSubmit={handleSubmit}>
      <input
        type="username"
        name="username"
        value={username}
        className="username-input"
        placeholder="Enter your username"
        aria-label="Enter your username"
        onChange={(event) => setUsername(event.target.value)}
      />
      <textarea
        name="message"
        value={message}
        className="message-input"
        placeholder="Enter a message"
        aria-label="Enter a message"
        onChange={(event) => setMessage(event.target.value)}
      />
      <button
        type="submit"
        name="submit"
        className="submit-button"
        aria-label="submit button"
      >
        Submit
      </button>
    </form>
  );
}
