const fs = require('fs');

const scriptPath = 'script.js';
let scriptContent = fs.readFileSync(scriptPath, 'utf-8');

const newRenderBrandFilters = `function renderBrandFilters() {
    const container = document.getElementById('brand-filters-container');

    if (!container) return;

    if (brands.length === 0) {
        container.parentElement.classList.add('hidden');
        return;
    }

    container.parentElement.classList.remove('hidden');

    container.innerHTML = brands.map(brand => {
        const isActive = activeBrandFilters.includes(brand.id);
        const btnClass = isActive
            ? 'px-4 py-2 rounded-full bg-primary text-on-primary text-xs font-medium'
            : 'px-4 py-2 rounded-full bg-surface-container-high text-on-surface text-xs font-medium hover:bg-primary hover:text-on-primary transition-colors';

        return \`
            <button type="button"
                onclick="toggleBrandFilter(\${brand.id}, this)"
                class="\${btnClass}"
                title="\${escapeHtml(brand.name)}">
                \${escapeHtml(brand.name)}
            </button>
        \`;
    }).join('');
}`;

scriptContent = scriptContent.replace(/function renderBrandFilters\(\) \{[\s\S]*?\}\.join\(''\);\n\}/, newRenderBrandFilters);

fs.writeFileSync(scriptPath, scriptContent);
console.log('Fixed renderBrandFilters logic');
