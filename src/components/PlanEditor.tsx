import React, { useState } from 'react';
import { LessonPlan } from '../types';
import { MarkdownPlanView } from './MarkdownPlanView';
import { WorksheetViewer } from './WorksheetViewer';
import { AIHelperModal } from './AIHelperModal';
import { exportToWordDocument } from '../utils/exportDocx';
import { 
  Eye, 
  Edit3, 
  FileDown, 
  Printer, 
  Copy, 
  Check, 
  Sparkles, 
  FileText, 
  FlaskConical, 
  ExternalLink,
  Save,
  BookOpen,
  HelpCircle
} from 'lucide-react';

interface PlanEditorProps {
  plan: LessonPlan;
  onUpdatePlan: (updated: LessonPlan) => void;
  onBackToSelector: () => void;
}

export const PlanEditor: React.FC<PlanEditorProps> = ({
  plan,
  onUpdatePlan,
  onBackToSelector,
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'edit' | 'worksheet' | 'labs'>('preview');
  const [content, setContent] = useState(plan.content);
  const [isCopied, setIsCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    onUpdatePlan({
      ...plan,
      content: newContent,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleSave = () => {
    onUpdatePlan({
      ...plan,
      content,
      updatedAt: new Date().toISOString(),
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleExportWord = () => {
    exportToWordDocument(plan.title, content, plan.teacherName, plan.schoolName);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* Top Navigation & Action Bar */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4 print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSelector}
              className="text-xs font-semibold text-slate-600 hover:text-indigo-600 flex items-center gap-1.5 py-1 px-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              ← Chọn bài khác
            </button>
            <div className="h-4 w-px bg-slate-200 hidden sm:block" />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {plan.title}
                </h2>
                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[11px] font-bold rounded-full border border-indigo-200">
                  Lớp {plan.grade}
                </span>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[11px] font-medium rounded-full border border-slate-200">
                  {plan.textbook}
                </span>
                <span className="px-2 py-0.5 bg-amber-50 text-amber-800 text-[11px] font-medium rounded-full border border-amber-200">
                  {plan.duration}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsAIModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-700 text-xs font-semibold rounded-lg border border-indigo-200 shadow-2xs transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Trợ lý AI Nâng cao</span>
            </button>

            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg border border-slate-200 transition-colors cursor-pointer"
            >
              {isSaved ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Save className="w-3.5 h-3.5" />}
              <span>{isSaved ? 'Đã lưu' : 'Lưu'}</span>
            </button>

            <button
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg border border-slate-200 transition-colors cursor-pointer"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? 'Đã chép' : 'Sao chép'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-800 text-xs font-medium rounded-lg border border-slate-200 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>In ấn / PDF</span>
            </button>

            <button
              onClick={handleExportWord}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Xuất file Word (.doc)</span>
            </button>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 mt-4 pt-3 border-t border-slate-100 overflow-x-auto">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'preview'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Xem Giáo án (Chuẩn 5512)</span>
          </button>

          <button
            onClick={() => setActiveTab('edit')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'edit'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Chỉnh sửa văn bản trực tiếp</span>
          </button>

          <button
            onClick={() => setActiveTab('worksheet')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'worksheet'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Phiếu học tập (In riêng cho HS)</span>
          </button>

          <button
            onClick={() => setActiveTab('labs')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'labs'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Thí nghiệm & Mô phỏng PhET</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="transition-all">
        {activeTab === 'preview' && (
          <MarkdownPlanView
            content={content}
            teacherName={plan.teacherName}
            schoolName={plan.schoolName}
          />
        )}

        {activeTab === 'edit' && (
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 text-xs text-slate-500">
              <span className="font-medium">
                Bạn có thể sửa đổi trực tiếp nội dung giáo án (hỗ trợ Markdown và công thức LaTeX trong dấu $...$):
              </span>
              <span className="font-mono text-[11px]">{content.length} ký tự</span>
            </div>
            <textarea
              rows={24}
              value={content}
              onChange={(e) => handleContentChange(e.target.value)}
              className="w-full p-4 font-mono text-xs sm:text-sm text-slate-800 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 leading-relaxed"
            />
            <div className="mt-3 flex justify-end">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-xs"
              >
                {isSaved ? 'Đã lưu thay đổi' : 'Lưu thay đổi'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'worksheet' && (
          <WorksheetViewer
            content={content}
            lessonTitle={plan.title}
            grade={plan.grade}
            textbook={plan.textbook}
          />
        )}

        {activeTab === 'labs' && (
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 max-w-4xl mx-auto space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-1">
                <FlaskConical className="w-5 h-5 text-indigo-600" />
                <span>Gợi ý Thí nghiệm thực hành & Học liệu số trực quan</span>
              </h3>
              <p className="text-xs text-slate-500">
                Bộ công cụ và phần mềm mô phỏng khuyến nghị cho bài học "{plan.title}"
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="text-xs font-bold text-indigo-900 uppercase">
                  Dụng cụ thí nghiệm thực hành tại trường
                </div>
                <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4 leading-relaxed">
                  <li>Giá đỡ kim loại thẳng đứng và máng đỡ chuyên dụng.</li>
                  <li>Cổng quang điện hồng ngoại + Đồng hồ đo thời gian hiện số.</li>
                  <li>Thước chia vạch milimet độ chính xác 1 mm.</li>
                  <li>Dây nối tín hiệu chống nhiễu và công tắc ngắt điện nhanh.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/50 space-y-2">
                <div className="text-xs font-bold text-indigo-900 uppercase flex items-center justify-between">
                  <span>Mô phỏng tương tác PhET (Đại học Colorado)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-indigo-600" />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Học sinh có thể tự thao tác thay đổi các tham số (khối lượng, vận tốc, trọng trường, lực cản không khí) trên máy tính bảng hoặc điện thoại.
                </p>
                <a
                  href="https://phet.colorado.edu/vi/simulations/browse?discipline=physics"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-700 hover:underline pt-1"
                >
                  Mở kho thí nghiệm PhET Vật lí tiếng Việt →
                </a>
              </div>
            </div>

            {/* Quick tips for teachers */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-slate-800 space-y-1.5">
              <p className="font-bold text-amber-900 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-600" /> Mẹo sư phạm khi tổ chức thí nghiệm 5512:
              </p>
              <p>• Luôn cho học sinh dự đoán kết quả trước khi đo đạc để kích thích tư duy phản biện (Hoạt động 1).</p>
              <p>• Yêu cầu mỗi nhóm đo lặp lại ít nhất 3-5 lần để tính giá trị trung bình và phân tích sai số (Hoạt động 2).</p>
              <p>• Khuyến khích học sinh dùng điện thoại cài app Phyphox (cảm biến gia tốc, âm thanh) làm thí nghiệm tại nhà (Hoạt động 4 Vận dụng).</p>
            </div>
          </div>
        )}
      </div>

      {/* AI Refine Modal */}
      <AIHelperModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onApplyRefinement={(refined) => handleContentChange(refined)}
        originalContent={content}
      />
    </div>
  );
};
