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

function getKeyID (array = []) {
    var keyID = Math.max(...array.map((key) => key.key));

  if (keyID === -Infinity) {
    keyID = 0;
  } else {
    keyID = keyID + 1;
  }

  return keyID;
}

export {getAlias , getKeyID};