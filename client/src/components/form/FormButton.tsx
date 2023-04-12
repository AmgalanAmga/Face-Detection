type FormButtonProps = {
  name: string;
  isSubmitting: boolean;
};

export const FormButton = ({ isSubmitting, name }: FormButtonProps) => {
  return (
    <button type="submit" className="authButton">
      {isSubmitting ? "Please wait..." : name}
    </button>
  );
};
