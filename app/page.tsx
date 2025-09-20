'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to chat page immediately
    router.push('/chat');
  }, [router]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '50vh',
      textAlign: 'center'
    }}>
      <div>
        <h1>Redirecting to Chat...</h1>
        <p>Taking you to the live chat testing interface.</p>
      </div>
    </div>
  );
}
