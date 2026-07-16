import { getFallbackSiteSettings } from '@/lib/supabase/mappers';
import { createSupabaseAdminClient } from '@/lib/supabase/server';

type SupabaseAdminClient = NonNullable<ReturnType<typeof createSupabaseAdminClient>>;

export async function ensureWeddingSite(supabase: SupabaseAdminClient, siteId: string) {
  const fallback = getFallbackSiteSettings();
  const { error } = await supabase
    .from('wedding_sites')
    .upsert(
      {
        id: siteId,
        slug: fallback.slug,
        bride_name: fallback.brideName,
        groom_name: fallback.groomName,
        wedding_date: fallback.weddingDate,
        is_active: true,
      },
      // ponytail: uploads only need the parent row to exist; existing user data must win.
      { onConflict: 'id', ignoreDuplicates: true }
    );

  return error?.message || null;
}
