// Limpia HTML dejando solo formato básico (párrafos, listas, negrita, cursiva).
// Se usa tanto al pegar contenido en el editor visual como al mostrarlo en el
// sitio público, para no arrastrar estilos/etiquetas de Word ni HTML peligroso.
const ALLOWED_TAGS = new Set(['P', 'UL', 'OL', 'LI', 'BR', 'B', 'STRONG', 'I', 'EM', 'DIV', 'SPAN'])

function cleanNode(node) {
  if (node.nodeType === Node.TEXT_NODE) return
  if (node.nodeType !== Node.ELEMENT_NODE) {
    node.remove()
    return
  }
  const children = Array.from(node.childNodes)
  if (!ALLOWED_TAGS.has(node.tagName)) {
    // Etiqueta no permitida: se conserva el texto/contenido, se descarta la etiqueta.
    children.forEach((child) => node.parentNode.insertBefore(child, node))
    node.remove()
    children.forEach(cleanNode)
    return
  }
  Array.from(node.attributes).forEach((attr) => node.removeAttribute(attr.name))
  children.forEach(cleanNode)
}

export function sanitizeHtml(html) {
  if (!html) return ''
  const doc = new DOMParser().parseFromString(html, 'text/html')
  Array.from(doc.body.childNodes).forEach(cleanNode)
  return doc.body.innerHTML
}
