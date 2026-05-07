import { useState, useEffect } from 'react';
import axios from 'axios';

interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export const GetAllCategories = () => {
  const [data, setData] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>('https://next.genzuni.website/api/categories');
        setData(response.data);
      } catch (err: any) {
        if (axios.isAxiosError(err)) {
          setError(err.message || 'خطا در ارتباط با سرور');
        } else {
          setError('یک خطای نامشخص رخ داد');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []); 

  return { data, loading, error };
};
