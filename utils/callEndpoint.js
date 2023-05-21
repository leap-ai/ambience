const fetch = require("node-fetch");

(async () => {
  try {
    const response = await fetch("http://localhost:3000/api/generate-image");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(`Error calling endpoint: ${error}`);
  }
})();
