# <a title='CPA - Compass Portal Test Cases Automation Framework'>Compass Portal Test Cases Automation - (CPA)</a>

## Description
Compass Portal Web Application Test Cases Automation Framework - POC (proof-of-concept)

## Purpose
Demostrate proof-of-concept of the Compass Portal internal web application test cases automation framework

## Technologies
Java 9, Maven, Selenium WebDriver, Gson, TestNG, JavaMail, ChromeDriver, IExplorerDriver

## Tools
Eclipse IDE (Oxygen - R2)

## Test Cases
Test cases may be executed in either verbose or silent mode. 
Verbose mode displays browser during test execution while silent mode hides the browser - 
effectively running the browser in the background. Silent mode has the added advantage of
increasing test case excution performance and allowing multi-tasking, e.g., allowing the user
to do other things on the same system the test is being executed on.
<ul>
  <li><b>Basic</b>
    <ul>
      <li>TestLaunchBrowser</li>
      <li>TestLaunchAUT</li>
      <li>TestLogInUser</li>
      <li>TestLogOutUser</li>
      <li>TestExitBrowser</li>
    </ul>
  </li>
  <li><b>General</b>
    <ul>
      <li>TestLogInOutUser</li>
      <li>TestLogInOutUsers</li>
    </ul>
  </li>
</ul>

