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
let valid = true;

// Check if all required fields are filled
const inputs = form.querySelectorAll('input[required], select[required]');
inputs.forEach(input => {
    if (!input.value.trim()) {
        valid = false;
        input.style.borderColor = 'red'; // Highlight empty fields
    } else {
        input.style.borderColor = ''; // Reset the border color if filled
    }
});

return valid;
}    

function showInstructionPage1() {    
document.getElementById('form-page').style.display = 'none';
document.getElementById('instruction-page-1').style.display = 'block';
}

function showInstructionPage2() {
document.getElementById('pair-comparison-page').style.display = 'none';
document.getElementById('instruction-page-2').style.display = 'block';
}        

function showFormPage() {
document.getElementById('landing-page').style.display = 'none';
document.getElementById('form-page').style.display = 'block';
}

function showPairComparisonPage() {
if (!validateForm('info-form')) {
    alert('Please fill in all required fields.');
    return;
}

document.getElementById('form-page').style.display = 'none';
document.getElementById('pair-comparison-page').style.display = 'block';

const pairComparisons = [
    ['Effort', 'Performance'],
    ['Frustration', 'Mental Demand'],
    ['Mental Demand', 'Temporal Demand'],
    ['Performance', 'Mental Demand'],
    ['Mental Demand', 'Effort'],
    ['Mental Demand', 'Physical Demand'],
    ['Effort', 'Physical Demand'],
    ['Temporal Demand', 'Frustration'],
    ['Performance', 'Frustration'],
    ['Temporal Demand', 'Physical Demand'],
    ['Temporal Demand', 'Effort'],
    ['Performance', 'Temporal Demand'],
    ['Physical Demand', 'Frustration'],
    ['Physical Demand', 'Performance'],
    ['Effort', 'Frustration']
];

const pairComparisonForm = document.getElementById('pair-comparison-form');
pairComparisonForm.innerHTML = ''; // Clear any existing content

pairComparisons.forEach((pair, index) => {
    const comparisonContainer = document.createElement('div');
    comparisonContainer.className = 'comparison-container';

    const radio1 = document.createElement('input');
    radio1.type = 'radio';
    radio1.id = `pair-${index}-1`;
    radio1.name = `pair-${index}`;
    radio1.value = pair[0];
    comparisonContainer.appendChild(radio1);

    const label1 = document.createElement('label');
    label1.htmlFor = `pair-${index}-1`;
    label1.textContent = pair[0];
    comparisonContainer.appendChild(label1);

    const radio2 = document.createElement('input');
    radio2.type = 'radio';
    radio2.id = `pair-${index}-2`;
    radio2.name = `pair-${index}`;
    radio2.value = pair[1];
    comparisonContainer.appendChild(radio2);

    const label2 = document.createElement('label');
    label2.htmlFor = `pair-${index}-2`;
    label2.textContent = pair[1];
    comparisonContainer.appendChild(label2);

    pairComparisonForm.appendChild(comparisonContainer);
});
}

function showPairResults() {
const pairResultsContainer = document.getElementById('pair-results');
pairResultsContainer.innerHTML = ''; // Clear any existing content

const selectedPairs = {};

factors.forEach(factor => {
    selectedPairs[factor] = 0;
});

const pairComparisons = document.querySelectorAll('#pair-comparison-form input[type="radio"]:checked');

pairComparisons.forEach(pair => {
    selectedPairs[pair.value]++;
});

let resultHtml = '<ul>';
factors.forEach(factor => {
    resultHtml += `<li>${factor}: ${selectedPairs[factor]}</li>`;
    weights[factor] = selectedPairs[factor];
});
resultHtml += '</ul>';

pairResultsContainer.innerHTML = resultHtml;
pairResultsContainer.style.display = 'block';
}

function showTLXPage() {
const pairComparisons = document.querySelectorAll('#pair-comparison-form input[type="radio"]:checked');
if (pairComparisons.length < 15) {
    alert('Please complete all pair comparisons.');
    return;
}

document.getElementById('pair-comparison-page').style.display = 'none';
document.getElementById('tlx-page').style.display = 'block';

const factors = [
    'Mental Demand',
    'Physical Demand',
    'Temporal Demand',
    'Performance',
    'Effort',
    'Frustration'
];

const questions = {
    'Mental Demand': 'How mentally demanding was the task?',
    'Physical Demand': 'How physically demanding was the task?',
    'Temporal Demand': 'How hurried or rushed was the pace of the task?',
    'Performance': 'How successful were you in accomplishing what you were asked to do?',
    'Effort': 'How hard did you have to work to accomplish your level of performance?',
    'Frustration': 'How insecure, discouraged, irritated, stressed, and annoyed were you?'
};

factors.forEach(factor => {
    const container = document.getElementById(`${factor.toLowerCase().replace(' ', '-')}-container`);
    container.innerHTML = `
        <div class="horizontal-line"></div>
        <span class="scale-label left">Very Low</span>
        <span class="scale-label right">Very High</span>
    `;
    for (let i = 0; i <= 100; i += 5) {
        const inputId = `${factor.toLowerCase().replace(' ', '-')}-${i}`;
        container.innerHTML += `
            <input type="radio" id="${inputId}" name="${factor.toLowerCase().replace(' ', '-')}" value="${i}">
            <label for="${inputId}"><span data-value="${i}"></span></label>
        `;
    }
});

// Add event listeners to update the span text on selection
factors.forEach(factor => {
    const container = document.getElementById(`${factor.toLowerCase().replace(' ', '-')}-container`);
    container.addEventListener('change', (event) => {
        if (event.target.type === 'radio') {
            document.getElementById(`${factor.toLowerCase().replace(' ', '-')}-value`).textContent = event.target.value;
        }
    });
});
}

function clearData() {
// Reset the forms
document.getElementById('info-form').reset();
document.getElementById('pair-comparison-form').reset();
document.getElementById('tlx-form').reset();

// Hide sections
document.getElementById('form-page').style.display = 'none';
document.getElementById('pair-comparison-page').style.display = 'none';
document.getElementById('tlx-page').style.display = 'none';
document.getElementById('final-results').style.display = 'none';
document.getElementById('report-page').style.display = 'none';

// Clear the pair results and report content
document.getElementById('pair-results').innerHTML = '';
document.getElementById('report').innerHTML = '';

// Clear the participants array
participants.length = 0;

// Redirect to the landing page
document.getElementById('landing-page').style.display = 'block';
}

function goBackToFormPage() {
document.getElementById('pair-comparison-page').style.display = 'none';
document.getElementById('form-page').style.display = 'block';
}

function goBackToPairComparisonPage() {
document.getElementById('tlx-page').style.display = 'none';
document.getElementById('pair-comparison-page').style.display = 'block';
}

function goBackToLandingPage() {
clearData(); // Clear all data and reset the form
}

function calculateRating() {
const factors = [
    'Mental Demand',
    'Physical Demand',
    'Temporal Demand',
    'Performance',
    'Effort',
    'Frustration'
];

const tlxResults = {};
const individualIndexes = {};

let allAnswered = true;
factors.forEach(factor => {
    const selectedValue = document.querySelector(`input[name="${factor.toLowerCase().replace(' ', '-')}"]:checked`);
    if (selectedValue) {
        tlxResults[factor] = parseInt(selectedValue.value);
    } else {
        allAnswered = false;
        alert(`Please rate all the factors.`);
        return;
    }
});

if (!allAnswered) return;

const finalResultsContainer = document.getElementById('final-results');
finalResultsContainer.style.display = 'block';

let globalIndex = 0;
factors.forEach(factor => {
    // Calculate the Individual Index
    const weightResult = weights[factor];
    const individualIndex = Math.round((weightResult / 15) * tlxResults[factor]);
    individualIndexes[factor] = individualIndex;
    globalIndex += individualIndex;

    // Update the UI with the final results
    document.getElementById(`final-${factor.toLowerCase().replace(' ', '-')}`).textContent = tlxResults[factor];
});

document.getElementById('tlx-score').textContent = globalIndex;

participants.push({
    name: document.getElementById('name').value,
    age: document.getElementById('age').value,
    gender: document.getElementById('gender').value,
    blockSection: document.getElementById('block-section').value,
    occupation: document.getElementById('occupation').value,
    tlxResults: tlxResults,
    individualIndexes: individualIndexes,
    tlxScore: globalIndex,
    weights: { ...weights }
});

generateReport();
}        

function generateLineScales() {
scales.forEach(scale => {
    let container = document.getElementById(`${scale.toLowerCase().replace(" ", "-")}-container`);
    container.innerHTML = `
        <label class="scale-label left">Low</label>
        <label class="scale-label right">High</label>
        <div class="horizontal-line"></div>
    `;
    for (let i = 0; i <= 100; i += 5) {
        let label = document.createElement("label");
        label.innerHTML = `<span data-value="${i}"></span>`;
        let radio = document.createElement("input");
        radio.type = "radio";
        radio.name = `${scale.toLowerCase().replace(" ", "-")}`;
        radio.value = i;
        radio.id = `${scale.toLowerCase().replace(" ", "-")}-${i}`;
        label.setAttribute("for", `${scale.toLowerCase().replace(" ", "-")}-${i}`);
        container.appendChild(radio);
        container.appendChild(label);
    }
});
}

function generateReport() {
document.getElementById('tlx-page').style.display = 'none';
document.getElementById('report-page').style.display = 'block';

const reportContainer = document.getElementById('report');
reportContainer.innerHTML = ''; // Clear any existing content

participants.forEach(participant => {
    let reportHtml = `<h3>Participant: ${participant.name}</h3>`;
    reportHtml += `<p>Age: ${participant.age}</p>`;
    reportHtml += `<p>Gender: ${participant.gender}</p>`;
    reportHtml += `<p>Course/Profession: ${participant.blockSection}</p>`;
    reportHtml += `<p>Occupation: ${participant.occupation}</p>`;
    reportHtml += '<table>';
    reportHtml += '<tr><th>Factor</th><th>Weight</th><th>Rate</th><th>Weight x Rate</th><th>Individual Index</th></tr>';

    factors.forEach(factor => {
        const weightResult = participant.weights[factor];
        const rate = participant.tlxResults[factor];
        const weightXRate = weightResult * rate;
        const individualIndex = participant.individualIndexes[factor];
        reportHtml += `<tr>
            <td>${factor}</td>
            <td>${weightResult}</td>
            <td>${rate}</td>
            <td>${weightXRate}</td>
            <td>${individualIndex}</td>
        </tr>`;
    });

    reportHtml += '</table>';
    reportHtml += `<p><strong>Perceived Workload - Global Index: ${participant.tlxScore}</strong></p>`;

    const globalIndex = participant.tlxScore;
    let interpretation = '';

    if (globalIndex >= 0 && globalIndex <= 20) {
        interpretation = 'The mental workload is Very Low.';
    } else if (globalIndex >= 21 && globalIndex <= 40) {
        interpretation = 'The mental workload is Low.';
    } else if (globalIndex >= 41 && globalIndex <= 60) {
        interpretation = 'The mental workload is Moderate.';
    } else if (globalIndex >= 61 && globalIndex <= 80) {
        interpretation = 'The mental workload is High.';
    } else if (globalIndex >= 81 && globalIndex <= 100) {
        interpretation = 'The mental workload is Very High.';
    }

    reportHtml += `<p><strong>Global Index Interpretation:</strong> ${interpretation}</p>`; 

    reportContainer.innerHTML += reportHtml;
});
}
