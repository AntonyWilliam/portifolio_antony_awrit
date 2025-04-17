import { useEffect } from 'react';

export default function Value() {
  useEffect(() => {
    // Redirect to the static HTML page for now
    window.location.href = '/value.html';
  }, []);
  
  return null;
}