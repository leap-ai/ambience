"use client";

import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Home() {
  // On mount make an api call to get-image using fetch

  const [response, setResponse] = useState("");

  useEffect(() => {
    fetch("/api/get-image")
      .then((res) => res.json())
      .then((data) => setResponse(data.message));
  }, []);

  return (
    <main>
      <Box>Hello v3</Box>
      <Box>{response}</Box>
    </main>
  );
}
