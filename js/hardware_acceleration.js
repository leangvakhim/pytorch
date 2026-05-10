const steps = [
    {
        title: "1. The Deep Learning Bottleneck",
        description: "Deep Learning involves pushing massive amounts of data through neural networks. A standard CPU (Central Processing Unit) is like a few highly intelligent professors—great at complex, sequential logic, but easily overwhelmed when forced to solve millions of simple arithmetic problems one by one.",
        visual: `
            <div class="flex flex-col items-center justify-center h-full space-y-6">
                <div class="text-lg font-semibold text-slate-500">CPU Processing (Sequential)</div>
                <div class="grid grid-cols-2 gap-4">
                    <!-- 4 Large CPU Cores -->
                    <div class="w-24 h-24 bg-blue-100 border-2 border-blue-400 rounded-lg flex items-center justify-center font-bold text-blue-700 shadow-inner">Core 1</div>
                    <div class="w-24 h-24 bg-blue-100 border-2 border-blue-400 rounded-lg flex items-center justify-center font-bold text-blue-700 shadow-inner">Core 2</div>
                    <div class="w-24 h-24 bg-blue-100 border-2 border-blue-400 rounded-lg flex items-center justify-center font-bold text-blue-700 shadow-inner">Core 3</div>
                    <div class="w-24 h-24 bg-blue-100 border-2 border-blue-400 rounded-lg flex items-center justify-center font-bold text-blue-700 shadow-inner">Core 4</div>
                </div>
                <p class="text-sm text-slate-500 max-w-sm text-center">A CPU has a few powerful cores that process tasks sequentially (one after the other).</p>
            </div>
        `,
        equation: ""
    },
    {
        title: "2. The Hardware Accelerator (GPU)",
        description: "Enter the GPU (Graphics Processing Unit). Think of it as an army of thousands of elementary students. Individually, they aren't as smart as the professor, but together, they can solve millions of simple addition and multiplication problems simultaneously.",
        visual: `
            <div class="flex flex-col items-center justify-center h-full space-y-6">
                <div class="text-lg font-semibold text-slate-500">GPU Processing (Parallel)</div>
                <div class="grid grid-cols-8 gap-1 p-2 bg-[#EE4C2C] rounded-lg bg-opacity-10">
                    <!-- 64 Small GPU Cores -->
                    ${Array(64).fill(0).map(() => `<div class="w-6 h-6 bg-[#EE4C2C] border border-[#d63f21] rounded shadow-sm opacity-80 animate-pulse" style="animation-delay: ${Math.random() * 2}s"></div>`).join('')}
                </div>
                <p class="text-sm text-slate-500 max-w-sm text-center">A GPU has thousands of smaller cores designed to execute tasks strictly in parallel.</p>
            </div>
        `,
        equation: ""
    },
    {
        title: "3. Why Parallelism? The Neural Network Math",
        description: "Why do we need so many simple calculations? The foundation of Neural Networks is <strong>Matrix Multiplication</strong>. Every layer transforms data by multiplying inputs by weights and adding a bias.",
        visual: `
            <div class="flex flex-col items-center justify-center h-full space-y-8">
                <div class="text-center">
                    <h3 class="font-semibold text-lg mb-2">Linear Layer Equation</h3>
                    <div class="text-2xl p-4 bg-slate-50 rounded-xl border border-slate-200">
                        $$Y = W \\cdot X + b$$
                    </div>
                </div>
                <ul class="text-sm text-slate-600 space-y-2 max-w-md list-disc list-inside">
                    <li><strong>X</strong>: Input data matrix</li>
                    <li><strong>W</strong>: Weight matrix (parameters learned by the model)</li>
                    <li><strong>b</strong>: Bias vector</li>
                    <li><strong>Y</strong>: Output matrix (passed to the next layer)</li>
                </ul>
            </div>
        `,
        equation: "" // Handled in visual
    },
    {
        title: "4. The Matrix Multiplication Breakdown",
        description: "To compute a single element in the output matrix, we compute the <em>dot product</em> of a row and a column. A CPU does this one element at a time. A GPU computes all output elements at the exact same time because they are completely independent operations!",
        visual: `
            <div class="flex flex-col items-center justify-center h-full space-y-6">
                <div class="flex items-center gap-4">
                    <!-- Matrix W (Weights) -->
                    <div class="text-center">
                        <div class="text-sm font-semibold mb-1">Matrix W</div>
                        <div class="matrix grid-cols-3">
                            <div class="cell highlight-a">a</div><div class="cell highlight-a">b</div><div class="cell highlight-a">c</div>
                            <div class="cell">d</div><div class="cell">e</div><div class="cell">f</div>
                            <div class="cell">g</div><div class="cell">h</div><div class="cell">i</div>
                        </div>
                    </div>
                    <div class="text-xl font-bold">&times;</div>
                    <!-- Matrix X (Inputs) -->
                    <div class="text-center">
                        <div class="text-sm font-semibold mb-1">Matrix X</div>
                        <div class="matrix grid-cols-3">
                            <div class="cell">1</div><div class="cell highlight-b">2</div><div class="cell">3</div>
                            <div class="cell">4</div><div class="cell highlight-b">5</div><div class="cell">6</div>
                            <div class="cell">7</div><div class="cell highlight-b">8</div><div class="cell">9</div>
                        </div>
                    </div>
                    <div class="text-xl font-bold">=</div>
                    <!-- Matrix Y (Output) -->
                    <div class="text-center">
                        <div class="text-sm font-semibold mb-1">Matrix Y</div>
                        <div class="matrix grid-cols-3">
                            <div class="cell"></div><div class="cell highlight-c">y</div><div class="cell"></div>
                            <div class="cell"></div><div class="cell"></div><div class="cell"></div>
                            <div class="cell"></div><div class="cell"></div><div class="cell"></div>
                        </div>
                    </div>
                </div>
                <div class="bg-purple-50 border border-purple-200 p-4 rounded-xl text-center mt-4">
                    <p class="text-sm text-purple-800 font-medium mb-2">Equation for single element 'y':</p>
                    $$y = (a \\times 2) + (b \\times 5) + (c \\times 8)$$
                    <p class="text-xs text-purple-600 mt-2">A GPU calculates this for EVERY cell in Matrix Y simultaneously.</p>
                </div>
            </div>
        `,
        equation: ""
    },
    {
        title: "5. PyTorch Makes It Effortless",
        description: "Writing raw GPU code (CUDA) is incredibly complex. Industry frameworks like PyTorch abstract all of this away. You simply define a \"device\" and send your tensors and models to it using the <code>.to()</code> method.",
        visual: `
            <div class="flex flex-col items-center justify-center h-full w-full">
                <div class="w-full max-w-2xl bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl">
                    <div class="flex items-center px-4 py-2 bg-[#2d2d2d] border-b border-[#404040]">
                        <div class="flex space-x-2">
                            <div class="w-3 h-3 rounded-full bg-red-500"></div>
                            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div class="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div class="ml-4 text-xs text-gray-400 font-mono">accelerate.py</div>
                    </div>
                    <div class="p-6 text-sm font-mono text-gray-300 overflow-x-auto leading-relaxed">
<div class="code-line" style="animation-delay: 0.6s"><span class="text-blue-400">import</span> torch</div><br>
<div class="code-line" style="animation-delay: 1.5s"><span class="text-gray-500"># 1. Check if hardware accelerator is available (CUDA for NVIDIA, MPS for Apple Silicon)</span></div>
<div class="code-line" style="animation-delay: 1.8s">device = torch.<span class="text-yellow-200">device</span>(<span class="text-green-400">"cuda"</span> <span class="text-blue-400">if</span> torch.cuda.<span class="text-yellow-200">is_available</span>() <span class="text-blue-400">else</span> <span class="text-green-400">"cpu"</span>)</div>
<div class="code-line" style="animation-delay: 2.1s"><span class="text-blue-300">print</span>(<span class="text-green-400">f"Using device: {device}"</span>)</div><br>
<div class="code-line" style="animation-delay: 3.0s"><span class="text-gray-500"># 2. Create data and model</span></div>
<div class="code-line" style="animation-delay: 3.3s">weights = torch.<span class="text-yellow-200">randn</span>(<span class="text-purple-400">10000</span>, <span class="text-purple-400">10000</span>)</div>
<div class="code-line" style="animation-delay: 3.6s">inputs = torch.<span class="text-yellow-200">randn</span>(<span class="text-purple-400">10000</span>, <span class="text-purple-400">10000</span>)</div><br>
<div class="code-line" style="animation-delay: 4.5s"><span class="text-gray-500"># 3. Move them to the GPU! (The Magic Step)</span></div>
<div class="code-line" style="animation-delay: 4.8s">weights = weights.<span class="text-yellow-200">to</span>(device)</div>
<div class="code-line" style="animation-delay: 5.1s">inputs = inputs.<span class="text-yellow-200">to</span>(device)</div><br>
<div class="code-line" style="animation-delay: 6.0s"><span class="text-gray-500"># 4. Perform massive parallel matrix multiplication</span></div>
<div class="code-line" style="animation-delay: 6.3s">output = torch.<span class="text-yellow-200">matmul</span>(weights, inputs)</div>
                    </div>
                </div>
            </div>
        `,
        equation: ""
    }
];

let currentStep = 0;

// DOM Elements
const stepContent = document.getElementById('step-content');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const stepIndicator = document.getElementById('step-indicator');
const progressDots = document.getElementById('progress-dots');

function init() {
    // Create progress dots
    steps.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `w-2.5 h-2.5 rounded-full transition-colors duration-300 ${index === 0 ? 'bg-[#EE4C2C]' : 'bg-slate-200'}`;
        dot.id = `dot-${index}`;
        progressDots.appendChild(dot);
    });

    // Event Listeners
    btnPrev.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            renderStep();
        }
    });

    btnNext.addEventListener('click', () => {
        if (currentStep < steps.length - 1) {
            currentStep++;
            renderStep();
        }
    });

    renderStep();
}

function renderStep() {
    const step = steps[currentStep];

    // Remove animation class to re-trigger it
    stepContent.classList.remove('fade-in');

    // Allow DOM to update before re-adding class
    setTimeout(() => {
        stepContent.innerHTML = `
            <div class="mb-6">
                <h2 class="text-3xl font-bold text-slate-800 mb-4">${step.title}</h2>
                <p class="text-lg text-slate-600 leading-relaxed">${step.description}</p>
            </div>
            <div class="flex-1 bg-white border border-slate-100 rounded-xl shadow-sm p-6 overflow-hidden flex items-center justify-center">
                ${step.visual}
            </div>
        `;
        stepContent.classList.add('fade-in');

        // Trigger MathJax to re-render equations dynamically added to the DOM
        if (window.MathJax) {
            MathJax.typesetPromise([stepContent]).catch(function (err) {
                console.error('MathJax rendering error: ' + err.message);
            });
        }
    }, 50);

    // Update Controls
    btnPrev.disabled = currentStep === 0;
    btnNext.disabled = currentStep === steps.length - 1;
    stepIndicator.innerText = `Step ${currentStep + 1} of ${steps.length}`;

    // Update Dots
    steps.forEach((_, index) => {
        const dot = document.getElementById(`dot-${index}`);
        if (index === currentStep) {
            dot.classList.remove('bg-slate-200');
            dot.classList.add('bg-[#EE4C2C]');
        } else {
            dot.classList.remove('bg-[#EE4C2C]');
            dot.classList.add('bg-slate-200');
        }
    });
}

// Initialize App
document.addEventListener('DOMContentLoaded', init);