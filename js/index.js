const answer = "APPLE";

let attempts = 0; //시도 횟수
let index = 0;
let timer;

function appStart() {
  const displayGameOver = () => {
    const div = document.createElement("div");
    div.innerHTML =
      "게임이 종료되었습니다.<br/>" +
      "소요시간 : " +
      document.getElementById("time").innerText; //줄바꿈 왜 안되는가.....
    div.style =
      "display:flex; justify-content:center; align-items:center; position: absolute; top:40vh; left: 42vw; background-color:tomato; width:200px; height:100px;";
    document.body.appendChild(div);
  };
  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeyDown);
    displayGameOver();
    clearInterval(timer);
    //alert("정답을 맞추셨습니다!");
  };

  const handleEnterKey = () => {
    let correct = 0;
    //answer check
    for (let i = 0; i < 5; i++) {
      const thisBlock = document.querySelector(
        `.board_block[data-index='${attempts}${i}']`
      );
      const letter = thisBlock.innerText;
      const answerLetter = answer[i];
      if (letter === answerLetter) {
        correct += 1;
        thisBlock.style.background = "#6AAA64";
      } else if (answer.includes(letter))
        thisBlock.style.background = "#C9B458";
      else thisBlock.style.background = "#787C7E";
      thisBlock.style.color = "white";
    }

    if (correct === 5) gameover();
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board_block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index != 0) index -= 1;
  };
  //로직들
  const handleKeyDown = (e) => {
    const key = e.key.toUpperCase();
    const keyCode = e.keyCode;
    const thisBlock = document.querySelector(
      `.board_block[data-index='${attempts}${index}']`
    );

    console.log(e.key, e.keyCode);
    if (e.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (e.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  const startTimer = () => {
    const startTime = new Date();

    function setTime() {
      const currTime = new Date();
      const spendTime = new Date(currTime - startTime);
      const min = spendTime.getMinutes().toString().padStart(2, "0");
      const sec = spendTime.getSeconds().toString().padStart(2, "0");
      const timeH1 = document.querySelector(".time");
      timeH1.innerText = `${min}:${sec}`;
    }

    timer = setInterval(setTime, 1000);
    console.log(timer);
  };

  startTimer();
  window.addEventListener("keydown", handleKeyDown);
}

appStart();
