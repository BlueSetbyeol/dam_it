export type objectToQuiz = {
  id: number;
  name: string;
  image: string;
  mission: string;
  answers: { name: string; value: string }[];
  good_answer: string[];
  challenge_type: string;
  precision: string;
};

export type roomQuestions = {
  quiz_room_id: string;
  object_to_sort_id: string;
  object_to_repair_id: string;
};

export type quizRoom = {
  id: number;
  room_nd: number;
};
