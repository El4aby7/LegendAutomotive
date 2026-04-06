import re

with open('script.js', 'r') as f:
    content = f.read()

# Let's remove the first definition of renderColorFilters and toggleColorFilter.
# We will use the second one because it has the correct color.name rendering.

# First block is roughly from `function renderColorFilters() {` (line 840) to `/**\n * Renders color filters dynamically`
pattern_first = r"function renderColorFilters\(\) \{[\s\S]*?\}\n\nwindow\.toggleColorFilter = function\(hex, btn\) \{[\s\S]*?filterInventory\(\);\n\};\n\n\n/\*\*"

def replacer(match):
    return "/**"

content = re.sub(pattern_first, replacer, content)

# Also ensure `renderColorFilters()` and `renderBrandFilters()` are called when inventory loads.
# Let's look for `function loadInventory() {` and see if they are there.
with open('script.js', 'w') as f:
    f.write(content)
