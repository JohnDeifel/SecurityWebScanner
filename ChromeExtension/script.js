{
  // Data variables (mostly for Backend)
  var timeAccessed;
  var pageTitle;
  var pageURL;
  var userIP;
  var userLocation;
  var userCountry;
  var rating = 5; // out of 5 stars
  
  function fetchData() {
    let event = new Date();
    timeAccessed = event.toString();
    pageTitle = document.title;
    pageURL = window.location.href;
  };

  // Helper function for fetchIPData()
  // Author: Na'im
   function json(url) {
    return fetch(url).then(res => res.json());
  }; 

  // Co-authors: Na'im, Lucas
  function fetchIPData() {
    const settings = {
      async: true,
      crossDomain: true,
      url: 'https://api.ipdata.co/v1/ip/',
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    };
    
    $.ajax(settings).done(function (response) {
      console.log(response.ip);
    });
    
  }; 
  
  function makeJSON(data) {
    return JSON.stringify(data, null, 2);
  };
  
  // Return the html of the page (unused)
  /* function getHTML() {
    pageHTML = document.documentElement.outerHTML;
    return pageHTML;
  }; */
  
  // Get all links on the page (unused)
  /* function getLinks() {
    var links = document.getElementsByTagName('a');
    var linksArray = [];
    for (var i = 0; i < links.length; i++) {
      linksArray.push(links[i].href);
    }
    return linksArray;
  }; */
  

  // SECURITY CHECKS

  // Lower rating by 1 if URL is not https
  // Author: Na'im (and Lucas for rating)
  function isNotHttps() {
    if(window.location.protocol !== 'https:'){
      rating -= 1;
    }
  };
  
  // Lower rating by 1 if URL is treated by a link shortener
  // Author: Kate (?) (and Lucas for rating)
  function isShortened() {
    pageURL = window.location.href;
    if ((pageURL.includes('bit.ly')) || (pageURL.includes('tinyurl'))){
      rating -= 1;
    }
  };

  // Lower rating by 1 if URL contains @ symbol (common phishing tactic)
  // Author: Lucas
  function hasAt() {
    pageURL = window.location.href;
    if (pageURL.includes('@')){
      rating -= 1;
    }
  };

  // Lower rating by 1 if URL extension is deemed unsafe
  // Author: Kate (and Lucas for rating)
  function unsafeExtension() {
    pageURL = window.location.href;
    // based off an article on the most unsafe domain extensions (article link?)
    if ((pageURL.includes('.cf')) || (pageURL.includes('.work'))|| (pageURL.includes('.ml')) || (pageURL.includes('.ga'))|| (pageURL.includes('.gq')) || (pageURL.includes('.fit')) || (pageURL.includes('.tk'))){
      rating -= 1;
    }
  }

  // Lower rating by 0.25 if URL contains - symbol (not always unsafe, hence the lower value)
  // Author: Lucas
  function hasDash() {
    pageURL = window.location.href;
    if (pageURL.includes('-')){
      rating -= 0.25;
    }
  }
  
  // Refresh the data when a new link is accessed
  window.onload = function() {
    safe = true;
    window.onload = null;
    fetchData();
    fetchIPData();
    isNotHttps();
    isShortened();
    hasAt();
    unsafeExtension();
    hasDash();
    if (rating < 0){
      rating = 0;
    }
    if (rating <= 3.5){
      window.alert("This page could be unsafe; its HawkPhish Security Rating is " + rating + " stars. Proceed at your own risk, further details can be found by clicking on your HawkPhish extension.");
    }
    else {
      window.alert("This page is secure; its HawkPhish Security Rating is " + rating + " stars.");
    }
    const dataArray = {
      eventTime: timeAccessed,
      domainTitle: pageTitle,
      domainURL: pageURL,
      IPAddress: userIP, // CURRENTLY NOT WORKING
      location: userLocation, // CURRENTLY NOT WORKING
      country: userCountry, // CURRENTLY NOT WORKING
      domainRating: rating
    };
    
    console.log(makeJSON(dataArray)); // (for testing)
  };
  
}
  