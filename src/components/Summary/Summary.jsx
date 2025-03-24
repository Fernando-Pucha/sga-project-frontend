import { useState } from "react";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import geminiService from "../../services/gemini.service";

export default function Summary() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTextChange = (e) => setText(e.target.value);

  const handleGetSummary = async () => {
    if (!text.trim()) {
      setError("Por favor, ingresa un texto.");
      return;
    }

    setLoading(true);
    setError("");
    setSummary("");

    try {
      const response = await geminiService.getSummary(text);
      setSummary(response.data.summary);
    } catch (err) {
      setError("Error al generar el resumen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="card bg-base-100 shadow-xl p-6 max-w-lg mx-auto mt-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-center mb-4">Summary Generator</h2>

      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Enter the text here..."
        className="textarea textarea-bordered w-full h-32 resize-none"
      />

      <button 
        onClick={handleGetSummary} 
        className="btn btn-primary w-full mt-4 flex items-center justify-center"
        disabled={loading}
      >
        {loading ? <Loader className="animate-spin mr-2" size={20} /> : "Generate Summary"}
      </button>

      {summary && (
        <motion.div
          className="mt-4 p-4 bg-gray-100 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-semibold">Summary:</h3>
          <p className="mt-2 text-gray-700">{summary}</p>
        </motion.div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </motion.div>
  );
}
