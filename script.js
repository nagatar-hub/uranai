function drawOmikuji() {
    const box = document.getElementById('omikuji-box');
    const result = document.getElementById('result');
    const drawBtn = document.getElementById('draw-btn');
    const resetBtn = document.getElementById('reset-btn');

    // Hide result and start shaking
    result.classList.add('hidden');
    box.classList.add('shaking');
    drawBtn.disabled = true;

    // Wait for shake animation, then show result
    setTimeout(function () {
        box.classList.remove('shaking');

        // Pick a random fortune with weighted probability
        var fortune = pickFortune();

        // Display the result
        displayFortune(fortune);

        // Show result and toggle buttons
        result.classList.remove('hidden');
        drawBtn.classList.add('hidden');
        resetBtn.classList.remove('hidden');
    }, 800);
}

function pickFortune() {
    // Weighted probability: 大吉 is rarer, 吉/中吉 are more common
    var weights = [5, 20, 25, 25, 15, 8, 2]; // 大吉, 吉, 中吉, 小吉, 末吉, 凶, 大凶
    var totalWeight = weights.reduce(function (sum, w) { return sum + w; }, 0);
    var random = Math.random() * totalWeight;

    var cumulative = 0;
    for (var i = 0; i < weights.length; i++) {
        cumulative += weights[i];
        if (random < cumulative) {
            return FORTUNES[i];
        }
    }
    return FORTUNES[0];
}

function displayFortune(fortune) {
    var levelEl = document.getElementById('fortune-level');
    var messageEl = document.getElementById('fortune-message');
    var detailsEl = document.getElementById('fortune-details');

    levelEl.textContent = fortune.level;
    levelEl.className = 'fortune-level ' + fortune.className;

    messageEl.textContent = fortune.message;

    // Build details HTML
    var detailsHTML = '';
    for (var key in fortune.details) {
        detailsHTML += '<div><span class="label">' + key + ':</span> ' + fortune.details[key] + '</div>';
    }
    detailsEl.innerHTML = detailsHTML;
}

function resetOmikuji() {
    var result = document.getElementById('result');
    var drawBtn = document.getElementById('draw-btn');
    var resetBtn = document.getElementById('reset-btn');

    result.classList.add('hidden');
    drawBtn.classList.remove('hidden');
    drawBtn.disabled = false;
    resetBtn.classList.add('hidden');
}
