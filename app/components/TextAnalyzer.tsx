'use client';

import { useState } from 'react';

export default function TextAnalyzer() {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);

  const sampleText = "The golden sun sparkled on the crystal-clear water, while the sweet aroma of blooming flowers filled the warm air. Birds chirped melodiously as gentle waves whispered against the smooth sandy shore.";

  const handleAnalyze = () => {
    // Simple analysis for now
    const words = text.split(' ');
    const sensoryWords = ['golden', 'sparkled', 'crystal-clear', 'sweet', 'aroma', 'warm', 'chirped', 'melodiously', 'whispered', 'smooth'];
    
    const found = words.filter(word => 
      sensoryWords.some(sensory => word.toLowerCase().includes(sensory.toLowerCase()))
    );

    setAnalysis({
      totalWords: words.length,
      sensoryWords: found.length,
      sensoryScore: Math.round((found.length / words.length) * 100),
      foundWords: found
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">SensoryScribe</h1>
        <p className="text-lg text-gray-600">
          Discover and analyze sensory language in your text
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter your text to analyze:
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here..."
          className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleAnalyze}
            disabled={!text.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            Analyze Text
          </button>
          <button
            onClick={() => setText(sampleText)}
            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Load Sample
          </button>
        </div>
      </div>

      {analysis && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Analysis Results</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{analysis.totalWords}</div>
              <div className="text-sm text-gray-600">Total Words</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{analysis.sensoryWords}</div>
              <div className="text-sm text-gray-600">Sensory Words</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{analysis.sensoryScore}%</div>
              <div className="text-sm text-gray-600">Sensory Score</div>
            </div>
          </div>
          {analysis.foundWords.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Found sensory words:</h3>
              <div className="flex flex-wrap gap-2">
                {analysis.foundWords.map((word: string, index: number) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {word}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
