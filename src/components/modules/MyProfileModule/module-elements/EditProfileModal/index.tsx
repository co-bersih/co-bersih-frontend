import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useAuthContext } from '@contexts'
import { Modal, TextInput } from 'flowbite-react'
import { editProfileModalProps } from './interface'
import { AiFillSave, AiOutlineCloseCircle } from 'react-icons/ai'
import { Button } from '@elements'

const EditProfileModal: React.FC<editProfileModalProps> = ({
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
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('name', name || '')
    formData.append('bio', bio || '')
    if (profileImage) {
      formData.append('profile_image', profileImage)
    }
    try {
      const config = {
        method: 'patch',
        url: `${process.env.NEXT_PUBLIC_APP_API_URL}/api/v1/user/${user?.id}`,
        headers: {
          Authorization: `Bearer ${tokens?.access}`,
        },
        data: formData,
      }

      await axios.request(config)
      onClose()
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div ref={rootRef} className="h-screen">
        <Modal
          show={showModal}
          root={rootRef.current ?? undefined}
          className="h-screen"
        >
          <div className="flex justify-between px-6 pt-5 items-center">
            <h3>Edit Profile</h3>
            <AiOutlineCloseCircle
              size="28"
              className="cursor-pointer"
              onClick={handleClose}
            />
          </div>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <h3>Name</h3>
              <TextInput
                required
                type="text"
                value={name}
                onChange={handleNameChange}
              />
              <h3>Bio</h3>
              <TextInput
                required
                type="text"
                value={bio}
                onChange={handleBioChange}
              />
              <h3>Profile Image</h3>
              <div className="w-full space-y-2 pb-5">
                <div className="relative flex justify-center items-center">
                  <div
                    className="absolute flex items-center justify-center pr-48 top-1 hover-animation w-9 h-9"
                    onClick={() => {
                      setProfileImage(null)
                      setPreviewImage(user?.profileImage || '')
                      if (fileInputRef.current) {
                        // @ts-ignore
                        fileInputRef.current.value = ''
                      }
                    }}
                  >
                    <AiOutlineCloseCircle size="16" className="px-12 z-50" />
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
                Save
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}

export default EditProfileModal
