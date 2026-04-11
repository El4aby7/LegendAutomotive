-- NOTE: This seed file assumes brands with IDs 1, 2, 3 exist.
-- It is recommended to run brands.sql and products.sql before this.

-- Sample Brands
INSERT INTO public.brands (name, logo_url) VALUES
('Mercedes-Benz', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Benz_logo.svg/2048px-Mercedes-Benz_logo.svg.png'),
('BMW', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/2048px-BMW.svg.png'),
('Porsche', 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Porsche-logo.svg/1200px-Porsche-logo.svg.png'),
('Audi', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/2560px-Audi-Logo_2016.svg.png')
ON CONFLICT DO NOTHING;

-- Sample Products
INSERT INTO public.products (
    name, name_ar, price_egp, category, brand_id, origin, is_spotlight, is_upon_request, is_sold_out,
    description, description_ar, mileage, fuel_type, transmission, version,
    image_url, gallery, order_explore, order_spotlight
) VALUES
(
    'Mercedes-Benz G63 AMG', 'مرسيدس جي 63 AMG', 12500000, 'SUV', 1, 'Imported', true, false, false,
    'The legendary G-Wagon, unmatched performance and luxury.', 'جي واجون الأسطورية، أداء وفخامة لا مثيل لهما.',
    '0 km', 'Petrol', 'Automatic', 'AMG',
    'https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=2070&auto=format&fit=crop',
    ARRAY['https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=2070&auto=format&fit=crop'],
    0, 0
),
(
    'BMW M4 Competition', 'بي إم دبليو M4 كومبيتشن', 6800000, 'Coupe', 2, 'Egyptian Agency', true, false, false,
    'Pure driving pleasure with M power.', 'متعة القيادة الخالصة مع قوة M.',
    '1,200 km', 'Petrol', 'Automatic', 'Competition',
    'https://images.unsplash.com/photo-1617814076668-8dfc6fe159c7?q=80&w=2070&auto=format&fit=crop',
    ARRAY['https://images.unsplash.com/photo-1617814076668-8dfc6fe159c7?q=80&w=2070&auto=format&fit=crop'],
    1, 1
),
(
    'Porsche 911 GT3 RS', 'بورش 911 GT3 RS', 15000000, 'Sports', 3, 'Imported', true, true, false,
    'The ultimate track machine for the road.', 'آلة الحلبة المثالية للطريق.',
    '0 km', 'Petrol', 'PDK', 'GT3 RS',
    'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=1974&auto=format&fit=crop',
    ARRAY['https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=1974&auto=format&fit=crop'],
    2, 2
)
ON CONFLICT DO NOTHING;
