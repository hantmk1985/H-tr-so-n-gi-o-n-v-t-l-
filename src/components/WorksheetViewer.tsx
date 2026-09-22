import React from 'react';
import { Printer, Copy, Check, FileDown, BookOpen } from 'lucide-react';
import { renderWithMath } from './KaTeXRenderer';

interface WorksheetViewerProps {
  content: string;
  lessonTitle: string;
  grade: string;
  textbook: string;
}

export const WorksheetViewer: React.FC<WorksheetViewerProps> = ({
  content,
  lessonTitle,
  grade,
  textbook,
}) => {
  const [copied, setCopied] = React.useState(false);

  // Extract Section IV: PHỤ LỤC: PHIẾU HỌC TẬP or any PHT blocks
  const extractWorksheetSection = (markdown: string): string => {
    const lines = markdown.split('\n');
    let isPhtSection = false;
    const phtLines: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.toLowerCase().includes('phiếu học tập') && (line.startsWith('#') || line.startsWith('##') || line.startsWith('###'))) {
        isPhtSection = true;
      }
      if (isPhtSection) {
        phtLines.push(line);
      }
    }

    if (phtLines.length > 0) {
      return phtLines.join('\n');
    }

    // Fallback: If no dedicated Section IV found, extract any PHT mentioned or synthesize a student worksheet
    return `### PHIẾU HỌC TẬP: BÀI ${lessonTitle.toUpperCase()}
**Lớp:** ${grade} | **Bộ sách:** ${textbook}
**Nhóm:** ........................................................... | **Ngày:** ......................................
**Họ và tên các thành viên:**
1. .................................................................... 2. ....................................................................
3. .................................................................... 4. ....................................................................

---

#### PHẦN I: NHIỆM VỤ TÌM HIỂU KIẾN THỨC MỚI
1. Nghiên cứu nội dung bài học trong SGK và quan sát hiện tượng, hoàn thành các câu hỏi sau:
   - Bản chất hiện tượng vật lí chính là: .........................................................................
   - Viết công thức toán học mô tả hiện tượng: ....................................................................

#### PHẦN II: THỰC HÀNH / XỬ LÝ SỐ LIỆU ĐO ĐẠC
| Lần đo | Đại lượng $X$ | Đại lượng $Y$ | Tỉ số / Sai số | Nhận xét |
| :---: | :---: | :---: | :---: | :--- |
| Lần 1 | | | | |
| Lần 2 | | | | |
| Lần 3 | | | | |
| **Giá trị trung bình** | | | | |

#### PHẦN III: KẾT LUẬN VÀ RÚT RA QUY LUẬT
Nhóm em hãy thảo luận và rút ra kết luận chung:
...........................................................................................................................................................
...........................................................................................................................................................
`;
  };

  const worksheetContent = extractWorksheetSection(content);

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(worksheetContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Action Bar for Worksheet */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-100 p-3 rounded-lg border border-slate-200 print:hidden">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
          <BookOpen className="w-4 h-4 text-indigo-600" />
          <span>Phiếu học tập dành riêng cho học sinh làm việc nhóm hoặc cá nhân</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-md border border-slate-300 shadow-xs transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Đã sao chép' : 'Sao chép nội dung'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-md shadow-xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>In Phiếu học tập</span>
          </button>
        </div>
      </div>

      {/* Printable Sheet View */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 sm:p-10 max-w-3xl mx-auto print:border-none print:shadow-none print:p-0">
        <div className="grid grid-cols-2 gap-4 pb-4 border-b-2 border-slate-800 text-xs font-serif leading-tight">
          <div>
            <p className="font-semibold uppercase">TRƯỜNG THPT: .......................................</p>
            <p className="font-medium">TỔ VẬT LÍ - CÔNG NGHỆ</p>
          </div>
          <div className="text-right">
            <p className="font-bold">MÔN VẬT LÍ - LỚP {grade}</p>
            <p className="italic">Năm học 2025 - 2026</p>
          </div>
        </div>

        <div className="text-center my-6">
          <h2 className="text-lg sm:text-xl font-bold uppercase text-slate-900 font-serif">
            PHIẾU HỌC TẬP THỰC HÀNH & KHÁM PHÁ
          </h2>
          <p className="text-sm font-semibold text-indigo-900 mt-1">
            BÀI: {lessonTitle.toUpperCase()}
          </p>
          <p className="text-xs text-slate-500 italic">Bộ sách: {textbook}</p>
        </div>

        {/* Worksheet Student Info Fill-ins */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 my-4 text-xs space-y-1.5">
          <div className="flex flex-wrap gap-4">
            <span className="font-semibold">Nhóm: .........................................</span>
            <span className="font-semibold">Lớp: ........................</span>
            <span className="font-semibold">Bàn số: .........</span>
            <span className="font-semibold">Ngày thực hiện: ...../...../202...</span>
          </div>
          <div>
            <span className="font-semibold">Thành viên:</span> 1. ...................................................... 2. ......................................................
          </div>
          <div className="pl-18">
            3. ...................................................... 4. ......................................................
          </div>
        </div>

        {/* Content of the worksheet */}
        <div className="space-y-4 text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
          {worksheetContent.split('\n').map((line, idx) => {
            const trimmed = line.trim();
            if (!trimmed) return <div key={idx} className="h-1" />;

            if (trimmed.startsWith('### ') || trimmed.startsWith('## ') || trimmed.startsWith('# ')) {
              return (
                <h3 key={idx} className="text-base font-bold text-indigo-900 mt-4 pb-1 border-b border-indigo-100">
                  {renderWithMath(trimmed.replace(/^#+\s*/, ''))}
                </h3>
              );
            }

            if (trimmed.startsWith('#### ')) {
              return (
                <h4 key={idx} className="text-sm font-bold text-slate-900 mt-3">
                  {renderWithMath(trimmed.replace('#### ', ''))}
                </h4>
              );
            }

            // Table rendering
            if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
              const cells = trimmed.split('|').filter((_, i, arr) => i > 0 && i < arr.length - 1).map(c => c.trim());
              const isHeader = idx > 0 && worksheetContent.split('\n')[idx + 1]?.includes('---');
              if (trimmed.includes('---')) return null;

              return (
                <div key={idx} className="overflow-x-auto my-2">
                  <div className={`grid grid-cols-${cells.length} gap-2 p-2 border ${isHeader ? 'bg-slate-100 font-bold' : 'border-slate-300'}`}>
                    {cells.map((cell, cIdx) => (
                      <div key={cIdx} className="text-center">{renderWithMath(cell)}</div>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <p key={idx} className="my-1.5">
                {renderWithMath(line)}
              </p>
            );
          })}
        </div>

        {/* Teacher Evaluation Box */}
        <div className="mt-8 pt-4 border-t-2 border-slate-300 grid grid-cols-2 gap-4 text-xs">
          <div className="border border-dashed border-slate-300 rounded p-2.5">
            <p className="font-bold text-slate-700">ĐÁNH GIÁ CỦA GIÁO VIÊN:</p>
            <p className="italic text-slate-500 mt-1">Thái độ hợp tác: .......................................</p>
            <p className="italic text-slate-500">Độ chính xác: ..............................................</p>
            <p className="italic text-slate-500">Nhận xét chung: ...........................................</p>
          </div>
          <div className="border border-dashed border-slate-300 rounded p-2.5 text-center flex flex-col justify-between">
            <p className="font-bold text-slate-700">ĐIỂM SỐ / MỨC ĐẠT</p>
            <div className="text-2xl font-bold text-indigo-700">........ / 10</div>
            <p className="italic text-slate-500">(Ký xác nhận)</p>
          </div>
        </div>
      </div>
    </div>
  );
};
