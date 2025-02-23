// this file is just for decoloration, these modles are not used actually in the firebase db function

const User = {
  email: Email,
  password: String,
};

const Topic = {
  name: String,
};

const Course = {
  user: User,
  topic: Topic,
  title: String,
  steps: [Lesson],
  createdAt: DateTime,
};

const Lesson = {
    
};