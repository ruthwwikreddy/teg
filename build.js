const fs = require('fs');
const path = require('path');

const envVars = {
    VITE_FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    VITE_FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    VITE_FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    VITE_FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    VITE_FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    VITE_FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    VITE_FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    ADMIN_PASSWORD_PLACEHOLDER: process.env.ADMIN_PASSWORD
};

// Function to replace placeholders in a file
function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    for (const [placeholder, value] of Object.entries(envVars)) {
        if (value) {
            if (content.includes(placeholder)) {
                content = content.split(placeholder).join(value);
                modified = true;
                console.log(`Replaced ${placeholder} in ${filePath}`);
            }
        } else {
            console.warn(`Warning: Environment variable for ${placeholder} is not set.`);
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, content);
    }
}

// Files to process
const filesToProcess = [
    'firebase-config.js',
    'admin.html',
    'settings.html'
];

filesToProcess.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        replaceInFile(filePath);
    } else {
        console.error(`File not found: ${filePath}`);
    }
});

console.log('Build process completed.');
