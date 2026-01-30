/**
 * CycleCore Main JavaScript
 * Terminal Manifesto & Scroll Reveals
 */

// Wait for DOM and Typed.js to load
document.addEventListener('DOMContentLoaded', function() {

  // ====================
  // TERMINAL MANIFESTO
  // ====================

  const manifestoLines = [
    'cat /etc/cyclecore/manifesto.txt^500\n\n',
    'We build Maaza models. 9M to 360M parameters. Edge-first.^800\n',
    'AI inference. Fast. Determinism when possible. Safety.^600\n',
    'JSON extraction. Tool orchestration. Structured output.^600\n',
    'Very high throughput models.^500\n\n',
    'Privacy through architecture. Local or cloud, you choose.^800\n',
    'Models that run where you need them.^500\n\n',
    'MCPBodega. SecretSage. SLMBench. CycleSum.^800\n',
    'Tools for developers who value control.^500\n\n',
    'Because AI should work for you, not track you.^800\n',
    'Patents Pending.^500\n\n',
    '$ _'
  ];

  // Initialize Typed.js only if element exists
  const typedElement = document.getElementById('typed-output');
  if (typedElement && typeof Typed !== 'undefined') {
    const typed = new Typed('#typed-output', {
      strings: manifestoLines,
      typeSpeed: 40,
      backSpeed: 0,
      backDelay: 0,
      startDelay: 500,
      loop: false,
      showCursor: true,
      cursorChar: '▋',
      smartBackspace: false,
      onComplete: function(self) {
        // Remove typed.js cursor and enable interactive mode
        self.cursor.remove();
        enableInteractiveTerminal();
      }
    });
  }

  // ====================
  // INTERACTIVE TERMINAL
  // ====================

  function enableInteractiveTerminal() {
    const terminalBody = document.querySelector('.terminal-hero .terminal-body');
    if (!terminalBody) return;

    // Add interactive prompt
    const interactivePrompt = document.createElement('div');
    interactivePrompt.style.marginTop = '1rem';
    interactivePrompt.innerHTML = '<span class="terminal-prompt">$ </span><span class="terminal-input" contenteditable="true" spellcheck="false"></span><span class="terminal-cursor">▋</span>';
    terminalBody.appendChild(interactivePrompt);

    const input = interactivePrompt.querySelector('.terminal-input');
    input.focus();

    // Command responses
    const commands = {
      help: `Available commands:
  maaza      - Maaza model details
  products   - All CycleCore products
  mcpbodega  - MCP server management
  secretsage - Credential management
  slmbench   - Edge AI benchmarking
  cyclesum   - Offline PDF summarization
  clear      - Clear terminal
  help       - Show this message`,

      maaza: `Maaza Models - Edge-First Language Models

Maaza-MLM-135M-JSON-v1
  Parameters: 135M
  Performance: 55.1% JSONExact, 0.780 Field F1
  Use case: JSON extraction on edge devices
  HuggingFace: huggingface.co/CycleCoreTechnologies/Maaza-MLM-135M-JSON-v1

Maaza-SLM-360M-JSON-v1
  Parameters: 360M
  Performance: 72.3% JSONExact, 0.878 Field F1
  Use case: High-accuracy JSON extraction
  HuggingFace: huggingface.co/CycleCoreTechnologies/Maaza-SLM-360M-JSON-v1

Maaza-NLM-Orchestrator-9.6M
  Parameters: 9.6M
  Performance: 70% tool routing, 70ms latency, 36 production tools
  Use case: Tool orchestration for MCPBodega
  HuggingFace: huggingface.co/CycleCoreTechnologies/maaza-nlm-orchestrator-9.6m

All models: Apache 2.0 License
Learn more: cyclecore.ai/research`,

      products: `CycleCore Products

MCPBodega - MCP Server Management
  Privacy-respecting MCP server management for dev teams
  Visit: mcpbodega.com

SecretSage - Credential Management
  Privacy-first credential wizard for agent-driven development
  Terminal-based, Age encryption, grant/revoke flow
  npm: @cyclecore/secretsage

SLMBench - Edge AI Benchmarking
  Professional benchmarks for Small Language Models
  EdgeJSON benchmark, transparent rankings
  Visit: slmbench.com

CycleSum Lite - Offline PDF Summarization
  100% offline, zero data collection
  Coming soon: cyclecore.ai/cyclesum`,

      mcpbodega: `MCPBodega - Privacy-Respecting MCP Management

Centralized MCP server management for dev teams
  • Policy control & caching
  • Team collaboration
  • Observability & monitoring
  • Minimal data collection

Pricing: Free tier available
Visit: mcpbodega.com`,

      secretsage: `SecretSage v0.4 - Privacy-First Credential Management

Terminal-based credential wizard for AI agents
  • Age encryption at rest
  • Grant & revoke credentials on demand
  • Agent-human handoff wizard (v0.4)
  • Rotation audit trail (v0.4)
  • 2FA backup codes storage (v0.4)
  • Remote deployment via rsync (v0.4)
  • Auto-generate secrets (v0.4)
  • Zero data collection (100% local)
  • Works with Claude Code, Cursor, Windsurf

Install: npm install -g @cyclecore/secretsage
License: Apache 2.0
GitHub: github.com/CycleCore-Technologies/secretsage`,

      slmbench: `SLMBench - Edge AI Benchmarking

Professional benchmarks for Small Language Models
  • EdgeJSON benchmark (158 test examples)
  • Transparent, reproducible rankings
  • Featuring Maaza models (top performers)

Visit: slmbench.com
Leaderboard: Live rankings updated regularly`,

      cyclesum: `CycleSum Lite - 100% Offline PDF Summarization

Privacy-first AI summarization
  • Runs entirely on your device
  • No cloud uploads, no internet required
  • Zero data collection
  • Cross-platform (macOS, Windows, Linux)

Status: Coming soon
Pricing: $49 one-time purchase
Join waitlist: hi@cyclecore.ai`
    };

    // Handle input
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const command = this.textContent.trim().toLowerCase();

        // Display command
        const commandLine = document.createElement('div');
        commandLine.innerHTML = `<span class="terminal-prompt">$ </span>${this.textContent}`;
        terminalBody.insertBefore(commandLine, interactivePrompt);

        // Execute command
        if (command === 'clear') {
          // Remove all output except manifesto
          const outputs = terminalBody.querySelectorAll('div');
          outputs.forEach(output => {
            if (output !== interactivePrompt && !output.querySelector('#typed-output')) {
              output.remove();
            }
          });
        } else if (commands[command]) {
          const output = document.createElement('div');
          output.style.whiteSpace = 'pre-wrap';
          output.style.marginBottom = '1rem';
          output.style.color = 'var(--cc-gray-300)';
          output.textContent = commands[command];
          terminalBody.insertBefore(output, interactivePrompt);
        } else if (command) {
          const output = document.createElement('div');
          output.style.marginBottom = '1rem';
          output.style.color = 'var(--cc-gray-400)';
          output.textContent = `Command not found: ${command}\nType 'help' for available commands.`;
          terminalBody.insertBefore(output, interactivePrompt);
        }

        // Clear input and scroll to bottom
        this.textContent = '';
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }
    });

    // Keep cursor blinking
    const cursor = interactivePrompt.querySelector('.terminal-cursor');
    if (cursor) {
      cursor.style.animation = 'blink 1s infinite';
    }
  }

  // ====================
  // SCROLL REVEALS
  // ====================

  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;
      const revealPoint = 100; // Trigger 100px before element enters view

      revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = elementTop < windowHeight - revealPoint;

        if (elementVisible && !el.classList.contains('active')) {
          el.classList.add('active');
        }
      });
    };

    // Initial check on page load
    revealOnScroll();

    // Check on scroll (throttled for performance)
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
      scrollTimeout = window.requestAnimationFrame(() => {
        revealOnScroll();
      });
    }, { passive: true });
  }

  // ====================
  // NAVBAR SCROLL EFFECT
  // ====================

  const navbar = document.querySelector('.navbar');
  if (navbar) {
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      // Add background blur on scroll
      if (currentScroll > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(16px)';
      } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        navbar.style.backdropFilter = 'blur(12px)';
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ====================
  // SCROLL SPY FOR NAV
  // ====================

  const sections = document.querySelectorAll('section[id], .section-hero');
  const navLinks = document.querySelectorAll('.navbar-link:not(.navbar-link-subtle)');

  if (sections.length > 0 && navLinks.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id || 'home';

          navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');

            // Match section to nav link
            if (sectionId === 'home' && href === '/') {
              link.classList.add('active');
            } else if (href === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));
  }

  // ====================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ====================

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // Skip if href is just "#"
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();

        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ====================
  // HAMBURGER MENU
  // ====================

  const hamburger = document.querySelector('.navbar-hamburger');
  const navbarLinks = document.querySelector('.navbar-links');

  if (hamburger && navbarLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navbarLinks.classList.toggle('active');
    });

    // Close menu when clicking a link (smooth mobile UX)
    const navLinks = document.querySelectorAll('.navbar-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navbarLinks.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navbarLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navbarLinks.classList.remove('active');
      }
    });
  }

  // ====================
  // CONSOLE EASTER EGG
  // ====================

  const consoleStyle = 'color: #00d4ff; font-size: 16px; font-weight: bold; font-family: monospace;';
  console.log('%c████████████████████████████████', consoleStyle);
  console.log('%cCycleCore Technologies', consoleStyle);
  console.log('%c████████████████████████████████', consoleStyle);
  console.log('%c\nPrivacy-first AI infrastructure for independent developers.\n', 'color: #a0a0a0; font-family: monospace;');
  console.log('%cInterested in joining us? hi@cyclecore.ai', 'color: #ffffff; font-family: monospace;');
  console.log('%c\n════════════════════════════════\n', 'color: #3a3a3a;');

});

// ====================
// UTILITY FUNCTIONS
// ====================

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
