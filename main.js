const getUsersScore = async (username) => {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const targetUrl = `https://www.jetpunk.com/users/${username}`;
  const response = await fetch(proxyUrl + targetUrl);
  const data = await response.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'text/html');
  const scoreElement = doc.querySelector('.shield-total .level-points');
  
  if (scoreElement) {
    errorAlert(false);
    const score = parseInt(scoreElement.textContent.replace(/,/g, ''), 10);
    return score;
  }else{
    errorAlert(true);
    throw new Error('CORS Proxy Not Enabled');
  }
};
  
const createBar = (username, score, maxScore, color) => {
  const barContainer = document.createElement('div');
  barContainer.classList.add('bar-container');

  const label = document.createElement('div');
  label.classList.add('bar-label');
  label.textContent = username;
  barContainer.appendChild(label);

  const bar = document.createElement('div');
  bar.classList.add('bar');
  const chartHeight = 300;
  const barHeight = (score / maxScore) * chartHeight;
  bar.style.height = `${barHeight}px`;
  bar.style.backgroundColor = color;
  barContainer.appendChild(bar);

  const scoreLabel = document.createElement('div');
  scoreLabel.classList.add('score-label');
  scoreLabel.textContent = score;
  bar.appendChild(scoreLabel);

  return barContainer;
};
  
const updateScores = async () => {
  try {
    const users = ['Tuperwak', 'Voture'];
    const colors = ['#4bc0c0', '#f56565'];
    const scores = await Promise.all(users.map(getUsersScore));
  
    const chart = document.getElementById('chart');
    chart.innerHTML = '';
    const maxScore = Math.max(...scores);
  
    users.forEach((username, index) => {
      const bar = createBar(username, scores[index], maxScore, colors[index]);
      chart.appendChild(bar);
    });
  } catch (error) {
    console.error('Error updating scores:', error);
  }
};

const errorAlert = (bool) => {
  const alert = document.getElementById('alert');
  alert.style.zIndex = bool ? '100' : '-1';
}

const handleError =() => {
  window.open("https://cors-anywhere.herokuapp.com/corsdemo", '_blank').focus();
  errorAlert(false);
}

updateScores();
setInterval(updateScores, 2000);