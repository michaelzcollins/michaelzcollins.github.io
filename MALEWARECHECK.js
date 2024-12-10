const apiKey = 'YOUR_API_KEY_HERE';  // Replace with your VirusTotal API Key
const apiUrl = 'https://www.virustotal.com/api/v3/files/';

// This function is called when the user clicks the "Check Hash" button
function checkHash() {
    // Get the file hash entered by the user
    const hash = document.getElementById('fileHash').value.trim();

    // Check if the input field is empty
    if (hash === '') {
        alert('Please enter a valid file hash.');
        return;
    }

    // Get the result display area to show status
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = 'Checking...';

    // Make a fetch request to the VirusTotal API
    fetch(`${apiUrl}${hash}`, {
        method: 'GET',
        headers: {
            'x-apikey': apiKey  // Use your API key for authentication
        }
    })
    .then(response => response.json())  // Parse the JSON response
    .then(data => {
        // If the data contains file analysis results
        if (data.data) {
            // Get the number of malicious reports for the file
            const maliciousCount = data.data.attributes.last_analysis_stats.malicious;

            // If the file is flagged as malicious, display it in red
            if (maliciousCount > 0) {
                resultDiv.textContent = 'File is flagged as malicious!';
                resultDiv.classList.add('malicious');
                resultDiv.classList.remove('clean');
            } else {
                // If the file is clean, display it in green
                resultDiv.textContent = 'File is clean.';
                resultDiv.classList.add('clean');
                resultDiv.classList.remove('malicious');
            }
        } else {
            // If the hash is not recognized, show an error message
            resultDiv.textContent = 'Error: Invalid or unrecognized file hash.';
            resultDiv.classList.remove('clean');
            resultDiv.classList.remove('malicious');
        }
    })
    .catch(error => {
        // If there is any error during the fetch request, show this error message
        resultDiv.textContent = 'Error occurred while checking the file hash.';
        resultDiv.classList.remove('clean');
        resultDiv.classList.remove('malicious');
    });
}
