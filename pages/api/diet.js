import { generateDietPlan } from '@/lib/openai'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { age, gender, weight, goal, activity } = req.body

    const data = await generateDietPlan({ age, gender, weight, goal, activity })

    res.status(200).json({ dietPlan: data })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to generate diet plan' })
  }
}
