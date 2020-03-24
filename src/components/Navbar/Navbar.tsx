import React, { FC, useState, useEffect } from 'react';
import { Navbar as Navigation, Nav, Alert } from 'react-bootstrap';
import { Link, useLocation, useHistory } from 'react-router-dom';

import * as routes from 'src/constants/routes';
// import TransparentButton from 'src/components/Buttons/TransparentButton';
import EmergencyButton from 'src/components/Buttons/EmergencyButton';
import NavItem from './NavItem';

import i18n from '../../i18n';
import Contacts from 'src/routes/dashboard/contacts';
import LanguageSelectCommingSoon from './LanguageSelectCommingSoon';
// import { setCookie } from '../../utils/storage';

const Navbar: FC<{}> = () => {
  const location = useLocation();
  // const history = useHistory();
  const currentPath = location.pathname;
  // const [language, setLanguage] = useState(location.search.includes('ne') ? 'ne' : 'en');
  const interLang = i18n();
  const { navBar } = interLang;
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  useEffect(() => {
    const path = location.pathname.split('/');
    console.log(path);
  }, []);

  useEffect(() => {
    if (isSidebarVisible) {
      document.getElementsByTagName('body')[0].classList.add('modal-open');
    } else {
      document.getElementsByTagName('body')[0].classList.remove('modal-open');
    }
  }, [isSidebarVisible]);

  const toggleEmergencyContact = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // const languageTranslate = (lang: string) => {
  //   try {
  //     setCookie('googtrans', `/en/${lang}`);
  //     const googleTeCombo: any = document.getElementsByClassName('goog-te-combo')[0];
  //     googleTeCombo.value = lang;
  //     window.location.reload();
  //   } catch (e) {}
  // };

  // const setLanguagePath = (lang: string) => {
  //   setLanguage(lang);
  //   history.push(location.pathname + `?lang=${lang}`);
  //   languageTranslate(lang);
  // };

  // useEffect(() => {
  //   if (location.search.includes('ne')) {
  //     languageTranslate('ne');
  //   }
  // }, [language, location.search]);

  return (
    <React.Fragment>
      <div className="text-center bg-bluelight covid-alert">
        <a className="small" href="https://bit.ly/covidnepal_report_error_newinfo" target="blank">
          Help us keep data reliable! Report Errors, New Info and Verify Data
        </a>
      </div>

      <Navigation collapseOnSelect expand="lg" fixed="top" bg="dark" variant="dark">
        <Link to={routes.DASHBOARD}>
          <Navigation.Brand className="font-weight-bold">
            <span className="mr-2">COVID-19</span>
            <span>{navBar.Nepal}</span>
          </Navigation.Brand>
        </Link>

        {/* Temporary Langauge Select */}
        <LanguageSelectCommingSoon isMobile={true} />
        {/* language */}
        {/* <div className="lang mobile-flag">
          <label htmlFor="np-lang" className={language === 'ne' ? 'active' : ''}>
            <input
              type="radio"
              id="np-lang"
              onClick={() => setLanguagePath('ne')}
              name="lang-mobile"
              value="ne"
              checked={language === 'ne'}
            />
            <img src="/images/nepal.png" className="mx-1" /> {navBar.NEP}
          </label>

          <label htmlFor="en-lang" className={language === 'en' ? 'active' : ''}>
            <input
              type="radio"
              id="en-lang"
              onClick={() => setLanguagePath('en')}
              name="lang-mobile"
              value="en"
              checked={language === 'en'}
            />
            {navBar.ENG} <img src="/images/english.png" className="mx-1" />
          </label>
        </div> */}

        {/* emergency contact */}
        <EmergencyButton text={navBar.EmergencyContact} handleClick={toggleEmergencyContact} className="mob-view" />

        <Navigation.Toggle aria-controls="responsive-navbar-nav" />

        <Navigation.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">
            <NavItem title={'Home'} to={routes.DASHBOARD} active={routes.DASHBOARD === currentPath} />
            <NavItem title={'Symptoms'} to={routes.SYMPTOMS} active={routes.SYMPTOMS === currentPath} />
            <NavItem title={'Join Us'} exact={false} to={routes.JOIN_US} active={routes.JOIN_US === currentPath} />
            <NavItem title={'FAQ'} exact={false} to={routes.FAQ} active={routes.FAQ === currentPath} />
          </Nav>

          <Nav>
            <NavItem
              title={'Govt. Notices & Resources'}
              exact={false}
              to={routes.NOTICES}
              active={routes.NOTICES === currentPath}
              className="btn btn-outline-white btn-sm"
            />
            {/* <Link to={routes.NOTICES}>
              <TransparentButton
                text={'Govt. Notices & Resources'}
                handleClick={() => {}}
                active={routes.NOTICES === currentPath}
              />
            </Link> */}
            <EmergencyButton
              text={navBar.EmergencyContact}
              handleClick={toggleEmergencyContact}
              className="desktop-view"
            />
            {/* Temporary Langauge Select */}
            <LanguageSelectCommingSoon isMobile={false} />

            {/* language */}
            {/* <div className="lang menu-flag">
              <label htmlFor="np-lang" className={language === 'ne' ? 'active' : ''}>
                <input
                  type="radio"
                  id="np-lang"
                  onClick={() => setLanguagePath('ne')}
                  name="language"
                  value="ne"
                  checked={language === 'ne'}
                />
                <img src="/images/nepal.png" className="mx-1" /> {navBar.NEP}
              </label>

              <label htmlFor="en-lang" className={language === 'en' ? 'active' : ''}>
                <input
                  type="radio"
                  id="en-lang"
                  onClick={() => setLanguagePath('en')}
                  name="language"
                  value="en"
                  checked={language === 'en'}
                />
                {navBar.ENG} <img src="/images/english.png" className="mx-1" />
              </label>
            </div> */}
          </Nav>
        </Navigation.Collapse>
      </Navigation>
      <Contacts visibility={isSidebarVisible} toggleContacts={toggleEmergencyContact} />
    </React.Fragment>
  );
};

export default Navbar;
