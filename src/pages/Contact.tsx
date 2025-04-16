import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { emailjsConfig } from '../config/emailjs';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      if (!formRef.current) return;

      await emailjs.sendForm(
        emailjsConfig.serviceId,
        emailjsConfig.templates.contact,
        formRef.current,
        emailjsConfig.publicKey
      );
      
      setSubmitStatus({
        type: 'success',
        message: 'Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns in Kürze bei Ihnen.',
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Kontakt</h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6 hover:shadow-lg transition-all duration-300">
              <h2 className="text-2xl font-semibold mb-6">So erreichen Sie uns</h2>
              
              <div className="space-y-4">
                <div className="flex items-start group hover:translate-x-2 transition-transform duration-300">
                  <MapPin className="w-6 h-6 text-blue-600 mt-1 mr-3 group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="font-medium">Adresse</h3>
                    <p className="text-gray-600">
                      BHBV e.V.<br />
                      Musterstraße 123<br />
                      12345 Musterstadt
                    </p>
                  </div>
                </div>

                <div className="flex items-start group hover:translate-x-2 transition-transform duration-300">
                  <Phone className="w-6 h-6 text-blue-600 mt-1 mr-3 group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="font-medium">Telefon</h3>
                    <p className="text-gray-600">+49 (0) 123 456789</p>
                  </div>
                </div>

                <div className="flex items-start group hover:translate-x-2 transition-transform duration-300">
                  <Mail className="w-6 h-6 text-blue-600 mt-1 mr-3 group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="font-medium">E-Mail</h3>
                    <p className="text-gray-600">info@bhbv.de</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <h2 className="text-2xl font-semibold mb-6">Öffnungszeiten</h2>
              <div className="space-y-2">
                <p className="flex justify-between group hover:translate-x-2 transition-transform duration-300">
                  <span className="font-medium">Montag - Freitag:</span>
                  <span className="text-gray-600">09:00 - 17:00 Uhr</span>
                </p>
                <p className="flex justify-between group hover:translate-x-2 transition-transform duration-300">
                  <span className="font-medium">Samstag:</span>
                  <span className="text-gray-600">Nach Vereinbarung</span>
                </p>
                <p className="flex justify-between group hover:translate-x-2 transition-transform duration-300">
                  <span className="font-medium">Sonntag:</span>
                  <span className="text-gray-600">Geschlossen</span>
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            {submitStatus.type && (
              <div
                className={`mb-6 p-4 rounded-lg ${
                  submitStatus.type === 'success'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  E-Mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Betreff
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Nachricht
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full inline-flex items-center justify-center bg-blue-600 text-white py-3 px-6 rounded-lg transition-all duration-300 ${
                  isSubmitting
                    ? 'opacity-75 cursor-not-allowed'
                    : 'hover:bg-blue-700 hover:transform hover:scale-[1.02]'
                }`}
              >
                <Send size={20} className="mr-2" />
                {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}