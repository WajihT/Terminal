'use client';
import Script from 'next/script';
import { useState, useEffect, useRef } from 'react';
import {
    Rocket,
    Settings,
    Briefcase,
    GraduationCap,
    Award,
    Mail,
    Shield,
    HelpCircle,
    User,
    FolderOpen,
    Code,
    Phone,
    BookOpen,
    Trophy
} from 'lucide-react';

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

            <div className="flex flex-1 overflow-hidden flex-row h-[600px]">
                <div
                    className="flex flex-1 justify-center items-center bg-black border-r border-green-500 h-full p-0 overflow-hidden">
                    <script type="module"
                            src="https://unpkg.com/@splinetool/viewer@1.10.48/build/spline-viewer.js"></script>
                    <spline-viewer
                        url="https://prod.spline.design/1ha29C6kFmluEZIp/scene.splinecode"
                        style={{
                            width: '200%',
                            height: '100%',
                            maxWidth: '200%',
                            maxHeight: '100%',
                            transform: 'translateX(-3%)'
                        }}
                    ></spline-viewer>
                </div>

                <div className="w-1/2 h-full overflow-auto relative">
                    <TerminalInterface/>
                </div>
            </div>

            <footer
                className="p-2 border-t terminal-border bg-black text-xs terminal-green font-mono flex justify-between items-center">
                <span>Wajih@portfolio:~$</span>
                <span>{currentTime ?? 'Loading time...'}</span>
            </footer>
        </div>
    );
}

interface CommandEntry {
    command: string;
    response: React.ReactNode;
}

function TerminalInterface() {
    const [commandHistory, setCommandHistory] = useState<CommandEntry[]>([
        {
            command: 'Welcome',
            response: `Hi, I'm Wajih Tarkhani, CS Student and soon to be CPTS certified.

Welcome to my terminal!
Type 'help' to see available commands.`
        }
    ]);
    const [currentCommand, setCurrentCommand] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [animatedLine, setAnimatedLine] = useState<React.ReactNode>('');
    const [pendingCommand, setPendingCommand] = useState<string | null>(null);
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const availableCommands = [
        'help', 'about', 'projects', 'skills', 'experience',
        'contact', 'education', 'certifications', 'sudo', 'clear'
    ];

    const IconWrapper = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
        <span className={`inline-flex items-center ${className}`}>{children}</span>
    );

    const commandMap: Record<string, React.ReactNode> = {
        help: (
            <div className="space-y-1">
                <div className="flex items-center gap-2 mb-2">
                    <HelpCircle size={16} className="text-blue-400" />
                    <span>Available commands:</span>
                </div>
                <div className="ml-6 space-y-1">
                    <div>about          - Learn about me</div>
                    <div>projects       - View my projects</div>
                    <div>skills         - See my technical skills</div>
                    <div>experience     - My work experience</div>
                    <div>contact        - How to reach me</div>
                    <div>education      - My educational background</div>
                    <div>certifications - View my certifications</div>
                    <div>leadership     - Leadership and community involvement</div>
                    <div>clear          - Clear the terminal</div>
                </div>
            </div>
        ),
        about: (
            <div className="flex items-start gap-2">
                <User size={16} className="text-green-400 mt-1 flex-shrink-0" />
                <span>Hey, I'm a 24-year-old Computer Science Student, Goldfinch and Canary lover, currently
studying at TUM (Technical University of Munich) and currently working as a Working Student at Brainlab.
I'm dedicated to build products that make a difference even a small one in someones daily life or let me have fun while
learning about new technologies. I'm also in my journey to get the CPTS (Certified Penetration Testing Specialist) certification.</span>
            </div>
        ),
        projects: (
            <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                    <Rocket size={16} className="text-orange-400" />
                    <span className="font-bold">Projects:</span>
                </div>
                <div className="ml-6 space-y-2">
                    <div>1. F1 Dashboard</div>
                    <div className="ml-4 text-gray-300">A modern web app for Formula 1 data analytics, providing race results, standings, and telemetry charts.</div>
                    <div className="ml-4 text-gray-400">Technologies: React Native, Fast-F1, Flask API</div>

                    <div>2. Portfolio V1</div>
                    <div className="ml-4 text-gray-300">Designed and implemented a personal portfolio website to showcase projects and skills, incorporating responsive design principles and interactive elements.</div>
                    <div className="ml-4 text-gray-400">Technologies: JavaScript, CSS, HTML, PHP</div>

                    <div>3. Password Generator</div>
                    <div className="ml-4 text-gray-300">Created a password generator that produces secure and customizable passwords, including options for length, character sets, and special symbols.</div>
                    <div className="ml-4 text-gray-400">Technologies: TypeScript, Node.js, NPM</div>

                    <div>4. Rock Paper Scissors</div>
                    <div className="ml-4 text-gray-300">Developed an interactive rock-paper-scissors game with a simple interface, using JavaScript to handle game logic and random opponent choices.</div>
                    <div className="ml-4 text-gray-400">Technologies: PostgreSQL, TypeScript, Next.js</div>

                    <div>5. Create your Signature</div>
                    <div className="ml-4 text-gray-300">Implemented a web-based signature generator that allows users to create personalized digital signatures with various fonts and styles.</div>
                    <div className="ml-4 text-gray-400">Technologies: TypeScript, JavaScript, CSS</div>

                    <div>6. Gamma Correction (beta version)</div>
                    <div className="ml-4 text-gray-300">Built a gamma correction tool that adjusts the brightness and contrast of images, allowing users to process and enhance visual data with customizable parameters.</div>
                    <div className="ml-4 text-gray-400">Technologies: C, Python, JavaScript, HTML, Makefile</div>

                    <div>7. Subscriptions Tracker</div>
                    <div className="ml-4 text-gray-300">Developed a subscription tracking app to help users manage recurring subscriptions, providing features like start date, recurrence, and payment method tracking.</div>
                    <div className="ml-4 text-gray-400">Technologies: JavaScript, Tailwind, LocalStorage</div>

                    <div>8. My Search Engine</div>
                    <div className="ml-4 text-gray-300">Developed a search engine that efficiently indexes web pages and delivers accurate search results. Focused on optimizing search algorithms and delivering relevant information.</div>

                    <div>9. Task List</div>
                    <div className="ml-4 text-gray-300">Built a task management tool that allows users to organize, prioritize, and track tasks, featuring a simple UI for quick task creation and progress tracking.</div>
                    <div className="ml-4 text-gray-400">Technologies: TypeScript, JavaScript, CSS.</div>
                </div>
            </div>
        ),
        skills: (
            <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                    <Settings size={16} className="text-purple-400" />
                    <span className="font-bold">Skills & Technologies:</span>
                </div>
                <div className="ml-6 space-y-1">
                    <div>- JavaScript, TypeScript, Python, Next.js</div>
                    <div>- Java, MySQL, PostgreSQL, MongoDB, PowerBI</div>
                    <div>- Angular, React, Node.js, Flask</div>
                    <div>- Penetration Testing, Metasploit, Linux, OOP</div>
                </div>
            </div>
        ),
        experience: (
            <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                    <Briefcase size={16} className="text-blue-400" />
                    <span className="font-bold">Work Experience:</span>
                </div>
                <div className="ml-6 space-y-3">
                    <div>
                        <div className="font-semibold">- IT Working Student | Brainlab – IT Asset Management: (Oct 2022 - Mar 2024)</div>
                        <div className="ml-4 text-gray-300">Currently working with the Strategic and Digital IT team. Assisting in project management and contributing to the introduction of SuccessFactors services as an HR solution within the company.</div>
                    </div>

                    <div>
                        <div className="font-semibold">- Software Developer | InterFace AG – Frontend/Backend Development (Apr 2024 - Mar 2025)</div>
                        <div className="ml-4 text-gray-300">Working on developing and improving a patient portal.</div>
                    </div>

                    <div>
                        <div className="font-semibold">- IT Working Student | Brainlab – Strategic & IT Office: (Apr 2025 - Present)</div>
                        <div className="ml-4 text-gray-300">Currently working with the Strategic and Digital IT team. Assisting in project management and contributing to the introduction of SuccessFactors services as an HR solution within the company.</div>
                    </div>
                </div>
            </div>
        ),
        education: (
            <div className="flex items-start gap-2">
                <GraduationCap size={16} className="text-yellow-400 mt-1 flex-shrink-0" />
                <span>Studied Computer Science at TUM, now pursuing Wirtschaftsinformatik.</span>
            </div>
        ),
        certifications: (
            <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                    <Award size={16} className="text-yellow-400" />
                    <span className="font-bold">Certifications:</span>
                </div>
                <div className="ml-6">
                    <div>- CPTS (Certified Penetration Testing Specialist) – in progress.</div>
                </div>
            </div>
        ),
        contact: (
            <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                    <Mail size={16} className="text-red-400" />
                    <span className="font-bold">Contact:</span>
                </div>
                <div className="ml-6 space-y-1">
                    <div>Email: wajih.tarkhani.21@gmail.com</div>
                    <div>GitHub: github.com/wijj9</div>
                </div>
            </div>
        ),
        sudo: (
            <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                    <Shield size={16} className="text-red-500" />
                    <span>sudo: Access Denied!</span>
                </div>
                <div className="border border-gray-600 p-3 mt-2">
                    <div className="text-center space-y-1">
                        <div>Access Not Authorized</div>
                        <div>this action has been</div>
                        <div>reported to the admin!</div>
                    </div>
                </div>
            </div>
        )
    };

    const scrollToBottom = () => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    };

    const typeResponse = (content: React.ReactNode, callback: () => void) => {
        // For React nodes, we'll just show them immediately instead of typing animation
        setAnimatedLine(content);
        setTimeout(callback, 100); // Small delay to simulate typing
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
        const result = commandMap[cmd] || (
            <span>Command '{cmd}' not found. Type 'help' to see available commands.</span>
        );

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
                            <div className="response mt-1 text-white">
                                {typeof entry.response === 'string' ? (
                                    <div className="whitespace-pre-wrap">{entry.response}</div>
                                ) : (
                                    entry.response
                                )}
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
                        <div className="response mt-1 text-white">
                            {typeof animatedLine === 'string' ? (
                                <div className="whitespace-pre-wrap">{animatedLine}</div>
                            ) : (
                                animatedLine
                            )}
                        </div>
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