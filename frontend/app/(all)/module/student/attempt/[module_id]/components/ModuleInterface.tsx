export interface ModuleData {
  id: number;
  created_at: string;
  course_id: number;
  module_name: string;
  description: string;
  aura_change: number;
  questions: {
    id: number;
    options: {
      id: number;
      created_at: string;
      is_correct: boolean;
      option_text: string;
      question_id: number;
    }[];
    module_id: number;
    created_at: string;
    question_text: string;
  }[];
}