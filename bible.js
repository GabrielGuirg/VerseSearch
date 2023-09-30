// Load the JSON data containing Bible verses
fetch('bible.json')
  .then(response => response.json())
  .then(data => {
    const books = data.books;

    // Function to search for a word in the verses and return a random verse containing that word
    function searchWordInBible(word) {
      const matchingVerses = [];

      for (const book of books) {
        for (const chapter of book.chapters) {
          for (const verse of chapter.verses) {
            if (verse.text.toLowerCase().includes(word.toLowerCase())) {
              matchingVerses.push({
                text: verse.text,
                num: verse.num,
                chapter: chapter.num,
                book: book.name
              });
            }
          }
        }
      }

      if (matchingVerses.length > 0) {
        // Get a random verse from the matching verses
        const randomIndex = Math.floor(Math.random() * matchingVerses.length);
        return matchingVerses[randomIndex];
      } else {
        return null; // Word not found in the Bible.
      }
    }

    // Function to display the verse
    function displayVerse(verse) {
      if (verse) {
        document.getElementById('result').innerText = `${verse.text} (Verse ${verse.num}, ${verse.book}, Chapter ${verse.chapter})`;
      } else {
        document.getElementById('result').innerText = "Word not found in the Bible.";
      }
    }

    // Handle user input and display the result
    document.getElementById('searchButton').addEventListener('click', function () {
      const searchWord = document.getElementById('searchWord').value;
      const foundVerse = searchWordInBible(searchWord);
      displayVerse(foundVerse);
    });
  })
  .catch(error => console.error('Error loading JSON data:', error));