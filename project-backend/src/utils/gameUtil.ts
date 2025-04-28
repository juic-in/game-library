export const validateGameName = (name: string) => {
  if (/[^a-zA-Z0-9_\-',\.\s]/.test(name)) throw new Error('Game name contains invalid characters ...')
  
  const len = name.length
  if (len < 3 || len > 100) throw new Error('Game name has to be within 3 and 100 characters in length')
}

export const validateGameDescription = (description: string) => {
  const len = description.length
  if (len > 1000) throw new Error('Game description is too long, has to be less than 1000 characters')
}