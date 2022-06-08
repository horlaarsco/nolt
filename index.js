window.onload = function (e) {
  var link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('href', 'embed.css')
  document.head.appendChild(link)

  var btn = document.getElementById('lendsqr-button')
  if (btn) {
    btn.innerHTML = `<img src="https://lendsqr.com/assets/favicon_io/favicon-16x16.png" />&nbsp;Get a loan`
    btn.classList.add('lendsqr-button')
    btn.onclick = function () {
      var handler = LSQWidget.setup(btn.dataset)
      if (handler[btn.dataset.type]) {
        handler[btn.dataset.type]()
      }
    }
  }

  const LSQWidget = {
    setup({ key, product_id, email, amount, reference, onFinish, onClose }) {
      var modal = document.createElement('div')
      modal.innerHTML = `<div id="modal" class="modal"><div class="modal-content" id="content"></div></div>`
      document.body.appendChild(modal)

      var modal = document.getElementById('modal')
      var content = document.getElementById('content')

      var span = document.getElementsByClassName('close')[0]
      if (span) {
        span.onclick = function () {
          modal.style.display = 'none'
          content.style.display = 'none'
          if (onClose) {
            onClose()
          }
        }
      }

      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = 'none'
          content.style.display = 'none'
          if (onClose) {
            onClose()
          }
        }
      }

      function borrow() {
        var url = `https://invitations.lendsqr.com/init?key=${key}&product_id=${product_id}&referrer=${window.parent.location}`
        modal.style.display = 'block'
        content.innerHTML = `<iframe id="iframe" sandbox="allow-forms allow-scripts allow-same-origin allow-top-navigation-by-user-activation allow-top-navigation allow-popups" allow="midi; geolocation https://invitations.lendsqr.com" src="${url}"></iframe>`
        modal.appendChild(content)
        content.style.display = 'flex'
      }
      return { borrow }
    },
  }
  window.LSQWidget = LSQWidget
}
