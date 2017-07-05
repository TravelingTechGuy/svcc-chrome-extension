(function() {
  const nickname = ['Drumpf', 'Agent Orange', 'Pumpkin', 'Putin Lackey', 'Tiny Fingers'];
  const adverbs = ['yugely', 'bigly', 'tremendously', 'covfefe'];
  let drumpf = /Trump/g, adverb = /\b[A-Za-z]*ly\b/g;
  let length1 = nickname.length, length2 = adverbs.length;
  let isDrumpfed = false;
  let corrections = 0;
  let elements = document.getElementsByTagName('*');
  
  for(let i = elements.length; i--;) {
    let element = elements[i];
    for(let j = element.childNodes.length; j--;) {
      let node = element.childNodes[j];
      if (node.nodeType === 3) {
        let text = node.nodeValue;
        if(isDrumpfed || text.match(drumpf)) {
          let replacedText = text
            .replace(drumpf, () => {
              corrections++;
              return nickname[Math.floor(Math.random() * length1)];
            })
            .replace(adverb, () => {
              corrections++;
              return adverbs[Math.floor(Math.random() * length2)];
            });
          if(replacedText !== text) {
            element.replaceChild(document.createTextNode(replacedText), node);
            if(!isDrumpfed) {
              isDrumpfed = true;
            }
          }
        }
      }
    }
  }
  chrome.runtime.sendMessage({corrections: corrections}, () => {});
}());
