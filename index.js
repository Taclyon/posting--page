const form = document.querySelector('#form');
const tituloRender = document.querySelector('#renderizar-h2')
const conteudoRender = document.querySelector('#renderizar-p')
const render = document.querySelector('#renderhtml')

  class PacoteBuscador {
          constructor(baseURL) {
              this.baseURL = baseURL;
          }

          post(endpoint, body) {
              return this._send("post", endpoint, body);
          }

          _send(method, endpoint, body) {
              return fetch(this.baseURL + endpoint, {
                  method,
                  headers: {
                      "Content-type": "application/json; charset=UTF-8"
                  },
                  body: JSON.stringify(body)
              }).then(response => response.json());
          }
      }

      

      function renderPush(response){
        const html = `<div class="renderizar">
                <div class="containner-renderizar">
                    <div class="containner-titulo">
                        <div class="containner-img-usuario">
                            <img src="./img/usuario-1.png" alt="img-usuario">
                        </div>
                        <div class="titulo-h2">
                            <h2 id="renderizar-h2">${response.title}</h2>
                        </div>
                    </div>

                    <div class="containner-conteudo">
                        <div class="renderizar-conteudo">
                            <p id="renderizar-p">${response.body}</p>

                        </div>
                    </div>
                </div>
            </div>`;
        render.insertAdjacentHTML('afterbegin',html)
      }



form.addEventListener('submit',async function (event){
    event.preventDefault();
    
    render.innerHTML=''
    const consulta = new PacoteBuscador('https://jsonplaceholder.typicode.com')

    try{
        const titulo = document.querySelector('#titulo-input');
        const textarea = document.querySelector('#conteudo-textarea');
        const data = {
        title: titulo.value,
        body: textarea.value, 
        userId:1
    }

        const response = await consulta.post('/posts',data)

        await renderPush(response)

    }catch (error){
        console.error(error)
    }finally{
        form.reset()
    }
    

    
})

