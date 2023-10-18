{
var domain;
var timeAccessed;
var location;
var pageTitle;
var rating; // out of 5 stars

function fetchData() {
  //domain = pass
  
  let event = new Date();
  timeAccessed = event.toString();

  //location = pass

  pageTitle = document.title;
  pageURL = window.location.href;

  //rating = pass
};

// https://gist.github.com/amundo/3951b04c1e0725445774
function saveJSON(data, saveAs){
  var stringified = JSON.stringify(data, null, 2); 
  var blob = new Blob([stringified], {type: "application/json"});
  var url = URL.createObjectURL(blob);
  
  var a = document.createElement('a');
  // a.download = saveAs + '.json';
  a.href = url;
  a.id = saveAs;
  document.body.appendChild(a);
  a.click();
  document.querySelector('#' + a.id).remove();
}

// Return the html of the page
function getHTML() {
  pageHTML = document.documentElement.outerHTML;
  return pageHTML;
}

// Get all links on the page
function getLinks() {
  var links = document.getElementsByTagName('a');
  var linksArray = [];
  for (var i = 0; i < links.length; i++) {
    linksArray.push(links[i].href);
  }
  // 
  return linksArray;
}

// TODO: Fetch the user's IP address

// TODO: Fetch the user's location

// Refresh the data when a new link is accessed
window.onload = function() {
  window.onload = null;
  fetchData();
  const dataArray = {
    eventTime: timeAccessed,
    domainTitle: pageTitle,
    domainURL: pageURL,
    domainLinks: getLinks(),
  }
  // add condition to only saveJSON is rating is below acceptable
  saveJSON(dataArray, 'log')
};

}
