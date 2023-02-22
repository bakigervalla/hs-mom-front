import React from "react";
import "../../screens/Dashboard/flatsome.css";
import Logo from "./logo/logo";
import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { LoginButton } from "./loginButton/loginButton";
import { SignupButton } from "./signupButton/signupButton";

export const Header = () => {
  return (
    <>
      <div className="main_nav mfp-bg off-canvas off-canvas-left main-menu-overlay mfp-ready"></div>
      <div
        className="main_nav mfp-wrap mfp-auto-cursor off-canvas off-canvas-left mfp-ready"
        tabIndex="-1"
        style={{ overflow: "hidden auto !important" }}
      >
        <div className="mfp-container mfp-s-ready mfp-inline-holder">
          <div className="mfp-content">
            <div id="main-menu" className="mobile-sidebar no-scrollbar">
              <div className="sidebar-menu no-scrollbar ">
                <ul
                  className="nav nav-sidebar nav-vertical nav-uppercase"
                  data-tab="1"
                >
                  <li className="header-search-form search-form html relative has-icon">
                    <div className="header-search-form-wrapper">
                      <div className="searchform-wrapper ux-search-box relative is-normal">
                        <form
                          method="get"
                          className="searchform"
                          action="https://marketing.homesourcing.co/"
                          role="search"
                        >
                          <div className="flex-row relative">
                            <div className="flex-col flex-grow">
                              <input
                                type="search"
                                className="search-field mb-0"
                                name="s"
                                id="s"
                                placeholder="Search…"
                                autoComplete="off"
                              />
                            </div>
                            <div className="flex-col">
                              <button
                                type="submit"
                                className="ux-search-submit submit-button secondary button icon mb-0"
                                aria-label="Submit"
                              >
                                <AiOutlineSearch size={20} />
                              </button>
                            </div>
                          </div>
                          <div className="live-search-results text-left z-top">
                            <div
                              className="autocomplete-suggestions"
                              style={{
                                position: "absolute",
                                display: "none",
                                maxHeight: "300px",
                                zIndex: "9999",
                              }}
                            ></div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </li>
                  <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-21">
                    <a href="/#">Product</a>
                  </li>
                  <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-22">
                    <a href="/#row-488577630">Company</a>
                  </li>
                  <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-23">
                    <a href="/#row-601500057">Pricing</a>
                  </li>
                  <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-24">
                    <a href="/#">Docs</a>
                  </li>
                  <li className="html header-button-1">
                    <LoginButton />
                  </li>

                  <li className="html header-button-2">
                    <SignupButton />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mfp-preloader">Loading...</div>
        </div>
        <div className="mfp-close close-nav">
          <a href="#main_nav" id="access_nav">
            <AiOutlineClose size={24} />
          </a>
        </div>
      </div>
      <header id="header" className="container header has-sticky sticky-jump">
        <div className="header-wrapper">
          <div id="masthead" className="header-main ">
            <div
              className="header-inner flex-row logo-left medium-logo-center"
              role="navigation"
            >
              <Logo />
              <div className="flex-col show-for-medium flex-left">
                <ul className="mobile-nav nav nav-left ">
                  <li className="nav-icon has-icon">
                    <a
                      href="/#"
                      data-open="#main-menu"
                      data-pos="left"
                      data-bg="main-menu-overlay"
                      data-color=""
                      className="is-small"
                      aria-label="Menu"
                      aria-controls="main-menu"
                      aria-expanded="false"
                    >
                      <i>
                        <AiOutlineMenu size={24} />
                      </i>
                    </a>
                  </li>
                </ul>
              </div>
              {/* TODO: create nav bar component seperatly */}
              <div className="flex-col hide-for-medium flex-left flex-grow">
                <ul className="header-nav header-nav-main nav nav-left  nav-size-xlarge nav-spacing-xlarge">
                  <li
                    id="menu-item-21"
                    className="menu-item menu-item-type-custom menu-item-object-custom menu-item-21 menu-item-design-default"
                  >
                    <a href="/#" className="nav-top-link">
                      Product
                    </a>
                  </li>
                  <li
                    id="menu-item-22"
                    className="menu-item menu-item-type-custom menu-item-object-custom menu-item-22 menu-item-design-default"
                  >
                    <a href="/#row-488577630" className="nav-top-link">
                      Company
                    </a>
                  </li>
                  <li
                    id="menu-item-23"
                    className="menu-item menu-item-type-custom menu-item-object-custom menu-item-23 menu-item-design-default"
                  >
                    <a href="#row-601500057" className="nav-top-link">
                      Pricing
                    </a>
                  </li>
                  <li
                    id="menu-item-24"
                    className="menu-item menu-item-type-custom menu-item-object-custom menu-item-24 menu-item-design-default"
                  >
                    <a href="/#" className="nav-top-link">
                      Docs
                    </a>
                  </li>
                </ul>
              </div>

              <div className="flex-col hide-for-medium flex-right">
                <ul className="header-nav header-nav-main nav nav-right  nav-size-xlarge nav-spacing-xlarge">
                  <li className="html header-button-1">
                    <LoginButton />
                  </li>

                  <li className="html header-button-2">
                    <SignupButton />
                  </li>
                </ul>
              </div>

              <div className="flex-col show-for-medium flex-right">
                <ul className="mobile-nav nav nav-right "></ul>
              </div>
            </div>

            <div className="">
              <div className="top-divider full-width"></div>
            </div>
          </div>
          <div className="header-bg-container fill">
            <div className="header-bg-image fill"></div>
            <div className="header-bg-color fill"></div>
          </div>
        </div>
      </header>
    </>
  );
};
