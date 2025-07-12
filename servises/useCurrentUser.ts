import { getCurrentUser } from '@/servises/appwrite';
import { useEffect, useState } from 'react';

const useCurrentUser = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };

    fetchUser();
  }, []);

  return { user, loading };
};

export default useCurrentUser;
