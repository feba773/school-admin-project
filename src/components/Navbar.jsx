import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 hover:opacity-80 transition-opacity">
            School Admin
          </Link>
          <div className="flex space-x-6">
            <Link href="/add-school" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium">
              Add School
            </Link>
            <Link href="/show-schools" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium">
              Show Schools
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}