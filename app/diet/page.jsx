'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function DietPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        console.error("Error fetching user:", error);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiledata')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        setUserData(data);
      } catch (err) {
        console.error("Error fetching profile data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!userData) return <p>No data found</p>;

  return (
    <div>
      <h1>Diet Page</h1>
      <p><strong>Full Name:</strong> {userData.fullname}</p>
      <p><strong>Gender:</strong> {userData.gender}</p>
      <p><strong>Height:</strong> {userData.height} cm</p>
      <p><strong>Weight:</strong> {userData.weight} kg</p>
      <p><strong>Age:</strong> {userData.age} years</p>
      <p><strong>Activity Level:</strong> {userData.activity_level}</p>
      <p><strong>Health Conditions:</strong> {userData.health_conditions}</p>
    </div>
  );
}
