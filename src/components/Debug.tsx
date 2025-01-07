import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { logger } from '../lib/utils/logger';

export default function Debug() {
  const [status, setStatus] = useState<{
    env: boolean;
    connection: boolean;
    auth: boolean;
    error: string | null;
  }>({
    env: false,
    connection: false,
    auth: false,
    error: null
  });

  useEffect(() => {
    async function checkStatus() {
      try {
        // Check environment variables
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        
        const hasEnv = !!(supabaseUrl && supabaseKey);
        logger.info('Environment variables:', { 
          hasUrl: !!supabaseUrl, 
          hasKey: !!supabaseKey 
        });
        
        // Check Supabase connection
        logger.info('Checking Supabase connection...');
        const { error: connError } = await supabase.from('profiles').select('count');
        if (connError) {
          logger.error('Supabase connection error:', connError);
          throw connError;
        }
        logger.info('Supabase connection successful');

        // Check auth status
        logger.info('Checking auth status...');
        const { data: session, error: authError } = await supabase.auth.getSession();
        if (authError) {
          logger.error('Auth error:', authError);
          throw authError;
        }
        logger.info('Auth check complete:', { isAuthenticated: !!session });

        setStatus({
          env: hasEnv,
          connection: true,
          auth: !!session,
          error: null
        });
      } catch (err: any) {
        const errorMessage = err.message || 'Unknown error occurred';
        logger.error('Status check failed:', err);
        setStatus(prev => ({
          ...prev,
          error: errorMessage
        }));
      }
    }

    checkStatus();
  }, []);

  // Always render in development
  const shouldShow = process.env.NODE_ENV === 'development' || status.error || !status.connection;

  if (!shouldShow) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-white rounded-lg shadow-lg max-w-md z-50">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold">System Status</h3>
        <div className={`h-2 w-2 rounded-full ${status.error ? 'bg-red-500' : 'bg-green-500'}`} />
      </div>
      
      <div className="space-y-1 text-sm">
        <p>
          <span className="font-medium">Environment:</span>
          <span className={status.env ? 'text-green-600' : 'text-red-600'}>
            {status.env ? ' ✓' : ' ✗'}
          </span>
        </p>
        
        <p>
          <span className="font-medium">Database:</span>
          <span className={status.connection ? 'text-green-600' : 'text-red-600'}>
            {status.connection ? ' ✓' : ' ✗'}
          </span>
        </p>

        <p>
          <span className="font-medium">Auth:</span>
          <span className={status.auth ? 'text-green-600' : 'text-gray-600'}>
            {status.auth ? ' Active' : ' Not logged in'}
          </span>
        </p>

        {status.error && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-xs">
            {status.error}
          </div>
        )}
      </div>
    </div>
  );
}