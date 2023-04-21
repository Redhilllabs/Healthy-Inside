import React from "react";
import "./footer.css";
const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer_container">
        <div>
        <i><h1>
Healthy Inside
</h1> </i>
        </div>

          <div className="ror_footer">

                <h3>Social Links</h3>
                <div>
                <img src="https://img.icons8.com/ios-glyphs/30/null/facebook.png" />
                <img src="https://img.icons8.com/ios-glyphs/30/null/instagram-new.png" />
                <img src="https://img.icons8.com/ios-glyphs/30/null/twitter--v1.png" />
                </div>
                
              </div>
              
              <div>
              <hr className="footerline"/>
 <h3>© Copyright 2023 Red Hill Labs. All rights reserved.</h3>
              </div>



        </div>

      </footer>
    </>
  );
};

export default Footer;
