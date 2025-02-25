'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
export default function AccountForm() {
  const router = useRouter() 
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [fullname, setFullname] = useState('')
  const [gender, setGender] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [age, setAge] = useState('')
  const [activity, setActivity] = useState(5)
  const [healthConditions, setHealthConditions] = useState('')

  useEffect(() => {
    async function fetchUser() {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) {
        console.error("Error fetching user:", error)
      } else {
        console.log("Fetched User:", user)
        setUser(user)
      }
    }
    fetchUser()
  }, [])

  const getProfile = useCallback(async () => {
    if (!user?.id) return

    try {
      setLoading(true)
      const { data, error, status } = await supabase
        .from('profiledata')
        .select(`fullname, gender, height, weight, age, activity`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) throw error

      if (data) {
        setFullname(data.fullname || '')
        setGender(data.gender || '')
        setHeight(data.height || '')
        setWeight(data.weight || '')
        setAge(data.age || '')
        setActivity(data.activity || 5)
        // setHealthConditions(data.health_conditions || '')
      }
    } catch (error) {
      console.error("Error loading user data:", error)
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    if (user) getProfile()
  }, [user, getProfile])

  async function updateProfile() {
    if (!user?.id) {
      alert("User ID is missing!");
      console.error("User ID is missing!");
      return;
    }
  
    try {
      setLoading(true);
  
      const updates = {
        id: user.id,
        fullname: fullname,
        gender: gender,
        height: height ? parseFloat(height) : null,
        weight: weight ? parseInt(weight, 10) : null,
        age: age ? parseInt(age, 10) : null,
        activity: activity ? parseFloat(activity) : null,
        // health_conditions: healthConditions,
        updated_at: new Date().toISOString(),
      };
  
      console.log("Updating profile with data:", updates);
  
      const { error } = await supabase.from("profiledata").upsert(updates, { onConflict: ["id"] });
  
      if (error) throw error;
  
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating data: " + error.message);
    } finally {
      setLoading(false);

    }
  }

  return (
    <form className='flex flex-col gap-6 h-full w-full  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10  p-4 rounded-md px-24 ' onSubmit={(e) => { e.preventDefault(); updateProfile(); router.push('./diet');} }>
      <label>
        Full Name:
        <input className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} />
      </label>
      <label>
        Gender:
        <input className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
      </label>
      <label>
        Height:
        <input className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
      </label>
      <label>
        Weight:
        <input className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
      </label>
      <label>
        Age:
        <input className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
      </label>
      <label>
        Activity Level:
        <input className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" type="number" value={activity} onChange={(e) => setActivity(e.target.value)} />
      </label>
      {/* <label>
        Health Conditions:
        <input type="text" value={healthConditions} onChange={(e) => setHealthConditions(e.target.value)} />
      </label> */}
      <button type="submit" disabled={loading}>
        
        {loading ? "Updating..." : "Update Profile"}
        
      </button>
    </form>
  );
}

