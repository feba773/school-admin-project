'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';


const SchoolCard = ({ school }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 duration-300">
    <div className="relative h-48 w-full">
      {/* The Next.js Image component is optimized for performance */}
      <Image
        src={school.image}
        alt={school.name}
        layout="fill"
        objectFit="cover"
        
        className="transition-opacity opacity-0 duration-[1s]"
        onLoadingComplete={(image) => image.classList.remove('opacity-0')}
      />
    </div>
    <div className="p-4">
      <h3 className="text-lg font-bold text-gray-800 truncate">{school.name}</h3>
      <p className="text-sm text-gray-600 mt-1 truncate">{school.address}</p>
      <p className="text-sm text-gray-500 mt-1">{school.city}</p>
    </div>
  </div>
);

export default function ShowSchoolsPage() {

  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get('/api/schools');
        setSchools(response.data.schools);
      } catch (err) {
        setError('Failed to fetch schools. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSchools();
  }, []); 

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading schools...</p>;
  
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
          Registered Schools
        </h1>

        {schools.length === 0 ? (
          <p className="text-center text-gray-500">No schools have been added yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* We loop through the 'schools' array and create a card for each one */}
            {schools.map((school) => (
              <SchoolCard key={school.id} school={school} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}