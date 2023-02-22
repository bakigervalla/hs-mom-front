import React from "react";
import "../../screens/Dashboard/flatsome.css";
import { AiOutlineTwitter } from "react-icons/ai";
import { ImLinkedin2, ImFacebook } from "react-icons/im";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();

  return (
    <>
      <footer id="footer" className="footer-wrapper">
        <div
          id="gap-1407270656"
          className="gap-element clearfix"
          style={{ display: "block", height: "auto" }}
        ></div>

        <section className="section footer_main_wrapper" id="section_546714730">
          <div className="bg section-bg fill bg-fill bg-loaded"></div>

          <div className="section-content relative">
            <div
              id="gap-331991738"
              className="gap-element clearfix"
              style={{ display: "block", height: "auto" }}
            ></div>

            <div className="row row-large footer_main_row" id="row-1245459263">
              <div
                id="col-681760537"
                className="col footer_left medium-3 small-12 large-3"
              >
                <div className="col-inner dark">
                  <img
                    src="https://marketing.homesourcing.co/wp-content/uploads/2022/10/HomeSourcing-WHITE@2x.png"
                    className="brand_name_title_top"
                    alt="homesourcing"
                  />
                  <h1 className="footer_section_title">Top Links</h1>
                  <ul className="footer_links_section_menu">
                    <li>
                      <a href="/#">Company</a>
                    </li>
                    <li>
                    <button
                      type="button"
                      className="outline-none focus:outline-none ease-linear transition-all duration-150"
                      onClick={() => navigate("/subscription")}
                      >Pricing</button>
                    </li>
                    <li>
                      <a href="/#">Membership</a>
                    </li>
                  </ul>
                  <img
                    src="https://marketing.homesourcing.co/wp-content/uploads/2022/10/HomeSourcing-WHITE@2x.png"
                    className="brand_name_title"
                    alt="homesourcing"
                  />
                </div>
              </div>

              <div id="col-596779201" className="col medium-4 large-4">
                <div className="col-inner dark">
                  <h1 className="footer_section_title">FAQ</h1>
                  <ul className="footer_faq_list">
                    <li>
                      <details>
                        <summary className="faq_title">
                          How to Buy package?
                        </summary>
                        <span style={{ color: "#8D8D8D" }}>
                          Lorem ipsum dolor sit amet, consectetuer adipiscing
                          elit, sed diam nonummy nibh euismod tincidunt ut
                          laoreet dolore magna aliquam erat volutpat
                        </span>
                      </details>
                    </li>
                    <li>
                      <details>
                        <summary className="faq_title">
                          How many payment methods?
                        </summary>
                        <span style={{ color: "#8D8D8D" }}>
                          Lorem ipsum dolor sit amet, consectetuer adipiscing
                          elit, sed diam nonummy nibh euismod tincidunt ut
                          laoreet dolore magna aliquam erat volutpat
                        </span>
                      </details>
                    </li>
                    <li>
                      <details>
                        <summary className="faq_title">
                          What is today's event?
                        </summary>
                        <span style={{ color: "#8D8D8D" }}>
                          Lorem ipsum dolor sit amet, consectetuer adipiscing
                          elit, sed diam nonummy nibh euismod tincidunt ut
                          laoreet dolore magna aliquam erat volutpat
                        </span>
                      </details>
                    </li>
                  </ul>
                </div>
              </div>

              <div
                id="col-1879431482"
                className="col medium-5 small-12 large-5"
              >
                <div className="col-inner dark">
                  <h1 className="footer_section_title">Contact</h1>
                  <ul className="footer_links_section_menu">
                    <li>
                      <a href="mailto:connect@homesourcing.no">
                        For Sales Enquiry: <br />
                        <span className="contact_text">
                          connect@homesourcing.no<span></span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="mailto:marketing@homesourcing.no">
                        For Marketing/PR Enquiry:
                        <br />
                        <span className="contact_text">
                          marketing@homesourcing.no<span></span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href='tel:7669629222"'>
                        Call Us:
                        <br />
                        <span className="contact_text">
                          7669629222<span></span>
                        </span>
                      </a>
                    </li>

                    <li>
                      <a href='https://goo.gl/maps/929MBDgsn1HbS9UD7"'>
                        Head office Address:
                        <br />
                        <span className="contact_text">
                          B1/638 A, 3rd Floor, Janakpuri, New York- 110058
                          <span></span>
                        </span>
                      </a>
                    </li>

                    <li>
                      <a
                        href="https://goo.gl/maps/929MBDgsn1HbS9UD7"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Branch Office:
                        <br />
                        <span className="contact_text">
                          Plot 23, Sector 18 New York, Industrial Development
                          Area,<span></span>
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="row" id="row-577185903">
          <div id="col-1128653535" className="col medium-4 small-12 large-4">
            <div className="col-inner">
              <script
                src="https://kit.fontawesome.com/6d92b53792.js"
                crossOrigin="anonymous"
              ></script>
              <p
                className="copy_text"
                style={{ marginBottom: "0px !important" }}
              >
                © Learn. 2022. All Rights Reserved
              </p>
            </div>
          </div>

          <div
            id="col-1264183512"
            className="col footer_social medium-4 small-12 large-4"
          >
            <div className="col-inner">
              <a href="https://twitter.com" style={{ marginRight: "2%" }}>
                <span style={{ marginBottom: "0px !important" }}>
                  <i className="fa" aria-hidden="true">
                    <AiOutlineTwitter
                      size={24}
                      style={{ marginBottom: "8px" }}
                    />
                  </i>
                </span>
              </a>
              <a href="https://www.linkedin.com" style={{ marginRight: "2%" }}>
                <span style={{ marginBottom: "0px !important" }}>
                  &nbsp;
                  <i className="fa fa-linkedin" aria-hidden="true">
                    <ImLinkedin2 size={20} />
                  </i>
                </span>
              </a>
              <a href="https://www.facebook.com/">
                <span style={{ marginBottom: "0px !important" }}>
                  &nbsp;
                  <i className="fa fa-facebook" aria-hidden="true">
                    <ImFacebook size={20} />
                  </i>
                </span>
              </a>
            </div>
          </div>

          <div id="col-1108876911" className="col medium-4 small-12 large-4">
            <div className="col-inner">
              <div
                className="rashed"
                style={{ marginBottom: "0px !important" }}
              ></div>
            </div>
          </div>
        </div>

        <a
          href="#top"
          className="back-to-top button icon invert plain fixed bottom z-1 is-outline hide-for-medium circle"
          id="top-link"
          aria-label="Go to top"
        >
          <i className="icon-angle-up"></i>
        </a>
      </footer>
    </>
  );
};
