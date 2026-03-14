import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState, useEffect } from "react";

export default function Search({ onSearch }) {
  const [value, setValue] = useState("");
  const { transcript, listening } = useSpeechRecognition();

  useEffect(() => {
    if (listening) setValue(transcript);
  }, [transcript, listening]);

  useEffect(() => {
    if (!listening && transcript) {
      onSearch?.(transcript);
    }
  }, [listening, transcript, onSearch]);

  const toggleListen = () => {
    listening
      ? SpeechRecognition.stopListening()
      : SpeechRecognition.startListening({ language: "ru-RU" });
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={listening ? "Слушаю..." : "Найти..."}
      />
      <button onClick={toggleListen}>
        {listening ? "Идет запись..." : "🎤"}
      </button>
    </>
  );
}
