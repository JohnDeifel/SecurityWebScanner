{
  // Data variables (mostly for Backend)
  var timeAccessed;
  var pageTitle;
  var pageURL;
  var userIP;
  var userLocation;
  var userCountry;

  // Security variables (for report)
  var https = "";
  var shortened = "";
  var at = "";
  var extension = "";
  var dash = "";

  var rating = 5; // out of 5 stars
  
  function fetchData() {
    let event = new Date();
    timeAccessed = event.toString();
    pageTitle = document.title;
    pageURL = window.location.href;
  };

  // Helper function for fetchIPData()
  // Author: Na'im
  /* function json(url) {
    return fetch(url).then(res => res.json());
  }; */

  // Co-authors: Na'im, Lucas
  /* function fetchIPData() {
    let apiKey = 'ccaa3a53c5c11195be3f0f03e7ab1d13180c05bc1d50086ee8fd50b8';
    json(`https://api.ipdata.co?api-key=${apiKey}`).then(data => {
    userIP = data.ip; // CURRENTLY NOT WORKING
    userLocation = data.city; // CURRENTLY NOT WORKING
    userCountry = data.country_code; // CURRENTLY NOT WORKING
    });
  }; */
  
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
  // Author: Na'im (and Lucas for rating/report)
  function isNotHttps() {
    if(window.location.protocol !== 'https:'){
      rating -= 1;
      https = "- This URL does not follow HTTPS protocol. HTTPS guarantees a secure connection.\n";
    }
  };
  
  // Lower rating by 1 if URL is treated by a link shortener
  // Author: Kate (?) (and Lucas for rating/report)
  function isShortened() {
    pageURL = window.location.href;
    if ((pageURL.includes('bit.ly')) || (pageURL.includes('tinyurl'))){
      rating -= 1;
      shortened = "- This URL was treated by a link shortener, possibly to hide the true URL.\n";
    }
  };

  // Lower rating by 1 if URL contains @ symbol (common phishing tactic)
  // Author: Lucas
  function hasAt() {
    pageURL = window.location.href;
    if (pageURL.includes('@')){
      rating -= 1;
      at = "- This URL contains an @ symbol. It could be trying to redirect you somewhere else.\n";
    }
  };

  // Lower rating by 1 if URL extension is deemed unsafe
  // Author: Kate (and Lucas for rating/report)
  function unsafeExtension() {
    pageURL = window.location.href;
    // based off an article on the most unsafe domain extensions (article link?)
    if ((pageURL.includes('.cf')) || (pageURL.includes('.work'))|| (pageURL.includes('.ml')) || (pageURL.includes('.ga'))|| (pageURL.includes('.gq')) || (pageURL.includes('.fit')) || (pageURL.includes('.tk'))){
      rating -= 1;
      extension = "- Unsafe URL extension: this page is being hosted in a location associated with unsafe websites.\n";
    }
  }

  // Lower rating by 0.25 if URL contains - symbol (not always unsafe, hence the lower value)
  // Author: Lucas
  function hasDash() {
    pageURL = window.location.href;
    if (pageURL.includes('-')){
      rating -= 0.25;
      dash = "- This URL contains a - symbol. That could indicate a malicious link.\n";
    }
  }
  
  // Refresh the data when a new link is accessed
  window.onload = function() {
    safe = true;
    window.onload = null;
    fetchData();
    // fetchIPData();
    isNotHttps();
    isShortened();
    hasAt();
    unsafeExtension();
    hasDash();
    if (rating < 0){
      rating = 0;
    }
    if (rating <= 4){
      // Show user the rating, security report, and prompt them to go back
      if(window.confirm("This page could be unsafe; its HawkPhish Security Rating is " + rating + " stars.\n\nThis page's vulnerabilities are: (SCROLL DOWN IF NEEDED)\n" + https + shortened + at + extension + dash + "\nWe recommend you press Cancel to return to the previous page now. If you wish to proceed at your own risk, press OK.") == false){
        history.back();
      }
    }
    else {
      window.alert("This page is secure; its HawkPhish Security Rating is " + rating + " stars.");
    }
    // WE HAVE TO TRANSFER THE BELOW CODE INSIDE THE RATING IF STATEMENT, OTHERWISE IT WON'T RUN BEFORE THE ALERT
    const dataArray = {
      eventTime: timeAccessed,
      domainTitle: pageTitle,
      domainURL: pageURL,
      // IPAddress: userIP, // CURRENTLY NOT WORKING
      // location: userLocation, // CURRENTLY NOT WORKING
      // country: userCountry, // CURRENTLY NOT WORKING
      domainRating: rating
    };
    
    // console.log(makeJSON(dataArray)); // (for testing)
  };
  
}
  