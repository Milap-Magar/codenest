import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';
import type { NewRepositoryInput, Repository } from '@/types/database';
import { useAuth } from '@/contexts/AuthContext';

const TABLE = 'repositories';

export function useMyRepositories() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['repositories', 'mine', user?.id],
    enabled: !!user,
    queryFn: async (): Promise<Repository[]> => {
      const { data, error } = await supabase
        .from(TABLE)
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data ?? []) as Repository[];
    },
  });
}

export function useRepository(id: string | undefined) {
  return useQuery({
    queryKey: ['repository', id],
    enabled: !!id,
    queryFn: async (): Promise<Repository | null> => {
      const { data, error } = await supabase
        .from(TABLE)
        .select('*')
        .eq('id', id!)
        .maybeSingle();
      if (error) throw error;
      return (data ?? null) as Repository | null;
    },
  });
}

export function useCreateRepository() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (input: NewRepositoryInput): Promise<Repository> => {
      if (!user) throw new Error('Not authenticated');
      const row = {
        user_id: user.id,
        name: input.name,
        description: input.description ?? '',
        visibility: input.visibility,
      };
      const { data, error } = await supabase
        .from(TABLE)
        .insert(row as never)
        .select('*')
        .single();
      if (error) throw error;
      return data as Repository;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['repositories'] }),
  });
}

export function useDeleteRepository() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from(TABLE).delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['repositories'] }),
  });
}
