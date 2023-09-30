export { Router }

class Router {
  routes = {}

  add(routeName, page) {
    // console.log(routeName, page)
    this.routes[routeName] = page
  }

  route(event) {
    event = event || window.event
    event.preventDefault();

    window.history.pushState({}, "", event.target.href);

    this.handle();
  }

  handle() {
    const { pathname } = window.location;
    const route = this.routes[pathname] || this.routes[404];

    handleActive(pathname);

    fetch(route)
      .then(data => data.text())
      .then(html => {
        document.querySelector('#app').innerHTML = html
      })

  }

}

function handleActive(pathname) {
  console.log(pathname)

  const body = document.querySelector('body');
  const active = document.querySelectorAll('nav ul li a');

  body.removeAttribute('class')

  for (let index = 0; index < active.length; index++) {
    active[index].classList.remove('active')
  }

  switch (pathname) {
    case '/':
      body.classList.add('home')
      active[0].classList.add('active')
      break
    case '/universe':
      body.classList.add('universe')
      active[1].classList.add('active')
      break
    case '/exploitation':
      body.classList.add('exploitation')
      active[2].classList.add('active')
      break
    default:
      body.classList.add('home')
      active[0].classList.add('active')
      break;
  }

}