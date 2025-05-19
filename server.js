const { readFileSync, writeFileSync } = require('fs');
const express = require('express');
const path = require('path');
const app = express();

// Log all incoming requests
app.use((req, res, next) => {
    //console.log(`Request URL: ${req.url}`);
    next();
});

//Serve the Javascript files from the scripts directory
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));


// Define the root route first
app.get('/', (req, res) => {
    
    //console.log('Request received for /'); // Debug log
    let count;

    //console.log('Reading count from:', path.join(__dirname, 'count.txt'));

    try {
        count = readFileSync(path.join(__dirname, 'count.txt'), 'utf8').trim();
    } catch (err) {
        console.error('Error reading count file:', err);
        count = '0'; // Fallback to 0 if the file can't be read
    }

    // Increment the count
    const newCount = parseInt(count, 10) + 1;

    // Write the new count back to the file
    try {
        writeFileSync(path.join(__dirname, 'count.txt'), newCount.toString());
    } catch (err) {
        console.error('Error writing to count file:', err);
    }

    // Read the index.html file and inject the view count
    const indexPath = path.join(__dirname, 'public', 'index.html');
    let htmlContent = readFileSync(indexPath, 'utf8');

    // Replace the placeholder with the actual count
    htmlContent = htmlContent.replace('This page has been viewed 0 times!', `This page has been viewed ${newCount} times!`);

    // Send the modified HTML content back to the client
    res.send(htmlContent);
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define other routes if needed
app.get('/about.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/store.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'store.html'));
});

app.get('/related.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'related.html'));
});

// Start the server
app.listen(5001, () => console.log('Server running at http://localhost:5001'));



