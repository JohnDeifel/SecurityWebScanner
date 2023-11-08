# SecurityWebScanner

## Description:
The Security Web Scanner is a Google Chrome extension that will help keep its users' web surfing safe from malicious and phishing websites. Everytime the user is about to enter a website, the extension will first run through the website using its algorithms to scrape the links in the website looking for dangerous links. Using the information found the functions will determine a security score from 1-5. If its cybersecurity score is too low, then it will block the user from entering that website. It will instead redirect the user to a different page that lists the security risks the website poses and displays the score allocated by the program. Users will still have the choice to continue to the website if they choose to.

What separates the Security Web Scanner from other web scanners is that it will give a star rating based on how the algorithms measured the website's safety. Users can click on the extension at any time while on the website to review the star rating. Websites with low star ratings will automatically be blocked.

## How to Use:
Simply install it into a Google Chrome browser as an extension. In its current state, developer mode will need to be enabled

## User Data:
Users have the right to know what data will be recorded from them. Whenever a malicious website is caught due to a low star rating, that website will be stored in the extension's data base as well as various other information such as:
- Website Name
- IP Address
- Domain
- TimeStamp
- Location accessed
- Security Rating

## Star Rating:
There will be a variety of certain points of interest that will weigh that website's star rating such as:
- Website Hosting Location
- Valid Certificate (?)
- URL features
    * Treated by a link shortener
    * @ symbol found in URL
    * Adding Prefix or Suffix Separated by (-) to the Domain
