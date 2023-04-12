import _ from "lodash";
import { useState } from "react";
import { object, string } from "yup";
import { Formik, Form } from "formik";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import { scaleUp, registerArgs } from "../../utils";
import { useMainContext } from "../../context/MainContext";
import { EyeButton, FomikError, FormButton, FormHead, FormikField, RouteLink, RegisterSuccess } from "../../components";

export const Signup = () => {
  const { signup } = useAuth();
  const { message, error } = useMainContext();
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className="authContainer">
      <div className="absoluteCenter">
        <motion.div variants={scaleUp} initial="initial" animate="animate" exit="exit" className="formContainer">
          <FormHead name="Register" />
          {message && <RegisterSuccess />}
          {error.msg && (
            <h3 className="py-2 border border-red-500 mx-5 mt-1 bg-red-200 text-red-700 text-center text-sm">
              {error?.msg.msg}
            </h3>
          )}
          <Formik
            initialValues={{ email: "", password: "", username: "", classno: "" }}
            validationSchema={object({
              password: string().required("Please enter your password."),
              username: string().required("Please enter your username."),
              classno: string().required("Please enter your class number."),
              email: string().required("Please enter your email address.").email("The email you entered is invalid."),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              await signup(values);
              setSubmitting(false);
            }}
          >
            {(formik) => (
              <Form className="flexColItemCenter p-3.5 gap-y-1.5">
                {_.map(registerArgs, ({ name, placeholder }, id) => (
                  <div key={id} className="w-full">
                    <div className="relative ">
                      <FormikField visible={visible} name={name} placeholder={placeholder} />
                      {id === 3 && <EyeButton setVisible={setVisible} visible={visible} />}
                    </div>
                    <FomikError name={name} />
                  </div>
                ))}
                <FormButton isSubmitting={formik.isSubmitting} name="Register" />
                <RouteLink name="Login" path="/auth/login" />
              </Form>
            )}
          </Formik>
        </motion.div>
      </div>
    </div>
  );
};
