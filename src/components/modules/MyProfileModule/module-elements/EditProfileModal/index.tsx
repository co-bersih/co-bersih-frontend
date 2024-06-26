import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useAuthContext } from '@contexts'
import { Modal, TextInput } from 'flowbite-react'
import { editProfileModalProps } from './interface'
import { AiFillSave, AiOutlineCloseCircle } from 'react-icons/ai'
import { Button } from '@elements'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { cfg } from 'src/config'

export const EditProfileModal: React.FC<editProfileModalProps> = ({
  user,
  onClose,
  showModal,
}) => {
  const { tokens } = useAuthContext()
  const [name, setName] = useState(user?.name || '')
  const [bio, setBio] = useState(user?.bio || '')
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState(user?.profileImage || '')
  const rootRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (user) {
      setName(user.name || '')
      setBio(user.bio || '')
      setPreviewImage(user.profileImage || '')
    }
  }, [user])

  const handleClose = () => {
    setName(user?.name || '')
    setBio(user?.bio || '')
    setPreviewImage(user?.profileImage || '')
    setProfileImage(null)
    onClose()
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleBioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBio(event.target.value)
  }

  const removeProfilePicture = () => {
    setProfileImage(null)
    setPreviewImage('')
    if (fileInputRef.current) {
      // @ts-ignore
      fileInputRef.current.value = ''
      setIsEditing(true)
    }
  }

  const addImageToForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setProfileImage(file || null)

    const reader = new FileReader()
    reader.onload = (readerEvent) => {
      const result = readerEvent.target?.result
      if (result) {
        setPreviewImage(result as string)
      }
    }

    if (file) {
      reader.readAsDataURL(file)
    }

    setIsEditing(true)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('name', name || '')
    formData.append('bio', bio || '')
    if (isEditing) {
      formData.append('profile_image', profileImage || '')
    }
    try {
      const config = {
        method: 'patch',
        url: `${cfg.API}/api/v1/user/${user?.id}`,
        headers: {
          Authorization: `Bearer ${tokens?.access}`,
        },
        data: formData,
      }

      await axios
        .request(config)
        .then((response) => {
          toast.success('Berhasil edit profil.', {
            position: toast.POSITION.TOP_CENTER,
          })
          onClose()
          setTimeout(() => {
            window.location.reload()
          }, 1000)
        })
        .catch((error) => {
          const errorMessage = JSON.stringify(error.response.data)
          toast.error(`${errorMessage}`, {
            position: toast.POSITION.TOP_CENTER,
          })
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div ref={rootRef}>
        <Modal
          show={showModal}
          root={rootRef.current ?? undefined}
          className="h-screen"
        >
          <div className="flex justify-between px-6 pt-5 items-center">
            <h2>Edit Profil</h2>
            <AiOutlineCloseCircle
              size="28"
              className="cursor-pointer"
              onClick={handleClose}
            />
          </div>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <h3>Nama</h3>
              <TextInput
                required
                type="text"
                value={name}
                onChange={handleNameChange}
              />
              <h3>Biodata</h3>
              <TextInput type="text" value={bio} onChange={handleBioChange} />
              <h3>Foto Profil</h3>
              <div className="w-full space-y-2 pb-5">
                <div className="relative flex justify-center items-center">
                  <div
                    className="absolute items-center justify-center top-0 hover-animation -w-1/2"
                    onClick={removeProfilePicture}
                  >
                    <AiOutlineCloseCircle
                      size="18"
                      className="lg:ml-44 ml-28"
                    />
                  </div>
                  <img
                    src={
                      previewImage
                        ? previewImage
                        : '/assets/images/hero/Hero1.png'
                    }
                    className="object-cover rounded-full lg:w-48 lg:h-48 md:w-48 md:h-48 w-32 h-32 border border-1 border-blue-300"
                    alt="Profile Preview"
                  />
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={addImageToForm}
                  className="w-full bg-inherit border border-1 rounded-lg outline-none border-blue-300"
                />
              </div>
              <Button
                variant="greeny"
                className="w-full"
                rightIcon={<AiFillSave size={16} color="white" />}
              >
                Simpan
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}
