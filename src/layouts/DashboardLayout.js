import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import {
  Header,
  SidebarNav,
  Footer,
  PageContent,
  Avatar,
  Chat,
  PageAlert,
  Page,
} from "../vibe";
import Logo from "../assets/images/vibe-logo.svg";
import avatar1 from "../assets/images/avatar1.png";
import nav from "../_nav";
import routes from "../views";
import ContextProviders from "../vibe/components/utilities/ContextProviders";
import handleKeyAccessibility, {
  handleClickAccessibility,
} from "../vibe/helpers/handleTabAccessibility";

import { useAuthentication } from "../Authentication";

import { renderToStaticMarkup } from "react-dom/server";
import { withLocalize, Translate } from "react-localize-redux";
import globalTranslations_en from "./translations/global_en.json";
import globalTranslations_tr from "./translations/global_tr.json";

const MOBILE_SIZE = 992;

export function DashboardLayout(props) {
  // props.initialize({
  //   languages: [
  //     { name: "English", code: "en" },
  //     { name: "Turkish", code: "tr" },
  //   ],
  //   options: { renderToStaticMarkup },
  //   defaultLanguage: "en",
  // });
  const  { logout, user } = useAuthentication();

  props.addTranslationForLanguage(globalTranslations_en, "en");
  props.addTranslationForLanguage(globalTranslations_tr, "tr");

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showChat1, setShowChat1] = useState(true);

  function onLanguageChange(lang) {
    let selectedLang = lang.target.getAttribute("lang");
    props.setActiveLanguage(selectedLang);
  }

  function handleResize() {
    if (window.innerWidth <= MOBILE_SIZE) {
      setSidebarCollapsed(false);
    }
  }

  useEffect(() => {
    props.initialize({
      languages: [
        { name: "English", code: "en" },
        { name: "Turkish", code: "tr" },
      ],
      options: { renderToStaticMarkup },
      defaultLanguage: "en",
    });
    window.addEventListener("resize", handleResize);
    document.addEventListener("keydown", handleKeyAccessibility);
    document.addEventListener("click", handleClickAccessibility);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function toggleSideCollapse() {
    setSidebarCollapsed((prevState) => !prevState);
  }

  function closeChat() {
    setShowChat1(false);
  }

  const sidebarCollapsedClass = sidebarCollapsed ? "side-menu-collapsed" : "";

  return (
    <ContextProviders>
      <div className={`app ${sidebarCollapsedClass}`}>
        <PageAlert />
        <div className="app-body">
          <SidebarNav
            nav={nav}
            logo={Logo}
            logoText="bofigo"
            isSidebarCollapsed={sidebarCollapsed}
            toggleSidebar={toggleSideCollapse}
            {...props}
          />
          <Page>
            <Header
              toggleSidebar={toggleSideCollapse}
              isSidebarCollapsed={sidebarCollapsed}
              routes={routes}
              {...props}
            >
              <React.Fragment>

                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    <Avatar size="small" color="blue" initials={user.username} />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Profile</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Logout</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </React.Fragment>
            </Header>
            <PageContent>
              <Switch>
                {routes.map((page, key) => (
                  <Route
                    path={page.path}
                    component={page.component}
                    key={key}
                  />
                ))}
                <Redirect from="/" to="/home" />
              </Switch>
            </PageContent>
          </Page>
        </div>
        <Footer>
          <span>Copyright ©bofigo. All rights reserved.</span>
          <span>
            <a href="#!">Terms</a> | <a href="#!">Privacy Policy</a>
          </span>
          <span className="ml-auto hidden-xs">
            Made with{" "}
            <span role="img" aria-label="taco">
              🌮
            </span>
          </span>
        </Footer>
        <Chat.Container>
          {showChat1 && (
            <Chat.ChatBox
              name="Messages"
              status="online"
              image={avatar1}
              close={closeChat}
            />
          )}
        </Chat.Container>
      </div>
    </ContextProviders>
  );
}

export default withLocalize(DashboardLayout);
