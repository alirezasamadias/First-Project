// START
// site loader
const bodyEl = document.querySelector('body');
const siteLoaderEl = document.querySelector('.site-loader');
// header slide
const headerEl = document.getElementById('header');
const homeEl = document.getElementById('home');
// menu item light
const menuItemsLink = document.querySelectorAll('.menu-item-link');
const parts = document.querySelectorAll('.part');
// show menu
const menuHamburgerEl = document.querySelector('.menu-hamburger');
const menuEl = document.querySelector('.menu');
const menuHamburgerIcon = document.querySelector('.icon-menu');
// show element
const showElements = document.querySelectorAll('.show-element');
// show element by rotate
const galleryEl = document.querySelector('.gallery');
const galleryImages = document.querySelectorAll('.gallery-img');
// inform contour
const informEl = document.querySelector('.about-inform');
const informNumEl = document.querySelector('.inform-num');
// slider
const slideItems = document.querySelectorAll('.slide-item');
const nextBtn = document.querySelector('.btn-next');
const prevBtn = document.querySelector('.btn-prev');
// form
const formEl = document.querySelector('.contact-form');
const formItems = document.querySelectorAll('.form-item:not(.input_submit)');
const formSubmit = document.querySelector('input[type="submit"]');
// show scroll up page
const scrollUpEl = document.querySelector('.scroll-up-page');

// site loader
document.onreadystatechange = ()=>{
    if (document.readyState !== "complete") {
        bodyEl.style.visibility = "hidden";
        siteLoaderEl.style.visibility = "visible";
    } else {
        siteLoaderEl.style.opacity = "0";
        siteLoaderEl.style.visibility = "hidden";
        bodyEl.style.visibility = "visible";
    }
};

// header slide
// header set min-width:768
const headerFix = ()=>{
    headerEl.style.top = `-${headerEl.offsetHeight}px`;

    window.addEventListener('scroll',()=>{
        if (homeEl.getBoundingClientRect().top + headerEl.offsetHeight <= 0){
            headerEl.style.top = '0';
        } else if (homeEl.getBoundingClientRect().top === 0){
            headerEl.style.top = `-${headerEl.offsetHeight}px`;
        }
    });
};
// header set max-width:768
const headerSlide = ()=>{
    let primaryScroll = window.scrollY;

    window.addEventListener('scroll',()=>{
        const scrollNow = window.scrollY;
    
        if (scrollNow >= homeEl.offsetHeight - headerEl.offsetHeight){
            if (scrollNow >= primaryScroll){
                headerEl.style.top = `-${headerEl.offsetHeight}px`;
            } else {
                headerEl.style.top = '0';
            }

            primaryScroll = scrollNow;
        }

        // debug
        if (menuEl.classList.contains('show-menu')){
            headerEl.style.top = '0';
        }
    });

    // debug
    headerEl.style.top = '0';
    window.addEventListener('scroll',()=>{
        if (homeEl.getBoundingClientRect().top === 0){
            headerEl.style.top = '0';
        }
    });
};
// by responsive
if (window.innerWidth <= 768){
    headerSlide();
} else {
    headerFix();
}
// by resize
window.addEventListener('resize',()=>{
    if (window.innerWidth <= 768){
        headerSlide();
    } else {
        headerFix();
    }
});

// menu item target
window.addEventListener('scroll',()=>{
    parts.forEach((part)=>{
        if(part.getBoundingClientRect().top - headerEl.offsetHeight <= 0){
            menuItemsLink.forEach((item)=>{
                if(item.getAttribute('href').includes(part.id)){
                    item.classList.add('light');
                } else {
                    item.classList.remove('light');
                }
            });
        }
    });
});

// show menu
const showMenu = element => {
    element.addEventListener('click',()=>{
        menuEl.classList.toggle('show-menu');
        // change menu hamburger icon
        menuHamburgerIcon.classList.toggle('icon-close');
    });
};
showMenu(menuHamburgerEl);
showMenu(menuEl);

// home background
const backgrounds = ['Background-Home-01.jpg','Background-Home-02.jpg','Background-Home-03.jpg'];
let num = 0;
homeEl.style.backgroundImage = `url(Images/${backgrounds[num]})`;
const changBackground = setInterval(()=>{
    num++;
    if(num === backgrounds.length - 1){
        clearInterval(changBackground);
    }
    homeEl.style.backgroundImage = `url(Images/${backgrounds[num]})`;
},1000);

// show element
showElements.forEach((showElement)=>{
    showElement.classList.add('show_scale');
    window.addEventListener('scroll',()=>{
        if(showElement.parentElement.getBoundingClientRect().top <= window.innerHeight){
            showElement.style.display = 'block';
        }
    });
});

// show element by rotate
galleryImages.forEach((galleryImage)=>{
    galleryImage.classList.add('show_rotate');
    galleryImage.parentElement.classList.add('parent-show_rotate');

    window.addEventListener('scroll',()=>{
        if(galleryEl.getBoundingClientRect().top + 100 <= window.innerHeight){
            galleryImage.style.display = 'block';
            // debug
            setTimeout (()=>{
                galleryImage.classList.remove('show_rotate');
                galleryImage.parentElement.classList.remove('parent-show_rotate');
            },1200);
        }
    });
});

// slider
const setItem = ()=>{
    for (const slideItem of slideItems) {
        slideItem.classList.remove('show-slide');
    }
    setTimeout(()=>{
        slideItems[item].classList.add('show-slide');
    },500);
};

const changeItem = setInterval(()=>{
    item++;
    if (item >= slideItems.length){
        item = 0;
    }
    setItem();
},7000);

let item = 0;
nextBtn.addEventListener('click',()=>{
    item++;
    if (item >= slideItems.length){
        item = 0;
    }
    setItem();
});
prevBtn.addEventListener('click',()=>{
    item--;
    if (item < 0){
        item = slideItems.length - 1;
    }
    setItem();
});

// inform contour
informNumEl.innerHTML = '0';
const counter = (elementId , endNum , numPlus , interval) => {
    let number = 0;

    const setNumber = setInterval (function(){
        number += numPlus;

        if (number >= endNum) {
            clearInterval(setNumber);
            number = endNum;
        }

        document.getElementById(elementId).innerHTML = number;
    },interval);
};
window.addEventListener('scroll',()=>{
    if (informEl.getBoundingClientRect().bottom <= window.innerHeight && informNumEl.innerHTML === '0'){
        counter('projects',112,1,35);
        counter('experience',3265,5,1);
        counter('clients',47,1,80);
    }
});

// form
// form valid
formItems.forEach((formItem)=>{
    formSubmit.addEventListener('click',(e)=>{
        if(formItem.checkValidity()){
            formItem.style.borderColor = "#239201";
        } else{
            formItem.style.borderColor = "#c80303";
        }

        formItem.addEventListener('keyup',()=>{
            if(formItem.checkValidity()){
                formItem.style.borderColor = "#239201";
            }
        });
    });
});

// form hide
formEl.addEventListener('submit',(e)=>{
    e.preventDefault();

    formEl.style.height = `${formEl.offsetHeight}px`;
    setTimeout(()=>{
        formEl.style.opacity = '0';
        formEl.style.visibility = 'hidden';
    },500);
    setTimeout(()=>{
        formEl.style.height = '0px';
    },1000);
});

// show scroll up page
scrollUpEl.style.display = 'none';
window.addEventListener('scroll',()=>{
    if (homeEl.getBoundingClientRect().bottom - headerEl.offsetHeight >= 0){
        scrollUpEl.style.display = 'block';
        scrollUpEl.classList.add('scroll-up-hide');
    } else {
        scrollUpEl.style.display = 'block';
        scrollUpEl.classList.remove('scroll-up-hide');
    }
});
// THE END