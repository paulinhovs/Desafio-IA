function carregar(){
    
    const botao = document.getElementById('consultar')
    
    botao.onclick = () => pesquisar()
}


function pesquisar(){

    const input_usuario = document.getElementById('input_usuario').value

    const urlBase = new Request(`https://api.github.com/users/${input_usuario}`) 

     
    fetch(urlBase)
        .then( (resposta) => {
            if(resposta.ok) {
                return resposta.json()
            } else {
                throw new Error(response.status + " Falhou ");
            }
            
        })
        .then( (bodyjson) => preencher(bodyjson))
        .catch(e => alert('Usuário não encontrado', e))
}

function preencher(dados){

    const id = document.getElementById('usuario_id')
    const usuario = document.getElementById('usuario_nome')
    const login = document.getElementById('usuario_login')
    const img_avatar = document.getElementById('usuario_avatar')
    const repositorio = document.getElementById('usuario_repositorio')
    const seguidores = document.getElementById('usuario_seguidores')
    const seguindo = document.getElementById('usuario_seguindo')


    img_avatar.src = dados.avatar_url
    id.innerText = `${dados.id}`
    usuario.innerText = `${dados.name}`
    login.innerText = `${dados.login}`
    repositorio.innerText = `${dados.public_repos}`
    seguidores.innerText = `${dados.followers}`
    seguindo.innerText = `${dados.following}`

    criarLink(dados.html_url)   
    console.log(`${dados.name} - ${dados.login}`)

}

function criarLink(url) {

    if (document.getElementById('link_url')) {
        document.body.removeChild(document.getElementById('link_url'))
    }

    var link_url = document.createElement('a');
    var textNodeLink = document.createTextNode(url)

    link_url.appendChild(textNodeLink)
    link_url.setAttribute('target', '_blank')
    link_url.setAttribute('id', 'link_url')
    link_url.title = 'Link do Github'
    link_url.href = url
    document.body.appendChild(link_url)

}

