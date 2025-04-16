import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface PendingRegistration {
  id: string;
  email: string;
  created_at: string;
  status: 'pending' | 'approved' | 'denied';
}

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState<PendingRegistration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAndLoadData();
  }, []);

  const checkAdminAndLoadData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      // Check if user is admin
      const { data: userData, error: userError } = await supabase
        .from('auth.users')
        .select('is_admin')
        .eq('id', user.id)
        .single();

      if (userError || !userData?.is_admin) {
        navigate('/');
        return;
      }

      // Load pending registrations
      const { data, error } = await supabase
        .from('pending_registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRegistrations(data || []);
    } catch (error) {
      setError('Fehler beim Laden der Registrierungen');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproval = async (registrationId: string, approve: boolean) => {
    try {
      const { error } = await supabase.rpc('approve_registration', {
        registration_id: registrationId
      });

      if (error) throw error;

      // Refresh the list
      checkAdminAndLoadData();
    } catch (error) {
      setError('Fehler bei der Bearbeitung der Registrierung');
    }
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Laden...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                E-Mail
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Datum
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aktionen
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {registrations.map((registration) => (
              <tr key={registration.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {registration.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(registration.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    registration.status === 'approved' 
                      ? 'bg-green-100 text-green-800'
                      : registration.status === 'denied'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {registration.status === 'approved' && <CheckCircle className="w-4 h-4 mr-1" />}
                    {registration.status === 'denied' && <XCircle className="w-4 h-4 mr-1" />}
                    {registration.status === 'pending' && <AlertCircle className="w-4 h-4 mr-1" />}
                    {registration.status === 'approved' ? 'Genehmigt' 
                      : registration.status === 'denied' ? 'Abgelehnt'
                      : 'Ausstehend'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  {registration.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApproval(registration.id, true)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Genehmigen
                      </button>
                      <button
                        onClick={() => handleApproval(registration.id, false)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Ablehnen
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}