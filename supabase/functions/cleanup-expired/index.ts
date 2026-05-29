import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

serve(async (_req) => {
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { data: expired } = await supabase
      .from('uploads')
      .select('id, file_url')
      .lt('expires_at', new Date().toISOString())

    if (!expired || expired.length === 0) {
      return new Response(JSON.stringify({ deleted: 0 }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    let deleted = 0
    for (const file of expired) {
      const path = file.file_url.replace(/^.*\/tmp-files\//, '')
      await supabase.storage.from('tmp-files').remove([path])
      await supabase.from('uploads').delete().eq('id', file.id)
      deleted++
    }

    return new Response(JSON.stringify({ deleted }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
