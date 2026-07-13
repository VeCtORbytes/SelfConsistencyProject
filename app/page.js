"use client";

import { useState, useEffect } from "react";

const MODEL_STYLES = {
  OpenAI: { border: "border-openai/30", dot: "bg-openai", text: "text-openai", borderActive: "border-openai" },
  Gemini: { border: "border-gemini/30", dot: "bg-gemini", text: "text-gemini", borderActive: "border-gemini" },
  Claude: { border: "border-claude/30", dot: "bg-claude", text: "text-claude", borderActive: "border-claude" },
};

function styleFor(modelLabel) {
  const key = Object.keys(MODEL_STYLES).find((k) => modelLabel?.startsWith(k) || modelLabel?.includes(k));
  return MODEL_STYLES[key] || { border: "border-line", dot: "bg-fog", text: "text-fog", borderActive: "border-ink" };
}

function ConvergenceMark() {
  return (
    <svg viewBox="0 0 240 34" className="converge" aria-hidden="true">
      <path d="M10 6 C 80 6, 100 17, 120 17" stroke="#0EA5E9" strokeWidth="2" fill="none" />
      <path d="M10 17 C 80 17, 100 17, 120 17" stroke="#D97706" strokeWidth="2" fill="none" />
      <path d="M10 28 C 80 28, 100 17, 120 17" stroke="#84CC16" strokeWidth="2" fill="none" />
      <path d="M120 17 L 230 17" stroke="#E2E8F0" strokeWidth="2" fill="none" />
      <circle cx="120" cy="17" r="3" fill="#E2E8F0" />
    </svg>
  );
}

function WorkflowDiagram({ isLoading = false }) {
  const particleSpeed = isLoading ? "1.5s" : "6s";
  return (
    <div className="rounded-2xl border-2 border-slate-900 bg-white p-5 shadow-[4px_4px_0px_0px_#000] animate-fadeIn">
      <div className="w-full overflow-hidden">
        <svg viewBox="0 0 600 310" className="w-full h-auto select-none" aria-hidden="true">
          {/* connect lines */}
          <path
            id="path1"
            d="M 300 40 C 300 80, 110 80, 110 110"
            stroke="#0EA5E9"
            strokeWidth="2"
            strokeDasharray={isLoading ? "6" : "none"}
            className={isLoading ? "animated-path" : ""}
            fill="none"
            opacity="0.8"
          />
          <path
            id="path2"
            d="M 300 40 L 300 110"
            stroke="#D97706"
            strokeWidth="2"
            strokeDasharray={isLoading ? "6" : "none"}
            className={isLoading ? "animated-path" : ""}
            fill="none"
            opacity="0.8"
          />
          <path
            id="path3"
            d="M 300 40 C 300 80, 490 80, 490 110"
            stroke="#84CC16"
            strokeWidth="2"
            strokeDasharray={isLoading ? "6" : "none"}
            className={isLoading ? "animated-path" : ""}
            fill="none"
            opacity="0.8"
          />

          <path
            id="path4"
            d="M 110 150 C 110 185, 300 185, 300 215"
            stroke="#0EA5E9"
            strokeWidth="2"
            strokeDasharray={isLoading ? "6" : "none"}
            className={isLoading ? "animated-path" : ""}
            fill="none"
            opacity="0.8"
          />
          <path
            id="path5"
            d="M 300 150 L 300 215"
            stroke="#D97706"
            strokeWidth="2"
            strokeDasharray={isLoading ? "6" : "none"}
            className={isLoading ? "animated-path" : ""}
            fill="none"
            opacity="0.8"
          />
          <path
            id="path6"
            d="M 490 150 C 490 185, 300 185, 300 215"
            stroke="#84CC16"
            strokeWidth="2"
            strokeDasharray={isLoading ? "6" : "none"}
            className={isLoading ? "animated-path" : ""}
            fill="none"
            opacity="0.8"
          />

          <path
            id="path7"
            d="M 300 255 L 300 285"
            stroke="#84CC16"
            strokeWidth="2.5"
            strokeDasharray={isLoading ? "4" : "none"}
            className={isLoading ? "animated-path" : ""}
            fill="none"
            opacity="0.9"
          />

          {/* Animated data particles flowing along paths */}
          <circle r="3.5" fill="#0EA5E9">
            <animateMotion dur={particleSpeed} repeatCount="indefinite">
              <mpath href="#path1" />
            </animateMotion>
          </circle>
          <circle r="3.5" fill="#D97706">
            <animateMotion dur={isLoading ? "1.2s" : "5s"} repeatCount="indefinite">
              <mpath href="#path2" />
            </animateMotion>
          </circle>
          <circle r="3.5" fill="#84CC16">
            <animateMotion dur={particleSpeed} repeatCount="indefinite">
              <mpath href="#path3" />
            </animateMotion>
          </circle>

          <circle r="3.5" fill="#0EA5E9">
            <animateMotion dur={particleSpeed} repeatCount="indefinite">
              <mpath href="#path4" />
            </animateMotion>
          </circle>
          <circle r="3.5" fill="#D97706">
            <animateMotion dur={isLoading ? "1.2s" : "5s"} repeatCount="indefinite">
              <mpath href="#path5" />
            </animateMotion>
          </circle>
          <circle r="3.5" fill="#84CC16">
            <animateMotion dur={particleSpeed} repeatCount="indefinite">
              <mpath href="#path6" />
            </animateMotion>
          </circle>

          <circle r="4" fill="#84CC16">
            <animateMotion dur={isLoading ? "0.9s" : "4s"} repeatCount="indefinite">
              <mpath href="#path7" />
            </animateMotion>
          </circle>

          {/* User Prompt */}
          <g className="transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer">
            <rect x="210" y="10" width="180" height="30" rx="6" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
            <text x="300" y="29" textAnchor="middle" fill="#0F172A" className="font-mono text-xs font-bold tracking-wider">USER PROMPT</text>
          </g>

          {/* OpenAI */}
          <g className="transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer">
            <rect x="45" y="110" width="130" height="40" rx="6" fill="#FFFFFF" stroke="#0EA5E9" strokeWidth="2" />
            <text x="110" y="128" textAnchor="middle" fill="#0EA5E9" className="font-mono text-xs font-bold">OpenAI</text>
            <text x="110" y="142" textAnchor="middle" fill="#475569" className="font-mono text-[9px]">gpt-4o-mini</text>
          </g>

          {/* Gemini */}
          <g className="transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer">
            <rect x="235" y="110" width="130" height="40" rx="6" fill="#FFFFFF" stroke="#D97706" strokeWidth="2" />
            <text x="300" y="128" textAnchor="middle" fill="#D97706" className="font-mono text-xs font-bold">Gemini</text>
            <text x="300" y="142" textAnchor="middle" fill="#475569" className="font-mono text-[9px]">3.5-flash</text>
          </g>

          {/* Claude */}
          <g className="transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer">
            <rect x="425" y="110" width="130" height="40" rx="6" fill="#FFFFFF" stroke="#84CC16" strokeWidth="2" />
            <text x="490" y="128" textAnchor="middle" fill="#84CC16" className="font-mono text-xs font-bold">Claude</text>
            <text x="490" y="142" textAnchor="middle" fill="#475569" className="font-mono text-[9px]">4.5-haiku</text>
          </g>

          {/* Evaluator */}
          <g className="transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer">
            <rect x="180" y="215" width="240" height="40" rx="6" fill="#FFFFFF" stroke="#84CC16" strokeWidth="2" />
            <text x="300" y="233" textAnchor="middle" fill="#84CC16" className="font-mono text-xs font-bold uppercase tracking-wider">Claude Evaluator</text>
            <text x="300" y="248" textAnchor="middle" fill="#475569" className="font-sans text-[10px] font-semibold">Self-Consistency Synthesis</text>
          </g>

          {/* Output */}
          <circle cx="300" cy="295" r="10" fill="#84CC16" className={isLoading ? "animate-ping" : ""} />
          <circle cx="300" cy="295" r="6" fill="#FFFFFF" stroke="#000" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}

function renderMarkdown(text) {
  if (!text) return null;

  const lines = text.split("\n");
  const elements = [];
  const evaluationElements = [];
  let currentList = [];
  let currentParagraph = [];

  const flushParagraph = (key) => {
    if (currentParagraph.length > 0) {
      const paragraphText = currentParagraph.join("\n");
      const target = isInEvaluationSection ? evaluationElements : elements;
      target.push(
        <p key={`p-${key}`} className="mb-3 last:mb-0 leading-relaxed text-fog text-sm">
          {renderInline(paragraphText)}
        </p>
      );
      currentParagraph = [];
    }
  };

  const flushList = (key) => {
    if (currentList.length > 0) {
      const target = isInEvaluationSection ? evaluationElements : elements;
      target.push(
        <ul key={`ul-${key}`} className="my-3 list-disc pl-5 text-fog text-sm space-y-1">
          {currentList}
        </ul>
      );
      currentList = [];
    }
  };

  let isInEvaluationSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (/^(?:---|___|\*\*\*)$/.test(trimmed)) {
      flushParagraph(i);
      flushList(i);
      isInEvaluationSection = true;
      continue;
    }

    if (isInEvaluationSection) {
      if (trimmed.startsWith("### ")) {
        flushParagraph(i);
        flushList(i);
        evaluationElements.push(
          <h3 key={`h3-${i}`} className="mt-4 mb-2.5 font-mono text-xs uppercase tracking-wider text-slate-950 font-bold border-b border-line pb-2.5">
            {renderInline(trimmed.slice(4))}
          </h3>
        );
        continue;
      }

      // Check most accurate model
      const accMatch = trimmed.match(/^\s*[-*]\s+\*\*Most Accurate Model:\*\*\s*(.*)/i) || trimmed.match(/^\s*\*\*Most Accurate Model:\*\*\s*(.*)/i);
      if (accMatch) {
        flushParagraph(i);
        flushList(i);
        evaluationElements.push(
          <div key={`acc-${i}`} className="flex items-center gap-2 pb-2.5 animate-fadeIn">
            <span className="text-[10px] font-mono font-bold tracking-widest text-slate-600">MOST ACCURATE:</span>
            <span className="text-xs font-mono font-bold text-slate-900 px-3 py-1 rounded bg-[#84CC16] border-2 border-slate-900 shadow-[2px_2px_0px_0px_#000]">
              {accMatch[1]}
            </span>
          </div>
        );
        continue;
      }

      // Check weight header line (Weightage/Influence)
      const weightHeaderMatch = trimmed.match(/^\s*[-*]\s+\*\*Weightage\/Influence:\*\*/i) || trimmed.match(/^\s*\*\*Weightage\/Influence:\*\*/i);
      if (weightHeaderMatch) {
        flushParagraph(i);
        flushList(i);
        evaluationElements.push(
          <div key={`weight-header-${i}`} className="text-[10px] font-mono font-bold text-slate-600 uppercase tracking-widest mt-3 mb-1.5 animate-fadeIn">
            Qualitative Influence Estimate (Evaluator Assessment)
          </div>
        );
        continue;
      }

      // Check percentage weights (with or without asterisks)
      const weightMatch = trimmed.match(/^\s*[-*]\s+(?:\*\*)?(.*?)(?:\*\*)?:\s*(\d+)%/) || trimmed.match(/^\s*(?:\*\*)?(.*?)(?:\*\*)?:\s*(\d+)%/);
      if (weightMatch) {
        if (weightMatch[1].toLowerCase().includes("openai") || weightMatch[1].toLowerCase().includes("gemini") || weightMatch[1].toLowerCase().includes("claude") || weightMatch[1].toLowerCase().includes("gpt") || weightMatch[1].toLowerCase().includes("flash") || weightMatch[1].toLowerCase().includes("haiku")) {
          flushParagraph(i);
          flushList(i);
          const modelName = weightMatch[1];
          const percent = parseInt(weightMatch[2]);
          const colorClass = modelName.includes("OpenAI") ? "bg-[#0EA5E9]" : modelName.includes("Gemini") ? "bg-[#D97706]" : "bg-[#84CC16]";
          evaluationElements.push(
            <div key={`weight-${i}`} className="space-y-1.5 py-1.5 max-w-md animate-fadeIn">
              <div className="flex justify-between text-xs font-mono font-bold text-slate-700">
                <span>{modelName}</span>
                <span>{percent}%</span>
              </div>
              <div className="h-3 w-full bg-white border-2 border-slate-900 rounded-full overflow-hidden shadow-[1px_1px_0px_0px_#000]">
                <div className={`h-full ${colorClass} rounded-full`} style={{ width: `${percent}%` }} />
              </div>
            </div>
          );
          continue;
        }
      }

      // Check reasoning
      const reasonMatch = trimmed.match(/^\s*[-*]\s+\*\*Evaluation Reasoning:\*\*\s*(.*)/i) || trimmed.match(/^\s*\*\*Evaluation Reasoning:\*\*\s*(.*)/i);
      if (reasonMatch) {
        flushParagraph(i);
        flushList(i);
        evaluationElements.push(
          <div key={`reason-${i}`} className="mt-4 text-xs leading-relaxed text-slate-700 bg-white border-2 border-slate-900 p-4 rounded-xl shadow-[3px_3px_0px_0px_#000] animate-fadeIn">
            <span className="font-mono font-bold text-[10px] uppercase text-slate-900 block mb-1 font-extrabold tracking-wider">Evaluation Reasoning Assessment:</span>
            {reasonMatch[1]}
          </div>
        );
        continue;
      }
    }

    // Default processing for general text:
    if (trimmed.startsWith("# ")) {
      flushParagraph(i);
      flushList(i);
      const target = isInEvaluationSection ? evaluationElements : elements;
      target.push(
        <h1 key={`h1-${i}`} className="mt-6 mb-4 text-xl font-bold text-ink first:mt-0">
          {renderInline(trimmed.slice(2))}
        </h1>
      );
    } else if (trimmed.startsWith("## ")) {
      flushParagraph(i);
      flushList(i);
      const target = isInEvaluationSection ? evaluationElements : elements;
      target.push(
        <h2 key={`h2-${i}`} className="mt-5 mb-3 text-lg font-bold text-ink first:mt-0">
          {renderInline(trimmed.slice(3))}
        </h2>
      );
    } else if (trimmed.startsWith("### ")) {
      flushParagraph(i);
      flushList(i);
      const target = isInEvaluationSection ? evaluationElements : elements;
      target.push(
        <h3 key={`h3-${i}`} className="mt-4 mb-2 text-base font-bold text-ink first:mt-0">
          {renderInline(trimmed.slice(4))}
        </h3>
      );
    } else if (trimmed.startsWith("#### ")) {
      flushParagraph(i);
      flushList(i);
      const target = isInEvaluationSection ? evaluationElements : elements;
      target.push(
        <h4 key={`h4-${i}`} className="mt-3 mb-2 text-sm font-bold text-ink first:mt-0">
          {renderInline(trimmed.slice(5))}
        </h4>
      );
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      flushParagraph(i);
      const cleaned = trimmed.slice(2).trim();
      currentList.push(
        <li key={`li-${i}-${currentList.length}`} className="mb-1.5 last:mb-0">
          {renderInline(cleaned)}
        </li>
      );
    } else if (trimmed === "") {
      flushParagraph(i);
      flushList(i);
    } else {
      flushList(i);
      currentParagraph.push(trimmed);
    }
  }

  // Final flush
  flushParagraph("final");
  flushList("final");

  // Wrap evaluation elements in a single Neobrutalist dashboard widget
  if (evaluationElements.length > 0) {
    elements.push(
      <div key="evaluation-section-panel" className="mt-6 bg-[#F8FAFC] border-2 border-slate-900 p-5 rounded-2xl shadow-[4px_4px_0px_0px_#000] space-y-4 animate-fadeIn">
        {evaluationElements}
      </div>
    );
  }

  return elements;
}

function renderInline(text) {
  if (typeof text !== "string") return text;
  const parts = [];
  const regex = /(\*\*[\s\S]*?\*\*|\*[\s\S]*?\*|`[^`\n]+`)/g;
  let match;
  let lastIndex = 0;

  const renderTextWithBreaks = (str, keyPrefix) => {
    const lines = str.split("\n");
    return lines.map((line, idx) => (
      <span key={`${keyPrefix}-${idx}`}>
        {idx > 0 && <br />}
        {line}
      </span>
    ));
  };

  while ((match = regex.exec(text)) !== null) {
    const matchIndex = match.index;
    const matchStr = match[0];

    if (matchIndex > lastIndex) {
      parts.push(renderTextWithBreaks(text.slice(lastIndex, matchIndex), `txt-${matchIndex}`));
    }

    if (matchStr.startsWith("**") && matchStr.endsWith("**")) {
      parts.push(
        <strong key={matchIndex} className="font-extrabold text-[#0F172A]">
          {renderTextWithBreaks(matchStr.slice(2, -2), `str-${matchIndex}`)}
        </strong>
      );
    } else if (matchStr.startsWith("*") && matchStr.endsWith("*")) {
      parts.push(
        <em key={matchIndex} className="italic text-fog">
          {renderTextWithBreaks(matchStr.slice(1, -1), `em-${matchIndex}`)}
        </em>
      );
    } else if (matchStr.startsWith("`") && matchStr.endsWith("`")) {
      parts.push(
        <code key={matchIndex} className="rounded bg-slate-100 border border-slate-200 px-1.5 py-0.5 font-mono text-xs text-ink font-semibold">
          {matchStr.slice(1, -1)}
        </code>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(renderTextWithBreaks(text.slice(lastIndex), `txt-end`));
  }

  return parts;
}

function ChatTurn({ turn }) {
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="space-y-6 rounded-2xl border-2 border-slate-900 bg-white p-6 shadow-[4px_4px_0px_0px_#000] animate-fadeIn">
      {/* User Question */}
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded bg-slate-900 text-xs font-mono font-bold text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_#84CC16]">
          U
        </div>
        <div className="space-y-1">
          <p className="font-mono text-[10px] uppercase tracking-wider text-fog font-bold">You asked</p>
          <p className="text-ink text-sm font-semibold">{turn.question}</p>
        </div>
      </div>

      {/* Loading State */}
      {turn.loading && (
        <div className="flex flex-col items-center justify-center py-8 px-4 border-2 border-slate-900 bg-white rounded-2xl shadow-[4px_4px_0px_0px_#000] space-y-5 animate-fadeIn">
          <div className="relative h-12 w-12 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-slate-100 animate-pulse"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#84CC16] border-r-[#84CC16] animate-spin"></div>
            <span className="text-xl">🧠</span>
          </div>
          <div className="text-center space-y-1">
            <p className="font-mono text-xs font-black text-slate-900 uppercase tracking-widest animate-pulse">
              Consulting models & aggregating consensus...
            </p>
            <p className="text-[10px] text-fog">
              Dispatching parallel queries to OpenAI, Gemini, and Claude
            </p>
          </div>
          <div className="space-y-2.5 w-full max-w-sm">
            {[
              { name: "OpenAI", provider: "gpt-4o-mini" },
              { name: "Gemini", provider: "gemini-3.5-flash" },
              { name: "Claude", provider: "claude-4.5-haiku" }
            ].map((m) => (
              <div key={m.name} className="flex items-center justify-between rounded-xl border-2 border-slate-900 bg-white p-3 shadow-[2px_2px_0px_0px_#000] animate-pulse">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#84CC16] animate-ping" />
                  <span className="text-xs font-bold text-slate-800">{m.name}</span>
                </div>
                <span className="font-mono text-[9px] text-slate-400 uppercase tracking-wider">{m.provider}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error State */}
      {turn.error && !turn.finalAnswer && (
        <div className="rounded-xl border-2 border-slate-900 bg-red-50 p-4 text-sm font-semibold text-red-700 shadow-[3px_3px_0px_0px_#000] animate-fadeIn">
          Error: {turn.error}
        </div>
      )}

      {/* Results */}
      {!turn.loading && turn.finalAnswer && (
        <div className="space-y-6">
          {/* Individual responses comparisons */}
          <div>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-800 transition hover:bg-slate-900 hover:text-white border-2 border-slate-900 px-3.5 py-1.5 rounded-lg bg-white shadow-[2px_2px_0px_0px_#000]"
            >
              <span>{showDetails ? "▼ Hide Individual Answers" : "▶ Compare Individual Answers"}</span>
            </button>
            
            {showDetails && (
              <div className="mt-4 rounded-2xl border-2 border-slate-900 bg-white p-4 animate-fadeIn shadow-[3px_3px_0px_0px_#000]">
                {/* Horizontal Tab bar */}
                <div className="flex border-b-2 border-slate-900 gap-2 overflow-x-auto pb-[2px] custom-scrollbar">
                  {turn.modelAnswers?.map((r, i) => {
                    const isActive = activeTab === i;
                    const s = styleFor(r.model);
                    return (
                      <button
                        key={i}
                        onClick={() => setActiveTab(i)}
                        className={`px-4 py-2 text-xs font-mono border-b-4 font-bold transition whitespace-nowrap -mb-[2px] ${
                          isActive
                            ? `${s.text} ${s.borderActive.replace("border-", "border-b-")}`
                            : "border-transparent text-fog hover:text-ink"
                        }`}
                      >
                        {r.model}
                      </button>
                    );
                  })}
                </div>

                {/* Tab content panel */}
                <div className="pt-4 text-sm leading-relaxed text-slate-700">
                  {turn.modelAnswers?.[activeTab]?.answer ? (
                    <div className="space-y-2 animate-fadeIn font-normal text-sm">
                      {renderMarkdown(turn.modelAnswers[activeTab].answer)}
                    </div>
                  ) : (
                    <p className="text-red-600 font-mono text-xs animate-fadeIn">
                      Failed: {turn.modelAnswers?.[activeTab]?.error || "No response received"}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Converged Answer */}
          <div className="space-y-3">
            <ConvergenceMark />
            <h2 className="font-mono text-[10px] uppercase tracking-wider text-[#84CC16] font-black">
              Converged Answer
            </h2>
            <div className="rounded-2xl border-2 border-slate-900 bg-white p-6 shadow-[4px_4px_0px_0px_#84CC16] space-y-3">
              {renderMarkdown(turn.finalAnswer)}
            </div>
          </div>

          {turn.error && (
            <p className="text-xs text-red-600 font-mono">Note: {turn.error}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default function Page() {
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [requestCount, setRequestCount] = useState(0);
  const [showSidebar, setShowSidebar] = useState(true);
  const [firstQueryTime, setFirstQueryTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedConvs = localStorage.getItem("self_consistency_convs");
      const savedCount = localStorage.getItem("self_consistency_req_count");
      const savedTime = localStorage.getItem("self_consistency_first_query_time");
      
      const convs = savedConvs ? JSON.parse(savedConvs) : [];
      const count = savedCount ? parseInt(savedCount, 10) : 0;
      const fTime = savedTime ? parseInt(savedTime, 10) : null;
      
      setConversations(convs);
      setRequestCount(count);
      setFirstQueryTime(fTime);
      
      if (convs.length > 0) {
        setActiveId(convs[0].id);
      } else {
        const initialId = Date.now().toString();
        const initialConv = { id: initialId, title: "New Conversation", thread: [] };
        setConversations([initialConv]);
        setActiveId(initialId);
        localStorage.setItem("self_consistency_convs", JSON.stringify([initialConv]));
      }
    }
  }, []);

  const saveConversations = (updated) => {
    setConversations(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("self_consistency_convs", JSON.stringify(updated));
    }
  };

  const saveRequestCount = (count) => {
    setRequestCount(count);
    if (typeof window !== "undefined") {
      localStorage.setItem("self_consistency_req_count", count.toString());
    }
  };

  const saveFirstQueryTime = (time) => {
    setFirstQueryTime(time);
    if (typeof window !== "undefined") {
      if (time) {
        localStorage.setItem("self_consistency_first_query_time", time.toString());
      } else {
        localStorage.removeItem("self_consistency_first_query_time");
      }
    }
  };

  // Cooldown ticking checker
  useEffect(() => {
    if (!firstQueryTime) {
      setTimeRemaining(0);
      return;
    }

    const interval = setInterval(() => {
      const COOLDOWN_DURATION = 24 * 60 * 60 * 1000; // 24 hours
      const elapsed = Date.now() - firstQueryTime;
      const remaining = COOLDOWN_DURATION - elapsed;

      if (remaining <= 0) {
        saveRequestCount(0);
        saveFirstQueryTime(null);
        setTimeRemaining(0);
        clearInterval(interval);
      } else {
        setTimeRemaining(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [firstQueryTime]);

  const formatTimeRemaining = (ms) => {
    if (ms <= 0) return "00h 00m 00s";
    const totalSecs = Math.floor(ms / 1000);
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs.toString().padStart(2, "0")}h ${mins.toString().padStart(2, "0")}m ${secs.toString().padStart(2, "0")}s`;
  };

  const handleNewChat = () => {
    const newId = Date.now().toString();
    const newConv = { id: newId, title: "New Conversation", thread: [] };
    const updated = [newConv, ...conversations];
    saveConversations(updated);
    setActiveId(newId);
  };

  const handleDeleteChat = (e, idToDelete) => {
    e.stopPropagation();
    const filtered = conversations.filter((c) => c.id !== idToDelete);
    if (filtered.length === 0) {
      const newId = Date.now().toString();
      const newConv = { id: newId, title: "New Conversation", thread: [] };
      saveConversations([newConv]);
      setActiveId(newId);
    } else {
      saveConversations(filtered);
      if (activeId === idToDelete) {
        setActiveId(filtered[0].id);
      }
    }
  };

  const handleResetUsage = () => {
    saveRequestCount(0);
  };

  const activeConv = conversations.find((c) => c.id === activeId) || { thread: [] };
  const thread = activeConv.thread;

  const updateActiveThread = (updater) => {
    const updated = conversations.map((c) => {
      if (c.id === activeId) {
        const nextThread = typeof updater === "function" ? updater(c.thread) : updater;
        const firstTurn = nextThread[0];
        const title = firstTurn ? (firstTurn.question.length > 20 ? firstTurn.question.slice(0, 18) + "..." : firstTurn.question) : "New Conversation";
        return { ...c, title, thread: nextThread };
      }
      return c;
    });
    saveConversations(updated);
  };

  async function handleSubmit(e) {
    if (e) e.preventDefault();
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt || loading) return;

    if (requestCount >= 2) {
      return;
    }

    setLoading(true);
    setPrompt("");

    const nextCount = requestCount + 1;
    saveRequestCount(nextCount);

    if (requestCount === 0) {
      saveFirstQueryTime(Date.now());
    }

    const turnIndex = thread.length;
    updateActiveThread((prev) => [...prev, { question: trimmedPrompt, loading: true }]);

    const history = thread
      .filter((t) => !t.loading && t.finalAnswer)
      .map((t) => ({ question: t.question, answer: t.finalAnswer }));

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: trimmedPrompt, history }),
      });
      const data = await res.json();
      
      updateActiveThread((prev) => {
        const next = [...prev];
        if (!res.ok && !data.modelAnswers) {
          next[turnIndex] = {
            question: trimmedPrompt,
            error: data.error || "Something went wrong.",
            loading: false,
          };
        } else {
          next[turnIndex] = {
            question: trimmedPrompt,
            modelAnswers: data.modelAnswers,
            finalAnswer: data.finalAnswer,
            error: data.error || null,
            loading: false,
          };
        }
        return next;
      });
    } catch (err) {
      updateActiveThread((prev) => {
        const next = [...prev];
        next[turnIndex] = {
          question: trimmedPrompt,
          error: err.message,
          loading: false,
        };
        return next;
      });
    } finally {
      setLoading(false);
    }
  }

  const isLimitReached = requestCount >= 2;

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row text-ink relative">
      
      {/* Floating Expand Sidebar Button (only visible when closed) */}
      {!showSidebar && (
        <button
          onClick={() => setShowSidebar(true)}
          className="fixed left-4 top-4 z-40 h-10 w-10 flex items-center justify-center rounded-xl bg-[#84CC16] text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#000] hover:bg-[#A3E635] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition font-bold text-sm animate-fadeIn"
          title="Show Sidebar"
        >
          ▶
        </button>
      )}

      {/* Left Sidebar: Conversation History & Rate Limiting */}
      {showSidebar && (
        <div className="w-full lg:w-[260px] lg:h-screen shrink-0 border-b-2 lg:border-b-0 lg:border-r-2 border-slate-900 bg-white flex flex-col z-20 animate-fadeIn">
          {/* New Chat & Hide Sidebar Button */}
          <div className="p-4 border-b-2 border-slate-900 flex items-center gap-2">
            <button
              onClick={handleNewChat}
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#84CC16] text-slate-900 font-bold border-2 border-slate-900 shadow-[3px_3px_0px_0px_#000] hover:bg-[#A3E635] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
            >
              <span>+</span> New Chat
            </button>
            <button
              onClick={() => setShowSidebar(false)}
              className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl bg-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_#000] hover:bg-slate-50 hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition font-bold text-sm text-slate-700"
              title="Hide Sidebar"
            >
              ◀
            </button>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar lg:max-h-[calc(100vh-210px)]">
            {conversations.map((conv) => {
              const isActive = conv.id === activeId;
              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveId(conv.id)}
                  className={`group relative flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition ${
                    isActive
                      ? "bg-slate-100 border-slate-900 shadow-[2px_2px_0px_0px_#000]"
                      : "border-transparent bg-transparent hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2.5 overflow-hidden w-full pr-6">
                    <span className="text-[10px] text-slate-400 font-mono">💬</span>
                    <span className="text-xs font-bold text-slate-800 truncate font-sans">
                      {conv.title || "New Conversation"}
                    </span>
                  </div>
                  <button
                    onClick={(e) => handleDeleteChat(e, conv.id)}
                    className="absolute right-2 opacity-0 group-hover:opacity-100 transition h-6 w-6 flex items-center justify-center text-slate-400 hover:text-red-500 font-bold text-xs"
                    title="Delete Chat"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>

          {/* Bottom Panel: Rate Limit Usage */}
          <div className="p-4 border-t-2 border-slate-900 bg-slate-50 space-y-3 mt-auto">
            <div className="flex items-center justify-between text-[10px] font-mono font-black text-slate-800 tracking-wider">
              <span>USAGE LIMIT (FREE)</span>
              <span>{requestCount}/2 Used</span>
            </div>
            {/* Progress bar */}
            <div className="h-3 w-full bg-white border-2 border-slate-900 rounded-full overflow-hidden shadow-[1px_1px_0px_0px_#000]">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  isLimitReached ? "bg-red-500" : requestCount === 1 ? "bg-amber-500" : "bg-[#84CC16]"
                }`}
                style={{ width: `${(requestCount / 2) * 100}%` }}
              />
            </div>
            {isLimitReached && (
              <p className="text-[9px] font-mono text-red-600 font-bold animate-pulse text-center">
                Query limit reached!
              </p>
            )}
            <button
              disabled={firstQueryTime !== null}
              onClick={handleResetUsage}
              className={`w-full py-1.5 rounded-lg border border-slate-900 text-[10px] font-mono font-bold text-center uppercase shadow-[1px_1px_0px_0px_#000] transition ${
                firstQueryTime !== null
                  ? "bg-slate-100 text-slate-400 border-slate-400 cursor-not-allowed shadow-none"
                  : "bg-white hover:bg-slate-100 text-slate-700 hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]"
              }`}
            >
              {firstQueryTime !== null ? `Reset locked (${formatTimeRemaining(timeRemaining)})` : "Reset Free Usage"}
            </button>
          </div>
        </div>
      )}

      {/* Middle Column: Chat Area (scrollable) */}
      <div className={`flex-1 flex flex-col px-6 pt-10 pb-36 md:px-10 ${showSidebar ? "" : "lg:pl-20"} lg:max-h-screen lg:overflow-y-auto custom-scrollbar relative z-10 transition-all duration-300`}>
        <header className="mb-8 border-b-2 border-slate-900 pb-6">
          <div className="inline-block bg-[#84CC16] border-2 border-slate-900 px-3 py-1 rounded-lg shadow-[2px_2px_0px_0px_#000] mb-3">
            <span className="font-mono text-[10px] font-bold text-slate-900 uppercase tracking-widest">
              self-consistency answer engine
            </span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight leading-none mt-2">
            Three Models Answer. <br className="hidden md:inline" /> One Converges.
          </h1>
          <p className="mt-3 text-fog text-sm leading-relaxed max-w-xl">
            We query OpenAI, Gemini, and Claude in parallel. A dedicated Claude evaluator checks for consensus and synthesizes the final converged answer.
          </p>
        </header>

        {/* Rate Limit Banner */}
        {isLimitReached && (
          <div className="mb-6 p-4 rounded-xl border-2 border-red-900 bg-red-50 text-red-800 text-xs font-mono font-bold flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 shadow-[3px_3px_0px_0px_#991B1B] animate-fadeIn">
            <span>⚠️ Free tier rate limit reached (2/2 queries). Access will restore automatically.</span>
            <span className="px-3 py-1 bg-white text-red-950 rounded border border-red-955 font-mono text-[10px] font-bold self-start sm:self-center">
              Next query in: {formatTimeRemaining(timeRemaining)}
            </span>
          </div>
        )}

        {/* Chat Thread */}
        {thread.length > 0 ? (
          <div className="space-y-8 mb-6">
            {thread.map((turn, i) => (
              <ChatTurn key={i} turn={turn} />
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center py-20 text-center space-y-4">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white border-2 border-slate-900 shadow-[3px_3px_0px_0px_#000] text-xl animate-bounce">
              ✨
            </div>
            <div className="space-y-1">
              <p className="text-sm text-slate-800 font-bold">Send a query</p>
              <p className="text-xs text-fog max-w-xs">Ask a complex question worth checking across three models...</p>
            </div>
          </div>
        )}

        {/* Floating Input bar anchored to the bottom of the left chat panel */}
        <div className={`fixed bottom-6 left-6 ${showSidebar ? "lg:left-[286px]" : "lg:left-6"} right-6 lg:right-[406px] xl:right-[466px] z-50 transition-all duration-300`}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className={`relative rounded-2xl border-2 border-slate-900 bg-white p-2 pr-14 transition flex items-center ${
              isLimitReached
                ? "opacity-60 cursor-not-allowed bg-slate-50 border-red-900 shadow-[4px_4px_0px_0px_#991B1B]"
                : "shadow-[4px_4px_0px_0px_#000] focus-within:shadow-[4px_4px_0px_0px_#84CC16]"
            }`}
          >
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              disabled={loading || isLimitReached}
              placeholder={
                isLimitReached
                  ? "Rate limit reached (2/2 queries used). Reset usage in sidebar."
                  : thread.length > 0
                  ? "Ask a follow-up question..."
                  : "Ask something worth double-checking..."
              }
              rows={1}
              className="w-full resize-none bg-transparent pl-3 pr-2 py-2.5 text-sm text-ink placeholder:text-fog/50 focus:outline-none disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={loading || isLimitReached || !prompt.trim()}
              className="absolute right-3.5 bottom-2.5 h-9 w-9 flex items-center justify-center rounded-xl bg-[#84CC16] text-slate-900 border-2 border-slate-900 font-bold transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-[#A3E635] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              {loading ? (
                <svg className="animate-spin h-4.5 w-4.5 text-slate-900" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              )}
            </button>
          </form>
        </div>
      </div>
      
      {/* Right Column: BTS System Flow (Fixed Sidebar) */}
      <div className="w-full lg:w-[380px] xl:w-[440px] shrink-0 bg-white p-6 border-t-2 lg:border-t-0 lg:border-l-2 border-slate-900 flex flex-col lg:h-screen lg:overflow-y-auto custom-scrollbar shadow-sm relative z-10">
        <div className="mb-4">
          <span className="text-[10px] font-mono font-bold text-slate-900 px-2 py-1 rounded bg-[#84CC16] border-2 border-slate-900 shadow-[2px_2px_0px_0px_#000]">
            SYSTEM VIEW 🔎
          </span>
          <h2 className="text-lg font-extrabold text-slate-900 mt-3.5">
            System Workflow
          </h2>
          <p className="text-xs text-fog mt-1">
            Real-time visual diagram of the parallel query and self-consistency evaluation pipeline.
          </p>
        </div>
        
        <div className="mt-4 flex-1">
          <WorkflowDiagram isLoading={loading} />

          <div className="mt-5 p-4 rounded-xl border-2 border-slate-900 bg-slate-50 shadow-[3px_3px_0px_0px_#000] space-y-3">
            <h3 className="font-mono text-[10px] font-bold text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-1.5 flex items-center gap-1.5">
              <span>💡 Project Core Concept</span>
            </h3>
            
            <div className="space-y-3 text-[11.5px] leading-relaxed text-slate-700">
              <div>
                <p className="font-bold text-slate-900">Why Self-Consistency?</p>
                <p className="text-fog">Individual AI models can hallucinate, omit key facts, or introduce training bias. Relying on a single model creates a single point of failure.</p>
              </div>
              <div>
                <p className="font-bold text-slate-900">Cross-Model Consensus</p>
                <p className="text-fog">Querying three independent model architectures simultaneously generates distinct reasoning paths, maximizing perspective diversity.</p>
              </div>
              <div>
                <p className="font-bold text-slate-900">Impartial Synthesis</p>
                <p className="text-fog">A neutral evaluator analyzes the outputs like a jury—finding points of agreement, resolving factual discrepancies, and compiling the best aspects into a converged answer.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t-2 border-slate-900 pt-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-fog font-bold">
            <span>ACTIVE KEY STATUS</span>
            <span className="text-green-600 px-2 py-0.5 rounded bg-green-50 border border-green-200">operational</span>
          </div>
        </div>
      </div>
    </main>
  );
}
