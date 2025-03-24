import { useState } from "react";
import geminiService from "../../services/gemini.service";

export default function Summary() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  const handleTextChange = (e) => setText(e.target.value);

  const handleGetSummary = () => {
    geminiService
      .getSummary(text)
      .then((response) => {
        setSummary(response.data.summary);
        setError("");
      })
      .catch((error) => {
        setError("Error generating summary");
        setSummary("");
      });
  };

  return (
    <div className="summary-container">
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text to summarize"
        className="textarea textarea-bordered w-full"
      />
      <button onClick={handleGetSummary} className="btn btn-primary mt-4">
        Get Summary
      </button>
      {summary && (
        <div className="summary-result mt-4">
          <h3 className="text-xl font-bold">Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
      {error && <p className="text-error mt-4">{error}</p>}
    </div>
  );
}