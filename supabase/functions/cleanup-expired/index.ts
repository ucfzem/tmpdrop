import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (_req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  const { data: expired } = await supabase
    .from('uploads')
    .select('id, file_url')
    .lt('expires_at', new Date().toISOString())

  if (!expired || expired.length === 0) {
    return new Response('No expired files found')
  }

  let deleted = 0
  for (const file of expired) {
    const path = file.file_url.replace(/^.*\/tmp-files\//, '')
    const { error: storageErr } = await supabase.storage
      .from('tmp-files')
      .remove([path])
    if (storageErr) console.error('Storage delete failed:', storageErr)

    const { error: dbErr } = await supabase
      .from('uploads')
      .delete()
      .eq('id', file.id)
    if (dbErr) console.error('DB delete failed:', dbErr)

    deleted++
  }

  return new Response(`Cleaned up ${deleted} expired files`)
})
