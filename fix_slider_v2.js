const fs = require('fs');

let content = fs.readFileSync('inventory.html', 'utf8');

// The original javascript uses `#filter-category` as a <select> element, but the new design uses checkboxes. Let's just make the script.js logic use a select and hide the checkboxes, or replace the checkboxes with the select.
content = content.replace(/<div class="space-y-3">[\s\S]*?<\/div>/, '<select id="filter-category" class="w-full bg-surface-container-lowest border-none focus:ring-1 focus:ring-primary rounded-md py-3 px-4 text-on-surface"><option value="">All Categories</option></select>');

// Add min and max price display ids for javascript
content = content.replace('<span id="price-range-display" class="text-xs text-on-surface-variant font-mono">$120k - $2.5M</span>', '<span id="price-range-display" class="text-xs text-on-surface-variant font-mono"><span id="price-min">$120k</span> - <span id="price-max">$2.5M</span></span>');

// Add Color filters container placeholder since we need it in the DOM
content = content.replace('<!-- Vehicle Type -->', '<!-- Colors --><div class="space-y-4 mb-6"><label class="font-headline font-bold text-xs uppercase tracking-widest text-primary">Color</label><div id="color-filters-container" class="flex flex-wrap gap-2"></div></div>\n<!-- Vehicle Type -->');

fs.writeFileSync('inventory.html', content);
