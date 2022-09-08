const fixHeaders = ({requestHeaders}) => {
    requestHeaders = requestHeaders.filter(h => ! ["referer", "cookie"].includes(h.name.toLowerCase()))
    requestHeaders.push({
        name: "Referer",
        value: "https://m.google.it/"
    })
    return {requestHeaders}
}

const filters = {
    urls: [ "https://*.repubblica.it/*","https://*.economist.com/*" ],
    types: [ "main_frame" ]
}
const opts = [ "blocking", "requestHeaders" ]

try {
    void browser
} catch (e) {
    if (e instanceof ReferenceError && typeof chrome != "undefined") {
        browser = chrome
        opts.push("extraHeaders")
    }
}

browser.webRequest.onBeforeSendHeaders.addListener(fixHeaders, filters, opts)
