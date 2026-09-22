/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LessonPlan, Grade, Textbook } from './types';
import { SAMPLE_LESSON_PLANS } from './data/samplePlans';
import { CurriculumSelector } from './components/CurriculumSelector';
import { PlanEditor } from './components/PlanEditor';
import { 
  GraduationCap, 
  BookOpen, 
  Sparkles, 
  FileText, 
  Clock, 
  History, 
  PlusCircle, 
  CheckCircle2, 
  Award,
  ChevronRight,
  ExternalLink,
  HelpCircle,
  School
} from 'lucide-react';

const STORAGE_KEY = 'vatli_thpt_5512_saved_plans';

export default function App() {
  const [activeGrade, setActiveGrade] = useState<Grade>('10');
  const [activeTextbook, setActiveTextbook] = useState<Textbook>('Kết nối tri thức');
  const [currentPlan, setCurrentPlan] = useState<LessonPlan | null>(null);
  const [savedPlans, setSavedPlans] = useState<LessonPlan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load saved plans from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSavedPlans(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSavePlan = (planToSave: LessonPlan) => {
    setCurrentPlan(planToSave);
    const updated = [
      planToSave,
      ...savedPlans.filter((p) => p.id !== planToSave.id),
    ].slice(0, 20); // Keep latest 20
    setSavedPlans(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      showToast('Đã lưu giáo án thành công!');
    } catch {
      // ignore
    }
  };

  const handleGeneratePlan = async (data: {
    lessonName: string;
    grade: Grade;
    textbook: Textbook;
    duration: string;
    customFocus: string;
    teacherNotes: string;
    teacherName: string;
    schoolName: string;
  }) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/gemini/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const resData = await response.json();
      if (resData.content) {
        const newPlan: LessonPlan = {
          id: `plan-${Date.now()}`,
          title: data.lessonName,
          grade: data.grade,
          textbook: data.textbook,
          duration: data.duration,
          customFocus: data.customFocus,
          teacherName: data.teacherName,
          schoolName: data.schoolName,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: resData.content,
        };

        handleSavePlan(newPlan);
        showToast('Kế hoạch bài dạy đã được tạo thành công!');
      } else {
        showToast('Không thể tạo kế hoạch bài dạy. Vui lòng thử lại.');
      }
    } catch (err: any) {
      showToast(`Lỗi: ${err?.message || 'Không thể kết nối máy chủ.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const openSamplePlan = (sample: LessonPlan) => {
    setCurrentPlan(sample);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg border border-slate-700 text-xs font-medium flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              onClick={() => setCurrentPlan(null)}
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-800 text-white flex items-center justify-center shadow-xs cursor-pointer"
            >
              <GraduationCap className="w-5 h-5" />
            </div>
            <div 
              onClick={() => setCurrentPlan(null)}
              className="cursor-pointer"
            >
              <h1 className="text-sm sm:text-base font-bold text-slate-900 leading-none">
                Trợ lý Giáo án Vật lí THPT
              </h1>
              <p className="text-[11px] text-indigo-700 font-medium mt-1">
                Chuẩn Công văn 5512/BGDĐT & GDPT 2018 (Lớp 10, 11, 12)
              </p>
            </div>
          </div>

          {/* Quick Actions in Header */}
          <div className="flex items-center gap-2">
            {currentPlan && (
              <button
                onClick={() => setCurrentPlan(null)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Soạn bài mới</span>
              </button>
            )}

            {/* Quick Sample Dropdown or button */}
            <div className="hidden md:flex items-center gap-1.5 pl-2 border-l border-slate-200">
              <span className="text-[11px] text-slate-400 font-medium">Mẫu tiêu biểu:</span>
              {SAMPLE_LESSON_PLANS.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => openSamplePlan(sample)}
                  className={`px-2.5 py-1 text-[11px] rounded-md transition-all cursor-pointer font-medium ${
                    currentPlan?.id === sample.id
                      ? 'bg-indigo-600 text-white shadow-2xs font-semibold'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  Lớp {sample.grade} ({sample.textbook === 'Kết nối tri thức' ? 'KNTT' : sample.textbook === 'Cánh diều' ? 'CD' : 'CTST'})
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full">
        {currentPlan ? (
          <PlanEditor
            plan={currentPlan}
            onUpdatePlan={handleSavePlan}
            onBackToSelector={() => setCurrentPlan(null)}
          />
        ) : (
          <div className="space-y-8">
            {/* Generator Component */}
            <CurriculumSelector
              onGenerate={handleGeneratePlan}
              isLoading={isLoading}
              activeGrade={activeGrade}
              setActiveGrade={setActiveGrade}
              activeTextbook={activeTextbook}
              setActiveTextbook={setActiveTextbook}
            />

            {/* Showcase: Master Sample Plans for 10, 11, 12 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-indigo-600" />
                    <span>Giáo án mẫu thẩm định chuẩn 5512 (Xem & Dùng ngay)</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Đầy đủ 4 hoạt động 4 bước, thí nghiệm chi tiết, công thức LaTeX và câu hỏi thi 2025
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SAMPLE_LESSON_PLANS.map((sample) => (
                  <div
                    key={sample.id}
                    onClick={() => openSamplePlan(sample)}
                    className="group bg-white rounded-xl p-5 border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[11px] font-bold rounded-full border border-indigo-200">
                          Vật lí {sample.grade}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {sample.duration}
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 text-sm sm:text-base leading-snug transition-colors line-clamp-2">
                        {sample.title}
                      </h4>

                      <p className="text-xs text-slate-500 mt-1.5 font-medium">
                        Bộ sách: <span className="text-slate-800">{sample.textbook}</span>
                      </p>

                      <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed italic bg-slate-50 p-2 rounded-lg border border-slate-100">
                        "{sample.customFocus}"
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-indigo-600 font-semibold">
                      <span>Mở giáo án & Xuất file Word</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Saved Plans History (if any) */}
            {savedPlans.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <History className="w-4 h-4 text-slate-500" />
                    <span>Giáo án đã lưu gần đây ({savedPlans.length})</span>
                  </h3>
                  <button
                    onClick={() => {
                      if (confirm('Bạn có chắc muốn xóa lịch sử các giáo án đã lưu?')) {
                        localStorage.removeItem(STORAGE_KEY);
                        setSavedPlans([]);
                      }
                    }}
                    className="text-xs text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    Xóa lịch sử
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {savedPlans.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => openSamplePlan(item)}
                      className="p-3.5 bg-white rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between"
                    >
                      <div className="truncate mr-2">
                        <p className="font-semibold text-xs text-slate-900 truncate">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Lớp {item.grade} • {item.textbook} • {new Date(item.updatedAt).toLocaleDateString('vi-VN')}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Educational Standards & Guidelines Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-slate-50 to-white border border-indigo-100 text-xs text-slate-700 leading-relaxed space-y-3">
              <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
                <Award className="w-4 h-4 text-indigo-600" />
                <span>Quy chuẩn thiết kế kế hoạch bài dạy môn Vật lí theo Công văn 5512/BGDĐT:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
                  <span className="font-bold text-indigo-700 block">Hoạt động 1: Mở đầu</span>
                  <p className="text-slate-600">Tạo tình huống có vấn đề, mâu thuẫn nhận thức hoặc gợi nhớ kiến thức cũ thông qua thí nghiệm ngắn.</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
                  <span className="font-bold text-amber-700 block">Hoạt động 2: Hình thành KT</span>
                  <p className="text-slate-600">Chia theo từng Đơn vị kiến thức. Mỗi ĐVKT đi đủ 4 bước (Chuyển giao - Thực hiện - Báo cáo - Kết luận) và chốt ghi vở.</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
                  <span className="font-bold text-purple-700 block">Hoạt động 3: Luyện tập</span>
                  <p className="text-slate-600">Hệ thống bài tập theo chuẩn thi tốt nghiệp THPT từ 2025: Nhiều lựa chọn, Đúng/Sai 4 ý, Trả lời ngắn.</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
                  <span className="font-bold text-emerald-700 block">Hoạt động 4: Vận dụng</span>
                  <p className="text-slate-600">Nhiệm vụ thực tế, giải thích hiện tượng đời sống hoặc dự án STEM chế tạo mini tại nhà kèm Rubric.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 border-t border-slate-200 bg-white text-center text-xs text-slate-500 print:hidden">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-medium text-slate-700">
            Hệ thống hỗ trợ giáo viên Vật lí THPT Việt Nam • Bám sát Chương trình GDPT 2018 & Công văn 5512/BGDĐT
          </p>
          <p className="text-[11px] text-slate-400">
            Tương thích trọn vẹn 3 bộ sách giáo khoa: Kết nối tri thức với cuộc sống • Cánh diều • Chân trời sáng tạo
          </p>
        </div>
      </footer>
    </div>
  );
}
