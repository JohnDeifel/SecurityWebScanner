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

  //rating = pass
};

// https://gist.github.com/amundo/3951b04c1e0725445774
function saveJSON(data, saveAs){
  var stringified = JSON.stringify(data, null, 2); 
  var blob = new Blob([stringified], {type: "application/json"});
  var url = URL.createObjectURL(blob);
  
  var a = document.createElement('a');
  a.download = saveAs + '.json';
  a.href = url;
  a.id = saveAs;
  document.body.appendChild(a);
  a.click();
  document.querySelector('#' + a.id).remove();
}

// Refresh the data when a new link is accessed
window.onbeforeunload = function() {
  window.onbeforeunload = null;
  fetchData();
  const dataArray = {
    eventTime: timeAccessed,
    domainTitle: pageTitle,
    //url: pageUrl,
  }
  saveJSON(dataArray, 'log')
};

}