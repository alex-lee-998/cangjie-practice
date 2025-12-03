"use client";

import { useState, useEffect, useCallback } from "react";
import code from "@/public/canjie-code.json";
import mapping from "@/public/key-mapping.json";
import words from "@/public/common-words.json";
type CodeData = Record<string, string>;
type MappingData = Record<string, string>;
type WordsData = { words: string[] };

export default function Home() {
  const [currentChar, setCurrentChar] = useState("");
  const [currentCode, setCurrentCode] = useState("");
  const [userInput, setUserInput] = useState("");
  const [charStates, setCharStates] = useState<
    ("default" | "correct" | "wrong")[]
  >([]);
  const [currentWord, setCurrentWord] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const findCangjieCode = useCallback((char: string): string | null => {
    const entries = Object.entries(code.code as CodeData);
    for (const [key, value] of entries) {
      const chars = value.split(" ");
      if (chars.includes(char)) {
        return key;
      }
    }
    return null;
  }, []);

  const getRandomWord = useCallback(() => {
    const wordList = (words as WordsData).words;
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];

    setCurrentWord(randomWord);
    setCharIndex(0);

    // Set the first character
    const firstChar = randomWord[0];
    const cangjieCode = findCangjieCode(firstChar);

    if (cangjieCode) {
      setCurrentChar(firstChar);
      setCurrentCode(cangjieCode);
      setUserInput("");
      setCharStates(new Array(cangjieCode.length).fill("default"));
    } else {
      // If code not found, try another word
      getRandomWord();
    }
  }, [findCangjieCode]);

  const moveToNextChar = useCallback(() => {
    if (charIndex < currentWord.length - 1) {
      const nextIndex = charIndex + 1;
      const nextChar = currentWord[nextIndex];
      const cangjieCode = findCangjieCode(nextChar);

      if (cangjieCode) {
        setCharIndex(nextIndex);
        setCurrentChar(nextChar);
        setCurrentCode(cangjieCode);
        setUserInput("");
        setCharStates(new Array(cangjieCode.length).fill("default"));
      } else {
        // Skip to next word if code not found
        getRandomWord();
      }
    } else {
      // Completed the word, get a new one
      getRandomWord();
    }
  }, [charIndex, currentWord, findCangjieCode, getRandomWord]);

  useEffect(() => {
    getRandomWord();
  }, [getRandomWord]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (key === "enter") {
        getRandomWord();
        return;
      }

      if (key === "backspace") {
        if (userInput.length > 0) {
          const newInput = userInput.slice(0, -1);
          const newStates = [...charStates];
          newStates[userInput.length - 1] = "default";

          setUserInput(newInput);
          setCharStates(newStates);
        }
        return;
      }

      if (key.length === 1 && /[a-z]/.test(key)) {
        // Don't allow typing if there's already a wrong character
        if (charStates.includes("wrong")) {
          return;
        }

        const nextIndex = userInput.length;

        if (nextIndex < currentCode.length) {
          const isCorrect = key === currentCode[nextIndex];
          const newInput = userInput + key;
          const newStates = [...charStates];
          newStates[nextIndex] = isCorrect ? "correct" : "wrong";

          setUserInput(newInput);
          setCharStates(newStates);

          // Trigger shake animation if wrong
          if (!isCorrect) {
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 150);
          }

          // Auto-advance to next character if all correct
          if (
            newInput.length === currentCode.length &&
            newStates.every((s) => s === "correct")
          ) {
            setTimeout(() => {
              moveToNextChar();
            }, 500);
          }
        }
      }
    },
    [userInput, currentCode, charStates, moveToNextChar]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-900">
      <main className="flex flex-col items-center justify-center gap-12 px-8">
        <h1 className="text-4xl font-bold text-black dark:text-white">
          Cangjie Practice
        </h1>

        <div className="flex flex-col items-center gap-8">
          {/* Word Display */}
          {currentWord && (
            <div className="text-3xl text-gray-600 dark:text-gray-400 flex gap-1">
              {currentWord.split("").map((char, idx) => (
                <span
                  key={idx}
                  className={
                    idx === charIndex
                      ? "font-bold text-blue-500 dark:text-blue-400"
                      : ""
                  }
                >
                  {char}
                </span>
              ))}
            </div>
          )}

          {/* Chinese Character Display */}
          <div className="text-9xl font-bold text-black dark:text-white">
            {currentChar}
          </div>

          {/* Code Display */}
          <div
            className={`flex gap-2 text-6xl font-mono transition-transform ${
              isShaking ? "animate-shake" : ""
            }`}
          >
            {currentCode.split("").map((char, index) => {
              let colorClass = "text-gray-400 dark:text-gray-600";

              if (charStates[index] === "correct") {
                colorClass = "text-green-500 dark:text-white";
              } else if (charStates[index] === "wrong") {
                colorClass = "text-red-500 dark:text-red-500";
              }

              const mappedChar = (mapping.mapping as MappingData)[char] || char;

              return (
                <span key={index} className={colorClass}>
                  {mappedChar}
                </span>
              );
            })}
          </div>

          {/* Instructions */}
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p className="text-lg">Type the code to match the character</p>
            <p className="text-sm mt-2">
              Press{" "}
              <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
                Enter
              </kbd>{" "}
              for a new character
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
