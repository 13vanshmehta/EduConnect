import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <GraduationCap className="h-8 w-8 text-teal-500" />
            <span className="ml-2 text-xl font-bold text-teal-500">EDU-CONNECT</span>
          </Link>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-teal-500"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-teal-500 px-3 py-2">Home</Link>
            <Link to="/administration" className="text-gray-700 hover:text-teal-500 px-3 py-2">Administration</Link>
            <Link to="/curriculum" className="text-gray-700 hover:text-teal-500 px-3 py-2">Curriculum</Link>
            <Link to="/contact" className="text-gray-700 hover:text-teal-500 px-3 py-2">Contact us</Link>
            <Link to="/auth/login" className="text-gray-700 hover:text-teal-500 px-3 py-2">Login</Link>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg shadow-lg">
              <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-teal-500">Home</Link>
              <Link to="/administration" className="block px-3 py-2 text-gray-700 hover:text-teal-500">Administration</Link>
              <Link to="/curriculum" className="block px-3 py-2 text-gray-700 hover:text-teal-500">Curriculum</Link>
              <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:text-teal-500">Contact us</Link>
                <Link to="/auth/login" className="block px-3 py-2 text-gray-700 hover:text-teal-500">Login</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;