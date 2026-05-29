-- Create uploads table
create table if not exists uploads (
    id uuid primary key default gen_random_uuid(),
    file_url text not null,
    file_name text not null,
    file_size bigint not null,
    mime_type text,
    share_id text unique not null default encode(gen_random_bytes(9), 'base64'),
    uploaded_at timestamptz not null default now(),
    expires_at timestamptz not null default now() + interval '24 hours'
);

-- Create index for cleanup queries
create index if not exists idx_uploads_expires_at on uploads(expires_at);
create index if not exists idx_uploads_share_id on uploads(share_id);

-- Enable Row Level Security
alter table uploads enable row level security;

-- Public can insert (upload)
create policy "Anyone can upload"
    on uploads for insert
    with check (true);

-- Public can read by share_id
create policy "Anyone can read"
    on uploads for select
    using (true);

-- Only service_role can delete (used by cleanup function)
create policy "Service role can delete"
    on uploads for delete
    using (auth.jwt() ->> 'role' = 'service_role');

-- Storage bucket for uploaded files
insert into storage.buckets (id, name, public) 
values ('tmp-files', 'tmp-files', true)
on conflict (id) do nothing;

-- Allow public upload to tmp-files bucket
create policy "Public upload"
    on storage.objects for insert
    with check (bucket_id = 'tmp-files');

-- Allow public download from tmp-files bucket
create policy "Public download"
    on storage.objects for select
    using (bucket_id = 'tmp-files');

-- Only service_role can delete expired files
create policy "Service role delete"
    on storage.objects for delete
    using (bucket_id = 'tmp-files' and auth.jwt() ->> 'role' = 'service_role');
