/**
 * Interactive Terminal for Manifesto Page
 * Allows users to type commands to explore CycleCore philosophy
 */

document.addEventListener('DOMContentLoaded', function() {
  const terminalBody = document.getElementById('interactive-terminal');
  const terminalInput = document.getElementById('terminal-input');

  if (!terminalBody || !terminalInput) return;

  const terminalOutput = terminalBody.querySelector('.terminal-output');
  let commandHistory = [];
  let historyIndex = -1;

  // Command responses
  const commands = {
    help: `Available commands:
  <span class="text-accent">maaza</span>       - All Maaza models (135M, 360M, 9.6M)
  <span class="text-accent">products</span>    - All CycleCore products
  <span class="text-accent">mcpbodega</span>   - MCP server management
  <span class="text-accent">secretsage</span>  - Credential management
  <span class="text-accent">safetygates</span> - Content moderation API
  <span class="text-accent">slmbench</span>    - Edge AI benchmarking
  <span class="text-accent">cyclesum</span>    - Offline PDF summarization
  <span class="text-accent">paper</span>       - Maaza research paper details
  <span class="text-accent">benchmark</span>   - EdgeJSON benchmark info
  <span class="text-accent">api</span>         - Maaza API beta access
  <span class="text-accent">privacy</span>     - Our privacy philosophy
  <span class="text-accent">manifesto</span>   - Full manifesto summary
  <span class="text-accent">values</span>      - Core values
  <span class="text-accent">why</span>         - Why we exist
  <span class="text-accent">contact</span>     - Get in touch
  <span class="text-accent">clear</span>       - Clear terminal`,

    privacy: `<span class="text-primary font-bold">Privacy Philosophy</span>

Privacy is not a feature. It's the foundation.

<span class="text-accent">•</span> Whether local or cloud, privacy is built into our architecture
<span class="text-accent">•</span> We collect minimal data - only what's necessary
<span class="text-accent">•</span> We're transparent about what each tool does
<span class="text-accent">•</span> We don't track, we don't sell, we don't surveil

Privacy isn't negotiable. It's who we are.`,

    manifesto: `<span class="text-primary font-bold">The CycleCore Manifesto</span>

<span class="text-accent">Privacy-First AI. Transparent by Design. Built for Trust.</span>

We build AI tools with privacy as the foundation.
Some run locally. Some run in the cloud.
All built with transparency, honesty, and your trust in mind.

<span class="text-terminal-green">Our Commitments:</span>
  → Minimal data collection
  → Maximum transparency
  → No surveillance capitalism
  → Developer sovereignty
  → Open source when possible

Type '<span class="text-accent">values</span>' to see our core beliefs.`,

    values: `<span class="text-primary font-bold">Core Values</span>

<span class="text-accent">1. Privacy is the Foundation</span>
   Not a checkbox. Built into the architecture.

<span class="text-accent">2. Transparency Over Marketing</span>
   Honest about what data goes where, and why.

<span class="text-accent">3. Developer Sovereignty</span>
   You choose: local or cloud. No lock-in.

<span class="text-accent">4. No Surveillance Capitalism</span>
   We don't monetize your data. We build tools worth paying for.

<span class="text-accent">5. Open Source When Possible</span>
   Transparency requires auditability.`,

    why: `<span class="text-primary font-bold">Why We Exist</span>

The developer tools industry has a problem:
<span class="text-error">Surveillance capitalism masquerading as innovation.</span>

Too many tools collect excessive data.
Too many privacy policies are vague.
Too many companies prioritize extraction over trust.

<span class="text-accent">Developers deserve better.</span>

Tools that respect privacy. Honor intelligence. Earn trust.

That's why we're here.`,

    local: `<span class="text-primary font-bold">Local-First Tools</span>

<span class="text-accent">CycleSum Lite</span> - 100% offline AI summarization

<span class="text-terminal-green">What it means:</span>
  → Your data NEVER leaves your device
  → No internet required
  → No cloud uploads
  → No telemetry
  → Complete data sovereignty

Perfect for professionals who demand absolute privacy.`,

    cloud: `<span class="text-primary font-bold">Cloud Tools (Privacy-Respecting SaaS)</span>

<span class="text-accent">MCPBodega</span> - MCP server management for dev teams

<span class="text-terminal-green">What it means:</span>
  → Minimal data collection (only what's needed)
  → Clear about what's stored and why
  → Encryption in transit and at rest
  → No tracking across sites
  → Maximum transparency

Cloud-hosted, but privacy-first in design.`,

    maaza: `<span class="text-primary font-bold">Maaza Models - Edge-First Language Models</span>

<span class="text-accent">Maaza-MLM-135M-JSON-v1</span>
  Parameters: 135M
  Performance: 55.1% JSONExact, 0.780 Field F1
  Use case: JSON extraction on edge devices
  HuggingFace: huggingface.co/CycleCoreTechnologies/Maaza-MLM-135M-JSON-v1

<span class="text-accent">Maaza-SLM-360M-JSON-v1</span>
  Parameters: 360M
  Performance: 72.3% JSONExact, 0.878 Field F1
  Use case: High-accuracy JSON extraction
  HuggingFace: huggingface.co/CycleCoreTechnologies/Maaza-SLM-360M-JSON-v1

<span class="text-accent">Maaza-NLM-Orchestrator-9.6M</span>
  Parameters: 9.6M
  Performance: 70% tool routing, 70ms latency, 36 production tools
  Use case: Tool orchestration for MCPBodega
  HuggingFace: huggingface.co/CycleCoreTechnologies/maaza-nlm-orchestrator-9.6m

All models: Apache 2.0 License
Learn more: cyclecore.ai/research`,

    models: `<span class="text-primary font-bold">CycleCore Maaza Models</span>

<span class="text-accent">Maaza-MLM-135M-JSON-v1</span> <span class="cct-badge" style="background: #00d4ff; color: #000; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 0.75rem;">CCT✓</span>
  → Rank #2 on SLMBench EdgeJSON
  → 55.1% JSONExact | 0.780 Field F1
  → 135M parameters, ~270MB disk size
  → Perfect on simple schemas
  → Base: SmolLM2-135M + LoRA fine-tuning
  → HuggingFace: CycleCoreTechnologies/Maaza-MLM-135M-JSON-v1

<span class="text-accent">Maaza-SLM-360M-JSON-v1</span> <span class="cct-badge" style="background: #00d4ff; color: #000; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 0.75rem;">CCT✓</span>
  → Rank #1 on SLMBench EdgeJSON
  → 72.3% JSONExact | 0.878 Field F1
  → 360M parameters, production-ready
  → Handles complex nested structures
  → Base: SmolLM2-360M + LoRA fine-tuning
  → HuggingFace: CycleCoreTechnologies/Maaza-SLM-360M-JSON-v1

<span class="text-accent">Maaza-NLM-Orchestrator-9.6M</span> <span class="cct-badge" style="background: #00d4ff; color: #000; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 0.75rem;">CCT✓</span>
  → 70% tool routing accuracy
  → 70ms latency, 36 production tools
  → 9.6M parameters, ultra-lightweight
  → MCP tool orchestration
  → HuggingFace: CycleCoreTechnologies/maaza-nlm-orchestrator-9.6m

<span class="text-terminal-green">Specialized for:</span>
  → Structured JSON extraction and generation
  → Tool routing and orchestration
  → Edge deployment (Raspberry Pi, browsers, laptops)
  → Privacy-first architectures (run 100% local)
  → Real-world document parsing (emails, invoices, receipts)

<span class="text-terminal-green">Key Finding:</span>
  Fine-tuned models outperform much larger zero-shot models

Try: <span class="text-accent">paper</span> | <span class="text-accent">benchmark</span> | <span class="text-accent">api</span>`,

    paper: `<span class="text-primary font-bold">Maaza Research Paper</span>

<span class="text-accent">Title:</span> Task-Specialized Micro Language Models Outperform
        Larger Zero-Shot Models on Structured Data Extraction

<span class="text-accent">Authors:</span> CycleCore Technologies
<span class="text-accent">Date:</span> November 2025
<span class="text-accent">Version:</span> 0.7

<span class="text-terminal-green">Key Contributions:</span>

1. <span class="text-accent">Maaza Model Family</span>
   Fine-tuned 135M and 360M models for JSON extraction
   Outperform 500M zero-shot models despite being smaller

2. <span class="text-accent">EdgeJSON Benchmark</span>
   787 validated examples across 24 real-world schemas
   First edge-oriented structured output benchmark

3. <span class="text-accent">Capacity Threshold Discovery</span>
   ~300M parameter boundary for complex schema handling
   Models below 200M struggle with 8+ field schemas

4. <span class="text-accent">Task Specialization > Size</span>
   Fine-tuning provides greater gains than parameter scaling
   Practical implications for edge AI deployment

<span class="text-terminal-green">Download:</span> cyclecore.ai/research (Light & Dark themes)
<span class="text-terminal-green">Citation:</span> @techreport{maaza2025, ...}
<span class="text-terminal-green">License:</span> Models on HuggingFace (Apache 2.0)`,

    benchmark: `<span class="text-primary font-bold">EdgeJSON Benchmark</span>

<span class="text-accent">Purpose:</span> Evaluate structured JSON extraction for edge deployment

<span class="text-terminal-green">Dataset Statistics:</span>
  → 787 validated examples
  → 24 real-world schemas
  → 629 training examples
  → 158 test examples (held-out)

<span class="text-terminal-green">Schema Categories:</span>
  → Simple (2-4 fields): Contact cards, basic profiles
  → Medium (5-7 fields): Product listings, events
  → Complex (8+ fields): Invoices, meeting notes, multi-party data

<span class="text-terminal-green">Evaluation Metrics:</span>
  → JSONExact: Exact string match (strict)
  → Field F1: Per-field precision/recall (lenient)
  → Valid JSON: Syntax correctness
  → Schema compliance: Type and structure validation

<span class="text-terminal-green">Why It Matters:</span>
Traditional benchmarks (MMLU, GSM8K, HellaSwag) don't measure
structured output quality. EdgeJSON fills this gap for real-world
document parsing, API payloads, and edge AI applications.

<span class="text-terminal-green">Leaderboard:</span> slmbench.com
<span class="text-terminal-green">Paper:</span> cyclecore.ai/research`,

    api: `<span class="text-primary font-bold">Maaza JSON Extraction API</span>

<span class="text-accent">Status:</span> Beta (Early Adopter Pricing)

<span class="text-terminal-green">What it does:</span>
Extract structured JSON from real-world documents
  → Emails, invoices, receipts, meeting notes
  → 80-95% accuracy with built-in reliability
  → Fast (~2-3s), 30x more cost-effective than GPT-4

<span class="text-terminal-green">Pricing:</span>
  Free:    50 requests/day
  Starter: $9/mo  (10k req) - Early adopter pricing
  Pro:     $49/mo (100k req) - Early adopter pricing

<span class="text-terminal-green">Get Access:</span>
  Email: hi@cyclecore.ai (subject: "Maaza API Beta Access")
  Try:   curl -X POST https://pq-api.cyclecore.ai/v1/extract

<span class="text-terminal-green">Self-Hosting:</span>
  Models are open source on HuggingFace (Apache 2.0)
  → CycleCoreTechnologies/Maaza-MLM-135M-JSON-v1
  → CycleCoreTechnologies/Maaza-SLM-360M-JSON-v1

<span class="text-terminal-green">Learn More:</span> cyclecore.ai/research`,

    contact: `<span class="text-primary font-bold">Get in Touch</span>

Email: <span class="text-accent">hi@cyclecore.ai</span>
X/Twitter: <span class="text-accent">@CycleCoreTech</span>
GitHub: <span class="text-accent">github.com/cyclecore</span>

Questions? Feedback? Want to collaborate?
We'd love to hear from you.`,

    products: `<span class="text-primary font-bold">CycleCore Products</span>

<span class="text-accent">MCPBodega</span> - MCP Server Management
  Privacy-respecting MCP server management for dev teams
  Visit: mcpbodega.com

<span class="text-accent">SecretSage</span> - Credential Management
  Privacy-first credential wizard for agent-driven development
  Terminal-based, Age encryption, grant/revoke flow
  npm: @cyclecore/secretsage

<span class="text-accent">SafetyGates</span> - Content Moderation API
  Real-time toxic, spam, hate detection in 5 languages
  Privacy-first, no content storage
  Visit: cyclecore.ai/safetygates

<span class="text-accent">SLMBench</span> - Edge AI Benchmarking
  Professional benchmarks for Small Language Models
  EdgeJSON benchmark, transparent rankings
  Visit: slmbench.com

<span class="text-accent">CycleSum Lite</span> - Offline PDF Summarization
  100% offline, zero data collection
  Coming soon: cyclecore.ai/cyclesum`,

    mcpbodega: `<span class="text-primary font-bold">MCPBodega - Privacy-Respecting MCP Management</span>

Centralized MCP server management for dev teams
  • Policy control & caching
  • Team collaboration
  • Observability & monitoring
  • Minimal data collection

Pricing: Free tier available
Visit: mcpbodega.com`,

    secretsage: `<span class="text-primary font-bold">SecretSage v0.4.6 - Privacy-First Credential Management</span>

Terminal-based credential wizard for AI agents
  • Age encryption at rest
  • Grant & revoke credentials on demand
  • Zero data collection (100% local)
  • Works with Claude Code, Cursor, Windsurf
  • New: get --raw for scripting
  • New: Access audit logging

Install: npm install -g @cyclecore/secretsage
License: Apache 2.0`,

    slmbench: `<span class="text-primary font-bold">SLMBench - Edge AI Benchmarking</span>

Professional benchmarks for Small Language Models
  • EdgeJSON benchmark (158 test examples)
  • Transparent, reproducible rankings
  • Featuring Maaza models (top performers)

Visit: slmbench.com
Leaderboard: Live rankings updated regularly`,

    cyclesum: `<span class="text-primary font-bold">CycleSum Lite - 100% Offline PDF Summarization</span>

Privacy-first AI summarization
  • Runs entirely on your device
  • No cloud uploads, no internet required
  • Zero data collection
  • Cross-platform (macOS, Windows, Linux)

Status: Coming soon
Pricing: $49 one-time purchase
Join waitlist: hi@cyclecore.ai`,

    safetygates: `<span class="text-primary font-bold">SafetyGates - Content Moderation API</span>

Stop toxic content, spam, and hate speech in real-time
  • <span class="text-accent">5 languages:</span> English, Spanish, Portuguese, French, German
  • <span class="text-accent">5 gates:</span> Toxic, Spam, Hate, Harassment, NSFW
  • <span class="text-accent">Privacy-first:</span> No content storage, no training on your data
  • <span class="text-accent">Fast:</span> ~50ms latency

<span class="text-terminal-green">Pricing:</span>
  Free:    100 requests/day
  Starter: $19/mo (50k requests)
  Pro:     $79/mo (500k requests)

<span class="text-terminal-green">Try it:</span>
  curl -X POST https://sg-api.cyclecore.ai/v1/classify \\
    -H "X-API-Key: demo" \\
    -d '{"text": "hello world", "gates": ["toxic"]}'

Visit: cyclecore.ai/safetygates
Docs: cyclecore.ai/safetygates/docs`,

    ls: `manifesto.txt  privacy.txt  values.txt  models/`,

    'ls models/': `Maaza-MLM-135M-JSON-v1/  Maaza-SLM-360M-JSON-v1/`,

    cat: `Try:
  <span class="text-accent">cat manifesto.txt</span>  → Full manifesto
  <span class="text-accent">cat privacy.txt</span>    → Privacy philosophy
  <span class="text-accent">cat values.txt</span>     → Core values`,

    'cat manifesto.txt': function() { return commands.manifesto; },
    'cat privacy.txt': function() { return commands.privacy; },
    'cat values.txt': function() { return commands.values; },

    whoami: `A developer who values privacy, transparency, and independence.`,

    pwd: `/home/developer/cyclecore`,

    date: function() {
      return new Date().toUTCString();
    },

    clear: 'CLEAR_TERMINAL'
  };

  // Calculate Levenshtein distance for fuzzy matching
  function levenshteinDistance(a, b) {
    const matrix = [];
    
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[b.length][a.length];
  }

  // Find closest matching command
  function findClosestCommand(input) {
    const allCommands = Object.keys(commands);
    let closest = null;
    let minDistance = Infinity;
    
    for (const cmd of allCommands) {
      const distance = levenshteinDistance(input, cmd);
      if (distance < minDistance && distance <= 2) { // Max 2 character difference
        minDistance = distance;
        closest = cmd;
      }
    }
    
    return closest;
  }

  // Process command
  function processCommand(cmd) {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (trimmedCmd === '') return;

    // Add command to history
    commandHistory.push(cmd);
    historyIndex = commandHistory.length;

    // Display command
    addOutput(`<span class="terminal-prompt">$ </span>${escapeHtml(cmd)}`);

    // Execute command
    if (trimmedCmd === 'clear') {
      clearTerminal();
      return;
    }

    if (commands[trimmedCmd]) {
      const response = typeof commands[trimmedCmd] === 'function'
        ? commands[trimmedCmd]()
        : commands[trimmedCmd];
      addOutput(response);
    } else {
      // Try to find a close match
      const suggestion = findClosestCommand(trimmedCmd);
      
      if (suggestion) {
        addOutput(`<span class="text-error">Command not found: ${escapeHtml(trimmedCmd)}</span>\n\nDid you mean '<span class="text-accent">${suggestion}</span>'?\nType '<span class="text-accent">help</span>' for all commands.`);
      } else {
        addOutput(`<span class="text-error">Command not found: ${escapeHtml(trimmedCmd)}</span>\nType '<span class="text-accent">help</span>' for available commands.`);
      }
    }

    scrollToBottom();
  }

  // Add output to terminal
  function addOutput(html) {
    const outputLine = document.createElement('div');
    outputLine.className = 'terminal-output-line';
    outputLine.innerHTML = html;
    terminalOutput.appendChild(outputLine);
  }

  // Clear terminal
  function clearTerminal() {
    terminalOutput.innerHTML = '<span class="text-secondary">Terminal cleared. Type \'help\' for commands.</span>';
  }

  // Scroll to bottom
  function scrollToBottom() {
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  // Escape HTML
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Handle input
  terminalInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const command = this.value;
      this.value = '';
      processCommand(command);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        this.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        this.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        this.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple tab completion (optional enhancement)
    }
  });

  // Keep input focused
  terminalBody.addEventListener('click', function() {
    terminalInput.focus();
  });

  // Initial focus
  terminalInput.focus();
});
