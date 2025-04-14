'use client';
import DietGenerator from '@/components/DietGenerator';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function DietPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from('profiledata')
        .select('*')
        .eq('id', user.id)
        .single();

      setUserData(data);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!userData) return <p>No user data found.</p>;

  return (
    <div className="flex flex-col items-start md:min-w-96 w-full justify-center">
      <h1 className="text-2xl font-bold mb-4">Your Stats</h1>
      <p><strong>Full Name:</strong> {userData.fullname}</p>
      <p><strong>Gender:</strong> {userData.gender}</p>
      <p><strong>Height:</strong> {userData.height} cm</p>
      <p><strong>Weight:</strong> {userData.weight} kg</p>
      <p><strong>Age:</strong> {userData.age} years</p>
      <p><strong>Activity Level:</strong> {userData.activity}</p>

      <DietGenerator className="min-w-40 px-4 mt-8" userProfile={userData} />
    </div>
  );
}
