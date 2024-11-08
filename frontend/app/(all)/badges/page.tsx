"use client"
import { useEffect, useState } from 'react';
import Badge from './Badge';
import Link from 'next/link';

export default function BadgeDashboard() {
  const [assignedBadges, setAssignedBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBadges = async () => {
      setLoading(true);

      try {
        const [assignedResponse] = await Promise.all([
          fetch('http://localhost:5173/api/badges/'),
        ]);

        const assignedBadgesData = await assignedResponse.json();

        setAssignedBadges(assignedBadgesData);
      } catch (error) {
        console.error('Failed to fetch badges:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, []);

  if (loading) {
    return <div className="text-center text-white">Loading badges...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <h1 className="text-4xl font-bold mb-8 text-blue-400 text-center">Badge Dashboard</h1>
      
      <section>
        <h2 className="text-xl font-semibold text-blue-400 mb-4">Assigned Badges</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {assignedBadges.map((badge) => (
            <Badge
              key={badge.badgeId}
              imageUrl={badge.imageUrl}
              title={badge.title}
              year={badge.year}
              criteria={badge.criteria}
            />
          ))}
        </div>
      </section>
      
      <div className="flex w-full">
        <Link href="/badges/create">
          <button className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-3 rounded-lg mt-5">
            Add New Badge
          </button>
        </Link>
      </div>

    </div>
  );
}
