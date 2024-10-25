let startButton = document.querySelector(".control-buttons span");
let userNameSpan = document.querySelector(".info-container span");
let blockContainer = document.querySelector(".memory-blocks");
let blocks = Array.from(blockContainer.children);

let duration = 1000;
// ... spred operator
let orderRange = [...Array(blocks.length).keys()];
orderRange = shuffle(orderRange);
// let orderRange = [Array.from(Array(blocks.length).keys())]

// Add Order CSS Property To Game Blocks
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  block.addEventListener("click", function () {
    flipplock(block);
  });
});

startButton.onclick = function () {
  // To Save Answer prompt Take I Should Put it on variable like python
  let yourName = prompt("What's Your Name?");
  // User doesn't enter name
  if (yourName == "" || yourName == null) {
    userNameSpan.innerHTML = "UnKnown";
  } else {
    userNameSpan.innerHTML = yourName;
  }
  // delete all div to start play
  document.querySelector(".control-buttons").remove();
};

// Flip Block Function
function flipplock(selectedBlock) {
  selectedBlock.classList.add("flipped");

  // Collect All Flipped Cards
  let allFlippedBlocks = blocks.filter((flippedlock) =>
    flippedlock.classList.contains("flipped")
  );

  // if There Two Selected Blocks
  if (allFlippedBlocks.length === 2) {
    // Stop Clicking function
    stopClicking();
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

function stopClicking() {
  blockContainer.classList.add("no-clicking");
  setTimeout(() => {
    blockContainer.classList.remove("no-clicking");
  }, duration);
}

function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("flipped");
    secondBlock.classList.remove("flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
  } else {
    triesElement.innerHTML++;
    setTimeout(() => {
      firstBlock.classList.remove("flipped");
      secondBlock.classList.remove("flipped");
    }, duration);
  }
}

function shuffle(array) {
  // Setings Vars
  let Current = array.length,
    temp,
    randome;
  while (Current > 0) {
    // get Ranome number
    randome = Math.floor(Math.random() * Current);
    Current--;
    // [1] save current element in temp
    temp = array[Current];
    // [2] current element = randome element
    array[Current] = array[randome];
    // [3] randome element = temp
    array[randome] = temp;
  }
  return array;
}
