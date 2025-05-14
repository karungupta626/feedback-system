export interface User {
  userID: string;
  userName: string;
  userEmail: string;
  role: string;
}

export interface Feedback {
  feedbackID?: string;
  userID: string;
  rating: number;
  comment: string;
  category: string;
  tags: string[];
  sentiment?: string;
  submittedAt?: string;
}

export interface ReportData {
  _id: string;
  count: number;
}