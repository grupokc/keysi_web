import { ACTION, END_POINT, HEADERS, URL } from "./constants"

export const request = ({ endPoint, action, body, url }) => {
  const CURRENT_END_POINT = endPoint || END_POINT
  const CURRENT_ACTION = action || ACTION
  const CURRENT_URL = url || URL
  const USER = JSON.parse(window.localStorage.getItem("user"))

  const CURRENT_BODY = {
    ...body,
    Guid_Agente: USER.Guid_Agente,
    Clave_Pegasus: USER.Login
  }

  return fetch(CURRENT_URL + CURRENT_END_POINT + CURRENT_ACTION, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(CURRENT_BODY)
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error(error.message))
}
