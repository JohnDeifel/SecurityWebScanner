// Access the HTML content of the current web page
const htmlContent = document.documentElement.outerHTML;
const parser = new DOMParser();
const doc = parser.parseFromString(htmlContent, "text/html");
const rootElement = doc.document;
const linkEls = rootElement.querySelectorAll('a');
const linkArray = Array.from(linkEls);

for(let i = 0; i < linkArray.length; i++){
    if (toLowerCase(linkArray[i].textContent) === 'google.com'){
        console.log('Welcome to Google!');
    }
    else{
        console.log('This is not Google');
        // add link to list
    }
}

