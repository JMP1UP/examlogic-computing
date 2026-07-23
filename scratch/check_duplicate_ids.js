const fs = require('fs');

function checkDuplicateIds() {
  const html = fs.readFileSync('index.html', 'utf8');
  
  const idRegex = /\bid=["']([^"']+)["']/g;
  const ids = [];
  const duplicates = new Set();
  
  let match;
  while ((match = idRegex.exec(html)) !== null) {
    const id = match[1];
    if (ids.includes(id)) {
      duplicates.add(id);
    } else {
      ids.push(id);
    }
  }
  
  console.log('--- DUPLICATE HTML IDs ---');
  if (duplicates.size === 0) {
    console.log('No duplicate IDs found!');
  } else {
    duplicates.forEach(id => {
      console.log('Duplicate ID found:', id);
    });
  }
}

checkDuplicateIds();
