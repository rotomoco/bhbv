import React from 'react';
import { ExternalLink } from 'lucide-react';

const links = [
  {
    category: 'Partner Vereine',
    items: [
      { name: 'Verein A', url: 'https://example.com', description: 'Beschreibung des Vereins A' },
      { name: 'Verein B', url: 'https://example.com', description: 'Beschreibung des Vereins B' },
    ]
  },
  {
    category: 'Organisationen',
    items: [
      { name: 'Organisation X', url: 'https://example.com', description: 'Beschreibung der Organisation X' },
      { name: 'Organisation Y', url: 'https://example.com', description: 'Beschreibung der Organisation Y' },
    ]
  }
];

export default function Links() {
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-8 text-hover">Links</h1>

      <div className="space-y-12">
        {links.map((category) => (
          <div key={category.category} className="animate-slide-up">
            <h2 className="text-2xl font-semibold mb-6 text-hover">{category.category}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {category.items.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 card-hover group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-medium group-hover:text-blue-600 transition-colors">
                      {link.name}
                    </h3>
                    <ExternalLink 
                      className="text-gray-400 group-hover:text-blue-600 transition-all transform group-hover:translate-x-1" 
                      size={20} 
                    />
                  </div>
                  <p className="text-gray-600">{link.description}</p>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}