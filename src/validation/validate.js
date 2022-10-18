export const validateEpifanyText = (epifanyText) => {
  let errMsg = ''

  if(!epifanyText) {
    errMsg = 'Epifany text cannot be blank'
  }

  if(epifanyText.length > 150) {
    errMsg = 'Epifany text cannot exceed 150 characters'
  }

  return errMsg
}

export const validateEpifanyDescription = (epifanyDescription) => {
  let errMsg = ''

  if(!epifanyDescription) {
    errMsg = 'Please provide a description. Give us something.'
  }

  if(epifanyDescription.length > 500) {
    errMsg = 'Epifany description cannot exceed 500 characters'
  }

  return errMsg
}


export const validateRegistration = (firstname, lastname, email, username, password) => {
  let errMsg = ''

  if(!firstname || !lastname || !email || !username || !password) {
    errMsg = 'All fields must be completed'
  }

  return errMsg
}