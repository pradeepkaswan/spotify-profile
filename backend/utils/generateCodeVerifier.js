/**
 * Generates a random string containing numbers and letters
 * @param {number} length The length fo the string
 * @return {string} The generated string
 */
export const generateCodeVerifier = (length) => {
  let text = ''
  const possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}
