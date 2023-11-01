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
  
    //rating = pass
  };
  
  // https://gist.github.com/amundo/3951b04c1e0725445774
  function saveJSON(data){
    return JSON.stringify(data, null, 2);
    // BELOW IS COMMENTED OUT BECAUSE ALL WE NEED IS AN OBJECT (FOR NOW)
  
    /*var blob = new Blob([stringified], {type: "application/json"});
    var url = URL.createObjectURL(blob);
    
    
    var a = document.createElement('a');
    a.download = saveAs + '.json';
    a.href = url;
    a.id = saveAs;
    document.body.appendChild(a);
    a.click();
    document.querySelector('#' + a.id).remove();*/
  };
  
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
  function isSecure() {
    if(window.location.protocol === 'https:'){
      return true;
    } else {
      rating = rating - 2.5;
      return false;
    };
  };
  
  // Return true if URL is  shorted, false if not shortened
  function isShortened() {
    pageURL = window.location.href;
    if ((pageURL.includes('bit.ly')) || (pageURL.includes('tinyurl'))){
      rating -= 2.5;
      return true;
    } else {
      return false;
    };
  };
  // TODO: Fetch the user's IP address
  
  // TODO: Fetch the user's location
  
  // Refresh the data when a new link is accessed
  window.onload = function() {
    safe = true;
    window.onload = null;
    fetchData();
    if (rating < 0){
      rating = 0;
    }
    if (!(isSecure()) || (isShortened())){
      window.alert("Page is insecure.");
      safe = false;
    }
    else{
      window.alert("Page is secure.");
    }
    const dataArray = {
      eventTime: timeAccessed,
      domainTitle: pageTitle,
      domainURL: pageURL,
      domainSecure: isSecure(),
      domainLinks: getLinks(),
    }
    
    console.log(saveJSON(dataArray))
    if (!safe) {
      chrome.tabs.create({url:chrome.runtime.getURL("/page/blocked.html")});
    }
    // add condition to only saveJSON is rating is below acceptable
    // saveJSON(dataArray, 'log')
  };
  
  
  
  }
  