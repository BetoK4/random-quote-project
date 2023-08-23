import React, { useState, useEffect } from 'react';
import ColorsArray from './colorsArr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import './App.scss';

let quoteDBURL = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App() {
  const [quote, setQuote] = useState("Life is 10% what happens to me and 90 of how I react to it.");
  const [author, setAuthor] = useState("Charles Swindoll");
  const [randomNumber, setRandomNumber] = useState(0);
  const [quotesArray, setQuotesArray] = useState(null);
  const [accentColor, setAccentColor] = useState("#282c34");

  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parsedJSON = await response.json();
    setQuotesArray(parsedJSON.quotes);
    console.log(parsedJSON);
  }

  useEffect(() => {
    fetchQuotes(quoteDBURL)
  }, [quoteDBURL])

  const getRandomQuote = () => {
    const randomInteger = Math.floor(quotesArray.length * Math.random())
    setRandomNumber(randomInteger);
    setAccentColor(ColorsArray[randomInteger])
    setQuote(quotesArray[randomInteger].quote);
    setAuthor(quotesArray[randomInteger].author);
  }

  // const quotesArray = [{ quote: "The question isn't who is going to let me; it's who is going to stop me.", author: "Ayn Rand" },
  // { quote: "Either write something worth reading or do something worth writing.", author: "Benjamin Franklin" },
  // { quote: "Work is 10% what happens to me and 90% of how I react to it.", author: "Charles Swindoll" },
  // { quote: "What's money? A man is a success if he gets up in the morning and goes to bed at night and in between does what he wants to do.", author: "Bob Dylan" }];
  return (
    <div className='App'>
      <header className='App-header' style={{ backgroundColor: accentColor }}>
        <div id="quote-box" style={{ color: accentColor }}>
          {/* <h1>Random number: {randomNumber}</h1> */}
          <p id="text">
            "{quote}"
        </p>
          <p id="author">
            - {author}
          </p>
          <div className="button">
            <a id="tweet-quote"
              style={{ backgroundColor: accentColor }}
              href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)}
            ><FontAwesomeIcon icon={faTwitter} /></a>
            <button id="new-quote"
              style={{ backgroundColor: accentColor }}
              onClick={() => getRandomQuote()}
            >Generate A Random Quote</button>
          </div>
        </div>
      </header>
    </div>

  );
}

export default App;



// import React, { useState, useEffect } from 'react';
// import './App.scss';
// import QuoteBox from "./Components/QuoteBox.component"
// import Spinner from 'react-bootstrap/Spinner'

// const quoteURL = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

// const colorsArr = ['4FC1FF', "E8B9AB", 'CB769E', '69995D', 'D2D7DF', '3AA7A3', 'ECA400', '006992', 'AFECE7', '81F499', '890620', 'B6465F', '8ACDEA']

// const randomArrVal = (arr) => {
//   console.log(arr)
//   let randomNum = Math.floor(Math.random() * arr.length)
//   console.log(arr[randomNum])
//   return arr[randomNum]
// }

// const useFetch = url => {
//   const [data, setData] = useState(null);

//   async function fetchData() {
//     const response = await fetch(url);
//     const json = await response.json();
//     setData(json);
//   }

//   useEffect(() => { fetchData() }, [url]);
//   return data;
// };

// function App() {
//   const [accentColor, setAccentColor] = useState('#4FC1FF')
//   const quotes = useFetch(quoteURL)
//   const [currentQuote, setCurrentQuote] = useState({ author: '', quote: '' })

//   useEffect(() => {
//     if (quotes) {
//       handleNewQuote()
//     }
//   }, [quotes])

//   const handleNewQuote = () => {
//     setAccentColor(`#${randomArrVal(colorsArr)}`)
//     let quoteArr = quotes.quotes
//     setCurrentQuote(randomArrVal(quoteArr))
//   }

//   return (
//     <div className="App" style={{ backgroundColor: `${accentColor}`, color: `${accentColor}` }}>
//       {
//         (currentQuote.quote === "") ?
//           <Spinner className="loading-spinner" animation="grow" variant="light" role="status">
//             <span className="sr-only">Loading...</span>
//           </Spinner>
//           :
//           <QuoteBox accentColor={accentColor} currentQuote={currentQuote} handleNewQuote={handleNewQuote} />
//       }
//     </div>
//   );
// }

// export default App;