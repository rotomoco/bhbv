import React from 'react';

export default function Privacy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Datenschutzerklärung</h1>
        
        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold mb-4">1. Datenschutz auf einen Blick</h2>
          <h3 className="text-xl font-medium mb-3">Allgemeine Hinweise</h3>
          <p className="mb-6">
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, 
            wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert 
            werden können.
          </p>

          <h3 className="text-xl font-medium mb-3">Datenerfassung auf dieser Website</h3>
          <h4 className="text-lg font-medium mb-2">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
          <p className="mb-6">
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem 
            Impressum dieser Website entnehmen.
          </p>

          <h2 className="text-2xl font-semibold mb-4">2. Allgemeine Hinweise und Pflichtinformationen</h2>
          <h3 className="text-xl font-medium mb-3">Datenschutz</h3>
          <p className="mb-6">
            Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre 
            personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie 
            dieser Datenschutzerklärung.
          </p>

          <h3 className="text-xl font-medium mb-3">Hinweis zur verantwortlichen Stelle</h3>
          <p className="mb-6">
            Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br /><br />
            BHBV e.V.<br />
            Musterstraße 123<br />
            12345 Musterstadt<br />
            Telefon: +49 (0) 123 456789<br />
            E-Mail: info@bhbv.de
          </p>
        </div>
      </div>
    </div>
  );
}