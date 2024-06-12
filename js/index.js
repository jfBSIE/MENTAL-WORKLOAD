const loadWeightPairs = [
    ["Mental Demand", "Physical Demand"],
    ["Mental Demand", "Temporal Demand"],
    ["Mental Demand", "Performance"],
    ["Mental Demand", "Effort"],
    ["Mental Demand", "Frustration"],
    ["Physical Demand", "Temporal Demand"],
    ["Physical Demand", "Performance"],
    ["Physical Demand", "Effort"],
    ["Physical Demand", "Frustration"],
    ["Temporal Demand", "Performance"],
    ["Temporal Demand", "Effort"],
    ["Temporal Demand", "Frustration"],
    ["Performance", "Effort"],
    ["Performance", "Frustration"],
    ["Effort", "Frustration"],
];

const weights = {
    "Mental Demand": 0,
    "Physical Demand": 0,
    "Temporal Demand": 0,
    "Performance": 0,
    "Effort": 0,
    "Frustration": 0,
};

const ratings = {
    "Mental Demand": 0,
    "Physical Demand": 0,
    "Temporal Demand": 0,
    "Performance": 0,
    "Effort": 0,
    "Frustration": 0,
};

document.getElementById('get-started').addEventListener('click', () => {
    document.getElementById('landing-page').style.display = 'none';
    document.getElementById('form-page').style.display = 'block';
});

function showInstructionPage1() {
    document.getElementById('instruction-page-1').style.display = 'block';
}

function showPairComparisonPage() {
    document.getElementById('pair-comparison-page').style.display = 'block';
    const form = document.getElementById('pair-comparison-form');
    form.innerHTML = '';
    loadWeightPairs.forEach((pair, index) => {
        const label = document.createElement('label');
        label.textContent = `${pair[0]} vs ${pair[1]}`;
        const input1 = document.createElement('input');
        input1.type = 'radio';
        input1.name = `pair-${index}`;
        input1.value = pair[0];
        const input2 = document.createElement('input');
        input2.type = 'radio';
        input2.name = `pair-${index}`;
        input2.value = pair[1];
        form.appendChild(label);
        form.appendChild(input1);
        form.appendChild(document.createTextNode(pair[0]));
        form.appendChild(input2);
        form.appendChild(document.createTextNode(pair[1]));
        form.appendChild(document.createElement('br'));
    });
}

function showPairResults() {
    const form = document.getElementById('pair-comparison-form');
    const results = document.getElementById('pair-results');
    results.style.display = 'block';
    form.querySelectorAll('input[type="radio"]:checked').forEach(input => {
        weights[input.value]++;
    });
    results.innerHTML = '<h2>Results - Pairs</h2>' + 
                        Object.entries(weights).map(([key, value]) => `<p>${key}: ${value}</p>`).join('');
}

function showInstructionPage2() {
    document.getElementById('instruction-page-2').style.display = 'block';
}

function showTLXPage() {
    document.getElementById('tlx-page').style.display = 'block';
    Object.keys(ratings).forEach(key => {
        const container = document.getElementById(`${key.toLowerCase().replace(' ', '-')}-container`);
        container.innerHTML = '';
        for (let i = 0; i <= 100; i += 20) {
            const span = document.createElement('span');
            span.textContent = i;
            span.addEventListener('click', () => {
                ratings[key] = i;
                document.getElementById(`${key.toLowerCase().replace(' ', '-')}-value`).textContent = i;
            });
            container.appendChild(span);
        }
    });
}

function calculateRating() {
    const finalResults = document.getElementById('final-results');
    finalResults.style.display = 'block';
    const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
    const weightedRatings = Object.entries(ratings).map(([key, value]) => (value * weights[key]) / totalWeight);
    const tlxScore = weightedRatings.reduce((sum, rating) => sum + rating, 0);
    Object.entries(ratings).forEach(([key, value]) => {
        document.getElementById(`final-${key.toLowerCase().replace(' ', '-')}`).textContent = value;
    });
    document.getElementById('tlx-score').textContent = tlxScore.toFixed(2);
    showReport();
}

function showReport() {
    const reportPage = document.getElementById('report-page');
    reportPage.style.display = 'block';
    const report = document.getElementById('report');
    report.innerHTML = '<h2>Participants Report</h2>' + 
                       Object.entries(ratings).map(([key, value]) => `<p>${key}: ${value}</p>`).join('') +
                       `<h2>Perceived Workload - Global Index: ${document.getElementById('tlx-score').textContent}</h2>`;
}

function goBackToLandingPage() {
    document.getElementById('report-page').style.display = 'none';
    document.getElementById('landing-page').style.display = 'block';
}

function goBackToFormPage() {
    document.getElementById('form-page').style.display = 'block';
}

function goBackToPairComparisonPage() {
    document.getElementById('pair-comparison-page').style.display = 'block';
}