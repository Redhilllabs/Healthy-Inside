import React from "react";
import "./footer.css";
const Footer = () => {
  return (
    <div>
      <footer class="footer">
        <div className="footer_container">
          <div className="ror_footer">
            <div className="col_option">
              
                <ul>
                  <li>Our Product</li>
                  <li>Meal Kits</li>
                  <li>Prepared Meals</li>
                  <li>Less prep</li>
                  <li>Why Plants</li>
                  <li>All Recipes</li>
                </ul>
                <ul>
                  <li>Help</li>
                  <li>Pricing</li>
                  <li>Recycle</li>
                  <li>Extra's</li>
                  <li>FAQ's</li>
                  <li>CONTACT US</li>
                </ul>
                <ul>
                  <li>Connect</li>
                  <li>Blog</li>
                  <li>Partnerships</li>
                  <li>Affiliate Program</li>
                  <li>Carriers</li>
                </ul>
             
            </div>
            <div className="connect_option">
              <div>
                <h4>Follow us at :</h4>
                <div className="optionsfollow">
                  <img src="https://img.icons8.com/ios-glyphs/30/null/facebook.png" />
                  <img src="https://img.icons8.com/ios-glyphs/30/null/instagram-new.png" />
                  <img src="https://img.icons8.com/ios-glyphs/30/null/twitter--v1.png" />
                </div>
              </div>
              <div className="connectform"></div>
            </div>
          </div>
        </div>
        <div class="col">
          <p>© Copyright 2023 Red Hill Labs. All rights reserved.</p>
          <div>
            <a href="/terms">Terms &amp; Conditions</a> |
            <a href="/privacy">Privacy Policy</a> |
            <a href="/california_privacy">California Privacy Policy</a> |
            <a href="/do_not_sell">Do Not Sell My Info</a> |
            <a href="/accessibility">Accessibility Statement</a> |
            <a href="/sitemap">Site Map</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
