export type Schedule = {
  id: number;
  summary: string;
  desc: string;
  start: string;
  end: string;
  attendees: null | number;
  status: null | string;
  comment: null | string;
  score: {
    P: number;
  };
  link: string;
  user_det: {
    id: number;
    question_score: null | number;
    status: null | string;
    candidate: {
      id: number;
      candidate_firstName: string;
      candidate_lastName: string;
      candidateGender: string;
      candidateComment: string;
      candidate_email: string;
    };
    handled_by: {
      id: number;
      last_login: null | string;
      userEmail: string;
      username: string;
      firstName: string;
      lastName: string;
      userRole: string;
    };
    job_id: {
      id: number;
      jobRequest_Title: string;
      jobRequest_Role: string;
      jobRequest_KeySkills: string;
      jobRequest_Description: string;
    };
  };
  job_id: {
    id: number;
    jobRequest_Title: string;
    jobRequest_Role: string;
    jobRequest_KeySkills: string;
    jobRequest_Description: string;
  };
};
