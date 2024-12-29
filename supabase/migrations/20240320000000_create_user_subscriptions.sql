create table public.user_subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  tier text not null check (tier in ('free', 'silver', 'gold', 'platinum')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  stripe_subscription_id text unique,
  stripe_customer_id text unique,
  current_period_end timestamp with time zone,
  cancel_at_period_end boolean default false,
  canceled_at timestamp with time zone,
  payment_status text
);

-- Create RLS policies
alter table public.user_subscriptions enable row level security;

create policy "Users can view own subscription"
  on public.user_subscriptions for select
  using (auth.uid() = user_id);

create policy "Service role can manage all subscriptions"
  on public.user_subscriptions for all
  using (auth.role() = 'service_role');

-- Create indexes
create index user_subscriptions_user_id_idx on public.user_subscriptions(user_id);
create index user_subscriptions_stripe_subscription_id_idx on public.user_subscriptions(stripe_subscription_id);
create index user_subscriptions_stripe_customer_id_idx on public.user_subscriptions(stripe_customer_id);