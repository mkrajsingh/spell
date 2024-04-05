import React, { useState, useEffect } from "react";
import "./styles.css";
const customDictionary = {
  teh: "the",
  wrok: "work",
  fot: "for",
  exampl: "example",
};

const XSpellCheck = () => {
  const [inputText, setInputText] = useState("");
  const [correction, setCorrection] = useState("");
  const [typingMessage, setTypingMessage] = useState(""); // State to show typing message

  useEffect(() => {
    const timer = setTimeout(() => {
      // Split the input text into words
      const words = inputText.split(/\s+/);

      // Check for misspelled words
      let misspelledWord = null;
      for (let i = 0; i < words.length; i++) {
        const word = words[i].toLowerCase();
        if (customDictionary[word]) {
          misspelledWord = words[i];
          break;
        }
      }

      // Set correction suggestion
      if (misspelledWord) {
        setCorrection(
          `Did you mean: ${
            customDictionary[misspelledWord.toLowerCase()]
          }? (You wrote: ${misspelledWord})`
        );
      } else {
        setCorrection("");
      }
    }, 1000); // Wait for 1 second after user stops typing

    return () => clearTimeout(timer);
  }, [inputText]);

  const handleInputChange = (event) => {
    const text = event.target.value;
    setInputText(text);

    // Update typing message
    setTypingMessage(`You are typing: ${text}`);
  };

  return (
    <div>
      <div>{typingMessage}</div> {/* Typing message */}
      <textarea
        value={inputText}
        onChange={handleInputChange}
        placeholder="Type here..."
        style={{ marginBottom: correction ? "20px" : "50" }} // Apply margin
      />
      {correction && <div style={{ marginBottom: "50px" }}>{correction}</div>}
    </div>
  );
};

export default XSpellCheck;
