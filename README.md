# freeRep
Semplice script originariamente nato per bypassare il vecchio paywall di repubblica.it (Rep:), attualmente permette di visualizzare gli articoli "premium" delle seguenti testate:

* repubblica.it
* lastampa.it
* gazzetta.it

## Firefox 
### Add-on
Installa il pacchetto xpi dalla sezione [releases](https://github.com/gall0ws/freeRep/releases).

## Chromium & co.

### Extension
1. clona il repo
2. apri `chrome://extensions`
3. attiva *Developer Mode*
4. seleziona *Load unpacked*
5. seleziona la directory dove hai clonato il repo

## Greasemonkey / Tampermonkey (Chrome, Safari, Opera Next)
Crea un user script con il contenuto di `freeRep.js`

NOTA: Con freeRep >= 1.6 il il paywall di Repubblica.it non viene bypassato usando freeRep come script (vedi [PR#15](https://github.com/gall0ws/freeRep/pull/15))
