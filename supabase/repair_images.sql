-- Repair Brand Logos
UPDATE public.brands SET logo_url = 'https://logo.clearbit.com/mercedes-benz.com' WHERE name ILIKE '%Mercedes%';
UPDATE public.brands SET logo_url = 'https://logo.clearbit.com/bmw.com' WHERE name ILIKE '%BMW%';
UPDATE public.brands SET logo_url = 'https://logo.clearbit.com/porsche.com' WHERE name ILIKE '%Porsche%';

-- Repair Product 2 (BMW M4) Images
UPDATE public.products SET
    image_url = 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop',
    gallery = ARRAY['https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop']
WHERE name ILIKE '%BMW M4%';
