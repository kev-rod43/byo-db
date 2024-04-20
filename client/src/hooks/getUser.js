import { useQuery } from '@apollo/client';
import {QUERY_ME} from '../utils/queries'

export const useUserQuery = () => {
    const { data, loading, error } = useQuery(QUERY_ME);
    return { data, loading, error };
  };