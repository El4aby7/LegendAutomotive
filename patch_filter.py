import re

with open('script.js', 'r') as f:
    content = f.read()

filter_inventory_patch = """        // Brand check
        const matchesBrand = activeBrandFilters.length === 0 || activeBrandFilters.includes(p.brand_id);

        // Color check
        let matchesColor = true;
        if (activeColorFilters.length > 0) {
            if (!p.colors || !Array.isArray(p.colors) || p.colors.length === 0) {
                matchesColor = false; // Product has no colors, so it can't match a color filter
            } else {
                const productHexes = p.colors.map(c => (c.hex || '').toUpperCase());
                matchesColor = activeColorFilters.some(filterHex => productHexes.includes(filterHex));
            }
        }"""

content = content.replace("""        // Brand check
        const matchesBrand = activeBrandFilters.length === 0 || activeBrandFilters.includes(p.brand_id);""", filter_inventory_patch)

filter_condition_patch = """        return matchesTerm && matchesCategory && matchesBrand && matchesColor && matchesCondition && matchesPrice;"""

content = re.sub(r'return matchesTerm && matchesCategory && matchesBrand && matchesCondition && matchesPrice;', filter_condition_patch, content)

with open('script.js', 'w') as f:
    f.write(content)

print("patched filterInventory")
