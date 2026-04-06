const fs = require('fs');
let content = fs.readFileSync('script.js', 'utf-8');

const replacement = `
window.toggleColorFilter = function(hex, btn) {
    const index = activeColorFilters.indexOf(hex);
    if (index === -1) {
        activeColorFilters.push(hex);
    } else {
        activeColorFilters.splice(index, 1);
    }

    renderColorFilters();
    filterInventory();
};
`;

content = content.replace(/window\.toggleColorFilter = function\(hex, btn\) \{[\s\S]*?filterInventory\(\);\n\};\n/g, replacement);

fs.writeFileSync('script.js', content);
