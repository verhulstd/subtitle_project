const fs = require("fs"); // import nodejs core library
const rl = require("readline-sync");
const path = require("path");
while (true) {
  const folderToRead = rl.question(
    "Please provide a path to your subtitle folder...\n(or enter 'STOP' to close) \n"
  ); // grab third array argument
  if (folderToRead === "STOP") {
    process.exit();
  }
  if (!fs.existsSync(folderToRead)) {
    // check if folder does not exist
    console.error("Folder could not be found !!!");
  } else {
    // folder exists...
    const folderContents = fs.readdirSync(folderToRead);
    let allContent = "";
    for (let i = 0; i < folderContents.length; i++) {
      allContent += fs.readFileSync(
        path.resolve(folderToRead, folderContents[i])
      );
    }
    allContent = allContent
      .replace(/[^a-z]/gi, " ")
      .replace(/font|color/gi, " ")
      .replace(/ +/g, " ")
      .toLowerCase()
      .split(" ")
      .filter(function (word) {
        return word.length >= 4;
      });

    const wordsWithOccurrence = allContent.reduce(function (obj, word) {
      obj[word] = obj[word] + 1 || 1;
      return obj;
    }, {});

    const uniqueWords = Object.keys(wordsWithOccurrence);

    uniqueWords.sort(function (wordA, wordB) {
      return wordsWithOccurrence[wordB] - wordsWithOccurrence[wordA];
    });

    console.log(uniqueWords);
  }
}
