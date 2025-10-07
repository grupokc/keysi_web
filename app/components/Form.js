import { useFormik } from "formik"
import { useFetch } from "@/app/hooks/useFetch"

import Button from "./Button"
import Dropdown from "./Dropdown"
import FileUpload from "./FileUpload"
import Input from "./Input"

export default function Form({
  initialValues,
  validationSchema,
  submit = () => {},
  configFetch,
  fields = []
}) {
  const { errorRequest, request } = useFetch()
  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      onSubmit: (data) => {
        if (!configFetch) return
        request({
          cb: submit,
          action: "Exe4CRUD",
          body: {
            ...data,
            ...configFetch
          }
        })
      },
      initialValues,
      validationSchema,
      enableReinitialize: true,
      validateOnBlur: true
    })

  return (
    <form
      className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-2 gap-x-5'
      onSubmit={handleSubmit}
    >
      {fields.map((field) =>
        field.inputType === "text" ||
        field.inputType === "date" ||
        field.inputType === "time" ? (
          <Input
            key={field.id}
            label={field.label}
            value={values[field.name]}
            name={field.name}
            type={field.inputType}
            onKeyDown={handleBlur}
            onChange={handleChange}
            error={
              errors[field.name] && touched[field.name]
                ? errors[field.name]
                : null
            }
          />
        ) : field.inputType === "combo" ? (
          <Dropdown
            key={field.id}
            label={field.label}
            placeholder='--SELECCIONA--'
            comboName={field.comboName}
            value={values[field.name]}
            name={field.name}
            onKeyDown={handleBlur}
            onChange={handleChange}
            error={
              errors[field.name] && touched[field.name]
                ? errors[field.name]
                : null
            }
          />
        ) : field.inputType === "file" ? (
          <FileUpload
            key={field.id}
            label={field.label}
            onChange={handleChange}
            onKeyDown={handleBlur}
            error={
              errors[field.name] && touched[field.name]
                ? errors[field.name]
                : null
            }
          />
        ) : null
      )}
      <div className='md:col-span-2 lg:col-span-3 xl: grid-cols-4'>
        <Button type='submit'>Enviar</Button>
      </div>
      {errorRequest ? (
        <span className='text-red-600 mt-3 text-center'>
          <small>{errorRequest}</small>
        </span>
      ) : null}
    </form>
  )
}
