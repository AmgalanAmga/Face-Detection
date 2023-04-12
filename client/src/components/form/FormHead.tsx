type FormHeadProps = {
  name: string;
};

export const FormHead = ({ name }: FormHeadProps) => {
  return (
    <>
      <h3 className="text-center text-3xl font-semibold py-2">{name}</h3>
      <hr className="border-gray-300" />
    </>
  );
};
