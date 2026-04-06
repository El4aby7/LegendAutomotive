import re

with open('script.js', 'r') as f:
    content = f.read()

new_logic = """window.toggleBrandFilter = function(brandId, btn) {
    const index = activeBrandFilters.indexOf(brandId);
    if (index === -1) {
        activeBrandFilters.push(brandId);
    } else {
        activeBrandFilters.splice(index, 1);
    }

    // Re-render to get the correct CSS classes based on state
    renderBrandFilters();
    filterInventory();
};"""

content = re.sub(r'window\.toggleBrandFilter = function\(brandId, btn\) \{.*?\};\n', new_logic + '\n', content, flags=re.DOTALL)

with open('script.js', 'w') as f:
    f.write(content)
print("done")
