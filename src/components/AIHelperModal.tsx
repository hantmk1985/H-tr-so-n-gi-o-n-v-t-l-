import React, { useState } from 'react';
import { Sparkles, X, PlusCircle, CheckCircle, FileText, FlaskConical, Wrench } from 'lucide-react';

interface AIHelperModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyRefinement: (newContent: string) => void;
  originalContent: string;
}

export const AIHelperModal: React.FC<AIHelperModalProps> = ({
  isOpen,
  onClose,
  onApplyRefinement,
  originalContent,
}) => {
  const [selectedType, setSelectedType] = useState<string>('add_2025_questions');
  const [customNote, setCustomNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRefine = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/gemini/refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalContent,
          requestType: selectedType,
          userNotes: customNote,
        }),
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else if (data.result) {
        setGeneratedResult(data.result);
      }
    } catch (err: any) {
      setError(err?.message || 'Có lỗi khi kết nối máy chủ AI.');
    } finally {
      setLoading(false);
    }
  };

  const handleAppend = () => {
    if (!generatedResult) return;
    const combined = `${originalContent}\n\n---\n\n${generatedResult}`;
    onApplyRefinement(combined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-indigo-100 rounded-lg text-indigo-700">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Trợ lý AI Tinh Chỉnh & Nâng Cao Giáo Án
              </h3>
              <p className="text-xs text-slate-500">
                Thêm bài tập thi 2025, phiếu học tập, kịch bản thí nghiệm hoặc dự án STEM
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              {error}
            </div>
          )}

          {!generatedResult ? (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                  Chọn chức năng nâng cấp cần bổ sung:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    {
                      id: 'add_2025_questions',
                      title: 'Bổ sung bài tập chuẩn đề thi 2025',
                      desc: 'Thêm trắc nghiệm nhiều lựa chọn, Đúng/Sai 4 ý (a,b,c,d) & trả lời ngắn',
                      icon: CheckCircle,
                    },
                    {
                      id: 'expand_worksheets',
                      title: 'Thiết kế thêm Phiếu học tập',
                      desc: 'Tạo thêm 2 phiếu học tập đo đạc số liệu chi tiết cho học sinh',
                      icon: FileText,
                    },
                    {
                      id: 'stem_project',
                      title: 'Dự án STEM mini vận dụng',
                      desc: 'Bổ sung hoạt động chế tạo thiết bị thực tế kèm tiêu chí đánh giá Rubric',
                      icon: Wrench,
                    },
                    {
                      id: 'lab_virtual',
                      title: 'Kịch bản thí nghiệm ảo / mô phỏng PhET',
                      desc: 'Hướng dẫn đo đạc từng bước, khai thác đồ thị trên phần mềm mô phỏng',
                      icon: FlaskConical,
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isSelected = selectedType === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedType(item.id)}
                        className={`p-3 text-left rounded-xl border transition-all flex items-start gap-2.5 ${
                          isSelected
                            ? 'bg-indigo-50/80 border-indigo-500 text-indigo-950 shadow-xs'
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                        <div>
                          <p className="font-semibold text-xs text-slate-900">{item.title}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ghi chú hoặc yêu cầu chi tiết (tùy chọn):
                </label>
                <textarea
                  rows={3}
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Ví dụ: Tập trung vào bài tập tính toán đồ thị $v - t$; thêm thí nghiệm đo thời gian rơi tự do bằng cảm biến..."
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-500"
                />
              </div>
            </>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 uppercase">
                  Nội dung đã được tạo thành công:
                </span>
                <button
                  onClick={() => setGeneratedResult(null)}
                  className="text-xs text-indigo-600 hover:underline"
                >
                  Tạo lại lựa chọn khác
                </button>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg max-h-80 overflow-y-auto text-xs text-slate-800 font-mono whitespace-pre-wrap">
                {generatedResult}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-200/70 rounded-lg"
          >
            Đóng
          </button>

          {!generatedResult ? (
            <button
              onClick={handleRefine}
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Đang xử lý...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Tạo nội dung bổ sung</span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleAppend}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Chèn nội dung này vào cuối giáo án</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
