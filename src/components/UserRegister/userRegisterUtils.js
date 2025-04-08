import defaultProfileImage from "../../assets/photo-cover.jpg"

export const NAME_VALIDATION = /^.{2,60}$/

export const EMAIL_VALIDATION = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

export const PHONE_VALIDATION = /^\+380[0-9]{9}$/

export const validateImage = async (file) => {
  return new Promise((resolve) => {
    if (!file) {
      resolve(undefined);
      return
    }

    if (!file.type.match(/^image\/jpe?g$/)) {
      resolve("Photo must be jpeg/jpg.")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      resolve("Photo size must be less than 5 Mb.")
      return
    }

    const img = new Image()
    img.onload = () => {
      if (img.width < 70 || img.height < 70) {
        resolve("Photo should be 70x70px minimum.")
      } else {
        resolve(undefined)
      }
    }
    img.onerror = () => resolve("Failed to load image. Please try again.")
    img.src = URL.createObjectURL(file)
  })
}

export const getDefaultProfileImage = async () => {
  const response = await fetch(defaultProfileImage)
  return await response.blob()
}