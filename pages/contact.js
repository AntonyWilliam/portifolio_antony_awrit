import { useEffect } from 'react';

export default function Contact() {
  useEffect(() => {
    // Redirect to the static HTML page for now
    window.location.href = '/contact.html';
  }, []);
  
  return null;
}