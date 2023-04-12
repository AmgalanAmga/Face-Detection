type InputField = {
  name: string;
  type: string;
  placeholder: string;
};

type LoginType = {
  email: string;
  password: string;
};

type RegisterType = {
  email: string;
  classno: string;
  username: string;
  password: string;
};

type UserType = {
  user: {
    password: string;
    classno: string;
    username: string;
    email: string;
    userId: string;
  };
  token: string;
};
