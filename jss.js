

  let startTime = Date.now();
  let computerPickNumber = Math.floor(Math.random() * 10) + 1;
  let guessCount = 0;
  let highScore = Infinity;

  function guessMyNumber() {
    let result = '';
    const bgMusic = document.getElementById('backgroundMusic');
    if(bgMusic.paused) bgMusic.play();

    guessCount++;

    let userPick = Number(document.getElementById('userInput').value);
    if (userPick === 0 || isNaN(userPick)) {
      alert('❗ Please enter a number');
      return;
    }
    if (userPick > 10) {
      alert('Enter a number less than or equal to 10');
      return;
    }
    if (userPick < 1) {
      alert('Enter a number greater than or equal to 1');
      return;
    }

    if (userPick === computerPickNumber) {
      result = `🎉 You got it! The secret number was ${computerPickNumber}`;

      // Timer
      let timeTaken = Math.floor((Date.now() - startTime) / 1000);
      result += ` ⏱️ You solved it in ${timeTaken} seconds!`;

      // High Score logic
      if (guessCount < highScore) {
        highScore = guessCount;
        result += ` 🏆 New High Score: ${highScore} guesses!`;
      } else {
        result += ` 🏅 Your best: ${highScore} guesses.`;
      }

      // Sound and disable input & buttons
      document.getElementById('winSound').play();
      document.getElementById('userInput').disabled = true;
      document.querySelector('.guessBtn').disabled = true;
      document.querySelector('.resetBtn').disabled = false;
      document.querySelector('.stopBtn').disabled = true;
    } else {
      if (userPick > computerPickNumber) {
        result = ' It is lower!';
      } else {
        result = ' It is higher!';
      }

      // Hint based on closeness
      let diff = Math.abs(userPick - computerPickNumber);
      if (diff === 1) {
        result += "  So close!";
      } else if (diff <= 3) {
        result += "  Getting warmer.";
      } else {
        result += "  Cold guess!";
      }
    }

    document.getElementById('result').innerText = `${result} (Guesses: ${guessCount})`;
  }

  function resetGame() {
    startTime = Date.now();
    computerPickNumber = Math.floor(Math.random() * 10) + 1;
    guessCount = 0;
    document.getElementById('result').innerText = '';
    document.getElementById('userInput').value = '';
    document.getElementById('userInput').disabled = false;
    document.querySelector('.guessBtn').disabled = false;
    document.querySelector('.stopBtn').disabled = false;
    document.querySelector('.resetBtn').disabled = false;

    // Restart background music if stopped
    let bgMusic = document.getElementById('backgroundMusic');
    if(bgMusic.src.indexOf('slowmotion.mp3') !== -1) {
      bgMusic.src = 'https://www.bensound.com/bensound-music/bensound-sunny.mp3';
      bgMusic.load();
      bgMusic.play();
    }
  }

  function toggleDarkMode() {
    document.body.classList.toggle("dark");
  }

  function stopGame() {
    let bgMusic = document.getElementById('backgroundMusic');
    bgMusic.pause();
    bgMusic.src = 'https://www.bensound.com/bensound-music/bensound-slowmotion.mp3';
    bgMusic.load();
    bgMusic.play();

    document.getElementById('userInput').disabled = true;
    document.querySelector('.guessBtn').disabled = true;
    document.querySelector('.stopBtn').disabled = true;
    document.querySelector('.resetBtn').disabled = false;

    document.getElementById('result').innerText = 'Game stopped. Enjoy the slow music! 🎵';
  }
 function exitGame() {
  alert("Closing the browser tab is not allowed by JavaScript. Please close it manually.");
}

