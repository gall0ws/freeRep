// ==UserScript==
// @name     freeRep
// @version  1.6
// @include  https://*.repubblica.it/*
// @include  https://*.lastampa.it/*
// @include  https://*.gazzetta.it/*_preview.shtml*
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

const checkClassName = (el, name) => el.classList && el.classList.contains(name)
const hide = el => { if (el) { el.style.display = "none" } }
const removeAttr = (el, name) => { el && el.attributes.removeNamedItem(name) }

const isPaywall = el => checkAttr(el, "subscriptions-section", "content")
const isPreview = el => checkAttr(el, "subscriptions-section", "content-not-granted")
const isBanner  = el => checkClassName(el, "paywall-static")
const isNewPaywall = el => checkClassName(el, "paywall__content")
const isGazzettaPaywall = el => checkClassName(el, "bck-freemium__wall")
const isGazzettaPartnerLink = el => checkClassName(el, "is-partner-link")
const isGazzettaContent = el => checkAttr(el, "class", "content") // exact match

const isRepubblica = () => location.host.endsWith("repubblica.it")
const isLaStampa = () => location.host.endsWith("lastampa.it")
const isGazzettaIt = () => location.host.endsWith("gazzetta.it")

const findLaStampaPaywall = () => document.querySelector("div.main-content > #article-body > iframe")

const buildAmpPath = () => {
    let path = "./amp/"
    if (isLaStampa()) {
        path = location.pathname + "amp/"
    } else if (isGazzettaIt()) {
        path = location.pathname.replace(/_preview(.shtml).*/, '$1/amp/')
    }
    return path
}

const createAmpLink = () => {
    const a = document.createElement("A")
    a.href = buildAmpPath()
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

const freeRep = () => {
    if (!window.location.pathname.endsWith("/amp/")) {
        if (isRepubblica()) {
            hide(findNode(document, isNewPaywall))
            // TODO: GM_* ?
        } else if (isGazzettaIt()) {
            [isGazzettaPaywall, isGazzettaPartnerLink].forEach(p => {
                const el = findNode(document, p)
                if (el) {
                    el.remove()
                }
            })
            const content = findNode(document, isGazzettaContent)
            if (content) {
                content.appendChild(createAmpLink())
            }
        } else if (isLaStampa()) {
            const el = findLaStampaPaywall();
            if (el) {
                el.replaceWith(createAmpLink())
            }
        } else {
            const el = findNode(document, isNewPaywall);
            if (el) {
                el.replaceChildren(createAmpLink())
            }
        }
    } else {
        tryFindNode(document, isPaywall).then(paywall => {
            hide(findNode(document, isBanner))
            hide(findNode(document, isPreview))
            removeAttr(paywall, "subscriptions-section")
        }).catch(log)
    }
}

freeRep()
