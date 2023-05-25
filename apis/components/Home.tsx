import { useEffect, useState } from "react";

export default function Home() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    fetch("https://ambience-kappa.vercel.app/api/get-image")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => setResponse(data.message))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div>API response</div>
      <code>{response}</code>
    </div>
  );
}
