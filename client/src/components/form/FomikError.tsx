import { ErrorMessage } from "formik";

type FormikErrorProps = {
  name: string;
};

export const FomikError = ({ name }: FormikErrorProps) => {
  return (
    <div className="text-right text-xs text-red-500">
      <ErrorMessage name={name} />
    </div>
  );
};
