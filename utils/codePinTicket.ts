function encrypt (code: String, pin: String) {
  const codeTicket = code.split('-')
  return `${codeTicket[0]}-${pin[0]}${codeTicket[1]}${pin[1]}-${pin[2]}${codeTicket[2]}${pin[3]}`
}
function decrypt (encrypted: any) {
  const codeTicket = `${encrypted[0]}-${encrypted[1][1]}${encrypted[1][2]}${encrypted[1][3]}${encrypted[1][4]}${encrypted[1][5]}-${encrypted[2][1]}${encrypted[2][2]}${encrypted[2][3]}${encrypted[2][4]}${encrypted[2][5]}`
  const pin = `${encrypted[1][0]}${encrypted[1][6]}${encrypted[2][0]}${encrypted[2][6]}`
  return {
    code: codeTicket,
    pin: pin
  }
}

export default {
  encrypt,
  decrypt
}