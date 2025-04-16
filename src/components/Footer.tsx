import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="hover-lift">
            <h3 className="text-xl font-bold mb-4 text-hover">BHBV</h3>
            <address className="not-italic">
              <p>Musterstraße 123</p>
              <p>12345 Musterstadt</p>
              <p>Deutschland</p>
            </address>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-hover">Rechtliches</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/kontakt" 
                  className="hover:text-gray-300 transition-all duration-300 hover:translate-x-2 inline-block"
                >
                  Kontakt
                </Link>
              </li>
              <li>
                <Link 
                  to="/impressum" 
                  className="hover:text-gray-300 transition-all duration-300 hover:translate-x-2 inline-block"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link 
                  to="/datenschutz" 
                  className="hover:text-gray-300 transition-all duration-300 hover:translate-x-2 inline-block"
                >
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-hover">Social Media</h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="hover:text-gray-300 transition-transform hover:scale-110"
              >
                <Facebook size={24} />
              </a>
              <a 
                href="#" 
                className="hover:text-gray-300 transition-transform hover:scale-110"
              >
                <Twitter size={24} />
              </a>
              <a 
                href="#" 
                className="hover:text-gray-300 transition-transform hover:scale-110"
              >
                <Instagram size={24} />
              </a>
              <a 
                href="mailto:info@bhbv.de" 
                className="hover:text-gray-300 transition-transform hover:scale-110"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}