function getAlias(notinclude = []) {
  var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  var alias = 'A'
  var index = 1
  var secindex = 0

  while (notinclude.includes(alias)) {
    alias = alphabet[index]

    if (index >= alphabet.length) {
      alias = alphabet[index] + alphabet[secindex]
      secindex++
    }

    index++
  }

  return alias
}

export default getAlias;