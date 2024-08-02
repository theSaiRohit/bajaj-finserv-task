import { useEffect } from "react";

const Ping = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/");
        const data = await response.text();
        console.log("GET response:", data);

        const postResponse = await fetch("http://localhost:3001/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ message: "Hello from Next.js!" })
        });
        const postData = await postResponse.text();
        console.log("POST response:", postData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return <div>Check the console for API responses.</div>;
};

export default Ping;
