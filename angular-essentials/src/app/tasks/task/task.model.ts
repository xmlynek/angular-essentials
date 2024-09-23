export interface Task {
  id: string;
  userId: string;
  title: string;
  summary: string;
  dueDate: string; // 'YYYY-MM-DD' format
}

export interface CreateTaskRequest {
  title: string;
  summary: string;
  dueDate: string; // 'YYYY-MM-DD' format
}

