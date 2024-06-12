document.getElementById('get-started').addEventListener('click', showFormPage);
// To ensure the "Get Started" button is in the normal position when navigating back
window.addEventListener("popstate", function() {
    getStartedButton.classList.add("normal");
    getStartedButton.classList.remove("center");
    landingPage.style.display = "flex";
    otherSection.style.display = "none";
});


const factors = ['Mental Demand', 'Physical Demand', 'Temporal Demand', 'Performance', 'Effort', 'Frustration'];
const participants = [];
const weights = {
    "Mental Demand": 2,
    "Physical Demand": 2,
    "Temporal Demand": 1,
    "Performance": 4,
    "Effort": 5,
    "Frustration": 1
};

function validateForm(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input, select');
    for (let input of inputs) {
        if (input.hasAttribute('required') && !input.value) {
            alert('Please fill out all required fields.');
            return false;
        }
    }
    return true;
}

function showFormPage() {
    if (!validateForm('info-form')) return;
    document.getElementById('form-page').style.display = 'block';
    document.getElementById('landing-page').style.display = 'none';
}

function showInstructionPage1() {
    document.getElementById('instruction-page-1').style.display = 'block';
}

function showPairComparisonPage() {
    document.getElementById('pair-comparison-page').style.display = 'block';
    generatePairComparisons();
}

function showInstructionPage2() {
    document.getElementById('instruction-page-2').style.display = 'block';
}

function showTLXPage() {
    document.getElementById('tlx-page').style.display = 'block';
    generateTLXSliders();
}

function showPairResults() {
    document.getElementById('pair-results').style.display = 'block';
    calculateWeights();
}

function goBackToFormPage() {
    document.getElementById('form-page').style.display = 'block';
}

function goBackToPairComparisonPage() {
    document.getElementById('pair-comparison-page').style.display = 'block';
}

function goBackToLandingPage() {
    document.getElementById('landing-page').style.display = 'block';
    document.getElementById('form-page').style.display = 'none';
    document.getElementById('instruction-page-1').style.display = 'none';
    document.getElementById('pair-comparison-page').style.display = 'none';
    document.getElementById('instruction-page-2').style.display = 'none';
    document.getElementById('tlx-page').style.display = 'none';
    document.getElementById('report-page').style.display = 'none';
    
    document.getElementById('info-form').reset();
    document.getElementById('pair-comparison-form').innerHTML = '';
    document.getElementById('tlx-form').innerHTML = '';
    document.getElementById('final-results').style.display = 'none';
    document.getElementById('pair-results').style.display = 'none';
    document.getElementById('report').innerHTML = '';
}

// Generate pair comparison form dynamically
function generatePairComparisons() {
    const container = document.getElementById('pair-comparison-form');
    container.innerHTML = ''; // Clear previous content

    for (let i = 0; i < factors.length; i++) {
        for (let j = i + 1; j < factors.length; j++) {
            const pair = `${factors[i]} vs ${factors[j]}`;
            const div = document.createElement('div');
            div.classList.add('input-container');

            const label = document.createElement('label');
            label.innerText = pair;

            const radio1 = document.createElement('input');
            radio1.type = 'radio';
            radio1.name = pair;
            radio1.value = factors[i];

            const label1 = document.createElement('label');
            label1.innerText = factors[i];

            const radio2 = document.createElement('input');
            radio2.type = 'radio';
            radio2.name = pair;
            radio2.value = factors[j];

            const label2 = document.createElement('label');
            label2.innerText = factors[j];

            div.appendChild(label);
            div.appendChild(radio1);
            div.appendChild(label1);
            div.appendChild(radio2);
            div.appendChild(label2);
            container.appendChild(div);
        }
    }
}

// Calculate weights based on pair comparisons
function calculateWeights() {
    const form = document.getElementById('pair-comparison-form');
    const selectedWeights = {};

    for (let input of form.querySelectorAll('input[type="radio"]:checked')) {
        selectedWeights[input.value] = (selectedWeights[input.value] || 0) + 1;
    }

    const totalPairs = factors.length * (factors.length - 1) / 2;
    const weights = factors.map(factor => selectedWeights[factor] / totalPairs);

    for (let i = 0; i < factors.length; i++) {
        weights[factors[i]] = weights[i];
    }

    document.getElementById('pair-results').innerText = JSON.stringify(weights, null, 2);
}

// Generate TLX sliders dynamically
function generateTLXSliders() {
    const container = document.getElementById('tlx-form');
    container.innerHTML = ''; // Clear previous content

    factors.forEach(factor => {
        const div = document.createElement('div');
        div.classList.add('slider-container');

        const question = document.createElement('p');
        question.classList.add('question');
        question.innerText = `How ${factor.toLowerCase()} was the task?`;

        const label = document.createElement('label');
        label.setAttribute('for', `${factor.toLowerCase()}-demand`);
        label.innerText = `${factor}: 0`;
        label.id = `${factor.toLowerCase()}-demand-value`;

        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = 0;
        slider.max = 100;
        slider.value = 0;
        slider.id = `${factor.toLowerCase()}-demand`;
        slider.name = `${factor.toLowerCase()}-demand`;
        slider.addEventListener('input', () => {
            document.getElementById(`${factor.toLowerCase()}-demand-value`).innerText = `${factor}: ${slider.value}`;
        });

        div.appendChild(question);
        div.appendChild(label);
        div.appendChild(slider);
        container.appendChild(div);
    });
}

// Calculate rating and display report
function calculateRating() {
    const form = document.getElementById('tlx-form');
    const ratings = {};
    
    for (let factor of factors) {
        ratings[factor] = form.querySelector(`#${factor.toLowerCase()}-demand`).value;
    }
    
    const report = {
        "Mental Demand": ratings["Mental Demand"],
        "Physical Demand": ratings["Physical Demand"],
        "Temporal Demand": ratings["Temporal Demand"],
        "Performance": ratings["Performance"],
        "Effort": ratings["Effort"],
        "Frustration": ratings["Frustration"]
    };

    const weightedScore = factors.reduce((total, factor) => total + (weights[factor] * ratings[factor]), 0) / factors.length;

    document.getElementById('final-results').style.display = 'block';
    document.getElementById('final-mental-demand').innerText = ratings["Mental Demand"];
    document.getElementById('final-physical-demand').innerText = ratings["Physical Demand"];
    document.getElementById('final-temporal-demand').innerText = ratings["Temporal Demand"];
    document.getElementById('final-performance').innerText = ratings["Performance"];
    document.getElementById('final-effort').innerText = ratings["Effort"];
    document.getElementById('final-frustration').innerText = ratings["Frustration"];
    document.getElementById('tlx-score').innerText = weightedScore.toFixed(2);

    const reportContainer = document.getElementById('report');
    reportContainer.innerHTML = `
        <p>Mental Demand: ${ratings["Mental Demand"]}</p>
        <p>Physical Demand: ${ratings["Physical Demand"]}</p>
        <p>Temporal Demand: ${ratings["Temporal Demand"]}</p>
        <p>Performance: ${ratings["Performance"]}</p>
        <p>Effort: ${ratings["Effort"]}</p>
        <p>Frustration: ${ratings["Frustration"]}</p>
        <h2>Perceived Workload - Global Index: ${weightedScore.toFixed(2)}</h2>
    `;

    document.getElementById('report-page').style.display = 'block';
}
