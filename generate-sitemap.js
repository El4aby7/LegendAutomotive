/**
 * generate-sitemap.js
 *
 * Fetches all products from Supabase and regenerates sitemap.xml with:
 *  - the existing static pages
 *  - a /details?id=X entry for every product row
 *
 * Usage: node generate-sitemap.js
 *
 * Credentials are read from supabase-config.js (browser-style file, so we
 * extract the SUPABASE_URL / SUPABASE_ANON_KEY constants instead of
 * require()-ing it directly, since that file references `window`).
 */

const fs = require('fs');
const path = require('path');

const SITE_ORIGIN = 'https://www.legendautomotiveeg.com';
const CONFIG_PATH = path.join(__dirname, 'supabase-config.js');
const OUTPUT_PATH = path.join(__dirname, 'sitemap.xml');

const STATIC_PAGES = [
    { loc: '/', changefreq: 'daily', priority: '1.0' },
    { loc: '/inventory', changefreq: 'daily', priority: '0.9' },
    { loc: '/about', changefreq: 'monthly', priority: '0.7' },
    { loc: '/contact', changefreq: 'monthly', priority: '0.7' },
    { loc: '/favorites', changefreq: 'monthly', priority: '0.4' },
];

function readSupabaseCredentials() {
    const src = fs.readFileSync(CONFIG_PATH, 'utf8');

    const urlMatch = src.match(/SUPABASE_URL\s*=\s*["']([^"']+)["']/);
    const keyMatch = src.match(/SUPABASE_ANON_KEY\s*=\s*["']([^"']+)["']/);

    if (!urlMatch || !keyMatch) {
        throw new Error(`Could not find SUPABASE_URL / SUPABASE_ANON_KEY in ${CONFIG_PATH}`);
    }

    return { url: urlMatch[1], key: keyMatch[1] };
}

const FUEL_TYPE_PAGES = [
    { loc: '/inventory?fuel=electric', changefreq: 'weekly', priority: '0.7' },
    { loc: '/inventory?fuel=petrol', changefreq: 'weekly', priority: '0.7' },
];

async function supabaseGet({ url, key }, table, select) {
    const endpoint = `${url}/rest/v1/${table}?select=${select}`;

    const res = await fetch(endpoint, {
        headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
        },
    });

    if (!res.ok) {
        const body = await res.text().catch(() => '');
        throw new Error(`Supabase request failed (${table}): ${res.status} ${res.statusText} ${body}`);
    }

    return res.json();
}

async function fetchProducts(creds) {
    // NOTE: products.sql defines the column as brand_id (FK to brands), not
    // "brand" — selecting brand_id here instead of a nonexistent "brand" column.
    return supabaseGet(creds, 'products', 'id,name,brand_id,category');
}

async function fetchBrands(creds) {
    return supabaseGet(creds, 'brands', 'id,name');
}

function uniqueCategories(products) {
    const seen = new Set();
    const result = [];
    for (const p of products) {
        const cat = p.category;
        if (!cat || seen.has(cat)) continue;
        seen.add(cat);
        result.push(cat);
    }
    return result;
}

function xmlEscape(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

function buildUrlEntry(loc, lastmod, changefreq, priority) {
    return [
        '  <url>',
        `    <loc>${xmlEscape(loc)}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        '  </url>',
    ].join('\n');
}

function buildSitemap({ products, brands, categories }, lastmod) {
    const entries = [];

    for (const page of STATIC_PAGES) {
        entries.push(buildUrlEntry(`${SITE_ORIGIN}${page.loc}`, lastmod, page.changefreq, page.priority));
    }

    for (const p of products) {
        if (p.id === undefined || p.id === null) continue;
        const loc = `${SITE_ORIGIN}/details?id=${encodeURIComponent(p.id)}`;
        entries.push(buildUrlEntry(loc, lastmod, 'weekly', '0.8'));
    }

    for (const b of brands) {
        if (!b.name) continue;
        const loc = `${SITE_ORIGIN}/inventory?brand=${encodeURIComponent(b.name)}`;
        entries.push(buildUrlEntry(loc, lastmod, 'weekly', '0.7'));
    }

    for (const page of FUEL_TYPE_PAGES) {
        entries.push(buildUrlEntry(`${SITE_ORIGIN}${page.loc}`, lastmod, page.changefreq, page.priority));
    }

    for (const cat of categories) {
        const loc = `${SITE_ORIGIN}/inventory?category=${encodeURIComponent(cat)}`;
        entries.push(buildUrlEntry(loc, lastmod, 'weekly', '0.7'));
    }

    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        entries.join('\n'),
        '</urlset>',
        '',
    ].join('\n');
}

async function main() {
    const creds = readSupabaseCredentials();
    const [products, brands] = await Promise.all([
        fetchProducts(creds),
        fetchBrands(creds),
    ]);
    const categories = uniqueCategories(products);

    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const xml = buildSitemap({ products, brands, categories }, today);

    fs.writeFileSync(OUTPUT_PATH, xml, 'utf8');

    console.log(`Product URLs added: ${products.length}`);
    console.log(`Brand filter URLs added: ${brands.length}`);
    console.log(`Fuel type URLs added: ${FUEL_TYPE_PAGES.length}`);
    console.log(`Category URLs added: ${categories.length}`);
    console.log(`Sitemap written to: ${OUTPUT_PATH}`);
}

main().catch(err => {
    console.error('Failed to generate sitemap:', err.message);
    process.exitCode = 1;
});
