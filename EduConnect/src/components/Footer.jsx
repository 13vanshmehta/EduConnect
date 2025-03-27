import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <GraduationCap className="h-8 w-8 text-teal-500" />
              <span className="ml-2 text-xl font-bold text-teal-500">EDU-CONNECT</span>
            </Link>
            <p className="text-gray-400">
              Helping your children get a leading edge at every stage in their academic journey.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-teal-500">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-teal-500">About Us</Link></li>
              <li><Link to="/curriculum" className="text-gray-400 hover:text-teal-500">Curriculum</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-teal-500">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-teal-500">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-500">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-500">Reporting</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>123 School Street</li>
              <li>City, State 12345</li>
              <li>Phone: (123) 456-7890</li>
              <li>Email: info@kmtschool.com</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} EDU-CONNECT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;