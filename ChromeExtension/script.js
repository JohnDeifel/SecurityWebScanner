{
  // Data variables
  var timeAccessed;
  var pageTitle;
  var pageURL;

  // Security variables (for report)
  var httpsString = "";
  var shortString = "";
  var atString = "";
  var extensionString = "";
  var httpsUnsafe = false;
  var shortUnsafe = false;
  var atUnsafe = false;
  var extensionUnsafe = false;

  var rating = 5; // out of 5 stars
  var warningMessage = "";
  
  function fetchData() {
    let event = new Date();
    timeAccessed = event.toString();
    pageTitle = document.title;
    pageURL = window.location.href;
  };
  
  // For end-to-end
  function makeJSON(data) {
    return JSON.stringify(data, null, 2);
  };

  // SECURITY CHECKS

  // Lower rating by 1.5 if URL is not https
  // Author: Na'im (and Lucas for rating/report)
  function isNotHttps() {
    if(window.location.protocol !== 'https:'){
      rating -= 1.5;
      httpsUnsafe = true;
      httpsString = "- This URL does not follow HTTPS protocol. HTTPS guarantees a secure connection.\n";
    }
  };
  
  /* Lower rating by 1 if URL is treated by a link shortener
   Author: Kate (?) (and Lucas for rating/report)
   Optimization by Rodney*/
  function isShortened() {
    pageURL = window.location.href;
    const shortFlags = ['bit.ly', 'tinyurl']; //I sense an "or" chain in the future, let's prevent that
    for (i in shortFlags){
      if(pageURL.includes(shortFlags[i])){
        rating -= 1;
        shortUnsafe = true;
        shortString = "- This URL was treated by a link shortener, possibly to hide the true URL.\n";
        break;
      }
    }
    /*if ((pageURL.includes('bit.ly')) || (pageURL.includes('tinyurl'))){
      rating -= 1;
      shortUnsafe = true;
      shortString = "- This URL was treated by a link shortener, possibly to hide the true URL.\n";
    }*/
  };

  // Lower rating by 2.5 if URL contains @ symbol (common phishing tactic)
  // Author: Lucas
  function hasAt() {
    pageURL = window.location.href;
    if (pageURL.includes('@')){
      rating -= 2.5;
      atUnsafe = true;
      atString = "- This URL contains an @ symbol. It could be trying to redirect you somewhere else.\n";
    }
  };

  /*Lower rating by 2 if TLD (domain extension) is deemed unsafe
  Co-authors: Kate and Lucas
  Optimization by Rodney*/
  function unsafeExtension() {
    pageURL = window.location.href;
    const exFlags = ['.cf', '.work', '.ml', '.ga', '.gq', '.fit', '.tk', '.ru', '.to', '.live', '.cn', '.top', '.xyz', '.pw', '.ws', '.cc', '.buzz']; //no more ugly "or" chain
    for (i in exFlags){
      if (pageURL.includes(exFlags[i])){
        rating -=2;
        extensionUnsafe = true;
        extensionString = "- Unsafe top-level domain: this page is being hosted in a domain commonly associated with unsafe websites.\n";
        break;
      }
    }
    /*if ((pageURL.includes('.cf')) || (pageURL.includes('.work'))|| (pageURL.includes('.ml')) || (pageURL.includes('.ga'))|| (pageURL.includes('.gq')) || (pageURL.includes('.fit')) || (pageURL.includes('.tk')) || (pageURL.includes('.ru')) || (pageURL.includes('.to')) || (pageURL.includes('.live')) || (pageURL.includes('.cn')) || (pageURL.includes('.top')) || (pageURL.includes('.xyz')) || (pageURL.includes('.pw')) || (pageURL.includes('.ws')) || (pageURL.includes('.cc')) || (pageURL.includes('.buzz'))){
      rating -= 2;
      extensionUnsafe = true;
      extensionString = "- Unsafe top-level domain: this page is being hosted in a domain commonly associated with unsafe websites.\n";
    }*/
  }
  /*
  Dermine a message to display depending on the rating, to tell the user if you should bail immeaditely or proceed at their own risk
  Author: Rodney
  */
  function severityMessage(score){
    if(score <= 3 && score >= 2){
      warningMessage = "This page has failed some of our security checks, You can continue, but we advise against inputting personal information into this site.";
    }
    else if(score < 2 && score >= 1){
      warningMessage = "This page has failed a LOT of our security checks. We advise against continuing, but continue if you absolutely have to.";
    }
    else if(score < 1){
      warningMessage =  "TOO MANY RED FLAGS, HIT THAT CANCEL BUTTON RIGHT NOW!!!";
    }
    else{
      warningMessage = "No action should be taken :D"; //This shouldn't appear because this is above the popup threshold
    }
  }
  
  // Main function, on page load
  window.onload = function() {
    safe = true;
    window.onload = null;

    // Run security checks
    isNotHttps();
    isShortened();
    hasAt();
    unsafeExtension();
    severityMessage(rating);
    //Don't need to check if rating is < 0, Math.max takes care of that
    if (rating <= 3.5){
      // Get the data for backend
      fetchData();
      const dataArray = {
        eventTime: timeAccessed,
        domainTitle: pageTitle,
        domainURL: pageURL,
        domainRating: rating,
        reasonNoHttps: httpsUnsafe,
        reasonShortened: shortUnsafe,
        reasonAtSymbol: atUnsafe,
        reasonBadExtension: extensionUnsafe
      };
      console.log(makeJSON(dataArray));
      // Show user the rating, security report, and prompt them to go back
      if(window.confirm("                            -HAWKPHISH SECURITY REPORT-\nThis page could be unsafe; its HawkPhish Security Rating is " + Math.max(0, rating) + "/5 stars.\n\nHawkPhish has detected: (SCROLL DOWN IF NEEDED)\n" + atString + extensionString + httpsString + shortString + "\n" + warningMessage) == false){
        history.back();
      }
    }
    /* else {
      window.alert("This page is secure; its HawkPhish Security Rating is " + rating + " stars.");
    } */
  };
  
}
  