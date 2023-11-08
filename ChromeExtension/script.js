{
  // var domain;
  // var location; (we're not getting these anymore, right?)
  var timeAccessed;
  var pageTitle;
  var pageURL;
  var rating = 5; // out of 5 stars
  
  function fetchData() {
    let event = new Date();
    timeAccessed = event.toString();
    pageTitle = document.title;
    pageURL = window.location.href;
  };

  function json(url) {
    return fetch(url).then(res => res.json());
  }
  
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
  
  // Lower rating by 1 if URL is not https
  function isNotHttps() {
    if(window.location.protocol !== 'https:'){
      rating -= 1;
    }
  };
  
  // Lower rating by 1 if URL is treated by a link shortener
  function isShortened() {
    pageURL = window.location.href;
    if ((pageURL.includes('bit.ly')) || (pageURL.includes('tinyurl'))){
      rating -= 1;
    }
  };

  // Lower rating by 1 if URL includes @ symbol (common phishing tactic)
  function hasAt() {
    pageURL = window.location.href;
    if (pageURL.includes('@')){
      rating -= 1;
    }
  };

  // TODO: Fetch the user's IP address, fetch the user's location
  // Lucas: Do we need to, at this point? I'd say no
  
  // Refresh the data when a new link is accessed
  window.onload = function() {
    let apiKey = 'ccaa3a53c5c11195be3f0f03e7ab1d13180c05bc1d50086ee8fd50b8';
    json(`https://api.ipdata.co?api-key=${apiKey}`).then(data => {
    console.log(data.ip);
    console.log(data.city);
    console.log(data.country_code);
    });

    safe = true; // so what exactly is this?
    window.onload = null;
    fetchData();
    isNotHttps();
    isShortened();
    hasAt();
    if (rating < 0){
      rating = 0;
    }
    if (rating <= 4){
      window.alert("This page could be unsafe; its HawkPhish Security Rating is " + rating + " stars. Proceed at your own risk, further details can be found by clicking on your HawkPhish extension.");
    }
    else {
      window.alert("This page is secure; its HawkPhish Security Rating is " + rating + " stars.");
    }
    const dataArray = {
      eventTime: timeAccessed,
      domainTitle: pageTitle,
      domainURL: pageURL,
      // domainSecure: isNotHttps(),
      // domainLinks: getLinks(), -- we probably don't need these two anymore
      domainRating: rating
    }
    
    // console.log(makeJSON(dataArray))
    // add condition to only makeJSON if rating is below acceptable
    // makeJSON(dataArray)
  };
  
}
  