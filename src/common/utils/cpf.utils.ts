export class CpfUtils {
  sanitizeCpf(cpfToBeSanitized: string) {
    return cpfToBeSanitized.replace(/[^A-Za-z0-9]/g, '')
  }

  cpfIsValid(cpfToBeChecked: string) {
    let soma = 0
    let resto: number
    if (cpfToBeChecked === '00000000000') {
      return false
    }
    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpfToBeChecked.substring(i - 1, i), 10) * (11 - i)
    }
    resto = (soma * 10) % 11
    if (resto === 10 || resto === 11) {
      resto = 0
    }
    if (resto !== parseInt(cpfToBeChecked.substring(9, 10), 10)) {
      return false
    }
    soma = 0
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpfToBeChecked.substring(i - 1, i), 10) * (12 - i)
    }
    resto = (soma * 10) % 11
    if (resto === 10 || resto === 11) {
      resto = 0
    }

    return resto === parseInt(cpfToBeChecked.substring(10, 11), 10)
  }
}
