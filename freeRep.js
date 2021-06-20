// ==UserScript==
// @name     freeRep
// @version  1.2
// @include  https://*.repubblica.it/*
// @include  https://*.lastampa.it/*
// @grant    none
// ==/UserScript==
const log = (...args) => console.log("freeRep:", ...args)

const checkAttr = (el, name, value) => {
    let retv = false
    if (el && el.attributes && el.attributes[name]) {
        retv = el.attributes[name].value == value
    }
    return retv
}

const hide = el => { if (el) { el.style.display = "none" } }
const removeAttr = (el, name) => { el && el.attributes.removeNamedItem(name) }

const isPaywall = el => checkAttr(el, "subscriptions-section", "content")
const isPreview = el => checkAttr(el, "subscriptions-section", "content-not-granted")
const isBanner  = el => el && el.classList && el.classList.contains("paywall-static")
const isNewPaywall = el => el.classList && el.classList.contains("paywall__content")
const isLaStampa = () => location.host.endsWith("lastampa.it")

const createAmpLink = () => {
    const a = document.createElement("A")
    a.href = (isLaStampa() ? location.pathname : ".") + "/amp"
    a.innerText = "Clicca qui per visualizzare l'articolo completo"
    const div = document.createElement("DIV")
    div.style = "margin: auto"
    div.appendChild(a)
    return div;
}

const findNode = (root, predicate) => {
    if (!root || predicate(root)) {
        return root
    }
    let node = findNode(root.shadowRoot, predicate)
    if (!node) {
        for (let i=0; i<root.childNodes.length && !node; i++) {
            node = findNode(root.childNodes[i], predicate)
        }
    }
    return node
}

const tryFindNode = (root, predicate, timeout =50, tlimit =5000) => new Promise((resolve, reject) => {
    const rec = tm => {
        const node = findNode(root, predicate)
        if (node) {
            resolve(node)
        } else if (tm < tlimit) {
            log(`node not found, retrying in ${tm}ms`)
            setTimeout(() => rec(tm * 2), tm)
        } else {
            reject("node not found")
        }
    }
    rec(timeout)
})

freeRep = () => {
    let el;
    if (!window.location.pathname.endsWith("/amp/") &&
        (el = findNode(document, isNewPaywall))) {
        el.replaceChildren(createAmpLink())
    } else {
        tryFindNode(document, isPaywall).then(paywall => {
            hide(findNode(document, isBanner))
            hide(findNode(document, isPreview))
            removeAttr(paywall, "subscriptions-section")
        }).catch(log)
    }
}

freeRep()
