import Head from "next/head";
import { FormEvent, useEffect, useState } from "react";

const isValidJson = (json: string) => {
  try {
    JSON.parse(json);
    return true;
  } catch (e) {
    return false;
  }
};

const HomePage = () => {
  const [response, setResponse] = useState<any>(null);
  const [inputText, setInputText] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [numCheck, setNumCheck] = useState(false);
  const [aplhaCheck, setAlphaCheck] = useState(false);
  const [haCheck, setHaCheck] = useState(false);
  const submitHandler = async (ev: FormEvent) => {
    ev.preventDefault();
    const validInput = isValidJson(inputText);
    if (!validInput) {
      alert("Invalid input format");
      return;
    }
    const url = "http://localhost:3001/bfhl";
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: inputText
      });
      const result = await res.json();
      setResponse(result);
    } catch (e) {
      console.log(e);
    }
    setIsSubmit(true);
    alert("Submitted");
  };
  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col text-white">
      <Head>
        <title>RA2111003020656 | Sai Rohit Sanniboyina</title>
      </Head>
      <div className="flex flex-col gap-14">
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <label className="flex flex-col text-white gap-2">
            Input :
            <input type="text" className="text-black p-2 rounded-md" onChange={(e) => setInputText(e.target.value)} />
          </label>
          <button
            type="submit"
            className="align-middle select-none text-center transition-all disabled:opacity-50 disabled:shadow-none w-fit disabled:pointer-events-none py-3 px-6 rounded-lg bg-blue-500 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          >
            Submit
          </button>
        </form>
        {isSubmit && (
          <label className="flex flex-col text-white gap-2">
            Select one or many options:
            <div>
              <label>
                <input
                  type="checkbox"
                  id="numbers"
                  name="options"
                  value="numbers"
                  onClick={() => setNumCheck(!numCheck)}
                />
                Numbers
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  id="alphabets"
                  name="options"
                  value="alphabets"
                  onClick={() => setAlphaCheck(!aplhaCheck)}
                />
                Alphabets
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  id="highest-alphabet"
                  name="options"
                  value="highest-alphabet"
                  onClick={() => setHaCheck(!haCheck)}
                />
                Highest Alphabet
              </label>
            </div>
          </label>
        )}
        <div>
          <span>Filtered Responses :</span>
          {numCheck && (
            <div className="flex gap-4">
              <span>Numbers :</span>
              <span>
                {(response?.numbers as string[]).map((num: string, index: number) => {
                  return (
                    <span key={index}>
                      {" " + num} {index === (response?.numbers as string[]).length - 1 ? "" : ","}
                    </span>
                  );
                })}
              </span>
            </div>
          )}
          {aplhaCheck && (
            <div className="flex gap-4">
              <span>Alphabets :</span>
              <span>
                {(response?.alphabets as string[]).map((elem: string, index: number) => {
                  return (
                    <span key={index}>
                      {" " + elem} {index === (response?.alphabets as string[]).length - 1 ? "" : ","}
                    </span>
                  );
                })}
              </span>
            </div>
          )}
          {haCheck && (
            <div className="flex gap-4">
              <span>Highest Alphabet :</span>
              <span>{response?.highest_alphabet as string}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
