import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';
import type { FileRow, NewFileInput } from '@/types/database';

const TABLE = 'files';

export function useFiles(repoId: string | undefined) {
  return useQuery({
    queryKey: ['files', repoId],
    enabled: !!repoId,
    queryFn: async (): Promise<FileRow[]> => {
      const { data, error } = await supabase
        .from(TABLE)
        .select('*')
        .eq('repo_id', repoId!)
        .order('name');
      if (error) throw error;
      return (data ?? []) as FileRow[];
    },
  });
}

export function useCreateFile(repoId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: NewFileInput): Promise<FileRow> => {
      const row = {
        repo_id: repoId,
        name: input.name,
        content: input.content ?? '',
      };
      const { data, error } = await supabase
        .from(TABLE)
        .insert(row as never)
        .select('*')
        .single();
      if (error) throw error;
      return data as FileRow;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['files', repoId] }),
  });
}

export function useUpdateFile(repoId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { id: string; content: string }) => {
      const { error } = await supabase
        .from(TABLE)
        .update({ content: input.content } as never)
        .eq('id', input.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['files', repoId] }),
  });
}

export function useDeleteFile(repoId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from(TABLE).delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['files', repoId] }),
  });
}
