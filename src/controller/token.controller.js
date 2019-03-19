const {
  specialCharacters,
  operators,
  reservedWords,
  number,
  words,
  index,
} = require('../model/tokens')


/** get functions */

module.exports.getCommentBlock = function getCommentBlock(analysis) {
  // apenas um fecha comentario
  const block = {
    i: null,
    j: null,
    status: false,
  }

  let i
  let j

  for (i = 0; i < analysis.lexical.length; i++) {
    for (j = 0; j < analysis.lexical[i].symbols.length; j++) {
      if (analysis.lexical[i].symbols[j].name === 't_fecha_comentario_composto') {
        block.j = j
        block.i = i
        block.status = true
      }
    }
  }

  return block
}


module.exports.getTokenTable = async function getTokenTable(code) {
  const data = []

  for (let i = 0; i < code.length; i++) {
    data.push(this.getSentence(code[i], i))
  }

  return data
}

module.exports.getErrors = async function getErrors(analysis) {
  const errors = []
  const error = {
    msg: '',
    token: '',
    line: 0,
    column: 0,
  }

  for (let i = 0; i < analysis.lexical.length; i++) {
    for (let j = 0; j < analysis.lexical[i].symbols.length; j++) {
      if (analysis.lexical[i].symbols[j].name === 't_invalido') {
        error.msg = 'Erro Léxico - Token inválido'
        error.line = i
        error.token = analysis.lexical[i].symbols[j].token
        errors.push(error)
      }
    }
  }
  return errors
}

module.exports.getSentence = function getSentence(data, lineNumber) {
  const sentence = {
    symbols: [],
    line: 0,
  }
  // divide a  string em array, usando os espaços em branco
  const auxSetence = data.split(' ')
  const symbols = []
  let symbol = {
    name: '',
    token: '',
    status: true,
  }

  auxSetence.forEach((e) => {
    // Verifica qual o tipo de token esse simbolo possui
    symbol = this.isTokenSpecialCharacters(e)
    if (symbol === null) { symbol = this.isTokenOperators(e) }
    if (symbol === null) { symbol = this.isTokenReservedWords(e) }
    if (symbol === null) { symbol = this.isTokenNumber(e) }
    if (symbol === null) { symbol = this.isTokenWord(e) }

    if (symbol === null) { symbol = this.isTokenIndex(e) }
    if (symbol === null) {
      symbol.status = false
    }
    symbols.push(symbol)
  })

  sentence.symbols = symbols
  sentence.line = lineNumber
  return sentence
}

module.exports.getSymbols = async function getSymbols(sentence) {
  const symbols = []
  let symbol = {
    name: '',
    token: '',
    status: true,
  }

  sentence.forEach((data) => {
    // Verifica qual o tipo de token esse simbolo possui
    symbol = this.isTokenSpecialCharacters(data)
    if (symbol === null) { symbol = this.isTokenOperators(data) }
    if (symbol === null) { symbol = this.isTokenReservedWords(data) }
    if (symbol === null) { symbol = this.isTokenNumber(data) }
    if (symbol === null) { symbol = this.isTokenWord(data) }

    if (symbol === null) { symbol = this.isTokenIndex(data) }
    if (symbol === null) {
      symbol.status = false
    }
    symbols.push(symbol)
  })

  return symbols
}

/** Verifica os tokens */
module.exports.isTokenSpecialCharacters = function isTokenSpecialCharacters(data) {
  let token = null

  switch (data) {
    case specialCharacters.t_ptvg.token:
      token = specialCharacters.t_ptvg
      break

    case specialCharacters.t_pt.token:
      token = specialCharacters.t_pt
      break

    case specialCharacters.t_abr_parenteses.token:
      token = specialCharacters.t_abr_parenteses
      break

    case specialCharacters.t_fecha_parenteses.token:
      token = specialCharacters.t_fecha_parenteses
      break

    case specialCharacters.t_abr_colchete.token:
      token = specialCharacters.t_abr_colchete
      break

    case specialCharacters.t_fecha_colchete.token:
      token = specialCharacters.t_fecha_colchete
      break

    case specialCharacters.t_comentario_simples.token:
      token = specialCharacters.t_comentario_simples
      break

    case specialCharacters.t_abr_comentario_composto.token:
      token = specialCharacters.t_abr_comentario_composto
      break

    case specialCharacters.t_fecha_comentario_composto.token:
      token = specialCharacters.t_fecha_comentario_composto
      break

    default:
      token = {
        name: 't_invalido',
        token: data,
        status: false,
      }

      break
  }

  return token
}

module.exports.isTokenOperators = function isTokenOperators(data) {
  let token = null

  switch (data) {
    case operators.t_atribuicao.token:
      token = operators.t_atribuicao
      break

    case operators.t_incrementa.token:
      token = operators.t_incrementa
      break

    case operators.t_decrementa.token:
      token = operators.t_decrementa
      break

    case operators.t_maior.token:
      token = operators.t_maior
      break

    case operators.t_menor.token:
      token = operators.t_menor
      break

    case operators.t_maiorouigual.token:
      token = operators.t_maiorouigual
      break

    case operators.t_menorouigual.token:
      token = operators.t_menorouigual
      break

    case operators.t_diferente.token:
      token = operators.t_diferente
      break

    case operators.t_igual.token:
      token = operators.t_igual
      break

    case operators.t_soma.token:
      token = operators.t_soma
      break


    case operators.t_subtracao.token:
      token = operators.t_subtracao
      break


    case operators.t_multi.token:
      token = operators.t_multi
      break


    case operators.t_divisao.token:
      token = operators.t_divisao
      break


    case operators.t_and.token:
      token = operators.t_and
      break


    case operators.t_or.token:
      token = operators.t_or
      break

    default:
      token = {
        name: 't_invalido',
        token: data,
        status: false,
      }
      break
  }

  return token
}

module.exports.isTokenReservedWords = function isTokenReservedWords(data) {
  let token = null

  switch (data) {
    case reservedWords.t_if.token:
      token = reservedWords.t_if
      break

    case reservedWords.t_else.token:
      token = reservedWords.t_else
      break

    case reservedWords.t_for.token:
      token = reservedWords.t_for
      break

    case reservedWords.t_while.token:
      token = reservedWords.t_while
      break

    case reservedWords.t_int.token:
      token = reservedWords.t_int
      break

    case reservedWords.t_float.token:
      token = reservedWords.t_float
      break

    case reservedWords.t_exp.token:
      token = reservedWords.t_exp
      break

    case reservedWords.t_inicio.token:
      token = reservedWords.t_inicio
      break

    case reservedWords.t_fim.token:
      token = reservedWords.t_fim
      break

    default:
      token = {
        name: 't_invalido',
        token: data,
        status: false,
      }

      break
  }

  return token
}

module.exports.isTokenNumber = function isTokenNumber(data) {
  let token = {
    name: '',
    token: '',
    status: false,
  }
  // int
  let regExp = new RegExp(number.t_numberInt.token)
  if (regExp.test(data)) {
    token.name = number.t_numberInt.name
    token.token = data
    token.status = true
  } else {
    // float
    regExp = new RegExp(number.t_numberFloat.token)
    if (regExp.test(data)) {
      token.name = number.t_numberFloat.name
      token.token = data
      token.status = true
    } else {
      // exponencial
      regExp = new RegExp(number.t_numberExp.token)
      if (regExp.test(data)) {
        token.name = number.t_numberExp.name
        token.token = data
        token.status = true
      } else {
        token = {
          name: 't_invalido',
          token: data,
          status: false,
        }
      }
    }
  }
  return token
}

module.exports.isTokenWord = function isTokenWord(data) {
  let token = {
    name: '',
    token: '',
    status: false,
  }
  // int
  const regExp = new RegExp(words.t_identificador.token)
  if (regExp.test(data)) {
    token.name = words.t_identificador.name
    token.token = data
    token.status = true
  } else {
    token = {
      name: 't_invalido',
      token: data,
      status: false,
    }
  }
  return token
}

module.exports.isTokenIndex = function isTokenIndex(data) {
  let token = {
    name: '',
    token: '',
    status: false,
  }

  const regExp = new RegExp(index)
  if (regExp.test(data)) {
    token.name = 't_indexIgnore'
    token.status = true
  } else {
    token = {
      name: 't_invalido',
      token: data,
      status: false,
    }
  }
  return token
}

module.exports = {
  getTokenTable,
  getErrors,
}
