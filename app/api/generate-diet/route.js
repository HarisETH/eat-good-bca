import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure this is set in .env.local
});

export async function POST(req) {
  try {
    const { gender, height, weight, age, activity } = await req.json();

    const prompt = `You are a nutritionist. Create a personalized diet plan for a ${gender}, ${height} cm tall, weighing ${weight} kg, aged ${age}, with an activity level of ${activity}/10. Provide breakfast, lunch, dinner, and snacks with macros (calories, protein, carbs, fats).`;

    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 800,
    });

    const diet = chatCompletion.choices[0]?.message?.content || 'No diet generated.';

    return NextResponse.json({ diet });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ diet: 'Error generating diet.' });
  }
}
