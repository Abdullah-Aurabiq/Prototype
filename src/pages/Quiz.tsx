import { useState } from 'react';
import AnimatedCard from '../components/AnimatedCard';
import ProgressBar from '../components/ProgressBar';
import Confetti from 'react-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
const questions = [
  {
    id: 1,
    text: "How many hours/week do you waste on repetitive tasks?",
    inputType: "number",
    type: "text"
  },
  {
    id: 2,
    text: "Which of these do you currently handle manually?",
    type: "checkbox",
    options: [
      "Lead generation",
      "Customer follow-ups",
      "Appointment booking",
      "Sending emails",
      "Managing CRM",
      "Sales calls",
      "Data entry",
      "Social media posting",
      "Project status tracking",
    ]
  },
  {
    id: 3,
    text: "What is your biggest bottleneck right now?",
    type: "bottleneck"
  },
  {
    id: 4,
    text: "How do you currently manage your sales leads?",
    type: "radio",
    options: [
      "Google Sheets or Excel",
      "CRM tool (e.g. HubSpot, Close.io)",
      "Pen and paper",
      "I don’t track them"
    ]
  },
  {
    id: 5,
    text: "How confident are you using AI tools (1–10)?",
    inputType: "number",
    type: "text"
  },
  {
    id: 6,
    text: "Do you use any of the following?",
    type: "checkbox",
    options: [
      "Zapier / Make",
      "ChatGPT / Gemini",
      "Calendly / TidyCal",
      "CRM Tools",
      "Google Workspace",
      "None of the above"
    ]
  },
  {
    id: 7,
    text: "How do you currently schedule meetings?",
    type: "radio",
    options: [
      "Manually over WhatsApp / Email",
      "Calendly / Booking link",
      "Assistant / VA",
      "I don’t schedule"
    ]
  },
  {
    id: 8,
    text: "What is your monthly lead flow?",
    type: "radio",
    options: [
      "Less than 10 leads/month",
      "10–50 leads/month",
      "50–200 leads/month",
      "200+ leads/month"
    ]
  },
  {
    id: 9,
    text: "What’s your business goal for the next 6 months?",
    inputType: "text",
    type: "text"
  },
  {
    id: 10,
    text: "If you could automate ONE thing today, what would it be?",
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

    if (step < questions.length - 1) {
      playSound("./audio/404359__kagateni__success2.wav");
      setStep(step + 1);
    } else {
      const res = await fetch("https://electric-mistakenly-rat.ngrok-free.app//analyze", {
        method: "POST",
        headers: { "ngrok-skip-browser-warning": "true", "Content-Type": "application/json" },
        body: JSON.stringify(answers)
      });
      const data = await res.json();
      setResult(data);
      setShowConfetti(true);
      playSound("/audio/finish.mp3");
    }
  };

  useEffect(() => {
    if (step === 0) {
      playSound("./audio/607926__robinhood76__10661-bonus-correct-answer.wav");
    } else if (step === 5) {
      playSound("./audio/607926__robinhood76__10661-bonus-correct-answer.wav");
    } else if (step === questions.length) {
      playSound("./audio/404359__kagateni__success2.wav");
    }
  }, [step]);


  const current = questions[step];

  return (
    <>
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
                    <input
                      type={current.inputType || "text"}
                      className="quiz-input"
                      onChange={(e) =>
                        setAnswers({ ...answers, [current.id]: e.target.value })
                      }
                    />
                  )}

                  {current.type === 'checkbox' && (
                    <div className="radio-group">
                      {current.options?.map((option: string, i: number) => (
                        <label key={i} className="radio-label">
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              const prev = answers[current.id]?.split(',') || [];
                              const updated = e.target.checked
                                ? [...prev, option]
                                : prev.filter((v) => v !== option);
                              setAnswers({ ...answers, [current.id]: updated.join(',') });
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
                              setAnswers({ ...answers, [current.id]: option })
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
                            headers: { "ngrok-skip-browser-warning": "true", "Content-Type": "application/json" },
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
                      href="https://calendly.com/your-link"
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
