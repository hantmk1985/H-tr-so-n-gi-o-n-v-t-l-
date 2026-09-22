export type Grade = '10' | '11' | '12';

export type Textbook = 'Kết nối tri thức' | 'Cánh diều' | 'Chân trời sáng tạo';

export interface CurriculumLesson {
  id: string;
  name: string;
  chapter: string;
  grade: Grade;
  textbooks: Textbook[];
  defaultDuration: string;
  recommendedExperiments?: string[];
  keyFormulas?: string[];
  phetSimulationUrl?: string;
}

export interface LessonPlan {
  id: string;
  title: string;
  grade: Grade;
  textbook: Textbook;
  duration: string;
  customFocus?: string;
  teacherName?: string;
  schoolName?: string;
  createdAt: string;
  updatedAt: string;
  content: string; // Markdown formatted with LaTeX formulas
  isSample?: boolean;
}

export interface GeneratePlanRequest {
  lessonName: string;
  grade: Grade;
  textbook: Textbook;
  duration: string;
  customFocus?: string;
  teacherNotes?: string;
}

export interface Exam2025Question {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer';
  topic: string;
  stem: string;
  options?: {
    label: string;
    text: string;
    isCorrect?: boolean;
  }[];
  subQuestions?: {
    id: string;
    label: 'a' | 'b' | 'c' | 'd';
    text: string;
    isCorrect: boolean;
    explanation?: string;
  }[];
  answer?: string | number;
  explanation: string;
}
