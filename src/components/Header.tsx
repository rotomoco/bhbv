import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogIn, LogOut, UserPlus, PlusCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';
import IMAGES from '../images/images.js';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Check initial auth state
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const menuItems = [
    { title: 'Über uns', path: '/ueber-uns' },
    { title: 'Mitmachen', path: '/mitmachen' },
    { title: 'Archiv', path: '/archiv' },
    { title: 'Links', path: '/links' },
    { title: 'Kontakt', path: '/kontakt' },
  ];

  return (
    <header 
      className={`fixed w-full bg-white z-50 transition-all duration-300 ${
        isScrolled ? 'py-2 shadow-md' : 'py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center group hover-lift">
            <img 
              src={IMAGES.bhbvlogo}
              alt="BHBV Logo"
              className="w-12 h-12 rounded-full mr-3 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <h1 className={`font-bold transition-all duration-300 ${
                isScrolled ? 'text-2xl' : 'text-3xl'
              }`}>
                BHBV
              </h1>
              <span className={`text-gray-600 transition-all duration-300 ${
                isScrolled ? 'text-sm' : 'text-base'
              }`}>
                Baerler Heimat- und Bürgerverein e.V.
              </span>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            {user && (
              <Link
                to="/create-post"
                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors button-hover"
              >
                <PlusCircle size={20} className="mr-2" />
                Neuer Beitrag
              </Link>
            )}
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="text-gray-600 hover:text-gray-900 transition-transform hover:scale-110"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="py-4 bg-white shadow-lg rounded-lg mt-2 animate-fade-in">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block py-2 px-4 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300 hover:translate-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left py-2 px-4 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300 hover:translate-x-2"
              >
                <LogOut size={20} className="inline mr-2" />
                Abmelden
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-2 px-4 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300 hover:translate-x-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn size={20} className="inline mr-2" />
                  Anmelden
                </Link>
                <Link
                  to="/register"
                  className="block py-2 px-4 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300 hover:translate-x-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <UserPlus size={20} className="inline mr-2" />
                  Registrieren
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}