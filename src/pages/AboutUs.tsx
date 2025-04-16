import React, { useEffect, useRef } from 'react';
import Counter from '../components/Counter';

export default function AboutUs() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || !contentRef.current) return;
      
      const scrolled = window.scrollY;
      const rate = scrolled * 0.5;
      heroRef.current.style.transform = `translate3d(0, ${rate}px, 0)`;

      const rect = contentRef.current.getBoundingClientRect();
      const scrollPosition = window.innerHeight - rect.top;
      
      if (scrollPosition > 0) {
        contentRef.current.style.opacity = Math.min(scrollPosition / 500, 1).toString();
        contentRef.current.style.transform = `translateY(${Math.max(50 - scrollPosition / 10, 0)}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      <div className="relative h-[400px] overflow-hidden">
        <div
          ref={heroRef}
          className="absolute inset-0 w-full h-[120%]"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=2000)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="relative h-full flex items-center justify-center text-white text-center">
            <h1 className="text-5xl font-bold mb-4 hover-scale">Über uns</h1>
          </div>
        </div>
      </div>

      <div ref={contentRef} className="container mx-auto px-4 py-8 transition-all duration-700">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 bg-white p-8 rounded-lg shadow-md mb-12 card-hover">
            <Counter end={250} label="Mitglieder" />
            <Counter end={45} label="Durchgeführte Projekte" />
            <Counter end={15} label="Jahre Erfahrung" />
          </div>

          <div className="prose lg:prose-xl max-w-none space-y-12">
            <div className="card-hover bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-3xl font-semibold mb-4 text-hover">Unsere Geschichte</h2>
              <p className="text-gray-600">
                Der BHBV wurde im Jahr [Jahr] gegründet und setzt sich seitdem für [Zweck] ein. 
                Unsere Mitglieder kommen aus verschiedenen Bereichen und bringen ihre vielfältigen 
                Erfahrungen und Perspektiven ein.
              </p>
            </div>

            <div className="card-hover bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-3xl font-semibold mb-4 text-hover">Unsere Mission</h2>
              <p className="text-gray-600">
                Wir setzen uns ein für [Mission]. Dabei liegt unser Fokus besonders auf 
                [Schwerpunkte]. Durch verschiedene Projekte und Initiativen arbeiten wir 
                kontinuierlich an der Umsetzung unserer Ziele.
              </p>
            </div>

            <div className="card-hover bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-3xl font-semibold mb-4 text-hover">Unser Team</h2>
              <p className="text-gray-600">
                Unser engagiertes Team besteht aus [Anzahl] Mitgliedern, die sich ehrenamtlich 
                für die Ziele des Vereins einsetzen. Gemeinsam bringen wir verschiedene 
                Kompetenzen und Erfahrungen ein.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}