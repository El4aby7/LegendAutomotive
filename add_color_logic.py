import re

with open('script.js', 'r') as f:
    content = f.read()

new_logic = """
/**
 * Renders color filters dynamically based on available products
 */
function renderColorFilters() {
    const container = document.getElementById('color-filters-container');
    if (!container) return;

    // Extract unique colors from all products
    const uniqueColorsMap = new Map();
    products.forEach(p => {
        if (p.colors && Array.isArray(p.colors)) {
            p.colors.forEach(color => {
                if (color.hex && color.name) {
                    // Use hex as unique identifier (normalized to uppercase)
                    const normalizedHex = color.hex.toUpperCase();
                    if (!uniqueColorsMap.has(normalizedHex)) {
                        uniqueColorsMap.set(normalizedHex, color);
                    }
                }
            });
        }
    });

    const uniqueColors = Array.from(uniqueColorsMap.values());

    if (uniqueColors.length === 0) {
        container.parentElement.classList.add('hidden');
        return;
    }

    container.parentElement.classList.remove('hidden');

    container.innerHTML = uniqueColors.map(color => {
        const hex = color.hex.toUpperCase();
        const isActive = activeColorFilters.includes(hex);
        return `
            <button type="button"
                onclick="toggleColorFilter('${hex}', this)"
                class="w-8 h-8 rounded-full border-2 transition-all ${isActive ? 'border-primary scale-110 shadow-lg' : 'border-gray-300 hover:border-gray-400 opacity-70 hover:opacity-100'}"
                style="background-color: ${color.hex};"
                title="${escapeHtml(color.name)}"
            ></button>
        `;
    }).join('');
}

window.toggleColorFilter = function(hex, btn) {
    const index = activeColorFilters.indexOf(hex);
    if (index === -1) {
        activeColorFilters.push(hex);
    } else {
        activeColorFilters.splice(index, 1);
    }

    // Re-render to update UI classes correctly
    renderColorFilters();
    filterInventory();
};
"""

content = content.replace("function renderBrandFilters() {", new_logic + "\nfunction renderBrandFilters() {")

# also update initialization to call renderColorFilters
init_logic = """    renderBrandFilters();
    renderColorFilters();"""
content = content.replace("    renderBrandFilters();", init_logic)

with open('script.js', 'w') as f:
    f.write(content)

print("added color filter logic")
