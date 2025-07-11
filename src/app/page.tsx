'use client';
import Script from 'next/script';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
    const [currentTime, setCurrentTime] = useState<string | null>(null);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleString('de-DE', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            }));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col w-full h-screen bg-black text-white overflow-hidden">
            <header className="p-4 border-b terminal-border text-center md:text-left">
                <h1 className="text-2xl font-bold terminal-green font-mono">Wajih Tarkhani</h1>
                <p className="text-sm text-gray-400 font-mono">Software Developer</p>
            </header>

            <div className="w-3.5/6 flex flex-1 overflow-hidden flex-row">
                <div className="flex flex-1 justify-center items-center bg-black border-r border-green-500 h-full p-0">
                    <Script
                        type="module"
                        src="https://unpkg.com/@splinetool/viewer@1.10.26/build/spline-viewer.js"
                        strategy="beforeInteractive"
                    />
                    <spline-viewer
                        url="https://prod.spline.design/1ha29C6kFmluEZIp/scene.splinecode"
                        style={{ display: 'block', width: '100%', height: '100%' }}
                    ></spline-viewer>
                </div>

                <div className="w-3/6 h-full overflow-auto relative">
                    <TerminalInterface />
                </div>
            </div>

            <footer className="p-2 border-t terminal-border bg-black text-xs terminal-green font-mono flex justify-between items-center">
                <span>Wajih@portfolio:~$</span>
                <span>{currentTime ?? 'Loading time...'}</span>
            </footer>
        </div>
    );
}

function TerminalInterface() {
    const [commandHistory, setCommandHistory] = useState([
        {
            command: 'Welcome',
            response: `Hi, I'm Wajih Tarkhani, CS Student and soon to be CPTS certified.

Welcome to my terminal!
Type 'help' to see available commands.`
        }
    ]);
    const [currentCommand, setCurrentCommand] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [animatedLine, setAnimatedLine] = useState('');
    const [pendingCommand, setPendingCommand] = useState<string | null>(null);
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const availableCommands = [
        'help', 'about', 'projects', 'skills', 'experience',
        'contact', 'education', 'certifications', 'sudo', 'clear'
    ];

    const commandMap: Record<string, string> = {
        help: `\u200BAvailable commands:
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
        about: ` Hey, I'm a 24-year-old Computer Science Student, Goldfinch and Canary lover, currently
studying at TUM (Technical University of Munich) and currently working as a Working Student at Brainlab.
I’m dedicated to build products that make a difference even a small one in someones daily life or let me have fun while 
learning about new technologies. I'm also in my journey to get the CPTS (Certified Penetration Testing Specialist) certification.
`,
        projects: ` 🚀 Projects:
1. F1 Dashboard
   A modern web app for Formula 1 data analytics, providing race results, standings, and telemetry charts.
   Technologies: React Native, Fast-F1, Flask API
2. Portfolio V1
   Designed and implemented a personal portfolio website to showcase projects and skills, 
   incorporating responsive design principles and interactive elements.
   Technologies: JavaScript, CSS, HTML, PHP
3. Password Generator
   Created a password generator that produces secure and customizable passwords, including options for length, 
   character sets, and special symbols.
   Technologies: TypeScript, Node.js, NPM
4. Rock Paper Scissors
   Developed an interactive rock-paper-scissors game with a simple interface, using JavaScript 
   to handle game logic and random opponent choices.
   Technologies: PostgreSQL, TypeScript, Next.js
5. Create your Signature
   Implemented a web-based signature generator that allows users to create personalized digital 
   signatures with various fonts and styles.
   Technologies: TypeScript, JavaScript, CSS
6. Gamma Correction (beta version)
   Built a gamma correction tool that adjusts the brightness and contrast of images, 
   allowing users to process and enhance visual data with customizable parameters.
   Technologies: C, Python, JavaScript, HTML, Makefile
7. Subscriptions Tracker
   Developed a subscription tracking app to help users manage recurring subscriptions, providing features 
   like start date, recurrence, and payment method tracking.
   Technologies: JavaScript, Tailwind, LocalStorage
8. My Search Engine
   Developed a search engine that efficiently indexes web pages and delivers accurate search results. 
   Focused on optimizing search algorithms and delivering relevant information.
9. Task List
   Built a task management tool that allows users to organize, prioritize, and track tasks, featuring a simple UI 
   for quick task creation and progress tracking.
   Technologies: TypeScript, JavaScript, CSS.`,
        skills: ` ⚙️ Skills & Technologies:
- JavaScript, TypeScript, Python, Next.js
- Java, MySQL, PostgreSQL, MongoDB, PowerBI
- Angular, React, Node.js, Flask
- Penetration Testing, Metasploit, Linux, OOP`,
        experience: ` 💼 Work Experience:
  
- IT Working Student | Brainlab – IT Asset Management:  (Oct 2022 - Mar 2024)
  Currently working with the Strategic and Digital IT team. Assisting in project management and contributing to 
  the introduction of SuccessFactors services as an HR solution within the company.
  
- Software Developer | InterFace AG – Frontend/Backend Development (Apr 2024 - Mar 2025)
  Working on developing and improving a patient portal.
  
- IT Working Student | Brainlab – Strategic & IT Office:  (Apr 2025 - Present)
  Currently working with the Strategic and Digital IT team. Assisting in project management and contributing to 
  the introduction of SuccessFactors services as an HR solution within the company.
`,
        education: " 🎓 Studied Computer Science at TUM, now pursuing Wirtschaftsinformatik.",
        certifications: " 🏆 Certifications:" +
            "- CPTS (Certified Penetration Testing Specialist) – in progress.",
        contact: ` 📬 Contact:\nEmail: wajih.tarkhani.21@gmail.com\nGitHub: github.com/wijj9`,
        sudo: ` sudo: Access Denied!.

╔════════════════════════════════════╗
║       Access Not Authorized        ║
║       this action has been         ║
║       reported to the admin!       ║
╚════════════════════════════════════╝`
    };

    const scrollToBottom = () => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    };

    const typeResponse = (text: string, callback: () => void) => {
        let i = 0;
        setAnimatedLine('');
        const interval = setInterval(() => {
            setAnimatedLine((prev) => prev + text[i]);
            scrollToBottom();
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                callback();
            }
        }, 10);
    };

    const handleCommand = async (command: string) => {
        const cmd = command.trim().toLowerCase();
        setIsProcessing(true);

        if (cmd === 'clear') {
            setCommandHistory([]);
            setCurrentCommand('');
            setPendingCommand(null);
            setAnimatedLine('');
            setIsProcessing(false);
            return;
        }

        setPendingCommand(cmd);
        const result = commandMap[cmd] || `Command '${cmd}' not found. Type 'help' to see available commands.`;
        typeResponse(result, () => {
            setCommandHistory(prev => [...prev, { command: cmd, response: result }]);
            setCurrentCommand('');
            setAnimatedLine('');
            setPendingCommand(null);
            setIsProcessing(false);
        });
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && currentCommand.trim() && !isProcessing) {
            handleCommand(currentCommand);
        }
    };

    const handleClickAnywhere = () => {
        inputRef.current?.focus();
    };

    return (
        <div
            ref={terminalRef}
            onClick={handleClickAnywhere}
            className="terminal-container w-full h-full overflow-y-auto bg-black terminal-green font-mono px-4 pb-6 cursor-text"
        >
            <style>{`
                input::selection { background-color: #15803d33; }
                input {
                    caret-color: transparent;
                    padding-left: 12px;
                    position: relative;
                    z-index: 2;
                }
                .custom-cursor {
                    width: 10px;
                    height: 20px;
                    background-image: url('https://i.imgur.com/xdDf3g1.png');
                    background-size: contain;
                    background-repeat: no-repeat;
                    display: inline-block;
                    position: absolute;
                    z-index: 1;
                    left: 0;
                    animation: blink 1s step-start infinite;
                }
                @keyframes blink {
                    50% { opacity: 0; }
                }
            `}</style>

            <div className="available-commands py-4 text-sm border-b terminal-border pb-2 md:fixed bg-black z-10 hidden md:block">
                {availableCommands.join(' | ')}
            </div>

            <div className="command-history md:pt-16 pt-2">
                {commandHistory.map((entry, index) => (
                    <div key={index} className="mb-4">
                        <div className="command-line flex items-center">
                            <span className="terminal-blue mr-2">Wajih@portfolio:~$</span>
                            <span className="text-[#15803d]">{entry.command}</span>
                        </div>
                        {entry.response && (
                            <div className="response mt-1 text-white whitespace-pre-wrap">
                                {entry.response}
                            </div>
                        )}
                    </div>
                ))}
                {pendingCommand !== null && (
                    <div className="mb-4">
                        <div className="command-line flex items-center">
                            <span className="terminal-blue mr-2">Wajih@portfolio:~$</span>
                            <span className="text-[#15803d]">{pendingCommand}</span>
                        </div>
                        <div className="response mt-1 text-white whitespace-pre-wrap">{animatedLine}</div>
                    </div>
                )}
            </div>

            {!isProcessing && (
                <div className="command-input flex items-center relative">
                    <span className="terminal-blue mr-2">Wajih@portfolio:~$</span>
                    <div className="fake-input relative flex items-center -ml-1">
                        <input
                            ref={inputRef}
                            className="bg-transparent outline-none text-[#15803d] text-base relative z-10 pl-1"
                            aria-label="Terminal input"
                            spellCheck="false"
                            type="text"
                            value={currentCommand}
                            onChange={(e) => setCurrentCommand(e.target.value)}
                            onKeyDown={handleKeyPress}
                            autoFocus
                        />
                        <div
                            className="custom-cursor"
                            style={{transform: `translateX(${3 + currentCommand.length * 9}px)`}}
                        ></div>
                    </div>
                </div>
            )}
        </div>
    );
}
