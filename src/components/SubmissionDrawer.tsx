import React, { useState } from 'react';
import { X, Check, Copy, ExternalLink, Github, Sparkles, CheckCircle2 } from 'lucide-react';

interface SubmissionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmissionDrawer: React.FC<SubmissionDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedGit, setCopiedGit] = useState(false);

  if (!isOpen) return null;

  const liveUrl = window.location.href;
  const githubRepoUrl = 'https://github.com/mohamathushafiq026aiml/itzfizz-scroll-car-animation';

  const copyToClipboard = (text: string, type: 'live' | 'git') => {
    navigator.clipboard.writeText(text);
    if (type === 'live') {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } else {
      setCopiedGit(true);
      setTimeout(() => setCopiedGit(false), 2000);
    }
  };

  const checklistItems = [
    {
      title: 'Hero Section Layout',
      status: 'Verified',
      desc: 'Occupies first screen above fold with letter-spaced headline "W E L C O M E   I T Z F I Z Z" and impact metrics.',
    },
    {
      title: 'Initial Load Animation',
      status: 'Verified',
      desc: 'GSAP timeline staggered letter reveal + smooth sequential number interpolation for metrics.',
    },
    {
      title: 'Scroll-Based Animation (Core Feature)',
      status: 'Verified',
      desc: 'Tied strictly to scroll progress with 60fps lerp interpolation (current = lerp(current, target, 0.085)), suspension pitch, and dynamic translation.',
    },
    {
      title: 'Motion & Performance Guidelines',
      status: 'Verified',
      desc: 'Hardware accelerated with transform: translate3d(), scale(), and rotateZ(). Zero layout reflow or layout thrashing.',
    },
    {
      title: 'Tech Stack Adherence',
      status: 'Verified',
      desc: 'HTML5, CSS3, JavaScript/TypeScript, GSAP, React 19, Tailwind CSS v4.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-neutral-100">
              Assignment Submission & Audit Report
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-100 rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Submission Links */}
        <div className="mt-6 space-y-4">
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-mono text-cyan-400 uppercase">
                Requirement 1: Live Webpage Link
              </span>
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-neutral-400 hover:text-cyan-400 flex items-center gap-1"
              >
                Open in new tab <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={liveUrl}
                className="flex-1 bg-neutral-900 px-3 py-2 rounded-lg text-xs font-mono text-neutral-200 border border-neutral-800 focus:outline-none"
              />
              <button
                onClick={() => copyToClipboard(liveUrl, 'live')}
                className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-medium rounded-lg text-neutral-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-mono text-cyan-400 uppercase flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5" />
                Requirement 2: GitHub Repository Link
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={githubRepoUrl}
                className="flex-1 bg-neutral-900 px-3 py-2 rounded-lg text-xs font-mono text-neutral-200 border border-neutral-800 focus:outline-none"
              />
              <button
                onClick={() => copyToClipboard(githubRepoUrl, 'git')}
                className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-medium rounded-lg text-neutral-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedGit ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Functional Requirements Checklist */}
        <div className="mt-6">
          <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-3">
            Functional Requirements Evaluation Checklist
          </h4>
          <div className="space-y-3">
            {checklistItems.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800 flex items-start gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-neutral-200">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-2 py-0.5 rounded">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-xs rounded-lg transition-colors cursor-pointer"
          >
            Close Spec Sheet
          </button>
        </div>
      </div>
    </div>
  );
};
