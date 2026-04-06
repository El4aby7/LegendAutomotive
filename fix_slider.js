const fs = require('fs');

let content = fs.readFileSync('inventory.html', 'utf8');

// Fix the category select being hidden inside the brand container problem (it was from an earlier lazy replacement)
content = content.replace('<div id="filter-category" class="hidden"></div><div id="color-filters-container" class="hidden"></div>', '');

// Wait, where should filter-category be? Let's check how inventory.html is structured.
