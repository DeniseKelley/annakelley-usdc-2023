/**
 * RECOMMENDATION
 *
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 *
 * The Developer Tools in Chrome are available under the "..." menu,
 * futher hidden under the option "More Tools." In Firefox, they are
 * under the hamburger (three horizontal lines), also hidden under "More Tools."
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for.
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */
function findSearchTermInBooks(searchTerm, scannedTextObj) {
  /** You will need to implement your search and
   * return the appropriate object here. */

  //return varible
  var result = {
    SearchTerm: "",
    Results: [],
  };

  //loop through each book
  Object.keys(scannedTextObj).forEach((bookItem) => {
    //loop through the content of each book to fin the "searchTerm"
    Object.keys(scannedTextObj[bookItem].Content).forEach((textLine) => {
      //on the match
      if (
        scannedTextObj[bookItem].Content[textLine].Text.search(searchTerm) != -1
      ) {
        //push ISBN, Page, and Line into Results array
        result.Results.push({
          ISBN: scannedTextObj[bookItem].ISBN,
          Page: scannedTextObj[bookItem].Content[textLine].Page,
          Line: scannedTextObj[bookItem].Content[textLine].Line,
        });
      }
    });
  });
  //return the searchTerm in the result
  result.SearchTerm = searchTerm;
  //console.log(result.SearchTerm);

  //return result object
  return result;
}

/** Example input object. */
const twentyLeaguesIn = [
  {
    Title: "Twenty Thousand Leagues Under the Sea",
    ISBN: "9780000528531",
    Content: [
      {
        Page: 31,
        Line: 8,
        Text: "now simply went on by her own momentum.  The dark-",
      },
      {
        Page: 31,
        Line: 9,
        Text: "ness was then profound; and however good the Canadian's",
      },
      {
        Page: 31,
        Line: 10,
        Text: "eyes were, I asked myself how he had managed to see, and",
      },
    ],
  },
];

/** Example output object */
const twentyLeaguesOut = {
  SearchTerm: "the",
  Results: [
    {
      ISBN: "9780000528531",
      Page: 31,
      Line: 9,
    },
  ],
};

/*

                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that
 * output to the console. We've provided two tests as examples, and
 * they should pass with a correct implementation of `findSearchTermInBooks`.
 *
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
  console.log("PASS: Test 1");
} else {
  console.log("FAIL: Test 1");
  console.log("Expected:", twentyLeaguesOut);
  console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn);
if (test2result.Results.length == 1) {
  console.log("PASS: Test 2");
} else {
  console.log("FAIL: Test 2");
  console.log("Expected:", twentyLeaguesOut.Results.length);
  console.log("Received:", test2result.Results.length);
}

/*
    ___      _   _    _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
   / _ \    | | / /  | | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
  / /_\ \   | |/ /   | | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
 / /   \ \  | |\ \   | |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
/_/     \_\ |_| \_\   \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 

*/
//positive chek that can find two occurrences of a word e.g: "and"
const test3result = findSearchTermInBooks("and", twentyLeaguesIn);
//the Results array should return 2 occurrences
if (test3result.Results.length == 2) {
  console.log("PASS: Test 3");
} else {
  console.log("FAIL: Test 3");
  console.log("Expected:", twentyLeaguesOut.Results.length);
  console.log("Received:", test3result.Results.length);
}

//negative check for a word that doesn't exist e.g.: "hello"
const test4result = findSearchTermInBooks("hello", twentyLeaguesIn);
//the Results array should be empty
if (test4result.Results.length == 0) {
  console.log("PASS: Test 4");
} else {
  console.log("FAIL: Test 4");
  console.log("Expected:", twentyLeaguesOut.Results.length);
  console.log("Received:", test4result.Results.length);
}

//Case-Sensetive check for existing word in the book "went" and nonexisten "Went"
const test5result = findSearchTermInBooks("went", twentyLeaguesIn);
const test6result = findSearchTermInBooks("Went", twentyLeaguesIn);
if (test5result.Results.length == 1 && test6result.Results.length == 0) {
  console.log("PASS: Test 5");
} else {
  console.log("FAIL: Test 5");
  console.log(
    "Expected:",
    twentyLeaguesOut.Results.length,
    "for lower-case went and 0 for upper-case Went"
  );
  console.log(
    "Received:",
    test5result.Results.length,
    "for lower-case went ",
    test6result.Results.length,
    "for upper-case Went"
  );
}

//positive test for finding a partial word ('moment' - when word momentum was scanned)
const test7result = findSearchTermInBooks("moment", twentyLeaguesIn);
if (test7result.Results.length == 1) {
  console.log("PASS: Test 7");
} else {
  console.log("FAIL: Test 7");
  console.log("Expected:", twentyLeaguesOut.Results.length);
  console.log("Received:", test7result.Results.length);
}

//negative check for the book object with an empty list
//when 0 books were scanned
const test8result = findSearchTermInBooks("moment", []);
//the output object should return a searched term
if (test8result.Results.length == 0 && test8result.SearchTerm == "moment") {
  console.log("PASS: Test 8");
} else {
  console.log("FAIL: Test 8");
  console.log("Expected:", 0, "searchTerm: moment ");
  console.log(
    "Received:",
    test8result.Results.length,
    "searchTerm: ",
    test8result.SearchTerm
  );
}

//Examplem input object with no content
const bookWithNoText = [
  { Title: "Book Without Content", ISBN: "9780000528532", Content: [] },
];

//negative check for the book object with empty content
const test9result = findSearchTermInBooks("moment", bookWithNoText);
//the output object should return a searched term
if (test9result.Results.length == 0 && test9result.SearchTerm == "moment") {
  console.log("PASS: Test 9");
} else {
  console.log("FAIL: Test 9");
  console.log("Expected:", 0, "searchTerm: moment ");
  console.log(
    "Received:",
    test9result.Results.length,
    "searchTerm: ",
    test9result.SearchTerm
  );
}

//Example input object with no text
const bookWithNoText2 = [
  {
    Title: "Book Without Content",
    ISBN: "9780000528532",
    Content: [
      {
        Page: 31,
        Line: 8,
        Text: "",
      },
    ],
  },
];

//negative check for the book object with an empty text
const test10result = findSearchTermInBooks("moment", bookWithNoText2);
//the output object should return a searched term
if (test10result.Results.length == 0 && test10result.SearchTerm == "moment") {
  console.log("PASS: Test 10");
} else {
  console.log("FAIL: Test 10");
  console.log("Expected:", 0, "searchTerm: moment ");
  console.log(
    "Received:",
    test10result.Results.length,
    "searchTerm: ",
    test10result.SearchTerm
  );
}

/** Example input object with multiple books. */
const MultipleBooksIn = [
  {
    Title: "Twenty Thousand Leagues Under the Sea",
    ISBN: "9780000528531",
    Content: [
      {
        Page: 31,
        Line: 8,
        Text: "now simply went on by her own momentum.  The dark-",
      },
      {
        Page: 31,
        Line: 9,
        Text: "ness was then profound; and however good the Canadian's",
      },
      {
        Page: 31,
        Line: 10,
        Text: "eyes were, I asked myself how he had managed to see, and",
      },
    ],
  },
  {
    Title: "Leaves Of Grass",
    ISBN: "9781449505714",
    Content: [
      {
        Page: 52,
        Line: 6,
        Text: "Do I contradict myself?",
      },
      {
        Page: 52,
        Line: 7,
        Text: "Very well then I contradict myself, (I am large, I contain multitudes.)",
      },
    ],
  },
];

/** Example output object with multiple books */
const MultipleBooksOut = {
  SearchTerm: "I",
  Results: [
    {
      ISBN: "9780000528531",
      Page: 31,
      Line: 10,
    },
    {
      ISBN: "9781449505714",
      Page: 52,
      Line: 6,
    },
    {
      ISBN: "9781449505714",
      Page: 52,
      Line: 7,
    },
  ],
};

//positive test for a known result with input object of multiple books
const test11result = findSearchTermInBooks("I", MultipleBooksIn);
if (JSON.stringify(MultipleBooksOut) === JSON.stringify(test11result)) {
  console.log("PASS: Test 11");
} else {
  console.log("FAIL: Test 11");
  console.log("Expected:", MultipleBooksOut);
  console.log("Received:", test11result);
}
