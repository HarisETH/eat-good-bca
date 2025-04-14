'use client';
import OpenAI from "openai";
import { useRouter } from 'next/navigation'

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: env.local.SDK_KEY,
  dangerouslyAllowBrowser: 'true'// Make sure this is set in .env.local
});

// export default function DietGenerator({ userProfile }) {
//   const [diet, setDiet] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleGenerate = async () => {
//     setLoading(true);
//     const prompt = `Create a personalized diet plan for a ${userProfile.gender}, ${userProfile.height} cm tall, weighing ${userProfile.weight} kg, aged ${userProfile.age}, with an activity level of ${userProfile.activity}/10. Provide three meals (breakfast, lunch, dinner) and snacks, including approximate macros (calories, protein, carbs, fats).`;

//     const result = await generateDietPlan(prompt);
//     setDiet(result);
//     setLoading(false);
//   };

//   const response = await client.responses.create({
//     model: "gpt-4o",
//     input: "Write a one-sentence bedtime story about a unicorn.",
// });

// console.log(response.output_text);

//   return (
//     <div className='flex flex-col gap-4 w-full'>
//       <button
//         onClick={handleGenerate}
//         disabled={loading}
//         className='bg-green-600 text-white px-4 py-2 rounded-xl'
//       >
//         {loading ? 'Generating...' : 'Generate Diet Plan'}
//       </button>

//       {diet && (
//         <div className='bg-gray-100 p-4 rounded-md text-black whitespace-pre-wrap'>
//           {diet}
//         </div>
//       )}
//     </div>
//   );
// }


import { useState, useEffect } from 'react';

const BedtimeStory = ({ userProfile }) => {
  const [story, setStory] = useState('this is a new story default');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter() 

  const generateStory = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a diet planner and i need diet in simple lines each meal at next line with carbs protein fat with rda for the given gender" },
          { role: "user", content: `<h3 class="text-xl mt-8 font-bold mb-4 bg-background">Your Personalized South Indian Diet Plan</h3>
<div class="flex flex-col bg-background gap-1 text-white w-full">
  <div class="p-4 rounded-lg shadow-md">
    <h4 class="text-lg text-white font-semibold">Breakfast</h4>
    <p class="">{{breakfast_meal}}</p>
    <div class="text-sm ">Carbs: {{breakfast_carbs}}g, Protein: {{breakfast_protein}}g, Fat: {{breakfast_fat}}g</div>
    <div class="text-sm ">RDA: Carbs: 300g, Protein: 50g, Fat: 70g</div>
  </div>
  <div class=" p-4 rounded-lg shadow-md">
    <h4 class="text-lg font-semibold">Snack</h4>
    <p class="">{{snack_meal}}</p>
    <div class="text-sm ">Carbs: {{snack_carbs}}g, Protein: {{snack_protein}}g, Fat: {{snack_fat}}g</div>
    <div class="text-sm ">RDA: Carbs: 300g, Protein: 50g, Fat: 70g</div>
  </div>
  <div class=" p-4 rounded-lg shadow-md">
    <h4 class="text-lg font-semibold">Lunch</h4>
    <p class="text-">{{lunch_meal}}</p>
    <div class="text-sm ">Carbs: {{lunch_carbs}}g, Protein: {{lunch_protein}}g, Fat: {{lunch_fat}}g</div>
    <div class="text-sm ">RDA: Carbs: 300g, Protein: 50g, Fat: 70g</div>
  </div>
  <div class=" p-4 rounded-lg shadow-md">
    <h4 class="text-lg font-semibold">Dinner</h4>
    <p class="text-">{{dinner_meal}}</p>
    <div class="text-sm ">Carbs: {{dinner_carbs}}g, Protein: {{dinner_protein}}g, Fat: {{dinner_fat}}g</div>
    <div class="text-sm ">RDA: Carbs: 300g, Protein: 50g, Fat: 70g</div>
  </div>
</div>` }
        ],
      });
      
  //     setStory(response.output_text);
  //   } catch (err) {
  //     setError('Failed to generate story: ' + err.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const generatedText = response.choices[0].message.content;
  setStory(generatedText);
  console.log(generatedText.replace(/`([^`]*)`/g, '$1'))
} catch (err) {
  console.error("Error details:", err);
  setError('Failed to generate story: ' + err.message);
} finally {
  setIsLoading(false);
}
};

  useEffect(() => {
    generateStory();
  }, []);

   
  return (
    <div className="bedtime-story-container mt-4">
      {isLoading ? (
        <p>Generating your unicorn diet...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="story-display">
          
          {/* {story
  .replace(/`+/g, '')               // Remove all backticks
  .replace(/^"|"$/g, '')} */}

          <div className="dynamicDiet  min-w-56 bg-none bg-current" dangerouslySetInnerHTML={{ __html: story
  .replace(/`+/g, '')               // Remove all backticks
  .replace(/^"|"$/g, '') }} />
          <button className="bg-blue-600 px-4 py-2 rounded-md font-bold my-6 mx-5" onClick={(e) => { e.preventDefault(); router.push('./protected');}}>Edit Profile</button>
          
        </div>
      )}
     
      

    </div>
  );
};

export default BedtimeStory;
