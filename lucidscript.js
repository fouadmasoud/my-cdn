const closeDrawers = () => {
  const experienceDrawer = document.getElementById('experienceDrawer');
  const shopDrawer = document.getElementById('shopDrawer');
  const localeSelectDrawer = document.getElementById('localeSelectDrawer');
  experienceDrawer.style.transform = "translateY(-150%)";
  shopDrawer.style.transform = "translateY(-150%)";
  localeSelectDrawer.style.transform = "translateY(-150%)";
}
const toggleDrawer = id => {
  const drawer = document.getElementById(id);
  if (drawer.style.transform === "translateY(-150%)") {
    closeDrawers();
    drawer.style.transform = "translateY(0)";
  } else {
    drawer.style.transform = "translateY(-150%)";
  }
}
const openMenu = () => {
  document.getElementById("mobile-menu-wrapper").style.display = "block";
  document.getElementById("mobile-menu-id").classList.add("Drawer-module--open");
}
const closeMenu = () => {
  document.getElementById("mobile-menu-id").classList.remove("Drawer-module--open");
  setTimeout(() => {
    document.getElementById("mobile-menu-wrapper").style.display = "none";
  }, 275);
}

const openGlobe = () => {
  document.getElementById("mobile-globe-wrapper").style.display = "block";
  document.getElementById("mobile-globe-id").classList.add("Drawer-module--open");
}
const closeGlobe = () => {
  document.getElementById("mobile-globe-id").classList.remove("Drawer-module--open");
  setTimeout(() => {
    document.getElementById("mobile-globe-wrapper").style.display = "none";
  }, 275);
}
const closeGlobeAndMenu = () => {
  closeGlobe();
  closeMenu();
}


const toggleSubmenu = (element) => {
  let submenu = element.nextElementSibling;
  submenu.classList.toggle("Side-module--expanded");
  let sideModuleLine = element.querySelectorAll('.Side-module--line')[0];
  let sideModuleLine2 = element.querySelectorAll('.Side-module--line')[1];
  sideModuleLine.classList.toggle("Side-module--expanded");
  sideModuleLine2.classList.toggle("Side-module--expanded");
};

const handleChangeLng = newLng => {
  if (window.location) {
    const domain = 'https://lucidmotors.com';
    const lucidLocale = newLng === 'en-us' ? '' : '/' + newLng;
    const path = '/portal/login';
    const redirect = domain + lucidLocale + path;
    window.location.href = redirect;
  }
};

// https://lucidmotors.com/media/data/en/menu-website-top-nav2.json
// https://lucidmotors.com/media/data/en/menu-website-side-nav2.json
// https://lucidmotors.com/media/data/en/menu-website-bottom-nav2.json
const fetchContent = async (locale, type) => {
  let jsonURL = `https://lucidmotors.com/media/data/${locale}/${type}.json`;
  const response = await fetch(jsonURL).then(a => a.json());
  return response;
};

const populateHeader = (locale) => {
  let logo = document.getElementById("logo");
  logo.href = `https://lucidmotors.com/${locale}`;
  let bear = document.getElementById("bear");
  bear.href = `https://lucidmotors.com/${locale}/company`;
  let air = document.getElementById("air");
  air.href = `https://lucidmotors.com/${locale}/air`;
  let gravity = document.getElementById("gravity");
  gravity.href = `https://lucidmotors.com/${locale}/gravity`;
  let experience = document.getElementById("experience");
  let shop = document.getElementById("shop");
  let experienceDrawerParent = document.getElementById("experienceDrawer").getElementsByTagName("ul");
  let about = document.getElementById("about");
  let events = document.getElementById("events");
  let stories = document.getElementById("stories");
  let shopDrawerParent = document.getElementById("shopDrawer").getElementsByTagName("ul");
  let locations = document.getElementById("locations");
  fetchContent(locale, 'menu-website-top-nav2').then(content => {
    const topNavContent = content.sections[0].children;
    experience.innerText = topNavContent[2].title;
    shop.innerText = topNavContent[3].title;
    const experienceDrawerContent = content.sections[4].children;
    about.innerText = experienceDrawerContent[0].title;
    about.href = `https://lucidmotors.com/${locale}${experienceDrawerContent[0].uri}`;
    events.innerText = experienceDrawerContent[1].title;
    events.href = `https://lucidmotors.com/${locale}${experienceDrawerContent[1].uri}`;
    stories.innerText = experienceDrawerContent[2].title;
    stories.href = `https://lucidmotors.com/${locale}${experienceDrawerContent[2].uri}`;
    const shopDrawerContent = content.sections[6].children;
    locations.innerText = shopDrawerContent[0].title;
    locations.href = `https://lucidmotors.com/${locale}${shopDrawerContent[0].uri}`;
    experienceDrawerParent[0].replaceChildren();
    content.sections[3].children.map((item,i) => {
      let lineItem = document.createElement('li');
      lineItem.setAttribute('role', 'listitem');
      lineItem.innerHTML = `<a href='https://lucidmotors.com/${locale}${item.uri}' class='Button-module--button Button-module--buttonUnderline'>${item.title}</a>`
      experienceDrawerParent[0].appendChild(lineItem);
    });
    shopDrawerParent[0].replaceChildren();
    content.sections[5].children.map((item,i) => {
      let lineItem = document.createElement('li');
      lineItem.setAttribute('role', 'listitem');
      lineItem.innerHTML = `<a href='https://lucidmotors.com/${locale}${item.uri}' class='Button-module--button Button-module--buttonUnderline'>${item.title}</a>`
      shopDrawerParent[0].appendChild(lineItem);
    });
  });
}

const populateSide = (locale) => {
  let airSide = document.getElementById("airSide");
  airSide.href = `https://lucidmotors.com/${locale}/air`;
  let gravitySide = document.getElementById("gravitySide");
  gravitySide.href = `https://lucidmotors.com/${locale}/gravity`;
  let experienceSideLabel = document.getElementById("experienceSideLabel");
  let experienceSideMenu = document.getElementById("experienceSideMenu");
  let shopSideLabel = document.getElementById("shopSideLabel");
  let shopSideMenu = document.getElementById("shopSideMenu");
  fetchContent(locale, 'menu-website-side-nav2').then(content => {
    const sideNavContent = content.sections[0].children;
    experienceSideLabel.innerText = sideNavContent[2].title;
    experienceSideMenu.replaceChildren();
    sideNavContent[2].children.map((item,i) => {
      let lineItem = document.createElement('a');
      lineItem.setAttribute('href', `https://lucidmotors.com/${locale}${item.uri}`);
      lineItem.setAttribute('class', 'Side-module--expandableLink');
      lineItem.innerText = item.title;
      experienceSideMenu.appendChild(lineItem);
    });
    shopSideLabel.innerText = sideNavContent[3].title;
    shopSideMenu.replaceChildren();
    sideNavContent[3].children.map((item,i) => {
      let lineItem = document.createElement('a');
      lineItem.setAttribute('href', `https://lucidmotors.com/${locale}${item.uri}`);
      lineItem.setAttribute('class', 'Side-module--expandableLink');
      lineItem.innerText = item.title;
      shopSideMenu.appendChild(lineItem);
    });
  });
}

const populateFooter = (locale) => {
  const footerParent = document.getElementById("footer");
  let legal = document.getElementById("legal");
  let privacy = document.getElementById("privacy");
  let cookiepolicy = document.getElementById("cookiepolicy");
  let copyright = document.getElementById("copyright");
  if (legal) {
    fetchContent(locale, 'menu-website-bottom-nav2').then(content => {
      const footerBottom = content.sections[4].children;
      legal.innerText = footerBottom[0].title;
      legal.href = `https://lucidmotors.com/${locale}${footerBottom[0].uri}`;
      privacy.innerText = footerBottom[1].title;
      privacy.href = `https://lucidmotors.com/${locale}${footerBottom[1].uri}`;
      cookiepolicy.innerText = footerBottom[2].title;
      cookiepolicy.href = `https://lucidmotors.com/${locale}/legal#cookie-policy`;
      copyright.innerText = footerBottom[3].title;
      let footerColumnTitles = footerParent.getElementsByTagName("h2");
      let footerColumnLinks = footerParent.getElementsByTagName("ul");
      for (let i = 0; i < 4; i++) { 
        footerColumnTitles[i].innerText = content.sections[i].title;
        footerColumnLinks[i].replaceChildren();
        content.sections[i].children.map((child,j) => {
          let lineItem = document.createElement('li');
          lineItem.innerHTML = `<a href='https://lucidmotors.com/${locale}${child.uri}' class='Button-module--button Button-module--buttonUnderline'>${child.title}</a>`
          footerColumnLinks[i].appendChild(lineItem);
        });
      };
    });
  }
}

const getLucidLocale = GigyaLocale => {
  switch (GigyaLocale) {
    case 'en':
      return 'en';
    case 'en-ae':
      return 'en-ae';
    case 'en-sa':
      return 'en-sa';
    case 'en-ca':
      return 'en-ca';
    case 'fr-be':
      return 'fr-be';
    case 'fr-ca':
      return 'fr-ca';
    case 'de':
      return 'de-de';
    case 'nl':
      return 'nl-nl';
    case 'de-ch':
      return 'de-ch';
    case 'fr-ch':
      return 'fr-ch';
    case 'no':
      return 'nb-no';
    case 'ar':
      return 'ar-sa';
    case 'ar-ae':
      return 'ar-ae';
    case 'en-eu':
      return 'en-eu';
    default:
      return 'en';
  }
};
