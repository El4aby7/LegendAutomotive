const fs = require('fs');

let content = fs.readFileSync('contact.html', 'utf8');

content = content.replace('<form class="space-y-6">', '<form id="contact-form" class="space-y-6">');
content = content.replace('placeholder="John Doe"', 'id="c-name" placeholder="John Doe" required');
content = content.replace('placeholder="john@example.com"', 'id="c-email" placeholder="john@example.com" required');
content = content.replace('placeholder="+1 (555) 000-0000"', 'id="c-phone" placeholder="+1 (555) 000-0000"');
content = content.replace('<select class=', '<select id="c-interest" class=');
content = content.replace('placeholder="Tell us about your requirements..."', 'id="c-message" placeholder="Tell us about your requirements..." required');

fs.writeFileSync('contact.html', content);
