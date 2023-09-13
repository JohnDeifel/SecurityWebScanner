// import DOM?
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js'; // Check https://jquery.com/ for the current version
document.getElementsByTagName('head')[0].appendChild(script);

// Access the HTML content of the current web page
const htmlContent = document.documentElement.outerHTML;
const parser = new DOMParser();
const doc = parser.parseFromString(htmlContent, "text/html");
const rootElement = doc.documentElement; // Changed from doc.document to doc.documentElement
const linkEls = rootElement.querySelectorAll('a');
const linkArray = Array.from(linkEls);

const nonGoogleLinks = []; // Create an array to store non-Google links

for (let i = 0; i < linkArray.length; i += 1) {
    if (linkArray[i].textContent.toLowerCase() === 'google.com') {
        console.log('Welcome to Google!');
    } else {
        console.log('This is not Google');
        nonGoogleLinks.push(linkArray[i].textContent); // Add link to the list
    }
}

console.log('Non-Google Links:', nonGoogleLinks); // Print the list of non-Google links
