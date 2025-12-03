"use client";

import { useState, useEffect, useCallback } from "react";
import code from "@/public/canjie-code.json";
import mapping from "@/public/key-mapping.json";
type CodeData = Record<string, string>;
type MappingData = Record<string, string>;

export default function Home() {
  const [currentChar, setCurrentChar] = useState("");
  const [currentCode, setCurrentCode] = useState("");
  const [userInput, setUserInput] = useState("");
  const [charStates, setCharStates] = useState<("default" | "correct" | "wrong")[]>([]);

  const getRandomEntry = useCallback(() => {
    const entries = Object.entries(code.code as CodeData);
    const randomEntry = entries[Math.floor(Math.random() * entries.length)];
    const [key, value] = randomEntry;
    // Handle multiple characters separated by space
    const chars = value.split(" ");
    const selectedChar = chars[Math.floor(Math.random() * chars.length)];
    
    setCurrentCode(key);
    setCurrentChar(selectedChar);
    setUserInput("");
    setCharStates(new Array(key.length).fill("default"));
  }, []);

  useEffect(() => {
    getRandomEntry();
  }, [getRandomEntry]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      if (key === "enter") {
        getRandomEntry();
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
        const nextIndex = userInput.length;
        
        if (nextIndex < currentCode.length) {
          const isCorrect = key === currentCode[nextIndex];
          const newInput = userInput + key;
          const newStates = [...charStates];
          newStates[nextIndex] = isCorrect ? "correct" : "wrong";
          
          setUserInput(newInput);
          setCharStates(newStates);

          // Auto-advance to next character if all correct
          if (newInput.length === currentCode.length && newStates.every(s => s === "correct")) {
            setTimeout(() => {
              getRandomEntry();
            }, 500);
          }
        }
      }
    },
    [userInput, currentCode, charStates, getRandomEntry]
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
          {/* Chinese Character Display */}
          <div className="text-9xl font-bold text-black dark:text-white">
            {currentChar}
          </div>
          
          {/* Code Display */}
          <div className="flex gap-2 text-6xl font-mono">
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
            <p className="text-sm mt-2">Press <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Enter</kbd> for a new character</p>
          </div>
        </div>
      </main>
    </div>
  );
}
