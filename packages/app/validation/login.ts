import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required()
    .min(4)
    .max(20)
    .matches(/^[^\s]+$/, "No spaces allowed"),
  password: yup.string().required().min(4),
});
