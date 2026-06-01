const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

const envVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'
];

envVars.forEach(varName => {
  const placeholder = new RegExp(`process.env.\\s*${varName}`, 'g');
  const value = process.env[varName] || ''; // Use empty string if not set
  indexHtml = indexHtml.replace(placeholder, `"${value}"`);
});

fs.writeFileSync(indexPath, indexHtml, 'utf8');

console.log('Environment variables injected into index.html');
