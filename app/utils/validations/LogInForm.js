import * as yup from "yup"

export const LogInValidations = yup.object().shape({
  usuario: yup.string().required("Campo requerido"),
  password: yup.string().required("Campo requerido")
})
export const ChangePasswordValidations = yup.object().shape({
  password: yup.string().required("Campo requerido"),
  confirmacion_password: yup.string().required("Campo requerido")
})
