const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLodingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}
// Get Quote On Button Click
function newQuoteBtnOnClick() {
    showLodingSpinner();
    // Pick Random Quote From apiQuotes Array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    authorText.textContent = quote.author;

    //Check If Author Is Null If Null Replace With Unknown
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    }
    else {
        authorText.textContent = quote.author;
    }

    //Quote Lenght to Determine Styling
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();

}

// Show New Quote From Local
function newQuotesFromLocal() {
    // Pick Random Quote From localQuotes Array
    const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
}

// Get Quotes From API
async function getQuotesFromApi() {
    showLodingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuoteBtnOnClick();
    } catch (error) {
        //Catch Error Here
        alert(error);
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

    window.open(twitterUrl, '_blank');
}

// Event Listners

newQuoteBtn.addEventListener('click', newQuoteBtnOnClick);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuotesFromApi();
//newQuotesFromLocal();