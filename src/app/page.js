"use client"

import { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';

// Helper component for the feature cards
const FeatureCard = ({ icon, title, description }) => (
  <div className="perspective-1000">
    <div className="transform transition-transform duration-500 ease-in-out hover:scale-105 hover:-translate-y-2 group">
      <div className="relative p-8 bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700 h-full transform-style-preserve-3d group-hover:rotate-x-8 group-hover:shadow-2xl group-hover:shadow-purple-500/30">
        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-indigo-500 text-white mb-6 shadow-lg">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  </div>
);

const SocialIcon = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
    {children}
  </a>
);

export default function HomePage() {
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-900 text-gray-200">
      {/* Main Hero Section -- The min-h-screen class is removed from the child div */}
      <div className="relative text-center flex flex-col items-center justify-center min-h-[80vh] px-6 overflow-hidden">
        {/* Animated background glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-indigo-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="relative z-10">
          <Image
            src="/iconn.png"
            alt="School Icon"
            width={90}
            height={90}
            className="mx-auto mb-5 drop-shadow-lg transform hover:scale-110 transition-transform"
          />
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-4 drop-shadow-md">
            School Admin Portal
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            An intuitive and powerful interface to manage, view, and organize your school directory with ease.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <Link
              href="/add-school"
              className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg transition-transform duration-200 transform hover:scale-105 active:scale-95"
            >
              Add New School
            </Link>
            <Link
              href="/show-schools"
              className="px-8 py-3 bg-gray-700 text-gray-200 font-semibold rounded-lg shadow-md transition-transform duration-200 transform hover:scale-105 active:scale-95 hover:bg-gray-600"
            >
              View Directory
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Core Features</h2>
          <p className="text-gray-400 mb-12">Everything you need in one powerful package.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>}
              title="Effortless Data Entry"
              description="A clean, validated form ensures that adding new school information is simple and error-free."
            />
            <FeatureCard
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>}
              title="Dynamic Directory"
              description="View all schools in a responsive, e-commerce style grid that looks great on any device."
            />
            <FeatureCard
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>}
              title="Secure & Modern"
              description="Built with a modern stack (Next.js, MySQL) to ensure your data is handled securely and efficiently."
            />
          </div>
        </div>
      </div>

      {/* --- NEWLY ADDED Footer Section --- */}
      <footer className="mt-20 bg-gray-900 border-t border-gray-800 py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Column 1: About */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">School Admin Portal</h3>
            <p className="text-gray-400 text-sm">A project by Feba Thankam Moni for the Reno Platforms assignment.</p>
          </div>
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/add-school" className="text-gray-400 hover:text-white transition-colors">Add School</Link></li>
              <li><Link href="/show-schools" className="text-gray-400 hover:text-white transition-colors">Show Schools</Link></li>
            </ul>
          </div>
          {/* Column 3: Social Media */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Connect</h3>
            <div className="flex justify-center md:justify-start space-x-6">
              <SocialIcon href="#">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.745 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>
              </SocialIcon>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {year} Reno Platforms Assignment. All Rights Reserved.</p>
        </div>
      </footer>
    </div>

  );}