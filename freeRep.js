const log = (...args) => console.log("freeRep:", ...args)

const findNode = (root, predicate) => {
    if (!root || predicate(root)) {
	return root
    }
    let node = findNode(root.shadowRoot, predicate)
    if (node) {
	return node
    }
    for (let i=0; i < root.childNodes.length; i++) {
	node = findNode(root.childNodes[i], predicate)
	if (node) {
	    return node
	}
    }
    return node
}

const checkAttr = (el, name, value) => {
    let retv = false
    if (el.attributes && el.attributes[name]) {
	retv = el.attributes[name].value == value
    }
    return retv
}

const hide   = el => el.style.display = "none"
const reveal = el => el.attributes.removeNamedItem("subscriptions-section")

const freeRep = (timeout =200) => {
    const banner  = findNode(document, el => el.classList && el.classList.contains("paywall-static"))
    const preview = findNode(document, el => checkAttr(el, "subscriptions-section", "content-not-granted"))
    const paywall = findNode(document, el => checkAttr(el, "subscriptions-section", "content"))

    if (!paywall) {
	setTimeout(() => freeRep(timeout * 2), timeout)
    } else {
	preview && hide(preview)
	banner && hide(banner)
	reveal(paywall)
    }
}

freeRep()
