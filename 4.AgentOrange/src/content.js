(function() {
  const nickname = ['Agent Orange', 'Pumpkin', 'Putin Lackey', 'Tiny Fingers'];
  const adverbs = ['yugely', 'bigly', 'tremendously'];
  let length1 = nickname.length, length2 = adverbs.length;
  let elements = document.getElementsByTagName('*');
  let replacements = 0;
  
  for(let i = 0; i < elements.length; i++) {
    let element = elements[i];
    for(let j = 0; j < element.childNodes.length; j++) {
      let node = element.childNodes[j];
      if (node.nodeType === 3) {
        let text = node.nodeValue;
        let replacedText = text.replace(/trump/gi, nickname[Math.floor(Math.random() * length1)]);
        if(replacedText !== text) {
          replacedText = replacedText.replace(/\b[A-Za-z]*ly\b/g, adverbs[Math.floor(Math.random() * length2)]);
          element.replaceChild(document.createTextNode(replacedText), node);
          replacements++;
        }
      }
    }
  }
  chrome.runtime.sendMessage({replacements: replacements}, () => {});
}());
