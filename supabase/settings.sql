-- Create Settings table
CREATE TABLE IF NOT EXISTS public.settings (
    key TEXT PRIMARY KEY,
    value TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read-only access" ON public.settings
    FOR SELECT USING (true);

CREATE POLICY "Allow admin full access" ON public.settings
    FOR ALL USING (auth.role() = 'authenticated');

-- Insert default settings
INSERT INTO public.settings (key, value) VALUES
('exchange_rate', '50.0'),
('instagram_link', '#'),
('facebook_link', '#'),
('tiktok_link', '#'),
('whatsapp_number', '#'),
('phone_number', '#'),
('map_iframe_source', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.776625845564!2d31.4287661!3d29.986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583d7a8d88697b%3A0x6b696f8a846f6f6b!2sNew%20Cairo%2C%20Egypt!5e0!3m2!1sen!2seg!4v1620000000000!5m2!1sen!2seg'),
('hero_image', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ0mG099vYpqNDbpLyTIVB-qWTjo0OdFfTRPUsHn2tpTWRGAEFevvT9lHQ-poel8v9BCCyXsGvKJw8iD5V_OFoJAgcfx3SM4mifTY-Bq-9SGUoEYyGq11kzsFQlIbvMJ0wRT1Feh67PrJf40PFTIhPDWLihdQV0um1l1KSWyusNuLgQckK1t3QrdGREKTDAGyLO3Pi7x7A3mhpMez9T6S8m3qjM9m5fh0l8mAW07RFKy_h2Q7ZhNpe4Skxi3mbUq49A8CDGT8Cs1or'),
('website_links', '[]')
ON CONFLICT (key) DO NOTHING;
