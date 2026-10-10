create extension if not exists "uuid-ossp";

create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text not null default 'New User',
  phone text,
  school text default 'Greenfield University',
  avatar_url text,
  is_verified_student boolean default false,
  is_seller boolean default false,
  created_at timestamptz default now()
);
alter table profiles enable row level security;
create policy "view_profiles" on profiles for select using (true);
create policy "insert_own_profile" on profiles for insert with check (auth.uid() = id);
create policy "update_own_profile" on profiles for update using (auth.uid() = id);

create table categories (
  id text primary key,
  name text not null,
  emoji text not null,
  count integer default 0,
  tile_color text not null,
  enabled boolean default true
);
alter table categories enable row level security;
create policy "view_categories" on categories for select using (true);
create policy "manage_categories" on categories for all using (auth.role() = 'authenticated');

create table communities (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  university text not null,
  members text default '0',
  type text default 'Students',
  color text default '#0A2463',
  created_at timestamptz default now()
);
alter table communities enable row level security;
create policy "view_communities" on communities for select using (true);

create table shops (
  id uuid default uuid_generate_v4() primary key,
  owner_id uuid references profiles(id) on delete cascade not null,
  name text not null,
  bio text,
  avatar_color text default '#3B82F6',
  rating numeric(3,2) default 0,
  review_count integer default 0,
  sales_count integer default 0,
  reply_time text default '10m',
  is_verified boolean default false,
  plan text default 'free' check (plan in ('free','pro')),
  created_at timestamptz default now()
);
alter table shops enable row level security;
create policy "view_shops" on shops for select using (true);
create policy "manage_own_shop" on shops for all using (auth.uid() = owner_id);

create table listings (
  id uuid default uuid_generate_v4() primary key,
  shop_id uuid references shops(id) on delete cascade,
  seller_id uuid references profiles(id) on delete cascade not null,
  seller_name text not null default 'Seller',
  seller_verified boolean default false,
  title text not null,
  description text,
  price integer not null,
  original_price integer,
  emoji text not null default '📦',
  tile_color text default '#EFEBFF',
  category text not null,
  condition text default 'New',
  stock integer default 1,
  pickup_spot text,
  offer_delivery boolean default false,
  rating numeric(3,2) default 0,
  review_count integer default 0,
  views integer default 0,
  promoted boolean default false,
  status text default 'active' check (status in ('active','promoted','sold_out','draft')),
  images text[] default '{}',
  created_at timestamptz default now()
);
alter table listings enable row level security;
create policy "view_active_listings" on listings for select using (status != 'draft' or auth.uid() = seller_id);
create policy "manage_own_listings" on listings for all using (auth.uid() = seller_id);

create table services (
  id uuid default uuid_generate_v4() primary key,
  shop_id uuid references shops(id) on delete cascade,
  seller_id uuid references profiles(id) on delete cascade not null,
  seller_name text not null default 'Seller',
  seller_verified boolean default false,
  title text not null,
  emoji text not null default '🛠️',
  tile_color text default '#EFEBFF',
  from_price integer not null,
  rating numeric(3,2) default 0,
  review_count integer default 0,
  packages jsonb default '[]',
  created_at timestamptz default now()
);
alter table services enable row level security;
create policy "view_services" on services for select using (true);
create policy "manage_own_services" on services for all using (auth.uid() = seller_id);

create table orders (
  id uuid default uuid_generate_v4() primary key,
  order_number text unique not null default 'UT-' || floor(random() * 90000 + 10000)::text,
  buyer_id uuid references profiles(id) not null,
  seller_id uuid references profiles(id) not null,
  listing_id uuid references listings(id),
  listing_title text,
  listing_emoji text default '📦',
  status text default 'new' check (status in ('new','confirmed','preparing','out_for_delivery','delivered','cancelled')),
  amount integer not null,
  delivery_option text default 'campus' check (delivery_option in ('campus','pickup')),
  delivery_spot text,
  note_to_seller text,
  estimated_delivery text,
  created_at timestamptz default now()
);
alter table orders enable row level security;
create policy "buyer_view_orders" on orders for select using (auth.uid() = buyer_id);
create policy "seller_view_orders" on orders for select using (auth.uid() = seller_id);
create policy "buyer_create_orders" on orders for insert with check (auth.uid() = buyer_id);
create policy "seller_update_orders" on orders for update using (auth.uid() = seller_id);

create table reviews (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references orders(id) on delete cascade,
  reviewer_id uuid references profiles(id) not null,
  seller_id uuid references profiles(id) not null,
  listing_id uuid references listings(id),
  rating integer not null check (rating between 1 and 5),
  text text,
  created_at timestamptz default now()
);
alter table reviews enable row level security;
create policy "view_reviews" on reviews for select using (true);
create policy "create_reviews" on reviews for insert with check (auth.uid() = reviewer_id);

create table messages (
  id uuid default uuid_generate_v4() primary key,
  sender_id uuid references profiles(id) not null,
  receiver_id uuid references profiles(id) not null,
  listing_id uuid references listings(id),
  text text not null,
  read boolean default false,
  created_at timestamptz default now()
);
alter table messages enable row level security;
create policy "view_own_messages" on messages for select using (auth.uid() = sender_id or auth.uid() = receiver_id);
create policy "send_messages" on messages for insert with check (auth.uid() = sender_id);
create policy "mark_read" on messages for update using (auth.uid() = receiver_id);

create table wishlist (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  listing_id uuid references listings(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(user_id, listing_id)
);
alter table wishlist enable row level security;
create policy "manage_wishlist" on wishlist for all using (auth.uid() = user_id);

create table cart_items (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  listing_id uuid references listings(id) on delete cascade not null,
  quantity integer default 1,
  created_at timestamptz default now(),
  unique(user_id, listing_id)
);
alter table cart_items enable row level security;
create policy "manage_cart" on cart_items for all using (auth.uid() = user_id);

create table notifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  icon text not null default '🔔',
  icon_bg text default '#DBEAFE',
  title text not null,
  read boolean default false,
  created_at timestamptz default now()
);
alter table notifications enable row level security;
create policy "view_own_notifications" on notifications for select using (auth.uid() = user_id);
create policy "update_own_notifications" on notifications for update using (auth.uid() = user_id);

create table verification_requests (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  method text not null check (method in ('email','id','regnum')),
  course text,
  level text,
  document_url text,
  status text default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz default now()
);
alter table verification_requests enable row level security;
create policy "view_own_verification" on verification_requests for select using (auth.uid() = user_id);
create policy "submit_verification" on verification_requests for insert with check (auth.uid() = user_id);

create table reports (
  id uuid default uuid_generate_v4() primary key,
  reporter_id uuid references profiles(id) not null,
  listing_id uuid references listings(id),
  reported_user_id uuid references profiles(id),
  type text not null,
  severity text default 'medium' check (severity in ('low','medium','high')),
  details text,
  status text default 'open' check (status in ('open','in_review','resolved')),
  created_at timestamptz default now()
);
alter table reports enable row level security;
create policy "submit_reports" on reports for insert with check (auth.uid() = reporter_id);
create policy "view_own_reports" on reports for select using (auth.uid() = reporter_id);

create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'New User')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

insert into categories (id, name, emoji, count, tile_color) values
  ('c1', 'Food',        '🍔', 214, '#FFE9C7'),
  ('c2', 'Fashion',     '👗', 388, '#FFE1EE'),
  ('c3', 'Books',       '📚', 152, '#D9EEFF'),
  ('c4', 'Electronics', '🔌', 176, '#DDF6F3'),
  ('c5', 'Beauty',      '💄', 121, '#FFE3EC'),
  ('c6', 'Services',    '🛠️',  96, '#E7E2FF'),
  ('c7', 'Delivery',    '🛵',  24, '#FFF3D1'),
  ('c8', 'Used items',  '🧺', 203, '#E3E8FF')
on conflict (id) do nothing;

insert into communities (name, university, members, type, color) values
  ('Dennis Osadebay University (DOU)', 'Dennis Osadebay University', '12.4k', 'Students', '#0A2463'),
  ('UNILAG Community', 'University of Lagos', '20.7k', 'Students', '#1E3A5F'),
  ('UNIABUJA Community', 'University of Abuja', '13.2k', 'Students', '#0D3B6E'),
  ('Global Community', 'All Universities', '105k+', 'Students', '#1A3A8F'),
  ('OAU Community', 'Obafemi Awolowo University', '18.9k', 'Students', '#0A4F8C'),
  ('FUTA Community', 'Fed. University of Tech. Akure', '9.3k', 'Students', '#0C3B6E');
