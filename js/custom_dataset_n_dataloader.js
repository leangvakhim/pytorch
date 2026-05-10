// Data for each step of the visualization
const steps = [
    {
        title: "1. The Raw Data",
        description: "Before deep learning begins, data is usually messy and sits on your hard drive. It might be a folder full of raw images, a huge CSV file, or a collection of text documents. PyTorch needs a structured way to read this.",
        visual: `
            <div class="flex flex-col md:flex-row items-center justify-center gap-8 w-full">
                <div class="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center gap-4 w-48">
                    <i class="fa-solid fa-folder-open text-6xl text-blue-400"></i>
                    <span class="font-semibold">Images/</span>
                    <div class="flex gap-2 text-sm text-gray-500">
                        <i class="fa-solid fa-image"></i> cat.jpg
                    </div>
                    <div class="flex gap-2 text-sm text-gray-500">
                        <i class="fa-solid fa-image"></i> dog.jpg
                    </div>
                </div>
                <i class="fa-solid fa-plus text-2xl text-gray-300"></i>
                <div class="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center gap-4 w-48">
                    <i class="fa-solid fa-file-csv text-6xl text-green-500"></i>
                    <span class="font-semibold">labels.csv</span>
                    <div class="text-xs text-gray-500 font-mono text-center">
                        id, label<br>cat.jpg, 0<br>dog.jpg, 1
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "2. The Custom Dataset Class",
        description: "To bridge the gap between raw files and PyTorch, we create a Custom Dataset by inheriting from <code>torch.utils.data.Dataset</code>. You must define three magic functions:",
        visual: `
            <div class="bg-gray-900 rounded-xl p-5 text-left font-mono text-sm sm:text-base text-gray-300 shadow-lg overflow-x-auto code-scroll w-full max-w-2xl mx-auto">
                <div class="text-purple-400">class <span class="text-yellow-300">MyCustomDataset</span><span class="text-gray-300">(Dataset):</span></div>

                <div class="ml-4 mt-2">
                    <span class="text-gray-500"># 1. Setup paths or load csv</span><br>
                    <span class="text-blue-400">def</span> <span class="text-green-300">__init__</span>(self, data_dir):<br>
                    <span class="ml-4">self.data = load_data(data_dir)</span>
                </div>

                <div class="ml-4 mt-4">
                    <span class="text-gray-500"># 2. Return total number of samples</span><br>
                    <span class="text-blue-400">def</span> <span class="text-green-300">__len__</span>(self):<br>
                    <span class="ml-4 text-orange-400">return</span> len(self.data)
                </div>

                <div class="ml-4 mt-4 bg-gray-800 p-2 rounded border border-gray-700">
                    <span class="text-gray-500"># 3. Fetch ONE sample by index (The most important!)</span><br>
                    <span class="text-blue-400">def</span> <span class="text-green-300">__getitem__</span>(self, index):<br>
                    <span class="ml-4">image = read_image(self.data[index])</span><br>
                    <span class="ml-4">label = self.labels[index]</span><br>
                    <span class="ml-4 text-orange-400">return</span> image, label
                </div>
            </div>
        `
    },
    {
        title: "3. Data Transformations & The Equation",
        description: "Inside <code>__getitem__</code>, we usually apply <strong>Transforms</strong> to tensors. A critical mathematical step in Deep Learning is <strong>Normalization (Z-Score)</strong>. This ensures all features have a mean of 0 and a standard deviation of 1, helping the neural network learn faster and avoid exploding gradients.",
        visual: `
            <div class="flex flex-col items-center justify-center gap-6">
                <div class="bg-blue-50 border border-blue-200 text-blue-900 p-6 rounded-2xl shadow-sm text-center max-w-lg">
                    <h3 class="font-bold text-lg mb-4">Standardization (Z-Score Normalization)</h3>
                    <div class="text-2xl sm:text-4xl py-4 overflow-x-auto">
                        $$ z = \\frac{x - \\mu}{\\sigma} $$
                    </div>
                    <ul class="text-sm text-left mt-4 space-y-2 text-blue-800">
                        <li><strong>\\( x \\)</strong> : The original pixel value (e.g., 0 to 255)</li>
                        <li><strong>\\( \\mu \\) (mu)</strong> : The Mean (average) of the dataset</li>
                        <li><strong>\\( \\sigma \\) (sigma)</strong> : The Standard Deviation</li>
                        <li><strong>\\( z \\)</strong> : The normalized output fed to the network</li>
                    </ul>
                </div>
                <div class="text-sm text-gray-500 font-mono bg-gray-100 px-4 py-2 rounded-lg border border-gray-200">
                    transforms.Normalize(mean=[0.485, ...], std=[0.229, ...])
                </div>
            </div>
        `
    },
    {
        title: "4. The DataLoader (The Worker)",
        description: "The Dataset gets one item at a time. The <code>DataLoader</code> wraps the Dataset and provides powerful features: <strong>Batching</strong> (grouping items), <strong>Shuffling</strong> (mixing data), and <strong>Multiprocessing</strong> (loading data in parallel using workers).",
        visual: `
            <div class="flex flex-col items-center gap-8 w-full">
                <!-- Raw items -->
                <div class="flex gap-2">
                    <div class="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center font-bold text-gray-500">1</div>
                    <div class="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center font-bold text-gray-500">2</div>
                    <div class="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center font-bold text-gray-500">3</div>
                    <div class="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center font-bold text-gray-500">4</div>
                </div>

                <!-- Down Arrow -->
                <div class="flex flex-col items-center text-pytorch">
                    <i class="fa-solid fa-shuffle text-xl mb-1"></i>
                    <i class="fa-solid fa-arrow-down text-2xl"></i>
                    <span class="text-xs font-bold uppercase tracking-wider mt-1">DataLoader (Batch Size = 4)</span>
                </div>

                <!-- Batched output -->
                <div class="bg-orange-100 border-2 border-pytorch p-4 rounded-xl shadow-md relative">
                    <div class="absolute -top-3 -right-3 bg-pytorch text-white text-xs font-bold px-2 py-1 rounded-full shadow">Batch 1</div>
                    <div class="grid grid-cols-2 gap-2">
                        <div class="w-16 h-16 bg-white rounded border border-orange-200 flex items-center justify-center font-bold text-pytorch">3</div>
                        <div class="w-16 h-16 bg-white rounded border border-orange-200 flex items-center justify-center font-bold text-pytorch">1</div>
                        <div class="w-16 h-16 bg-white rounded border border-orange-200 flex items-center justify-center font-bold text-pytorch">4</div>
                        <div class="w-16 h-16 bg-white rounded border border-orange-200 flex items-center justify-center font-bold text-pytorch">2</div>
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "5. The Training Loop",
        description: "Finally, everything comes together in the training loop. You iterate over the DataLoader, which automatically calls your Dataset's <code>__getitem__</code>, applies the math transforms, groups them into batches, and hands them to your model via the GPU.",
        visual: `
            <div class="flex flex-col items-center w-full">

                <div class="bg-gray-900 rounded-xl p-5 text-left font-mono text-sm sm:text-base text-gray-300 shadow-lg overflow-x-auto w-full max-w-xl mx-auto mb-6">
                    <div class="text-orange-400">for <span class="text-white">batch_images, batch_labels</span> in <span class="text-blue-300">dataloader</span>:</div>
                    <div class="ml-8 mt-2 text-gray-500"># 1. Move data to GPU</div>
                    <div class="ml-8 text-white">images = batch_images.to(device)</div>
                    <div class="ml-8 text-white">labels = batch_labels.to(device)</div>
                    <br>
                    <div class="ml-8 text-gray-500"># 2. Feed to Neural Network</div>
                    <div class="ml-8 text-white">predictions = model(images)</div>
                    <br>
                    <div class="ml-8 text-gray-500"># 3. Calculate Loss & Update Weights</div>
                    <div class="ml-8 text-white">loss = criterion(predictions, labels)</div>
                    <div class="ml-8 text-white">loss.backward()</div>
                </div>

                <div class="flex items-center gap-4 text-pytorch font-bold text-lg">
                    <i class="fa-solid fa-database text-gray-400"></i>
                    <i class="fa-solid fa-arrow-right"></i>
                    <i class="fa-solid fa-layer-group"></i>
                    <i class="fa-solid fa-arrow-right"></i>
                    <i class="fa-solid fa-microchip"></i>
                </div>
            </div>
        `
    }
];

let currentStep = 0;

// DOM Elements
const contentContainer = document.getElementById('content-container');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const stepCounter = document.getElementById('step-counter');
const progressBar = document.getElementById('progress-bar');
const dotsContainer = document.getElementById('dots-container');

// Initialize App
function init() {
    // Create navigation dots
    steps.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `w-2 h-2 rounded-full transition-colors duration-300 ${index === 0 ? 'bg-pytorch' : 'bg-gray-300'}`;
        dot.id = `dot-${index}`;
        dotsContainer.appendChild(dot);
    });

    // Event Listeners
    btnPrev.addEventListener('click', () => changeStep(-1));
    btnNext.addEventListener('click', () => changeStep(1));

    renderStep();
}

// Change step logic
function changeStep(direction) {
    currentStep += direction;

    // Boundary checks
    if (currentStep < 0) currentStep = 0;
    if (currentStep >= steps.length) currentStep = steps.length - 1;

    renderStep();
}

// Render the current step to the DOM
function renderStep() {
    const stepData = steps[currentStep];

    // Update Header & Progress
    stepCounter.innerText = `Step ${currentStep + 1} of ${steps.length}`;
    progressBar.style.width = `${((currentStep + 1) / steps.length) * 100}%`;

    // Update Dots
    steps.forEach((_, index) => {
        const dot = document.getElementById(`dot-${index}`);
        if (index === currentStep) {
            dot.classList.remove('bg-gray-300');
            dot.classList.add('bg-pytorch');
        } else {
            dot.classList.remove('bg-pytorch');
            dot.classList.add('bg-gray-300');
        }
    });

    // Button States
    btnPrev.disabled = currentStep === 0;
    btnNext.disabled = currentStep === steps.length - 1;

    // Render Content with animation reset
    contentContainer.classList.remove('fade-in');
    void contentContainer.offsetWidth; // Trigger reflow
    contentContainer.classList.add('fade-in');

    contentContainer.innerHTML = `
        <div class="text-center max-w-3xl mx-auto mb-4">
            <h2 class="text-2xl font-bold text-gray-800 mb-3">${stepData.title}</h2>
            <p class="text-gray-600 leading-relaxed text-sm sm:text-base">${stepData.description}</p>
        </div>
        <div class="flex-grow flex items-center justify-center w-full">
            ${stepData.visual}
        </div>
    `;

    // Tell MathJax to re-render equations if present
    if (window.MathJax) {
        MathJax.typesetPromise().catch((err) => console.log('MathJax error:', err));
    }
}

// Start
window.addEventListener('DOMContentLoaded', init);