import { useState } from "react"

export function useModal() {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [modalName, setModalName] = useState(null)

  const openModal = (type) => {
    setModalName(type)
    setIsOpenModal(true)
  }

  const closeModal = () => {
    setIsOpenModal(false)
  }

  return { isOpenModal, modalName, closeModal, openModal }
}
