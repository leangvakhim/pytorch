// --- Step Data Configuration ---
const steps = [
    {
        id: 'data',
        title: "1. Get the Data Batch",
        code: "for inputs, labels in dataloader:\n    # Move to GPU if available\n    inputs = inputs.to(device)\n    labels = labels.to(device)",
        desc: "Training is done in small chunks called 'batches'. Here, we grab a batch of features (`inputs`) and their correct answers (`labels`) from our dataset.",
        math: "",
        activeNodes: ['data'],
        activePaths: []
    },
    {
        id: 'forward',
        title: "2. The Forward Pass",
        code: "    # Pass data through the network\n    outputs = model(inputs)",
        desc: "We feed our inputs into the Neural Network (`model`). The network processes the data through its layers and produces its predictions (`outputs`).",
        math: "",
        activeNodes: ['data', 'model'],
        activePaths: ['data-to-model']
    },
    {
        id: 'loss',
        title: "3. Calculate the Loss",
        code: "    # Compare prediction with reality\n    loss = criterion(outputs, labels)",
        desc: "How wrong was the model? We use a loss function (`criterion`) to compare the model's predictions against the true `labels`. The result is a single number representing the error (`loss`).",
        math: "",
        activeNodes: ['model', 'loss'],
        activePaths: ['model-to-loss']
    },
    {
        id: 'zero',
        title: "4. Zero the Gradients",
        code: "    # Clear old gradients\n    optimizer.zero_grad()",
        desc: "Crucial PyTorch Step! PyTorch normally accumulates (adds) gradients. Before calculating new ones for this step, we must clear out the old gradients from the previous step.",
        math: "",
        activeNodes: ['optimizer'],
        activePaths: []
    },
    {
        id: 'backward',
        title: "5. The Backward Pass",
        code: "    # Compute new gradients (Backprop)\n    loss.backward()",
        desc: "The magic happens here! Backpropagation calculates the gradient of the loss with respect to every weight in the network. It answers: 'Which way should we tweak the weights to make the loss go down?'",
        math: "",
        activeNodes: ['loss', 'model'],
        activePaths: ['loss-to-model-back']
    },
    {
        id: 'step',
        title: "6. Update the Weights",
        code: "    # Adjust weights based on gradients\n    optimizer.step()",
        desc: "The `optimizer` takes the gradients calculated in the previous step and updates the model's weights. The model has now 'learned' a little bit and will perform slightly better on the next batch.",
        math: "",
        activeNodes: ['optimizer', 'model'],
        activePaths: ['opt-to-model']
    },
    {
        id: 'math',
        title: "7. The Mathematics Behind It",
        code: "# Standard Training Loop Summary\n# 1. Forward -> 2. Loss -> \n# 3. Zero Grad -> 4. Backward -> 5. Step",
        desc: "While PyTorch handles the heavy lifting, here are the foundational equations running under the hood during the loop you just stepped through.",
        math: `
            <div class="text-left w-full space-y-4 text-sm md:text-base">
                <div class="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <span class="font-bold text-blue-800">Forward Pass (Prediction)</span>
                    <div class="mt-2 overflow-x-auto">$$ \\hat{y} = f(x; W, b) $$</div>
                    <p class="text-xs text-blue-600 mt-1">Network $f$ processes input $x$ using weights $W$ and biases $b$.</p>
                </div>
                <div class="p-3 bg-red-50 rounded-lg border border-red-100">
                    <span class="font-bold text-red-800">Loss (e.g., Mean Squared Error)</span>
                    <div class="mt-2 overflow-x-auto">$$ \\mathcal{L} = \\frac{1}{N} \\sum_{i=1}^{N} (\\hat{y}_i - y_i)^2 $$</div>
                    <p class="text-xs text-red-600 mt-1">Measures distance between prediction $\\hat{y}$ and true label $y$.</p>
                </div>
                <div class="p-3 bg-green-50 rounded-lg border border-green-100">
                    <span class="font-bold text-green-800">Gradient Descent (Optimizer Step)</span>
                    <div class="mt-2 overflow-x-auto">$$ W_{new} = W_{old} - \\eta \\cdot \\frac{\\partial \\mathcal{L}}{\\partial W} $$</div>
                    <p class="text-xs text-green-600 mt-1">Weights are updated in the opposite direction of the gradient by learning rate $\\eta$.</p>
                </div>
            </div>
        `,
        activeNodes: [],
        activePaths: []
    }
];

let currentStep = 0;

// --- DOM Elements ---
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const stepCounter = document.getElementById('step-counter');
const progressContainer = document.getElementById('progress-container');
const visualArea = document.getElementById('visual-area');
const textArea = document.getElementById('text-area');

// --- Flowchart SVG Template ---
function getFlowchartSVG(activeNodes, activePaths) {
    const isNodeActive = (node) => activeNodes.includes(node);
    const isPathActive = (path) => activePaths.includes(path);

    return `
        <svg width="100%" height="100%" viewBox="0 0 400 300" class="absolute inset-0 w-full h-full">

            <!-- Definitions for Arrows -->
            <defs>
                <marker id="arrow-gray" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#D1D5DB" />
                </marker>
                <marker id="arrow-active" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#EE4C2C" />
                </marker>
            </defs>

            <!-- PATHS -->
            <!-- Data to Model -->
            <line x1="100" y1="80" x2="180" y2="150"
                    stroke="${isPathActive('data-to-model') ? '#EE4C2C' : '#E5E7EB'}"
                    stroke-width="3"
                    marker-end="url(#${isPathActive('data-to-model') ? 'arrow-active' : 'arrow-gray'})"
                    class="${isPathActive('data-to-model') ? 'dash-line' : ''}" />

            <!-- Model to Loss -->
            <line x1="220" y1="150" x2="300" y2="80"
                    stroke="${isPathActive('model-to-loss') ? '#EE4C2C' : '#E5E7EB'}"
                    stroke-width="3"
                    marker-end="url(#${isPathActive('model-to-loss') ? 'arrow-active' : 'arrow-gray'})"
                    class="${isPathActive('model-to-loss') ? 'dash-line' : ''}"/>

            <!-- Loss to Model (Backward) -->
            <path d="M 300 100 Q 260 180 230 170" fill="none"
                    stroke="${isPathActive('loss-to-model-back') ? '#EE4C2C' : '#E5E7EB'}"
                    stroke-width="3"
                    marker-end="url(#${isPathActive('loss-to-model-back') ? 'arrow-active' : 'arrow-gray'})"
                    class="${isPathActive('loss-to-model-back') ? 'dash-line-reverse' : ''}" />

            <!-- Optimizer to Model -->
            <line x1="200" y1="230" x2="200" y2="180"
                    stroke="${isPathActive('opt-to-model') ? '#EE4C2C' : '#E5E7EB'}"
                    stroke-width="3"
                    marker-end="url(#${isPathActive('opt-to-model') ? 'arrow-active' : 'arrow-gray'})"
                    class="${isPathActive('opt-to-model') ? 'dash-line' : ''}"/>

            <!-- NODES -->
            <!-- Data Node -->
            <g transform="translate(60, 40)">
                <rect width="80" height="40" rx="6"
                        fill="${isNodeActive('data') ? '#EE4C2C' : '#F3F4F6'}"
                        stroke="${isNodeActive('data') ? '#c73e23' : '#D1D5DB'}" stroke-width="2"/>
                <text x="40" y="25" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="14" fill="${isNodeActive('data') ? 'white' : '#6B7280'}">DATA</text>
            </g>

            <!-- Loss Node -->
            <g transform="translate(260, 40)">
                <circle cx="40" cy="20" r="25"
                        fill="${isNodeActive('loss') ? '#EE4C2C' : '#F3F4F6'}"
                        stroke="${isNodeActive('loss') ? '#c73e23' : '#D1D5DB'}" stroke-width="2"/>
                <text x="40" y="25" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="14" fill="${isNodeActive('loss') ? 'white' : '#6B7280'}">LOSS</text>
            </g>

            <!-- Model Node -->
            <g transform="translate(140, 130)">
                <rect width="120" height="50" rx="25"
                        fill="${isNodeActive('model') ? '#EE4C2C' : '#F3F4F6'}"
                        stroke="${isNodeActive('model') ? '#c73e23' : '#D1D5DB'}" stroke-width="2"/>
                <text x="60" y="30" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="16" fill="${isNodeActive('model') ? 'white' : '#4B5563'}">MODEL</text>
            </g>

            <!-- Optimizer Node -->
            <g transform="translate(140, 230)">
                <rect width="120" height="40" rx="6"
                        fill="${isNodeActive('optimizer') ? '#10B981' : '#F3F4F6'}"
                        stroke="${isNodeActive('optimizer') ? '#059669' : '#D1D5DB'}" stroke-width="2"/>
                <text x="60" y="25" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="14" fill="${isNodeActive('optimizer') ? 'white' : '#6B7280'}">OPTIMIZER</text>
                ${isNodeActive('optimizer') && currentStep === 3 ? `<circle cx="10" cy="10" r="4" fill="#ef4444"><animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" /></circle>` : ''}
            </g>
        </svg>
    `;
}

// --- Render Functions ---
function renderProgress() {
    progressContainer.innerHTML = '';
    steps.forEach((step, index) => {
        const isActive = index === currentStep;
        const isPast = index < currentStep;

        const dotHtml = `
            <div class="flex flex-col items-center flex-1">
                <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300
                    ${isActive ? 'bg-pytorch border-pytorch text-white' :
                isPast ? 'bg-pytorch-light border-pytorch text-pytorch' :
                    'bg-white border-gray-300 text-gray-400'}">
                    ${index + 1}
                </div>
                <div class="text-[10px] mt-1 font-medium hidden sm:block ${isActive ? 'text-pytorch' : 'text-gray-400'}">
                    ${step.id.toUpperCase()}
                </div>
            </div>
        `;

        // Add connecting line except for last item
        if (index < steps.length - 1) {
            const lineHtml = `
                <div class="h-[2px] w-full max-w-[40px] flex-1 mx-2 transition-colors duration-300
                    ${index < currentStep ? 'bg-pytorch' : 'bg-gray-200'}">
                </div>
            `;
            progressContainer.innerHTML += dotHtml + lineHtml;
        } else {
            progressContainer.innerHTML += dotHtml;
        }
    });
}

function renderContent() {
    const step = steps[currentStep];

    // Render Visual Area
    if (step.id === 'math') {
        visualArea.innerHTML = `<div class="fade-in w-full h-full flex items-center justify-center p-4">${step.math}</div>`;
        // Re-typeset math
        if (window.MathJax) {
            MathJax.typesetPromise([visualArea]).catch((err) => console.log(err.message));
        }
    } else {
        visualArea.innerHTML = `<div class="fade-in w-full h-full">${getFlowchartSVG(step.activeNodes, step.activePaths)}</div>`;
    }

    // Render Text/Code Area
    textArea.innerHTML = `
        <div class="fade-in space-y-4">
            <h2 class="text-3xl font-bold text-gray-800">${step.title}</h2>
            <p class="text-gray-600 text-lg leading-relaxed">${step.desc}</p>

            <div class="mt-6 bg-[#1e1e1e] rounded-xl overflow-hidden shadow-inner">
                <div class="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
                    <div class="flex gap-2">
                        <div class="w-3 h-3 rounded-full bg-red-500"></div>
                        <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div class="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span class="ml-4 text-xs font-mono text-gray-400">train.py</span>
                </div>
                <pre class="p-4 overflow-x-auto text-sm font-mono text-blue-300 leading-snug"><code>${step.code.replace(/#/g, '<span class="text-green-400">#</span>').replace(/model|criterion|optimizer|loss/g, '<span class="text-yellow-300">$&</span>').replace(/inputs|labels|outputs/g, '<span class="text-cyan-300">$&</span>')}</code></pre>
            </div>
        </div>
    `;

    // Update footer states
    stepCounter.innerText = `Step ${currentStep + 1} of ${steps.length}`;
    btnPrev.disabled = currentStep === 0;
    btnNext.disabled = currentStep === steps.length - 1;
}

function updateUI() {
    renderProgress();
    renderContent();
}

// --- Event Listeners ---
btnNext.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
        currentStep++;
        updateUI();
    }
});

btnPrev.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        updateUI();
    }
});

// Init
updateUI();