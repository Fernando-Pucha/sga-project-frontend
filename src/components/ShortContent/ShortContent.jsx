import { useState } from "react";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import geminiService from "../../services/gemini.service";

export default function ShortContent() {
  const [text, setText] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTextChange = (e) => setText(e.target.value);

  const handleGetContent = async () => {
    if (!text.trim()) {
      setError("Por favor, ingresa un texto.");
      return;
    }

    setLoading(true);
    setError("");
    setContent("");

    try {
      const response = await geminiService.getShortContent(text);
      setContent(response.data.shortContent);
      console.log(response.data.shortContent)
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
      <h2 className="text-2xl font-bold text-center mb-4">Content Generator</h2>

      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Enter the text here..."
        className="textarea textarea-bordered w-full h-32 resize-none"
      />

      <button 
        onClick={handleGetContent} 
        className="btn btn-primary w-full mt-4 flex items-center justify-center"
        disabled={loading}
      >
        {loading ? <Loader className="animate-spin mr-2" size={20} /> : "Generate content"}
      </button>

      {content && (
        <motion.div
          className="mt-4 p-4 bg-gray-100 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-semibold">Content:</h3>
          <p className="mt-2 text-gray-700">{content}</p>
        </motion.div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </motion.div>
  );
}
