import React, { useState, useMemo } from 'react';
import { CURRICULUM_LESSONS } from '../data/curriculum';
import { Grade, Textbook, CurriculumLesson } from '../types';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  GraduationCap, 
  Check, 
  FlaskConical, 
  SlidersHorizontal,
  ChevronRight,
  School,
  UserCheck
} from 'lucide-react';

interface CurriculumSelectorProps {
  onGenerate: (data: {
    lessonName: string;
    grade: Grade;
    textbook: Textbook;
    duration: string;
    customFocus: string;
    teacherNotes: string;
    teacherName: string;
    schoolName: string;
  }) => void;
  isLoading: boolean;
  activeGrade: Grade;
  setActiveGrade: (g: Grade) => void;
  activeTextbook: Textbook;
  setActiveTextbook: (t: Textbook) => void;
}

const FOCUS_PRESETS = [
  'Thí nghiệm thực hành & dụng cụ đo (Cổng quang, cảm biến, đồng hồ số)',
  'Đồ thị thực nghiệm & Phân tích số liệu bảng',
  'Chú trọng định dạng đề thi mới 2025 (Đúng/Sai 4 ý, Trả lời ngắn)',
  'Dự án STEM chế tạo mini & Ứng dụng thực tiễn',
  'Mô phỏng trực quan bằng phần mềm PhET / GeoGebra',
  'Phương pháp dạy học giải quyết vấn đề (PBL)',
];

export const CurriculumSelector: React.FC<CurriculumSelectorProps> = ({
  onGenerate,
  isLoading,
  activeGrade,
  setActiveGrade,
  activeTextbook,
  setActiveTextbook,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLesson, setSelectedLesson] = useState<CurriculumLesson | null>(null);
  const [customLessonTitle, setCustomLessonTitle] = useState('');
  const [duration, setDuration] = useState('2 tiết (90 phút)');
  const [customFocus, setCustomFocus] = useState('');
  const [teacherNotes, setTeacherNotes] = useState('');
  const [teacherName, setTeacherName] = useState(() => localStorage.getItem('gv_name') || '');
  const [schoolName, setSchoolName] = useState(() => localStorage.getItem('gv_school') || '');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Filter lessons for selected Grade & Textbook & Search
  const filteredLessons = useMemo(() => {
    return CURRICULUM_LESSONS.filter((item) => {
      const matchGrade = item.grade === activeGrade;
      const matchTextbook = item.textbooks.includes(activeTextbook);
      const matchSearch =
        !searchQuery.trim() ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.chapter.toLowerCase().includes(searchQuery.toLowerCase());
      return matchGrade && matchTextbook && matchSearch;
    });
  }, [activeGrade, activeTextbook, searchQuery]);

  // Group by chapter
  const chapters = useMemo(() => {
    const map = new Map<string, CurriculumLesson[]>();
    filteredLessons.forEach((lesson) => {
      const arr = map.get(lesson.chapter) || [];
      arr.push(lesson);
      map.set(lesson.chapter, arr);
    });
    return Array.from(map.entries());
  }, [filteredLessons]);

  const handleSelectLesson = (lesson: CurriculumLesson) => {
    setSelectedLesson(lesson);
    setCustomLessonTitle(lesson.name);
    setDuration(lesson.defaultDuration || '2 tiết (90 phút)');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const title = customLessonTitle.trim() || selectedLesson?.name;
    if (!title) return;

    if (teacherName) localStorage.setItem('gv_name', teacherName);
    if (schoolName) localStorage.setItem('gv_school', schoolName);

    onGenerate({
      lessonName: title,
      grade: activeGrade,
      textbook: activeTextbook,
      duration,
      customFocus,
      teacherNotes,
      teacherName,
      schoolName,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-400/30 mb-3">
            <GraduationCap className="w-4 h-4" />
            <span>Chuẩn Công văn 5512/BGDĐT & Chương trình GDPT 2018</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Thiết kế Kế hoạch bài dạy Vật lí THPT
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
            Tự động soạn giáo án chi tiết 4 hoạt động chuẩn 5512, tích hợp câu hỏi thi tốt nghiệp THPT mới từ năm 2025, công thức LaTeX và phiếu học tập thực hành.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-w-4xl mx-auto">
        {/* Step 1: Grade & Textbook Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <span>1. Chọn Khối lớp & Bộ sách giáo khoa</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Grade Tabs */}
            <div>
              <p className="text-xs font-medium text-slate-600 mb-1.5">Khối lớp:</p>
              <div className="grid grid-cols-3 gap-2">
                {(['10', '11', '12'] as Grade[]).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => {
                      setActiveGrade(g);
                      setSelectedLesson(null);
                    }}
                    className={`py-2 px-3 rounded-lg font-semibold text-xs transition-all flex items-center justify-center gap-1.5 border ${
                      activeGrade === g
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span>Lớp {g}</span>
                    {activeGrade === g && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Textbook Tabs */}
            <div>
              <p className="text-xs font-medium text-slate-600 mb-1.5">Bộ sách giáo khoa:</p>
              <div className="grid grid-cols-3 gap-2">
                {(['Kết nối tri thức', 'Cánh diều', 'Chân trời sáng tạo'] as Textbook[]).map((tb) => (
                  <button
                    key={tb}
                    type="button"
                    onClick={() => {
                      setActiveTextbook(tb);
                      setSelectedLesson(null);
                    }}
                    className={`py-2 px-2 rounded-lg font-medium text-xs transition-all text-center border truncate ${
                      activeTextbook === tb
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs font-semibold'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                    title={tb}
                  >
                    {tb === 'Kết nối tri thức' ? 'Kết nối' : tb === 'Chân trời sáng tạo' ? 'Chân trời' : 'Cánh diều'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Lesson Selection / Search */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              2. Chọn bài học từ phân phối chương trình (hoặc tự nhập)
            </label>
            <span className="text-xs text-indigo-600 font-medium">
              {filteredLessons.length} bài học có sẵn
            </span>
          </div>

          {/* Search box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm bài học, chương, từ khóa..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Chapters & Lessons Dropdown / Grid */}
          <div className="max-h-56 overflow-y-auto space-y-3 pr-1 border border-slate-200 rounded-xl p-3 bg-slate-50/50">
            {chapters.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-4">
                Không tìm thấy bài học phù hợp. Bạn có thể tự nhập tên bài học bên dưới.
              </p>
            ) : (
              chapters.map(([chapterName, lessons]) => (
                <div key={chapterName} className="space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-1">
                    {chapterName}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {lessons.map((lesson) => {
                      const isSelected = selectedLesson?.id === lesson.id;
                      return (
                        <button
                          key={lesson.id}
                          type="button"
                          onClick={() => handleSelectLesson(lesson)}
                          className={`text-left p-2.5 rounded-lg border text-xs transition-all flex items-start justify-between gap-2 ${
                            isSelected
                              ? 'bg-indigo-50/90 border-indigo-500 text-indigo-950 font-semibold shadow-xs'
                              : 'bg-white hover:bg-slate-50/80 border-slate-200 text-slate-700'
                          }`}
                        >
                          <div className="flex-1">
                            <p className="leading-snug">{lesson.name}</p>
                            <span className="text-[10px] text-slate-400 mt-0.5 block">
                              {lesson.defaultDuration}
                            </span>
                          </div>
                          {isSelected ? (
                            <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Custom Lesson Title input */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Tên bài học cần soạn (xem trước / chỉnh sửa nếu muốn):
            </label>
            <input
              type="text"
              required
              value={customLessonTitle}
              onChange={(e) => setCustomLessonTitle(e.target.value)}
              placeholder="Nhập tên bài học bất kì (ví dụ: Sự rơi tự do, Định luật II Newton...)"
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Step 3: Lesson Duration & Pedagogical Focus */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Thời lượng giảng dạy:
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-indigo-500"
            >
              <option value="1 tiết (45 phút)">1 tiết (45 phút)</option>
              <option value="2 tiết (90 phút)">2 tiết (90 phút)</option>
              <option value="3 tiết (135 phút)">3 tiết (135 phút)</option>
              <option value="4 tiết (180 phút)">4 tiết (180 phút)</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Định hướng phương pháp / Trọng tâm bài dạy:
            </label>
            <input
              type="text"
              value={customFocus}
              onChange={(e) => setCustomFocus(e.target.value)}
              placeholder="VD: Chú trọng câu hỏi trắc nghiệm Đúng/Sai 2025, Thí nghiệm ảo PhET..."
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Focus quick presets */}
        <div>
          <p className="text-[11px] text-slate-500 mb-1.5">Gợi ý định hướng sư phạm nhanh:</p>
          <div className="flex flex-wrap gap-1.5">
            {FOCUS_PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setCustomFocus(preset)}
                className={`text-[11px] px-2.5 py-1 rounded-md border transition-all ${
                  customFocus === preset
                    ? 'bg-indigo-100 border-indigo-300 text-indigo-800 font-semibold'
                    : 'bg-slate-100/70 hover:bg-slate-100 border-slate-200 text-slate-600'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Toggle Advanced / Teacher Details */}
        <div>
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs text-indigo-700 hover:text-indigo-800 font-medium flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{showAdvanced ? 'Ẩn thông tin giáo viên & ghi chú' : 'Thêm thông tin giáo viên & trường (để xuất file in ấn)'}</span>
          </button>

          {showAdvanced && (
            <div className="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1 flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5" /> Họ và tên giáo viên:
                </label>
                <input
                  type="text"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  placeholder="VD: ThS. Nguyễn Văn An"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1 flex items-center gap-1">
                  <School className="w-3.5 h-3.5" /> Tên trường THPT:
                </label>
                <input
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  placeholder="VD: THPT Chuyên Hà Nội - Amsterdam"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Ghi chú riêng về thiết bị hoặc học sinh:
                </label>
                <textarea
                  rows={2}
                  value={teacherNotes}
                  onChange={(e) => setTeacherNotes(e.target.value)}
                  placeholder="VD: Phòng thí nghiệm có 8 bộ cảm biến chuyển động Pasco; lớp có nhiều học sinh khá giỏi cần bài tập nâng cao..."
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800"
                />
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading || (!customLessonTitle && !selectedLesson)}
            className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Đang tạo kế hoạch bài dạy chuẩn 5512...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Tạo Kế hoạch bài dạy chuẩn 5512</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
