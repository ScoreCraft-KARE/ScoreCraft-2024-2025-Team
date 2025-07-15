import React from 'react';

const Test = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>🎉 Vite + React Working!</h1>
      <p>This is a test component to verify the setup is working.</p>
      <p>Current URL: {window.location.href}</p>
      <p>Environment Test:</p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li>VITE_SUPABASE_URL: {import.meta.env.VITE_SUPABASE_URL ? '✅ Set' : '❌ Missing'}</li>
        <li>VITE_SUPABASE_ANON_KEY: {import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}</li>
        <li>VITE_ADMIN_USERNAME: {import.meta.env.VITE_ADMIN_USERNAME ? '✅ Set' : '❌ Missing'}</li>
        <li>VITE_ADMIN_PASSWORD: {import.meta.env.VITE_ADMIN_PASSWORD ? '✅ Set' : '❌ Missing'}</li>
      </ul>
    </div>
  );
};

export default Test;