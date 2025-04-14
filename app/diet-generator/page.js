'use client'; // Only for /app folder

import { useState } from 'react';

export default function DietGenerator() {
  const [diet, setDiet] = useState('');
  const [loading, setLoading] = useState(false);

  const userProfile = {
    gender: 'male',
    height: 13,
    weight: 68,
    age: 20,
    activity: 'moderate',
  };

  const generateDiet = async () => {
    setLoading(true);

    try {
      const res = await fetch('/api/generate-diet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userProfile),
      });

      console.log('Raw Response:', res);

      const data = await res.json();

      console.log('Parsed Data:', data);

      if (data.diet) {
        setDiet(data.diet);
      } else {
        setDiet('Something went wrong...');
      }
    } catch (err) {
      console.error('Fetch Error:', err);
      setDiet('Error fetching diet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-4">AI Personalized Diet Plan</h1>

      <button
        onClick={generateDiet}
        disabled={loading}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        {loading ? 'Generating...' : 'Generate Diet'}
      </button>

      <div className="bg-gray-100 p-4 rounded-md w-full max-w-2xl">
        {diet ? <pre className="whitespace-pre-wrap">{diet}</pre> : 'Click generate to get your diet.'}
      </div>
    </div>
  );
}
