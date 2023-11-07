{
  // var domain;
  // var location; (we're not getting these anymore, right?)
  var timeAccessed;
  var pageTitle;
  var rating = 5; // out of 5 stars
  
  function fetchData() {
    let event = new Date();
    timeAccessed = event.toString();
    pageTitle = document.title;
    pageURL = window.location.href;
  };
  
  function makeJSON(data){
    return JSON.stringify(data, null, 2);
  };
  
  // Return the html of the page (EDIT: we might not use this anymore)
  function getHTML() {
    pageHTML = document.documentElement.outerHTML;
    return pageHTML;
  };
  
  // Get all links on the page (EDIT: we might not use this anymore)
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

  // TODO: Fetch the user's IP address, fetch the user's location
  // Do we need to, at this point? I'd say no
  
  // Refresh the data when a new link is accessed
  window.onload = function() {
    safe = true;
    window.onload = null;
    fetchData();
    if (rating < 0){
      rating = 0;
    }
    if (!(isSecure()) || (isShortened())){
      window.alert("This page is insecure. Proceed at your own risk, further details can be found by clicking on your HawkPhish extension.");
    }
    else {
      window.alert("Page is secure.");
    }
    const dataArray = {
      eventTime: timeAccessed,
      domainTitle: pageTitle,
      domainURL: pageURL,
      domainSecure: isSecure(),
      domainLinks: getLinks(),
    }
    
    // console.log(makeJSON(dataArray))
    // add condition to only makeJSON if rating is below acceptable
    // makeJSON(dataArray)
  };
  
}
  