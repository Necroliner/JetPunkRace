const getUsersScore = async (username) => {
  console.log("Getting score for " + username)
  const response = null//await fetch(`/api/fetchScores?username=${username}`);
  const data = { score: 1300 }//await response.json();
  console.log("data for " + username + " is " + data.score + " points");
  return data.score;
};
  
  const createBar = (username, score, maxScore, color) => {
    console.log(`Creating bar for ${username} with score ${score}`);
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
  //setInterval(updateScores, 3000);
  updateScores();