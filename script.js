let newQBtn = document.getElementById("newQuoteButton")
let shareTweet = document.getElementById("shareTwitterButton")
let rings = document.getElementById("lds-ring")
let quoteWindow = document.getElementById("quoteBlock")


function loading() {
    rings.classList.remove("visible")
    quoteWindow.hidden = true
  }
  
  // Remove Loading Spinner
  function complete() {
    
    rings.classList.add("visible")
    quoteWindow.hidden = false
    
  }

async function getQuote() {
    loading()
  const url =
    "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";
  const cors = "https://cors-anywhere.herokuapp.com/";
  try {
    
    
    quote = await fetch(cors + url);
    data = await quote.json();
    console.log(data.quoteText, data.quoteAuthor);
    document.getElementById("quote").innerHTML = data.quoteText;
    if (data.quoteAuthor === "") {
      document.getElementById("author").innerHTML = "Unknown";
    } else {
      document.getElementById("author").innerHTML = data.quoteAuthor;
      
    }
    complete();

  } catch (err) {
    console.log("Error Happened reason :" + err);
    getQuote();
    complete();
  }
  
}


function shareTweets(){
    let tweet =  document.getElementById("quote").innerHTML + "  -  " + document.getElementById("author").innerHTML
    url = "https://twitter.com/intent/tweet?text=" + tweet
    window.open(url,'_blank')
}

newQBtn.addEventListener('click', getQuote)
shareTweet.addEventListener('click',shareTweets)

getQuote();
