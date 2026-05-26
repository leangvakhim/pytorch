// Trigger KaTeX Auto-Render function
function renderMath() {
    if (window.renderMathInElement) {
        renderMathInElement(document.body, {
            delimiters: [
                { left: "$$", right: "$$", display: true },
                { left: "$", right: "$", display: false }
            ],
            throwOnError: false
        });
    }
}

// Wait for KaTeX to load initially
window.addEventListener('DOMContentLoaded', () => {
    // Need to give CDN a moment if loaded deferred
    setTimeout(renderMath, 100);
});

// Content for each step using LaTeX format
const steps = [
    {
        title: "1. The Setup: The Chain of Command",
        content: `
            <p class="text-lg text-slate-700 mb-3">Welcome! To understand gradients, we will use a corporate <strong>Chain of Command</strong> analogy.</p>
            <p class="text-lg text-slate-700">In our company, <strong>Manager q</strong> and <strong>Manager z</strong> simply add their daily performance scores together to create the <strong>Boss's Total Profit (f)</strong>.</p>
            <div class="bg-blue-50 text-blue-800 p-3 rounded-lg inline-flex items-center mt-2 border border-blue-100 font-bold">Equation: <span class="ml-2">$f = q + z$</span></div>
        `,
        action: () => {
            hideAll();
            show(['node-q', 'node-z', 'node-f', 'edge-q-f', 'edge-z-f', 'eq-f']);
        }
    },
    {
        title: "2. Decoding the Symbols: Numerator & Denominator",
        content: `
            <p class="text-lg text-slate-700 mb-3">The Del symbol ($\\partial$) means "a tiny change". When you look at a fraction like <span class="bg-slate-100 px-2 py-1 rounded">$\\frac{\\partial f}{\\partial q}$</span>, treat it like a cause and effect:</p>
            <ul class="list-disc pl-6 text-lg text-slate-700 space-y-2 mt-2">
                <li><strong>The Denominator ($\\partial q$):</strong> This is the <strong>Knob</strong> you turn (Manager q's score).</li>
                <li><strong>The Numerator ($\\partial f$):</strong> This is the <strong>Target</strong> you watch (Boss's Profit).</li>
            </ul>
            <p class="mt-4 text-slate-600 italic">It simply asks: "If I turn the <strong class="text-slate-800">$q$</strong> knob by 1 click, how many clicks does the target <strong class="text-amber-600">$f$</strong> move?"</p>
        `,
        action: () => {
            hideAll();
            show(['node-q', 'node-z', 'node-f', 'edge-q-f', 'edge-z-f', 'icon-knob', 'icon-target', 'eq-f']);
            document.getElementById('node-q').classList.add('highlight-pulse');
            document.getElementById('node-f').classList.add('highlight-pulse');
        }
    },
    {
        title: "3. The Ultimate Goal: $\\nabla f = 1$",
        content: `
            <p class="text-lg text-slate-700 mb-3">PyTorch always starts at the final output. What is the Boss's impact on themselves?</p>
            <p class="text-lg text-slate-700 mb-3">If we turn the Profit knob ($\\partial f$) by 1, the Profit target ($\\partial f$) moves exactly 1. Therefore, <span class="bg-blue-50 px-2 py-1 rounded text-blue-700">$\\frac{\\partial f}{\\partial f} = 1$</span>.</p>
            <p class="text-lg text-slate-700">The Nabla symbol (<strong class="text-blue-600">$\\nabla$</strong>) is just PyTorch shorthand for <em>"Total Impact on the Final Boss."</em> So, we define <strong>$\\nabla f = 1$</strong>. This is the seed that starts the backward pass!</p>
        `,
        action: () => {
            hideAll();
            show(['node-q', 'node-z', 'node-f', 'edge-q-f', 'edge-z-f', 'label-nabla-f', 'label-nabla-f-detail', 'eq-f']);
            document.getElementById('node-f').classList.add('highlight-pulse');
        }
    },
    {
        title: "4. The Local Gradient: Manager's Direct Impact",
        content: `
            <p class="text-lg text-slate-700 mb-3">Now look at <strong>Manager q</strong>. What is their <em>direct, local impact</em> on the Boss?</p>
            <p class="text-lg text-slate-700 mb-3">Because they are connected by simple addition ($f = q + z$), if Manager q increases their score by exactly 1, Total Profit increases by exactly 1.</p>
            <p class="text-lg text-slate-700">This means the <strong>Local Gradient</strong> is 1. <span class="ml-2 bg-slate-100 px-2 py-1 rounded">$\\frac{\\partial f}{\\partial q} = 1$</span>. (The exact same is true for Manager z).</p>
        `,
        action: () => {
            hideAll();
            show(['node-q', 'node-z', 'node-f', 'edge-q-f', 'edge-z-f', 'label-nabla-f', 'label-del-q', 'eq-f']);
            document.getElementById('edge-q-f').classList.add('stroke-blue-500');
        }
    },
    {
        title: "5. The Chain Rule: Incoming $\\times$ Local",
        content: `
            <p class="text-lg text-slate-700 mb-3">To find Manager q's total impact on the company (<strong class="text-red-600">$\\nabla q$</strong>), PyTorch works backwards using the <strong>Chain Rule</strong>.</p>
            <div class="bg-red-50 p-4 rounded-lg border border-red-100 mb-3">
                <p class="font-bold text-red-800 mb-2">Total Impact = Incoming Gradient $\\times$ Local Gradient</p>
                <p class="text-red-700">$\\nabla q = \\nabla f \\times \\frac{\\partial f}{\\partial q}$</p>
            </div>
            <p class="text-lg text-slate-700">The Boss passes down an incoming gradient of <strong>1</strong>. Manager q's local gradient is <strong>1</strong>. Therefore, <strong class="text-red-600">$\\nabla q = 1 \\times 1 = 1$</strong>.</p>
        `,
        action: () => {
            hideAll();
            show(['node-q', 'node-z', 'node-f', 'edge-q-f', 'edge-z-f', 'label-nabla-f', 'label-del-q', 'edge-f-q', 'edge-f-z', 'label-nabla-q', 'eq-f']);
        }
    },
    {
        title: "6. Expanding the Chain: The Worker",
        content: `
            <p class="text-lg text-slate-700 mb-3">Why do we multiply? Let's add <strong>Worker x</strong>. Say they report to Manager q, and their Local Gradient is <strong>5</strong> ($\\frac{\\partial q}{\\partial x} = 5$).</p>
            <p class="text-lg text-slate-700 mb-3">Imagine the Boss tells the managers: <em>"Right now, every 1 point of KPI is worth $100 to me!"</em> ($\\nabla q = 100$).</p>
            <p class="text-lg text-slate-700">To find Worker x's total impact on the Boss (<strong class="text-red-600">$\\nabla x$</strong>), we multiply the Incoming Gradient ($100) by the Local Gradient (5). <br><strong>Total Impact = $500!</strong> This is how PyTorch calculates gradients.</p>
        `,
        action: () => {
            hideAll();
            show(['node-x', 'node-q', 'node-z', 'node-f', 'edge-q-f', 'edge-z-f', 'edge-x-q', 'edge-q-x', 'edge-f-q', 'label-del-x', 'label-nabla-x', 'eq-f']);
            // Custom update for step 6 to show the 100 multiplier example
            document.getElementById('box-nabla-q').innerHTML = `
                <div class="font-bold text-xs mb-1 text-red-800">Incoming Gradient</div>
                <div class="text-lg">$\\nabla q = 100$</div>
            `;
            show(['label-nabla-q']);
        }
    }
];

let currentStep = 0;

// UI Elements
const contentArea = document.getElementById('content-area');
const stepCounter = document.getElementById('step-counter');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

// Helper to reset and hide all SVG elements
function hideAll() {
    const elementsToHide = [
        'node-x', 'edge-x-q', 'edge-f-q', 'edge-f-z', 'edge-q-x', 'eq-f',
        'icon-knob', 'icon-target', 'label-nabla-f', 'label-nabla-f-detail',
        'label-del-q', 'label-nabla-q', 'label-del-x', 'label-nabla-x'
    ];
    elementsToHide.forEach(id => {
        document.getElementById(id).classList.remove('visible-el');
        document.getElementById(id).classList.add('hidden-el');
    });

    // Remove special classes
    document.querySelectorAll('.highlight-pulse').forEach(el => el.classList.remove('highlight-pulse'));
    document.getElementById('edge-q-f').classList.remove('stroke-blue-500');

    // Reset node q text for step 6 reversal
    document.getElementById('box-nabla-q').innerHTML = `
        <div class="font-bold text-xs mb-1 text-red-800">$\\text{Incoming} \\times \\text{Local}$</div>
        <div class="text-lg">$\\nabla q = 1 \\times 1 = 1$</div>
    `;
}

// Helper to show specific SVG elements
function show(ids) {
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.classList.remove('hidden-el');
            el.classList.add('visible-el');
        }
    });
}

// Render current step
function renderStep() {
    const step = steps[currentStep];

    // Update Text Content
    contentArea.innerHTML = `
        <h2 class="text-2xl font-bold text-slate-800 mb-4">${step.title}</h2>
        ${step.content}
    `;

    // Update Counter
    stepCounter.innerText = `Step ${currentStep + 1} of ${steps.length}`;

    // Update Buttons
    btnPrev.disabled = currentStep === 0;
    btnNext.disabled = currentStep === steps.length - 1;

    // Trigger SVG Action (which resets and updates DOM elements)
    step.action();

    // Re-render KaTeX on the entire body to catch the new dynamic text
    // We use setTimeout to ensure the DOM has updated before parsing
    setTimeout(renderMath, 10);
}

// Event Listeners
btnNext.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
        currentStep++;
        renderStep();
    }
});

btnPrev.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        renderStep();
    }
});

// Initialize
renderStep();