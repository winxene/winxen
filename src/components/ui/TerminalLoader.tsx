'use client';

import { useState, useEffect } from 'react';

export interface TerminalLoaderProps {
  isVisible: boolean;
  onComplete?: () => void;
}

export default function TerminalLoader({ isVisible, onComplete }: TerminalLoaderProps) {
  const [displayText, setDisplayText] = useState('');
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const messages = [
    'browser@terminal:~$ ssh winxen@portfolio-website', 
    'Initializing terminal environment...',
    'Fetching configuration files',
    'Setting up workspace',
    'Rendering components',
  ];

  const fullText = messages.join('\n');

  useEffect(() => {
    if (!isVisible) {
      setDisplayText('');
      setProgress(0);
      setIsComplete(false);
      return;
    }

    let charIndex = 0;
    const progressSteps = [0, 12, 25, 40, 55, 70, 85, 100];
    let progressStepIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex < fullText.length) {
        setDisplayText(fullText.slice(0, charIndex + 1));
        charIndex++;

        const currentProgress = Math.floor((charIndex / fullText.length) * 100);
        if (progressStepIndex < progressSteps.length - 1 && currentProgress >= progressSteps[progressStepIndex + 1]) {
          progressStepIndex++;
          setProgress(progressSteps[progressStepIndex]);
        }
      } else {
        clearInterval(typeInterval);
        setProgress(100);
        setIsComplete(true);

        const fadeTimeout = setTimeout(() => {
          onComplete?.();
        }, 1000);

        return () => clearTimeout(fadeTimeout);
      }
    }, 35);

    return () => clearInterval(typeInterval);
  }, [isVisible, onComplete, fullText]);

  if (!isVisible || isComplete) {
    return null;
  }

  const progressBarLength = 8;
  const filledLength = Math.min(Math.round((progress / 100) * progressBarLength), progressBarLength);
  const emptyLength = Math.max(progressBarLength - filledLength - (filledLength < progressBarLength ? 1 : 0), 0);
  const progressBar = '='.repeat(filledLength) + (filledLength < progressBarLength ? '>' : '') + ' '.repeat(emptyLength);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f1f29]">
      <div className="w-full max-w-2xl px-8">
        <div className="font-mono text-sm">
          <div className="whitespace-pre-wrap text-[#ddd7b7] mb-6 leading-relaxed">
            {displayText}
            <span className="animate-blink">▌</span>
          </div>

          <div className="mt-8 text-[#8fbc61]">
            <div className="font-mono text-xs">
              [{progressBar}] {progress}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
