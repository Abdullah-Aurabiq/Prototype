import { useState } from 'react';
import AnimatedCard from '../components/AnimatedCard';
import ProgressBar from '../components/ProgressBar';
import Confetti from 'react-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
const questions = [
  // === Stage 1: Discovery ===
  {
    id: 1,
    stage: "Discovery",
    text: "On average, how many hours per week do you spend on manual or repetitive tasks?",
    inputType: "number",
    type: "text"
  },
  {
    id: 2,
    stage: "Discovery",
    text: "What is your average monthly lead volume?",
    type: "radio",
    options: [
      "Less than 10 leads",
      "10–50 leads",
      "51–200 leads",
      "Over 200 leads"
    ]
  },

  // === Stage 2: Workflow Bottlenecks ===
  {
    id: 3,
    stage: "Workflow Bottlenecks",
    text: "Which business processes are currently performed manually in your workflow?",
    type: "checkbox",
    options: [
      "Inbound lead capture",
      "Client follow-ups",
      "Appointment scheduling",
      "Email outreach",
      "CRM data entry",
      "Sales qualification",
      "Reporting / dashboards",
      "Social media posting",
      "Project updates & tracking"
    ]
  },
  {
    id: 4,
    stage: "Workflow Bottlenecks",
    text: "What is the single biggest operational bottleneck slowing down your growth?",
    type: "bottleneck"
  },
  {
    id: 5,
    stage: "Workflow Bottlenecks",
    text: "What system do you currently use to manage client or lead data?",
    type: "radio",
    options: [
      "Google Sheets / Excel",
      "CRM software (e.g. HubSpot, Pipedrive)",
      "Manual notes / pen & paper",
      "No consistent system"
    ]
  },

  // === Stage 3: Tool Awareness ===
  {
    id: 6,
    stage: "Tool Awareness",
    text: "Which of the following platforms or tools have you used in the past 3 months?",
    type: "checkbox",
    options: [
      "Zapier / Make / Pabbly",
      "ChatGPT / Gemini / Claude",
      "Calendly / TidyCal",
      "CRM (HubSpot, Close, Pipedrive)",
      "Google Workspace or Microsoft 365",
      "Haven’t used any of these"
    ]
  },
  {
    id: 7,
    stage: "Tool Awareness",
    text: "How do you currently book or coordinate client meetings?",
    type: "radio",
    options: [
      "Manual scheduling via email or chat",
      "Using a calendar booking link",
      "Delegated to assistant or VA",
      "Rarely schedule meetings"
    ]
  },
  {
    id: 8,
    stage: "Tool Awareness",
    text: "On a scale of 1–10, how confident are you in using automation or AI tools?",
    inputType: "number",
    type: "text"
  },

  // === Stage 4: Vision + Intent ===
  {
    id: 9,
    stage: "Vision + Intent",
    text: "What is your primary business growth goal over the next 6 months?",
    inputType: "text",
    type: "text"
  },
  {
    id: 10,
    stage: "Vision + Intent",
    text: "If you could automate one high-impact task today, what would it be?",
    inputType: "text",
    type: "text"
  }
];



export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showConfetti, setShowConfetti] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [mode, setMode] = useState<"dark" | "light">("dark");
  const [transitionStage, setTransitionStage] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);
  // const audioRef = useRef<HTMLAudioElement | null>(null);

  const [result, setResult] = useState<null | {
    timeSaved: string;
    mindsetGap: string;
    score: number;
    shortAdvice: string;
  }>(null);
  const playSound = (path: string) => {
    const audio = new Audio(path);
    audio.play();
  };

  const handleNext = async () => {
    playSound("./audio/506054__mellau__button-click-1.wav");

    const isLastQuestion = step === questions.length - 1;
    const currentQuestion = questions[step];
    const nextQuestion = questions[step + 1];
    if (isLastQuestion) {
      // Disable button to prevent multiple submissions
      const res = await fetch("https://electric-mistakenly-rat.ngrok-free.app/analyze", {
        method: "POST",
        headers: {
          "ngrok-skip-browser-warning": "true",
          // "Content-Type": "application/json"
        },
        body: JSON.stringify(answers) // FIXED IN PART 2 BELOW
      });
      // document.querySelector('.quiz-button')!.textContent = "Submitting...";
      // document.querySelector('.quiz-button')!.setAttribute('disabled', 'true');
      const data = await res.json();
      setResult(data);
      setShowConfetti(true);
      playSound("./audio/404359__kagateni__success2.wav");
      return;
    }

    // Trigger stage intro only if next question is from a new stage
    if (nextQuestion && currentQuestion.stage !== nextQuestion.stage) {
      // Hide Continue button
      document.querySelector('.quiz-button')!.classList.add('hidden');
      document.querySelector('.quiz-button')!.classList.remove('hidden');
      setTransitionStage(nextQuestion.stage);
      return;
    }

    setStep(step + 1);
    playSound("./audio/404359__kagateni__success2.wav");
  };


  useEffect(() => {
    if (step === 1) {
      playSound("/607926__robinhood76__10661-bonus-correct-answer.wav");
    } else if (step === 5) {
      playSound("/607926__robinhood76__10661-bonus-correct-answer.wav");
    } else if (step === questions.length) {
      playSound("/404359__kagateni__success2.wav");
    }
  }, [step]);


  const current = questions[step];

  return (
    <>
      <button
        className="mode-toggle"
        onClick={() => setMode(mode === "dark" ? "light" : "dark")}
      >
        {mode === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>
      <div className="top-logo-header">
        <img src="/logo.webp" alt="Logo" className="top-logo" />
        <span className="top-author">by Shahid Durrani</span>
      </div>
      <div className="quiz-container">



        {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}
        {step === 0 && !result && (
          <div className="milestone-message intro">
            <h2>📣 For Stressed Entrepreneurs</h2>
            <p>Your business might be causing burnout because you’re stuck in the grind. AI automation + mindfulness can help you reclaim 90% of your time in just 18 weeks.</p>

            <ul>
              <li>✅ AI handles CRM, leads, and appointments</li>
              <li>✅ Mental clarity leads to momentum</li>
            </ul>

            <h4>🚀 The SUPER Framework™</h4>
            <ul>
              <li><strong>S</strong>elf-Worth — Detach from overworking</li>
              <li><strong>U</strong>nstoppable Enthusiasm — Reclaim joy</li>
              <li><strong>P</strong>urpose-Driven Clarity — Focus on your why</li>
              <li><strong>E</strong>mpowerment — Proactively design your business</li>
              <li><strong>R</strong>elentless Perseverance — Stay consistent without burnout</li>
            </ul>

            <p><strong>🎁 Start with a Free Strategy Session</strong> to align your vision and automate your workflow.</p>
          </div>
        )}

        <div className="quiz-wrapper">
          <ProgressBar progress={(step + 1) * (100 / questions.length)} step={step + 1} total={questions.length} />
          <AnimatePresence mode="wait">
            <motion.div
              key={result ? "result" : `step-${step}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <AnimatedCard>
                {step === 5 && !result && (
                  <div className="milestone-message midway">
                    <h3>✨ You’re Not Alone in This Struggle</h3>
                    <p>Many entrepreneurs think more hustle is the answer — but it’s not. AI and mindset alignment unlock true freedom.</p>
                    <ul>
                      <li>✅ Replace manual work with automation</li>
                      <li>✅ Reclaim time for what matters</li>
                      <li>✅ SUPER Framework bridges energy + strategy</li>
                    </ul>
                    <p>🚀 Keep going! You’re doing amazing.</p>
                  </div>
                )}

                {result === null ? (
                  <>
                    
                    <h2 className="question-title">{current.text}</h2>

                    {current.type === 'text' && (
                      <div>
                        <input
                          type={current.inputType || "text"}
                          className="quiz-input"
                          onChange={(e) =>
                            setAnswers({ ...answers, [current.text]: e.target.value })
                          }
                        />

                        {Array.isArray(current.options) && current.options?.length > 0 && (
                          <div className="radio-group">
                            {current.options?.map((option: string, i: number) => (
                              <label key={i} className="styled-radio">
                                <input
                                  type="radio"
                                  name={`text-question-${current.id}`} // Unique group
                                  value={option}
                                  onChange={() =>
                                    setAnswers({ ...answers, [current.text]: option })
                                  }
                                />
                                <span>{option}</span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {current.type === 'checkbox' && (
                      <div className="radio-group">
                        {current.options?.map((option: string, i: number) => (
                          <label key={i} className="radio-label">
                            <input
                              type="checkbox"
                              onChange={(e) => {
                                const prev = answers[current.text]?.split(',') || [];
                                const updated = e.target.checked
                                  ? [...prev, option]
                                  : prev.filter((v) => v !== option);
                                setAnswers({ ...answers, [current.text]: updated.join(',') });
                              }}
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    )}
                    {current.type === 'radio' && current.options?.length && (
                      <div className="radio-group">
                        {current.options.map((option: string, i: number) => (
                          <label key={i} className="styled-radio">
                            <input
                              type="radio"
                              name={`question-${current.id}`}
                              value={option}
                              onChange={() =>
                                setAnswers({ ...answers, [current.text]: option })
                              }
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    )}


                    {current.type === 'bottleneck' && (
                      <div className="radio-group">
                        {["CRM Management", "Lead Generation", "SMS Marketing", "Email Marketing", "Appointment Scheduling", "Customer Follow-Ups", "Calendar Management", "Data Entry / Admin"].map((option, i) => (
                          <label key={i} className="radio-label">
                            <input
                              type="radio"
                              name="bottleneck"
                              value={option}
                              onChange={() =>
                                setAnswers({ ...answers, bottleneck: option })
                              }
                            />
                            {option}
                          </label>
                        ))}
                        <label className="radio-label">
                          <input
                            type="radio"
                            name="bottleneck"
                            value="Other"
                            onChange={() =>
                              setAnswers({ ...answers, bottleneck: "Other" })
                            }
                          />
                          Other:
                          <input
                            type="text"
                            className="quiz-input"
                            onBlur={(e) =>
                              setAnswers({ ...answers, bottleneckOther: e.target.value })
                            }
                          />
                        </label>
                      </div>
                    )}

                    <button className="quiz-button" onClick={handleNext}>
                      {step === questions.length - 1 ? "Get My Results" : "Continue"}
                    </button>
                    {transitionStage && (
                      <AnimatedCard>
                        <div className="milestone-message stage-transition">
                          <h3>🚀 Ready for the next step?</h3>
                          <p>Let's dive into <strong>{transitionStage}</strong> — where we uncover even deeper automation opportunities.</p>
                          <button className="quiz-button" onClick={() => {
                            setStep(step + 1);
                            setTransitionStage(null);
                          }}>
                            Let’s get into {transitionStage}
                          </button>
                        </div>
                      </AnimatedCard>
                    )}

                  </>
                ) : (
                  <div className="result-card">
                    <h2 className="result-title">🎯 Your AI Readiness Report</h2>
                    <p className="score-text">{result.score}/100</p>
                    <div className="result-details">
                      <p><strong>⏱ Time You Can Save:</strong> {result.timeSaved}</p>
                      <p><strong>🧠 Mindset Gap:</strong> {result.mindsetGap}</p>
                      <p><strong>💡 Advice:</strong> {result.shortAdvice}</p>
                    </div>

                    {result.score < 60 && !formSubmitted ? (
                      <div className="followup-form">
                        <h3>🚀 Want to improve your score?</h3>
                        <p>Share your name & email and we’ll send tailored tips to help you get AI-ready.</p>
                        <input
                          type="text"
                          placeholder="Your Name"
                          className="quiz-input"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                        />
                        <input
                          type="email"
                          placeholder="Your Email"
                          className="quiz-input"
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                        />
                        <button
                          className="quiz-button"
                          onClick={async () => {
                            const res = await fetch('https://electric-mistakenly-rat.ngrok-free.app/notify-low-score', {
                              method: 'POST',
                              headers: { "ngrok-skip-browser-warning": "true" },
                              body: JSON.stringify({
                                name: clientName,
                                email: clientEmail,
                                score: result.score
                              })
                            });
                            const data = await res.json();
                            if (data.success) setFormSubmitted(true);
                          }}
                        >
                          📩 Send Me Improvement Plan
                        </button>
                      </div>
                    ) : result.score < 60 && formSubmitted ? (
                      <p>✅ Thank you! We'll follow up with you soon.</p>
                    ) : (
                      <a
                        href="https://calendly.com/fouziaqateel/meet-with-us"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cta-button"
                      >
                        📞 Book Free Strategy Call
                      </a>
                    )}
                  </div>

                )}
                {result && (
                  <div className="milestone-message final">
                    <h3>🎉 Now You Know the Problem — Let’s Fix It</h3>
                    <p>Your score shows where AI & mindset can unlock your business potential.</p>

                    <ol>
                      <li>📈 <strong>Free Strategy Session</strong> — Find AI gaps</li>
                      <li>🧠 <strong>18-Week Plan</strong> — Systematically automate</li>
                      <li>🧘 <strong>Mindfulness Tools</strong> — Sustain momentum</li>
                    </ol>

                    <p>🎯 <strong>Claim your free session now.</strong> Let’s build a business that works for you — not the other way around.</p>
                  </div>
                )}

              </AnimatedCard>
            </motion.div>``
          </AnimatePresence>
        </div>
      </div>
    </>

  );
}
