/* Copyright (c) Microsoft Corporation. All rights reserved. 
The content herein is strictly confidential and proprietary to Microsoft Corporation. No part of this content may be reproduced, stored, transmitted, disclosed or used in any form or by any means other than as expressly provided by the written Software License Agreement (SLA) between Microsoft Corporation and you (the licensee). 
*/

import { appUrl, cdnUrl } from '../Config';
import { Link } from "react-router-dom";

function Privacy() {
    // Return the privacy page
    return (
        <div>
            <header>
                <Link to="/">
                    <img src={`${cdnUrl}/favicon.ico`} alt="Alyocord" />
                </Link>
            </header>
            <main>
                <div className="container">
                    
                    <div className="row">
                        
                        <div className="col-12">
  
  <h1>Privacy Policy</h1>
  
  <p>
    <a href={appUrl}>Alyocord</a> is committed to protecting your privacy. This Privacy Policy describes how we collect, use, and share information about you when you visit or make a purchase from <a href={appUrl}>alyocord.com</a> (the “Site”).
  </p>
  
  <h2>What information do we collect?</h2>
  
  <p>
      We collect information from you when you register on our site, place an order, subscribe to our newsletter, respond to a survey or fill out a form.
  </p>
  
  <p>
      When ordering or registering on our site, as appropriate, you may be asked to enter your name, email address, mailing address, phone number or credit card information. You may, however, visit our site anonymously.
  </p>
  
  <h2>How do we use your information?</h2>
  
  <p>
      We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways:
  </p>
  
  <ul>
      
      <li>
          To personalize your experience and to allow us to deliver the type of content and product offerings in which you are most interested.
      </li>
      
      <li>
          To improve our website in order to better serve you.
      </li>
      
      <li>
          To allow us to better service you in responding to your customer service requests.
      </li>
      
      <li>
          To quickly process your transactions.
      </li>
      
      <li>
          To send periodic emails regarding your order or other products and services.
      </li>
  </ul>
  
  <h2>How do we protect visitor information?</h2>
  
  <p>
      Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible.
  </p>
  
  <p>
      We use regular Malware Scanning.
  </p>
  
  <p>
      Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.
  </p>
  
  <p>
      We implement a variety of security measures when a user places an order enters, submits, or accesses their information to maintain the safety of your personal information.
  </p>
  
  <p>
      All transactions are processed through a gateway provider and are not stored or processed on our servers.
  </p>
  
  <h2>Do we use 'cookies'?</h2>
  
  <p>
      Yes. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your Web browser (if you allow) that enables the site's or service provider's systems to recognize your browser and capture and remember certain information. For instance, we use cookies to help us remember and process the items in your shopping cart. They are also used to help us understand your preferences based on previous or current site activity, which enables us to provide you with improved services. We also use cookies to help us compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.
  </p>
  
  <p>
      We use cookies to:
  </p>
  
  <ul>
      
      <li>
          Help remember and process the items in the shopping cart.
      </li>
      
      <li>
          Understand and save user's preferences for future visits.
      </li>
      
      <li>
          Compile aggregate data about site traffic and site interactions in order to offer better site experiences and tools in the future. We may also use trusted third-party services that track this information on our behalf.
      </li>
  </ul>
  
  <p>
      You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. You do this through your browser settings. Since browser is a little different, look at your browser's Help Menu to learn the correct way to modify your cookies.
  </p>
  
  <p>
      If you turn cookies off, Some of the features that make your site experience more efficient may not function properly.Some of the features that make your site experience more efficient and may not function properly.
  </p>
  
  <h2>Third-party disclosure</h2>
  
  <p>
      We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information.
  </p>
  
  <h2>Third-party links</h2>
  
  <p>
      Occasionally, at our discretion, we may include or offer third-party products or services on our website. These third-party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites. Nonetheless, we seek to protect the integrity of our site and welcome any feedback about these sites.
  </p>
    
</div> </div> </div></main> </div> );
} 

export default Privacy;