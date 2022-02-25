//Dom değişkenleri tanımlanmıştır.
const cells = Array.from(document.getElementsByClassName("cell"));
const board = document.querySelector(".board");
const finalMessage = document.querySelector(".finalMessage");
const restartButton = document.querySelector(".restart");
let xTurn = true;
// X veya O bu konumdaysa maç oyun kazanılır.
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

startGame();

function startGame() {
  xTurn = true;
  cells.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });
  handleHover();
}

// hücrelerdeki x ve o sınıfları kaldırılır. mesaj ve restart butonu görünmez hale getirilir.
function restartGame() {
  cells.forEach((cell) => {
    cell.classList.remove("X");
    cell.classList.remove("O");
  });
  finalMessage.classList.remove("show");
  restartButton.classList.remove("show");
  startGame();
}

// hücrelere tıklanmasıyla tetiklenir. Oyun sırasını ve kontrolünü yönetir
function handleClick(e) {
  let cell = e.target;
  let cellClass = xTurn ? "X" : "O";
  cell.classList.add(cellClass);
  if (isWin(cellClass)) {
    let message = xTurn ? "X's Win" : "O's Win";
    endGame(message);
  } else if (isDraw()) {
    let message = "Draw!";
    endGame(message);
  } else {
    xTurn = !xTurn;
    handleHover();
  }
}

// Hangi oyuncunun sırasıysa onun hoverini oluşturmayı sağlar.
function handleHover() {
  board.classList.remove("X");
  board.classList.remove("O");
  if (xTurn) {
    board.classList.add("X");
  } else {
    board.classList.add("O");
  }
}

// input ile alınan hücre sınıfının gerekli konumlarda olup olmadığına bakar eğer varsa true yoksa false döner.
function isWin(cellClass) {
  return winningConditions.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(cellClass);
    });
  });
}

// tüm hücreler dolu ise oyun berabere bitmiştir.
function isDraw() {
  return cells.every((cell) => {
    return cell.classList.contains("X") || cell.classList.contains("O");
  });
}

// input ile alınan mesaj yazdırılır. mesaj ve restart butonu görünür hale getirilir. ve hücrelerin hover ve tıklama özellikleri elinden alınır.
function endGame(message) {
  finalMessage.innerText = message;
  finalMessage.classList.add("show");
  restartButton.classList.add("show");
  cells.forEach((cell) => {
    cell.removeEventListener("click", handleClick);
  });
  restartButton.addEventListener("click", restartGame);
  board.classList.remove("X");
  board.classList.remove("O");
}
