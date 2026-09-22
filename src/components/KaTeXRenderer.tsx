import React, { useMemo } from 'react';
import katex from 'katex';

interface KaTeXRendererProps {
  math: string;
  block?: boolean;
  className?: string;
}

export const KaTeXFormula: React.FC<KaTeXRendererProps> = ({ math, block = false, className = '' }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math.trim(), {
        displayMode: block,
        throwOnError: false,
        strict: false,
      });
    } catch {
      return math;
    }
  }, [math, block]);

  return (
    <span
      className={`katex-wrapper ${block ? 'block my-3 overflow-x-auto text-center' : 'inline'} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

// Helper function to render a string containing mixed text and $...$ / $$...$$ formulas
export const renderWithMath = (text: string): React.ReactNode[] => {
  if (!text) return [];

  // Match $$block$$ or $inline$
  // Note: Avoid matching single dollar signs like $10 or $USD if not intended as math
  const regex = /(\$\$[\s\S]+?\$\$|\$[^\$\n]+?\$)/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.startsWith('$$') && part.endsWith('$$')) {
      const math = part.slice(2, -2);
      return <KaTeXFormula key={index} math={math} block={true} />;
    } else if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
      const math = part.slice(1, -1);
      return <KaTeXFormula key={index} math={math} block={false} />;
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
};
