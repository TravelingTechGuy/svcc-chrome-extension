// Try this in your browser's Developer Tools:
//fetch('https://www.google.com/finance/info?q=NSE:AAPL,MSFT,TSLA,AMZN,IBM').then(r=>r.text()).then(d=>console.table(JSON.parse(d.replace('//',''))));

const url = 'https://www.google.com/finance/info?q=NSE:';

export async function getLatestQuotes(symbols = []) {
  let result = {};
  try {
    if(symbols.length) {
      let response = await fetch(url + symbols.join(','));
      let text = await response.text();
      let quotes = JSON.parse(text.replace('//',''));
      quotes.forEach(q => {
        result.quotes[q.t] = {current: q.l_cur, change: q.c, changePct: q.cp};
      });
    }
  }
  catch(ex) {
    result.error = ex.message;
  }
  finally {
    if(!result.quotes) {
      result.quotes = [];
    }
    return result;
  }
};

export function loadFromDB(item) {
  let result = null;
  let stored = localStorage.getItem(item);
  if(stored) {
    try {
      result = JSON.parse(stored);
    }
    catch(ex) {
      console.error(ex);
    }
  }
  return result;
};

export function saveToDB(item, value) {
  localStorage.setItem(item, JSON.stringify(value));
};
