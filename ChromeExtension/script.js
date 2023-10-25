{
var domain;
var timeAccessed;
var location;
var pageTitle;
var rating = 5; // out of 5 stars

function fetchData() {
  //domain = pass
  
  let event = new Date();
  timeAccessed = event.toString();

  //location = pass

  pageTitle = document.title;
  pageURL = window.location.href;
};

// https://gist.github.com/amundo/3951b04c1e0725445774 (OLD, WE'RE NOT USING THIS ANYMORE)
function saveJSON(data){
  return JSON.stringify(data, null, 2);
};

// send to sql server with fetch api
// add link to server, not the database
const url2 = 'Driver={ODBC Driver 18 for SQL Server};Server=tcp:ipro497.database.windows.net,1433;Database=iprowebscanner;Uid=test;Pwd={Shambhawi@123};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;'; 

fetch(url2, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: blob,
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Response from server:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

// Return the html of the page
function getHTML() {
  pageHTML = document.documentElement.outerHTML;
  return pageHTML;
};

// Get all links on the page
function getLinks() {
  var links = document.getElementsByTagName('a');
  var linksArray = [];
  for (var i = 0; i < links.length; i++) {
    linksArray.push(links[i].href);
  }
  
  return linksArray;
};

// Return true if URL is https otherwise false
function isHttps() {
  if(window.location.protocol === 'https:'){
    // return true;
  } else {
    rating -= 1;
    // return false;
  };
};

// Return true if URL is shortened, false if not shortened
function isShortened() {
  pageURL = window.location.href;
  if ((pageURL.includes('bit.ly')) || (pageURL.includes('tinyurl'))){
    rating -= 1;
    // return true;
  } /* else {
    return false;
  }*/;
};

// Return true if URL includes @ symbol (common phishing tactic)
function hasAt() {
  pageURL = window.location.href;
  if (pageURL.includes('@')){
    rating -= 1;
    // return true;
  } /* else {
    return false;
  }*/;
};

// TODO: Fetch the user's IP address

// TODO: Fetch the user's location

// Refresh the data when a new link is accessed
window.onload = function() {
  window.onload = null;
  fetchData();
  isHttps();
  isShortened();
  hasAt();
  if (rating < 0){
    rating = 0;
  }
  if (rating <= 3){
    window.alert("Page is insecure. Star Rating: " + rating);
  }
  else{
    window.alert("Page is secure. Star Rating: " + rating);
  } // in the future we have to make sure nothing happens if the page is secure
  const dataArray = {
    eventTime: timeAccessed,
    domainTitle: pageTitle,
    domainURL: pageURL,
    domainSecure: isSecure(),
    domainLinks: getLinks(),
  }
  
  console.log(saveJSON(dataArray))
  // add condition to only saveJSON is rating is below acceptable
  // saveJSON(dataArray, 'log')
};



}


/*
Apparently we have to ensure that CORS (Cross-Origin Resource Sharing) settings on our Azure server allows requests from the origin of our JavaScript application, that is something I will work on shortly.
*/

