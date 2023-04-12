import { Field } from "formik";

type FormikFieldProps = {
  name: string;
  visible: boolean;
  placeholder: string;
};

export const FormikField = ({ name, placeholder, visible }: FormikFieldProps) => {
  return (
    <Field
      name={name}
      className="loginInput"
      placeholder={placeholder}
      type={name !== "password" ? "text" : visible ? "text" : "password"}
    />
  );
};
