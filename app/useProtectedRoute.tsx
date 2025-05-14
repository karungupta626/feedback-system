import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useProtectedRoute = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      setLoading(false);
      return;
    }

    try {
      const decodedToken = decodeJWT(token);
      setUser(decodedToken);

      if (decodedToken.role !== 'admin') {
        router.push('/feedback');
      } else {
        router.push('/admin');
      }

      setLoading(false);
    } catch (error) {
      console.error('Error decoding token:', error);
      router.push('/login'); 
      setLoading(false); 
    }
  }, [router]);

  return { user, loading };
};

export const decodeJWT = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const decoded = JSON.parse(atob(base64));
  return decoded;
};
