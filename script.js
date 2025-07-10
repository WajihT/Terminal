
const terminal = document.getElementById("terminal");

const commands = {
  help: `
Available commands:
about          - Learn about me
projects       - View my projects
skills         - See my technical skills
experience     - My work experience
contact        - How to reach me
education      - My educational background
certifications - View my certifications
leadership     - Leadership and community involvement
clear          - Clear the terminal
`,
  about: "Hi, I'm Wajih Tarkhani, a Frontend Dev and Penetration Tester based in Munich.",
  projects: `🚀 Projects:
1. Fastlytics F1 Dashboard
   Technologies: React Native, Fast-F1, Flask API
2. Gamma Correction Tool
   Technologies: C, Flask, HTML, CSS
3. Subscriptions Tracker
   Technologies: JavaScript, Tailwind, LocalStorage`,
  skills: `🛠 Skills:
- JavaScript, TypeScript, Python
- Angular, React, Node.js, Flask
- Penetration Testing, Fast-F1 Analytics`,
  experience: `💼 Experience:
- InterFace AG – Frontend/Backend Developer
- Brainlab – Strategic IT Projects`,
  contact: `📬 Contact:
Email: wajih@example.com
GitHub: github.com/wijj9`,
  education: "📘 Studied Computer Science at TUM, now pursuing Wirtschaftsinformatik.",
  certifications: "🎓 CPTS (Certified Penetration Testing Specialist) – in progress.",
  leadership: "🤝 Volunteer in tech communities and student initiatives.",
};

function createLine(text = '', isInput = false) {
  const line = document.createElement("div");
  line.className = "line";

  if (isInput) {
    line.innerHTML = `you@portfolio:~$ <span class="typed-cmd"></span><input type="text" autofocus onkeydown="handleInput(event)" />`;
  } else {
    line.textContent = text;
  }

  terminal.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;
  return line;
}

function handleInput(event) {
  if (event.key === "Enter") {
    const input = event.target;
    const cmd = input.value.trim();
    input.disabled = true;
    input.style.display = "none";

    const typedSpan = input.previousElementSibling;
    typedSpan.textContent = cmd;

    const response = commands[cmd] || `Command not found: ${cmd}`;
    createLine(response);

    setTimeout(() => {
      const newLine = createLine('', true);
      newLine.querySelector("input").focus();
    }, 50);
  }
}

function handleCommand(cmd) {
  const input = document.querySelector('input:last-of-type');
  input.value = cmd;
  input.focus();
}

function clearTerminal() {
  terminal.innerHTML = '';
  const newLine = createLine('', true);
  newLine.querySelector("input").focus();
}

// Refocus input when terminal is clicked
terminal.addEventListener("click", () => {
  const input = document.querySelector('input:last-of-type');
  if (input) input.focus();
});

// Focus the first input on page load
window.onload = () => {
  const input = document.querySelector('input:last-of-type');
  if (input) input.focus();
};
