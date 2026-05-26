// <!-- Application Logic -->
document.addEventListener("DOMContentLoaded", () => {
    // State data for each step in our presentation
    const stepsData = [
        {
            title: "Step 1: The Setup",
            description: `
                <p>Welcome! Here is our initial computational graph.</p>
                <p>We start with inputs <span class="text-blue-600 font-semibold">$x=2$</span>, <span class="text-blue-600 font-semibold">$y=3$</span>, and <span class="text-blue-600 font-semibold">$z=4$</span>.</p>
                <p>Our ultimate goal is to calculate the output for the function:<br>
                <div class="bg-gray-50 p-3 rounded border text-center mt-2 text-lg">$$f = (x \\cdot y) + z$$</div></p>
            `,
            state: { q_val: "?", f_val: "?", fwd_m: 0, fwd_a: 0, grad_f: 0, bwd_a: 0, bwd_m: 0 }
        },
        {
            title: "Step 2: Forward Pass (Multiply)",
            description: `
                <p>First, PyTorch flows the data forward. It executes the multiplication node first.</p>
                <ul class="list-disc pl-5 mt-2 space-y-1">
                    <li>$q = x \\cdot y$</li>
                    <li>$q = 2 \\cdot 3 = \\mathbf{6}$</li>
                </ul>
                <p class="mt-4">The intermediate value <span class="text-blue-600 font-semibold">$q$</span> is now 6.</p>
            `,
            state: { q_val: "6", f_val: "?", fwd_m: 1, fwd_a: 0, grad_f: 0, bwd_a: 0, bwd_m: 0 }
        },
        {
            title: "Step 3: Forward Pass (Add)",
            description: `
                <p>Next, it executes the addition node to get our final output.</p>
                <ul class="list-disc pl-5 mt-2 space-y-1">
                    <li>$f = q + z$</li>
                    <li>$f = 6 + 4 = \\mathbf{10}$</li>
                </ul>
                <p class="mt-4">The forward pass is complete. The final answer is 10.</p>
            `,
            state: { q_val: "6", f_val: "10", fwd_m: 1, fwd_a: 1, grad_f: 0, bwd_a: 0, bwd_m: 0 }
        },
        {
            title: "Step 4: Backward Pass (Start)",
            description: `
                <p>Now we trigger <strong>Autograd</strong> to calculate the gradients (how much a change in inputs affects $f$).</p>
                <p>We start at the very end. The gradient of the final output with respect to itself is exactly 1.</p>
                <div class="bg-red-50 text-red-700 p-2 rounded border border-red-100 text-center mt-4 text-lg">
                    $$\\nabla f = 1$$
                </div>
            `,
            state: { q_val: "6", f_val: "10", fwd_m: 1, fwd_a: 1, grad_f: 1, bwd_a: 0, bwd_m: 0 }
        },
        {
            title: "Step 5: Backward Pass (Addition)",
            description: `
                <p>The gradient flows backward into the addition node ($q + z$).</p>
                <p>Addition acts as a <strong>router</strong>. If you increase $q$ by 1, $f$ increases by 1. Therefore, it just evenly distributes the incoming gradient backward to its branches.</p>
                <div class="bg-red-50 text-red-700 p-3 rounded border border-red-100 mt-4 space-y-1 font-medium">
                    $$ \\begin{aligned} \\nabla q &= \\nabla f = 1 \\\\ \\nabla z &= \\nabla f = 1 \\end{aligned} $$
                </div>
            `,
            state: { q_val: "6", f_val: "10", fwd_m: 1, fwd_a: 1, grad_f: 1, bwd_a: 1, bwd_m: 0 }
        },
        {
            title: "Step 6: The \"Nudge\" Concept",
            description: `
                <p>Now we hit the multiplication node ($q = x \\cdot y$).</p>
                <p><strong>The "Swap" Rule for Multiplication:</strong></p>
                <ul class="list-disc pl-5 mt-2 space-y-2">
                    <li>If we nudge $x$ up by 1, $q$ increases exactly by the value of <span class="text-blue-600 font-semibold">$y$ (3)</span>.</li>
                    <li>If we nudge $y$ up by 1, $q$ increases exactly by the value of <span class="text-blue-600 font-semibold">$x$ (2)</span>.</li>
                </ul>
                <p class="mt-4">Therefore, the <em>local gradient</em> for $x$ is $y$, and vice versa!</p>
            `,
            state: { q_val: "6", f_val: "10", fwd_m: 1, fwd_a: 1, grad_f: 1, bwd_a: 1, bwd_m: 0 }
        },
        {
            title: "Step 7: The Chain Rule",
            description: `
                <p>Finally, we apply the <strong>Chain Rule</strong>: multiply the upstream gradient ($\\nabla q$) by the local gradients we just figured out.</p>
                <div class="bg-red-50 p-4 rounded border border-red-100 mt-4 space-y-3 text-red-800">
                    <p class="font-bold text-sm">For $x$:</p>
                    $$ \\nabla x = \\nabla q \\cdot \\text{local\\_grad}(x) $$
                    $$ \\nabla x = 1 \\cdot y = 1 \\cdot 3 = \\mathbf{3} $$
                    <hr class="border-red-200">
                    <p class="font-bold text-sm">For $y$:</p>
                    $$ \\nabla y = \\nabla q \\cdot \\text{local\\_grad}(y) $$
                    $$ \\nabla y = 1 \\cdot x = 1 \\cdot 2 = \\mathbf{2} $$
                </div>
            `,
            state: { q_val: "6", f_val: "10", fwd_m: 1, fwd_a: 1, grad_f: 1, bwd_a: 1, bwd_m: 1 }
        }
    ];

    let currentStep = 0;
    const totalSteps = stepsData.length;

    // DOM Elements Mapping
    const el = {
        title: document.getElementById("step-title"),
        desc: document.getElementById("step-desc"),
        progress: document.getElementById("step-progress"),
        btnPrev: document.getElementById("btn-prev"),
        btnNext: document.getElementById("btn-next"),
        qVal: document.getElementById("q-val"),
        fVal: document.getElementById("f-val"),
        fwdM: document.getElementById("fwd-m"),
        fwdA: document.getElementById("fwd-a"),
        gradF: document.getElementById("grad-f"),
        bwdA: document.getElementById("bwd-a"),
        bwdM: document.getElementById("bwd-m")
    };

    function updateUI() {
        const step = stepsData[currentStep];

        // 1. Update Texts
        el.title.textContent = step.title;
        el.desc.innerHTML = step.description;
        el.progress.textContent = `Step ${currentStep + 1} / ${totalSteps}`;

        // Render KaTeX math in the description element
        if (window.renderMathInElement) {
            renderMathInElement(el.desc, {
                delimiters: [
                    { left: "$$", right: "$$", display: true },
                    { left: "$", right: "$", display: false }
                ],
                throwOnError: false
            });
        }

        // 2. Update Graph Nodes Values
        el.qVal.textContent = step.state.q_val;
        el.fVal.textContent = step.state.f_val;

        // 3. Update Graph Opacities (triggers CSS transition)
        el.fwdM.style.opacity = step.state.fwd_m;
        el.fwdA.style.opacity = step.state.fwd_a;
        el.gradF.style.opacity = step.state.grad_f;
        el.bwdA.style.opacity = step.state.bwd_a;
        el.bwdM.style.opacity = step.state.bwd_m;

        // 4. Handle Button States
        if (currentStep === 0) {
            el.btnPrev.disabled = true;
            el.btnPrev.classList.add("opacity-40", "cursor-not-allowed");
            el.btnPrev.classList.remove("hover:bg-gray-200");
        } else {
            el.btnPrev.disabled = false;
            el.btnPrev.classList.remove("opacity-40", "cursor-not-allowed");
            el.btnPrev.classList.add("hover:bg-gray-200");
        }

        if (currentStep === totalSteps - 1) {
            el.btnNext.disabled = true;
            el.btnNext.classList.add("opacity-40", "cursor-not-allowed");
            el.btnNext.classList.remove("hover:bg-blue-700");
        } else {
            el.btnNext.disabled = false;
            el.btnNext.classList.remove("opacity-40", "cursor-not-allowed");
            el.btnNext.classList.add("hover:bg-blue-700");
        }
    }

    // Event Listeners
    el.btnPrev.addEventListener("click", () => {
        if (currentStep > 0) {
            currentStep--;
            updateUI();
        }
    });

    el.btnNext.addEventListener("click", () => {
        if (currentStep < totalSteps - 1) {
            currentStep++;
            updateUI();
        }
    });

    // Run initial setup
    updateUI();
});