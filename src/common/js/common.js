export function createCode () {
  var code = ''
  var codeLength = 4
  var randomArr = new window.Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z')
  for (let i = 0; i < codeLength; i++) {
    var index = Math.floor(Math.random() * 62)
    code += randomArr[index]
  }
  return code
}
export function createColor () {
  var color = '#'
  var colorArr = new window.Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F')
  for (let i = 0; i < 6; i++) {
    var index = Math.floor(Math.random() * 16)
    color += colorArr[index]
  }
  return color
}

export function delSpace (elem) {
  var elemChild = elem.childNodes
  for (let i = 0; i < elemChild.length; i++) {
  // 遍历子元素
    if (elemChild[i].nodeName === '#text' && !/\S/.test(elemChild.nodeValue)) {
      elem.removeChild(elemChild)
    }
  }
  return elem
}
export function preNode (elem) {
  let prev = elem.previousSibling
  var getPrev
  if ('#text' && !/\S/.test(elem.previousSibling.nodeValue) === false) {
    getPrev = prev
    return getPrev
  } else {
    return preNode(prev)
  }
}
