import React from 'react';

export default function Imprint() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Impressum</h1>
        
        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold mb-4">Angaben gemäß § 5 TMG</h2>
          <p className="mb-6">
            BHBV e.V.<br />
            Musterstraße 123<br />
            12345 Musterstadt
          </p>

          <h2 className="text-2xl font-semibold mb-4">Vertreten durch</h2>
          <p className="mb-6">
            Max Mustermann<br />
            Vorstandsvorsitzender
          </p>

          <h2 className="text-2xl font-semibold mb-4">Kontakt</h2>
          <p className="mb-6">
            Telefon: +49 (0) 123 456789<br />
            E-Mail: info@bhbv.de
          </p>

          <h2 className="text-2xl font-semibold mb-4">Registereintrag</h2>
          <p className="mb-6">
            Eintragung im Vereinsregister<br />
            Registergericht: Amtsgericht Musterstadt<br />
            Registernummer: VR 12345
          </p>

          <h2 className="text-2xl font-semibold mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p className="mb-6">
            Max Mustermann<br />
            BHBV e.V.<br />
            Musterstraße 123<br />
            12345 Musterstadt
          </p>
        </div>
      </div>
    </div>
  );
}