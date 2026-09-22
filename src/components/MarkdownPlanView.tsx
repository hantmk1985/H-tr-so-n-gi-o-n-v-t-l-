import React from 'react';
import { renderWithMath } from './KaTeXRenderer';
import { 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  Bookmark, 
  Clock, 
  Layers, 
  Award,
  ArrowRight,
  ClipboardList
} from 'lucide-react';

interface MarkdownPlanViewProps {
  content: string;
  teacherName?: string;
  schoolName?: string;
}

export const MarkdownPlanView: React.FC<MarkdownPlanViewProps> = ({
  content,
  teacherName,
  schoolName,
}) => {
  // Parse lines into logical blocks
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // Horizontal rule
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      elements.push(<hr key={`hr-${i}`} className="my-6 border-slate-200" />);
      i++;
      continue;
    }

    // Main Header H1
    if (trimmed.startsWith('# ')) {
      const text = trimmed.slice(2);
      elements.push(
        <div key={`h1-${i}`} className="mb-6 pb-3 border-b-2 border-indigo-600">
          <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-1">
            <Bookmark className="w-4 h-4" /> Kế hoạch bài dạy chuẩn CV 5512/BGDĐT & GDPT 2018
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
            {renderWithMath(text)}
          </h1>
        </div>
      );
      i++;
      continue;
    }

    // Section Header H2
    if (trimmed.startsWith('## ')) {
      const text = trimmed.slice(3);
      const isActivity = text.toLowerCase().includes('tiến trình') || text.toLowerCase().includes('mục tiêu') || text.toLowerCase().includes('thiết bị');
      elements.push(
        <div key={`h2-${i}`} className="mt-8 mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5 pb-2 border-b border-slate-200">
            <span className="w-2.5 h-6 bg-indigo-600 rounded-sm inline-block"></span>
            <span>{renderWithMath(text)}</span>
          </h2>
        </div>
      );
      i++;
      continue;
    }

    // Subheader H3 (e.g. Hoạt động 1, Hoạt động 2, 1. Về năng lực, v.v.)
    if (trimmed.startsWith('### ')) {
      const text = trimmed.slice(4);
      const isAct = text.toLowerCase().includes('hoạt động');
      elements.push(
        <div 
          key={`h3-${i}`} 
          className={`mt-6 mb-3 ${
            isAct 
              ? 'bg-gradient-to-r from-indigo-50/80 via-slate-50 to-transparent p-3 rounded-lg border-l-4 border-indigo-600 shadow-xs' 
              : ''
          }`}
        >
          <h3 className={`font-bold flex items-center gap-2 ${isAct ? 'text-indigo-900 text-base sm:text-lg' : 'text-slate-800 text-base'}`}>
            {isAct && <Clock className="w-4 h-4 text-indigo-600 shrink-0" />}
            <span>{renderWithMath(text)}</span>
          </h3>
        </div>
      );
      i++;
      continue;
    }

    // Subheader H4 (e.g. Đơn vị kiến thức 1, Phần I Trắc nghiệm)
    if (trimmed.startsWith('#### ')) {
      const text = trimmed.slice(5);
      elements.push(
        <h4 key={`h4-${i}`} className="mt-4 mb-2 font-semibold text-slate-800 text-sm sm:text-base flex items-center gap-2">
          <Layers className="w-4 h-4 text-slate-500" />
          <span>{renderWithMath(text)}</span>
        </h4>
      );
      i++;
      continue;
    }

    // Blockquote - Highlighted core knowledge box (Kiến thức trọng tâm ghi vở)
    if (trimmed.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      elements.push(
        <div
          key={`quote-${i}`}
          className="my-4 p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-slate-800 shadow-xs"
        >
          <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wide mb-2">
            <Sparkles className="w-4 h-4 text-amber-600" /> Kiến thức trọng tâm để học sinh ghi vở
          </div>
          <div className="space-y-1.5 text-sm leading-relaxed">
            {quoteLines.map((qLine, qIdx) => (
              <p key={qIdx} className="font-medium text-slate-900">
                {renderWithMath(qLine)}
              </p>
            ))}
          </div>
        </div>
      );
      continue;
    }

    // Markdown Table Detection
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }

      if (tableLines.length >= 2) {
        const headerRow = tableLines[0].split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1).map(c => c.trim());
        const bodyRows = tableLines.slice(2).map(row => 
          row.split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1).map(c => c.trim())
        );

        elements.push(
          <div key={`table-${i}`} className="my-4 overflow-x-auto rounded-lg border border-slate-200 shadow-xs">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  {headerRow.map((cell, cIdx) => (
                    <th key={cIdx} className="py-2.5 px-3 border-r border-slate-200 last:border-r-0">
                      {renderWithMath(cell)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {bodyRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50/80 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="py-2 px-3 border-r border-slate-200 last:border-r-0 text-slate-700">
                        {renderWithMath(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    }

    // Step tags check in 5512 (Bước 1: Chuyển giao nhiệm vụ...)
    const stepMatch = trimmed.match(/^(\*|\-|\+)?\s*\*?(Bước [1-4][^:]*):?\*?\s*(.*)$/i);
    if (stepMatch) {
      const stepTitle = stepMatch[2];
      const stepContent = stepMatch[3];
      const isStep1 = stepTitle.includes('1');
      const isStep2 = stepTitle.includes('2');
      const isStep3 = stepTitle.includes('3');
      const isStep4 = stepTitle.includes('4');

      let badgeBg = 'bg-blue-100 text-blue-800 border-blue-200';
      if (isStep2) badgeBg = 'bg-amber-100 text-amber-800 border-amber-200';
      if (isStep3) badgeBg = 'bg-purple-100 text-purple-800 border-purple-200';
      if (isStep4) badgeBg = 'bg-emerald-100 text-emerald-800 border-emerald-200';

      elements.push(
        <div key={`step-${i}`} className="my-2.5 pl-3 border-l-2 border-slate-300">
          <div className="flex items-baseline flex-wrap gap-2">
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${badgeBg}`}>
              {stepTitle}
            </span>
            <span className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {renderWithMath(stepContent)}
            </span>
          </div>
        </div>
      );
      i++;
      continue;
    }

    // Question Part badges for 2025 exam format (e.g. Câu 1, Câu 2, - a), - b)...)
    const isTrueFalseOption = trimmed.match(/^(\-|\+)?\s*\*\*([a-d])\)\*\*\s*(.*)$/);
    if (isTrueFalseOption) {
      const optLetter = isTrueFalseOption[2];
      const optContent = isTrueFalseOption[3];
      const isDung = optContent.includes('ĐÚNG');
      const isSai = optContent.includes('SAI');

      elements.push(
        <div key={`tf-${i}`} className="ml-4 my-1.5 flex items-start gap-2 text-xs sm:text-sm">
          <span className="font-bold text-slate-900 shrink-0 w-6">{optLetter})</span>
          <div className="flex-1 text-slate-700">
            {renderWithMath(optContent)}
          </div>
          {isDung && (
            <span className="shrink-0 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[11px] font-bold rounded border border-emerald-200">
              ĐÚNG
            </span>
          )}
          {isSai && (
            <span className="shrink-0 px-2 py-0.5 bg-rose-50 text-rose-700 text-[11px] font-bold rounded border border-rose-200">
              SAI
            </span>
          )}
        </div>
      );
      i++;
      continue;
    }

    // Bullet list items
    if (trimmed.startsWith('- ') || trimmed.startsWith('+ ') || trimmed.startsWith('* ')) {
      const text = trimmed.slice(2);
      elements.push(
        <div key={`bullet-${i}`} className="ml-3 my-1 flex items-start gap-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <span className="text-indigo-600 font-bold shrink-0 mt-1">•</span>
          <div className="flex-1">{renderWithMath(text)}</div>
        </div>
      );
      i++;
      continue;
    }

    // Numbered list items
    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (numMatch) {
      elements.push(
        <div key={`num-${i}`} className="ml-3 my-1 flex items-start gap-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <span className="font-semibold text-slate-900 shrink-0">{numMatch[1]}.</span>
          <div className="flex-1">{renderWithMath(numMatch[2])}</div>
        </div>
      );
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={`p-${i}`} className="my-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
        {renderWithMath(line)}
      </p>
    );
    i++;
  }

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 sm:p-10 max-w-4xl mx-auto print:shadow-none print:border-none print:p-0">
      {/* Official Vietnamese School Header for formal lesson plans */}
      <div className="hidden print:grid grid-cols-2 gap-4 pb-6 border-b border-slate-300 mb-6 text-xs leading-relaxed">
        <div className="text-center font-serif">
          <p className="font-semibold uppercase">SỞ GD&ĐT ....................................</p>
          <p className="font-bold uppercase text-indigo-900">{schoolName || 'TRƯỜNG THPT ....................................'}</p>
          <p className="italic">Tổ: Vật lí - Công nghệ</p>
        </div>
        <div className="text-center font-serif">
          <p className="font-bold uppercase">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
          <p className="font-semibold">Độc lập - Tự do - Hạnh phúc</p>
          <p className="italic mt-1">Năm học 2025 - 2026</p>
        </div>
      </div>

      {/* Main Content Rendered */}
      <div className="prose prose-slate max-w-none">
        {elements}
      </div>

      {/* Official Signatures footer for print */}
      <div className="hidden print:grid grid-cols-2 gap-8 mt-12 pt-6 border-t border-slate-300 text-xs font-serif text-center">
        <div>
          <p className="font-bold uppercase">DUYỆT CỦA TỔ CHUYÊN MÔN</p>
          <p className="italic text-slate-500 mt-1">(Ký và ghi rõ họ tên)</p>
          <div className="h-20"></div>
          <p className="font-semibold">....................................................</p>
        </div>
        <div>
          <p className="italic">Ngày ..... tháng ..... năm 202...</p>
          <p className="font-bold uppercase">GIÁO VIÊN SOẠN BÀI</p>
          <p className="italic text-slate-500 mt-1">(Ký và ghi rõ họ tên)</p>
          <div className="h-20"></div>
          <p className="font-semibold">{teacherName || '....................................................'}</p>
        </div>
      </div>
    </div>
  );
};
