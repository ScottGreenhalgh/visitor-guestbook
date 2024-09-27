import IndividualMessages from "./IndividualMessages.jsx";
import { useEffect, useState } from "react";
import "../styles/Messages.css";

const HOST = import.meta.env.VITE_HOST;

export default function Messages({ getMsg, setGetMsg }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const handleMessages = async () => {
      try {
        const res = await fetch(`${HOST}/messages`);
        setData(await res.json());
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };
    handleMessages();
    setGetMsg(false);
    // const intervalId = setInterval(handleMessages, 5000);
    // return () => clearInterval(intervalId);
  }, [getMsg]);
  return (
    <div>
      {data.map((mapMsg) => (
        <IndividualMessages key={mapMsg.id} mapMsg={mapMsg} />
      ))}
    </div>
  );
}
