create table if not exists public.user_subscriptions (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    tier text not null check (tier in ('free', 'silver', 'gold', 'platinum')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.user_subscriptions enable row level security;

-- Create policies
create policy "Users can view their own subscription"
    on public.user_subscriptions for select
    using (auth.uid() = user_id);

create policy "Service role can manage all subscriptions"
    on public.user_subscriptions for all
    using (auth.jwt()->>'role' = 'service_role');

-- Create updated_at trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger handle_updated_at
    before update on public.user_subscriptions
    for each row
    execute procedure public.handle_updated_at();