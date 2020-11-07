// ==UserScript==
// @name     freeRep
// @version  1
// @match    https://rep.repubblica.it/pwa/*                // use @match not @include      // using https://rep.repubblica.it/* will start on every page, use instead https://rep.repubblica.it/pwa/* so it start only when there's subscribed-only content
// @grant    none
// ==/UserScript==

window.addEventListener('load', function() { // so when the page is fully loaded
    /* getting short article */ var notSubscribedContent = document.getElementsByTagName("body")[0].getElementsByTagName("news-app")[0].shadowRoot.getElementById("articlePager").getElementsByClassName("iron-selected")[0].shadowRoot.querySelector("div").querySelector("div").querySelector("amp-viewer").querySelector("div").shadowRoot.querySelector("body").getElementsByTagName("main")[0].getElementsByClassName("detail-article_container")[2].getElementsByClassName("detail-article_body")[0].querySelector("div");
    /* getting full article */ var subscribedContent = document.getElementsByTagName("body")[0].getElementsByTagName("news-app")[0].shadowRoot.getElementById("articlePager").getElementsByClassName("iron-selected")[0].shadowRoot.querySelector("div").querySelector("div").querySelector("amp-viewer").querySelector("div").shadowRoot.querySelector("body").getElementsByTagName("main")[0].getElementsByClassName("detail-article_container")[2].getElementsByClassName("detail-article_body")[0].getElementsByClassName("paywall")[0];
    var lenght = subscribedContent.getElementsByTagName("br").length; // how many <br> so "paragraphs" are in the full article

    notSubscribedContent.remove() // removing short text
    subscribedContent.setAttribute("subscriptions-section", "true") // adding attribute to the full article so it appears
    subscribedContent.getElementsByTagName("br")[lenght - 1].nextSibling.appendData("// This subscribed-only content was unlocked by @AnonHexo. \n (https://github.com/AnonHexo) //"); // adding some credits at the end of the article (not required)
    console.clear() // cleaning the console
})

// minified version, with no comments:
/* var notSubscribedContent=document.getElementsByTagName("body")[0].getElementsByTagName("news-app")[0].shadowRoot.getElementById("articlePager").getElementsByClassName("iron-selected")[0].shadowRoot.querySelector("div").querySelector("div").querySelector("amp-viewer").querySelector("div").shadowRoot.querySelector("body").getElementsByTagName("main")[0].getElementsByClassName("detail-article_container")[2].getElementsByClassName("detail-article_body")[0].querySelector("div");var subscribedContent=document.getElementsByTagName("body")[0].getElementsByTagName("news-app")[0].shadowRoot.getElementById("articlePager").getElementsByClassName("iron-selected")[0].shadowRoot.querySelector("div").querySelector("div").querySelector("amp-viewer").querySelector("div").shadowRoot.querySelector("body").getElementsByTagName("main")[0].getElementsByClassName("detail-article_container")[2].getElementsByClassName("detail-article_body")[0].getElementsByClassName("paywall")[0];var lenght=subscribedContent.getElementsByTagName("br").length;notSubscribedContent.remove()
subscribedContent.setAttribute("subscriptions-section","true")
subscribedContent.getElementsByTagName("br")[lenght-1].nextSibling.appendData("// This subscribed-only content was unlocked by @AnonHexo. \n (https://github.com/AnonHexo) //");console.clear() */
