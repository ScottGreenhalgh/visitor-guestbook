import Header from "./components/Header";
import Messages from "./components/Messages";
import Form from "./components/Form";
import { useState } from "react";
import "./styles/App.css";

export default function App() {
  const [getMsg, setGetMsg] = useState(true);
  return (
    <>
      <Header />
      <Messages getMsg={getMsg} setGetMsg={setGetMsg} />
      <Form setGetMsg={setGetMsg} />
    </>
  );
}
