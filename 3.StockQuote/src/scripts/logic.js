// Try this in your browser's Developer Tools:
//fetch('https://www.google.com/finance/info?q=NSE:AAPL,MSFT,TSLA,AMZN,IBM').then(r=>r.text()).then(d=>console.table(JSON.parse(d.replace('//',''))));

const query = 'https://query.yahooapis.com/v1/public/yql?q=select symbol,LastTradePriceOnly,Change,ChangeinPercent from yahoo.finance.quotes where symbol in (SYMBOLS)&format=json&diagnostics=false&env=store://datatables.org/alltableswithkeys&callback=';

export async function getLatestQuotes(symbols = []) {
  let result = {};
  try {
    if(symbols.length) {
      let url = query.replace('SYMBOLS', symbols.map(s => `"${s}"`).join(','));
      let response = await fetch(url/*, {mode: 'no-cors'}*/);
      let json = await response.json();
      console.dir(json);
      if(Array.isArray(json.query.results.quote)) {
        result.quotes = json.query.results.quote.map(q => ({symbol: q.symbol, current: q.LastTradePriceOnly, change: q.Change, changePct: q.ChangeinPercent}));
      }
      else {
        throw new UserException('No results found');
      }
    }
  }
  catch(ex) {
    result.error = ex.message;
  }
  finally {
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
