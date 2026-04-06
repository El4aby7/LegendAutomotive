const { JSDOM } = require('jsdom');
const fs = require('fs');
const scriptContent = fs.readFileSync('script.js', 'utf-8');

const dom = new JSDOM(`
<!DOCTYPE html>
<html>
<body>
    <div id="color-filters-container"></div>
</body>
</html>
`, { runScripts: "dangerously", url: "http://localhost/" });

dom.window.eval(scriptContent);
dom.window.products = [
    { colors: [{hex: '#000000', name: 'Black'}, {hex: '#FFFFFF', name: 'White'}] },
    { colors: [{hex: '#000000', name: 'Black'}, {hex: '#FF0000', name: 'Red'}] }
];
dom.window.activeColorFilters = [];
dom.window.renderColorFilters();
console.log('After renderColorFilters:');
console.log(dom.window.document.getElementById('color-filters-container').innerHTML);

const firstBtn = dom.window.document.getElementById('color-filters-container').querySelector('button');
dom.window.toggleColorFilter('#000000', firstBtn);

console.log('Active colors:', dom.window.activeColorFilters);

console.log('After toggleColorFilter:');
console.log(dom.window.document.getElementById('color-filters-container').innerHTML);
