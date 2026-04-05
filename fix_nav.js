const fs = require('fs');

const files = ['index.html', 'inventory.html', 'about.html', 'contact.html'];
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Fix navigation links
    content = content.replace(/"#"([^>]*)>Home</g, '"index.html"$1>Home<');
    content = content.replace(/"#"([^>]*)>Explore</g, '"inventory.html"$1 data-i18n="nav_inventory">Explore<');
    content = content.replace(/"#"([^>]*)>About</g, '"about.html"$1>About<');
    content = content.replace(/"#"([^>]*)>Contact Us</g, '"contact.html"$1 data-i18n="nav_contact">Contact Us<');
    content = content.replace(/"#"([^>]*)>Admin</g, '"admin.html"$1>Admin<');

    // Add some missing translations
    content = content.replace(/>Legend Automotive</g, ' data-i18n="header_title">Legend Automotive<');

    fs.writeFileSync(file, content);
});
