const fs = require('fs');
let html = fs.readFileSync('inventory.html', 'utf8');

const regex = /(<div id="inventory-container"[^>]*>)([\s\S]*?)(<\/div>\s*<\/div>\s*<\/div>\s*<\/main>)/i;
// Let's be safer: find <div id="inventory-container" ...> up to the end of its enclosing div.

// Actually, we can use a simpler approach.
const lines = html.split('\n');
const startIndex = lines.findIndex(line => line.includes('id="inventory-container"'));

if (startIndex !== -1) {
    let endIndex = startIndex;
    let divCount = 0;

    for (let i = startIndex; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes('<div')) {
            const matches = line.match(/<div/g);
            divCount += matches.length;
        }
        if (line.includes('</div')) {
            const matches = line.match(/<\/div/g);
            divCount -= matches.length;
        }

        if (divCount === 0 && i !== startIndex) {
            endIndex = i;
            break;
        }
    }

    if (endIndex !== startIndex) {
        // Keep the inventory-container open tag and closing tag
        const newLines = [
            ...lines.slice(0, startIndex + 1),
            ...lines.slice(endIndex) // This includes the closing </div> of inventory-container
        ];
        fs.writeFileSync('inventory.html', newLines.join('\n'));
        console.log("Successfully replaced contents of inventory-container");
    } else {
        console.log("Could not find matching closing div");
    }
} else {
    console.log("Could not find inventory-container");
}
