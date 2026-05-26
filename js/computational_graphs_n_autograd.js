// Store our steps data
const steps = [
    {
        title: "The Objective",
        desc: "We have a simple mathematical function with three inputs (x, y, z). Our goal is to calculate the final output (Forward Pass) and then figure out how much each input contributed to the output (Backward Pass / Gradients).",
        math: "f(x,y,z) = (x \\times y) + z",
        svgState: [] // which SVG elements to show
    },
    {
        title: "Step 1: Input Tensors",
        desc: "In PyTorch, we define our variables as Tensors with <code>requires_grad=True</code>. These form the starting nodes (leaves) of our computational graph.",
        math: "\\text{Let } x=2, \\; y=3, \\; z=4",
        svgState: ['node-inputs']
    },
    {
        title: "Step 2: Forward Pass (Multiplication)",
        desc: "PyTorch evaluates operations step-by-step. First, it creates an intermediate node <b>q</b> for the multiplication. It saves this graph in memory for later.",
        math: "q = x \\times y = 2 \\times 3 = 6",
        svgState: ['node-inputs', 'forward-edges', 'node-q']
    },
    {
        title: "Step 3: Forward Pass (Addition)",
        desc: "Next, it adds <b>z</b> to <b>q</b> to get our final output <b>f</b>. The Forward Pass is now complete! The blue graph represents PyTorch's memory of the operations.",
        math: "f = q + z = 6 + 4 = 10",
        svgState: ['node-inputs', 'forward-edges', 'node-q', 'node-f']
    },
    {
        title: "The Math: Chain Rule Equations",
        desc: "Before we go backwards, let's look at the Calculus. Autograd uses the <b>Chain Rule</b>. To find how <b>x</b> affects <b>f</b> ($\\frac{\\partial f}{\\partial x}$), we multiply the local gradients along the path.",
        math: "\\begin{aligned} &\\frac{\\partial f}{\\partial q} = 1, \\quad \\frac{\\partial f}{\\partial z} = 1 \\\\[6pt] &\\frac{\\partial q}{\\partial x} = y, \\quad \\frac{\\partial q}{\\partial y} = x \\\\[6pt] &\\frac{\\partial f}{\\partial x} = \\frac{\\partial f}{\\partial q} \\times \\frac{\\partial q}{\\partial x} = 1 \\times 3 = 3 \\end{aligned}",
        svgState: ['node-inputs', 'forward-edges', 'node-q', 'node-f']
    },
    {
        title: "Step 4: Backward Pass (Output & Addition)",
        desc: "When we call <code>f.backward()</code>, PyTorch pushes a gradient of 1 starting from <b>f</b>. Because addition just passes gradients equally, <b>q</b> and <b>z</b> receive a gradient of 1.",
        math: "\\nabla f = 1 \\\\ \\nabla q = 1, \\quad \\nabla z = 1",
        svgState: ['node-inputs', 'forward-edges', 'node-q', 'node-f', 'grad-f', 'backward-edges-1', 'grad-q-z']
    },
    {
        title: "Step 5: Backward Pass (Multiplication)",
        desc: "The gradient continues to flow back to <b>x</b> and <b>y</b>. For multiplication, the local gradient is the <i>other</i> multiplier. PyTorch multiplies the incoming gradient (1) by the local gradients (y and x).",
        math: "\\nabla x = \\nabla q \\times y = 1 \\times 3 = 3 \\\\ \\nabla y = \\nabla q \\times x = 1 \\times 2 = 2",
        svgState: ['node-inputs', 'forward-edges', 'node-q', 'node-f', 'grad-f', 'backward-edges-1', 'grad-q-z', 'backward-edges-2', 'grad-x-y']
    }
];

let currentStep = 0;

function updateUI() {
    const stepData = steps[currentStep];

    // Update Text
    document.getElementById('step-badge').innerText = `Step ${currentStep} / ${steps.length - 1}`;
    document.getElementById('step-title').innerText = stepData.title;

    // Parse inline math ($...$) in the description using KaTeX
    const formattedDesc = stepData.desc.replace(/\$(.*?)\$/g, (match, mathContent) => {
        return katex.renderToString(mathContent, { throwOnError: false, displayMode: false });
    });
    document.getElementById('step-desc').innerHTML = formattedDesc;

    // Render Math using KaTeX
    const mathContainer = document.getElementById('math-container');
    if (stepData.math) {
        katex.render(stepData.math, mathContainer, {
            throwOnError: false,
            displayMode: true
        });
    } else {
        mathContainer.innerHTML = "";
    }

    // Update Buttons
    document.getElementById('btn-back').disabled = currentStep === 0;
    document.getElementById('btn-next').disabled = currentStep === steps.length - 1;

    // Toggle Chain Rule Button visibility (Only in Step 4)
    const chainRuleBtn = document.getElementById('chain-rule-btn-container');
    if (currentStep === 4) {
        chainRuleBtn.classList.remove('hidden');
    } else {
        chainRuleBtn.classList.add('hidden');
    }

    // Toggle Backward Pass 1 Button visibility (Only in Step 5)
    const backwardPass1Btn = document.getElementById('backward-pass-1-btn-container');
    if (currentStep === 5) {
        backwardPass1Btn.classList.remove('hidden');
    } else {
        backwardPass1Btn.classList.add('hidden');
    }

    // Toggle Backward Pass 1 Button visibility (Only in Step 6)
    const backwardPass1BtnMultiplication = document.getElementById('backward-pass-1-btn-multiplication');
    if (currentStep === 6) {
        backwardPass1BtnMultiplication.classList.remove('hidden');
    } else {
        backwardPass1BtnMultiplication.classList.add('hidden');
    }

    // Update SVG States
    // First, hide everything
    const allElements = ['node-inputs', 'forward-edges', 'node-q', 'node-f', 'grad-f', 'backward-edges-1', 'grad-q-z', 'backward-edges-2', 'grad-x-y'];
    allElements.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.classList.remove('visible-node');
            el.classList.add('hidden-node');
        }
    });

    // Then, show elements for the current step
    stepData.svgState.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.classList.remove('hidden-node');
            el.classList.add('visible-node');
        }
    });
}

function changeStep(direction) {
    currentStep += direction;
    if (currentStep < 0) currentStep = 0;
    if (currentStep >= steps.length) currentStep = steps.length - 1;
    updateUI();
}

// Initialize first step after page loads to ensure KaTeX is ready
window.onload = () => {
    updateUI();
};