const initBg = (autoplay = true) => {
    const bgImgsNames = ['diagoona-bg-1.jpg', 'diagoona-bg-2.jpg', 'diagoona-bg-3.jpg'];
    const bgImgs = bgImgsNames.map(img => "images/" + img);

    $.backstretch(bgImgs, {duration: 4000, fade: 500});

    if (!autoplay) {
        $.backstretch('pause');
    }
}

const setBg = id => {
    $.backstretch('show', id);
}

const setBgOverlay = () => {
    const windowWidth = window.innerWidth;
    const bgHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
    );
    const tmBgLeft = $('.tm-bg-left');

    $('.tm-bg').height(bgHeight);

    if(windowWidth > 768) {
        tmBgLeft.css('border-left', `0`)
                .css('border-top', `${bgHeight}px solid transparent`);
    } else {
        tmBgLeft.css('border-left', `${windowWidth}px solid transparent`)
                .css('border-top', `0`);
    }
}

// Language switching functionality
const setLanguage = (lang) => {
    localStorage.setItem('qualion-lang', lang);
    document.documentElement.lang = lang;

    // Update all elements with data-en and data-sv attributes
    $('[data-en][data-sv]').each(function() {
        const $el = $(this);
        const text = $el.attr(`data-${lang}`);
        if (text) {
            $el.text(text);
        }
    });

    // Update placeholders
    $('[data-en-placeholder][data-sv-placeholder]').each(function() {
        const $el = $(this);
        const placeholder = $el.attr(`data-${lang}-placeholder`);
        if (placeholder) {
            $el.attr('placeholder', placeholder);
        }
    });

    // Update language toggle buttons
    $('.tm-lang-btn').removeClass('active');
    $(`.tm-lang-btn[data-lang="${lang}"]`).addClass('active');
}

const initLanguage = () => {
    const savedLang = localStorage.getItem('qualion-lang') || 'en';
    setLanguage(savedLang);

    $('.tm-lang-btn').click(function() {
        const lang = $(this).data('lang');
        setLanguage(lang);
    });
}

// Cookie consent functionality
const initCookieConsent = () => {
    const consent = localStorage.getItem('qualion-cookie-consent');

    if (!consent) {
        $('#cookie-consent').fadeIn(300);
    }

    $('#cookie-accept').click(function() {
        localStorage.setItem('qualion-cookie-consent', 'accepted');
        $('#cookie-consent').fadeOut(300);
    });
}

$(document).ready(function () {
    const autoplayBg = true;    // set Auto Play for Background Images
    initBg(autoplayBg);
    setBgOverlay();
    initLanguage();
    initCookieConsent();

    // Set dynamic copyright year
    $('#copyright-year').text(new Date().getFullYear());

    const bgControl = $('.tm-bg-control');
    bgControl.click(function() {
        bgControl.removeClass('active');
        $(this).addClass('active');
        const id = $(this).data('id');
        setBg(id);
    });

    // Manually handle navbar toggle for mobile
    $('.navbar-toggler').on('click', function() {
        $('#navbar-nav').collapse('toggle');
    });

    // Close mobile menu when clicking on a nav link
    $('.tm-nav-link').on('click', function() {
        if (window.innerWidth <= 991) { // Bootstrap lg breakpoint
            $('#navbar-nav').collapse('hide');
        }
    });

    $(window).on("backstretch.after", function (e, instance, index) {
        const bgControl = $('.tm-bg-control');
        bgControl.removeClass('active');
        const current = $(".tm-bg-controls-wrapper").find(`[data-id=${index}]`);
        current.addClass('active');
    });

    $(window).resize(function() {
        setBgOverlay();
    });
});