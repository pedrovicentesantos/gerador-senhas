let input = document.getElementById("tamanho")
input.addEventListener("keydown", function(event) {
  if (event.code === "Enter") {
  //  event.preventDefault()
   document.getElementById("myBtn").click()
  }
})

function numeroAleatorio(min, max) { // Intervalo [min,max]
  const randomBuffer = new Uint32Array(1)

  window.crypto.getRandomValues(randomBuffer)

  let randomNumber = randomBuffer[0] / (0xffffffff + 1)

  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(randomNumber * (max - min + 1)) + min
  // return Math.floor(Math.random() * (max - min + 1) + min);
}

function mudarCharEm(string, posicao, novoChar){
  string = string.substring(0,posicao) + novoChar +  string.substring(posicao+1)
  return string
}

function validarSenha(senha,grupo1,grupo2,grupo3){
  if (senha.length < 4 || senha.length > 22){
    return false
  }
  maiuscula = minuscula = char_especial = numero = false
  senha_array = senha.split("")
  senha_array.map(function(e){
    if (grupo1.includes(e)){
      minuscula = true
    } else if(grupo2.includes(e)){
      maiuscula = true
    } else if(grupo3.includes(e)){
      char_especial = true
    } else if(!isNaN(e)){
      numero = true
    }
  })
  if (maiuscula === true && minuscula === true && char_especial === true && numero === true){
    return true
  } else{
    return false
  }
}

function criarSenha(tamanho=8){
    const min = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
    const mai = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    const chars = ["!","@","#","$","%","_","-","+","=",",",".",";",":","*"]
    let senha = ""
  
    for (i = 0; i < tamanho; i++){
      posicao = numeroAleatorio(0,min.length-1)
      senha += min[posicao]
    }

  //   Acrescenta a letra maiuscula
    posicao = numeroAleatorio(0,senha.length-1)
    qualLetra = numeroAleatorio(0,min.length-1)
    senha = mudarCharEm(senha,posicao,mai[qualLetra])
    
//   Acrescenta caractere especial
    posicao = numeroAleatorio(0,senha.length-1)
    // Caso a posicao escolhida já tenha uma letra maiuscula
    // Sortear de novo
    while (mai.includes(senha[posicao])){
      posicao = numeroAleatorio(0,senha.length-1)  
    } 
    qualLetra = numeroAleatorio(0,chars.length-1)
    senha = mudarCharEm(senha,posicao,chars[qualLetra])  
  
//  Acrescenta numero
    // Caso a posicao escolhida já tenha uma letra maiuscula ou caractere especial
    // Sorteia a posicao de novo
    posicao = numeroAleatorio(0,senha.length-1)
    while (mai.includes(senha[posicao]) || chars.includes(senha[posicao])){
      posicao = numeroAleatorio(0,senha.length-1)
    }
    numero = numeroAleatorio(0,9)
    senha = mudarCharEm(senha,posicao,numero)
    
    if(validarSenha(senha,min,mai,chars)){
      document.getElementById('result').innerHTML = senha    
    } else{
      document.getElementById('result').innerHTML = "Senha invalida"
    }
    

}

function geradorDeSenha(){
    let tamanhoSenha = document.getElementById("tamanho").value;
    if (tamanhoSenha.length === 0 || parseInt(tamanhoSenha) > 22 || parseInt(tamanhoSenha) < 4){
        document.getElementById('mensagem').innerHTML = "Tamanho para senha inválido. Gerando uma senha default de tamanho 8."
        criarSenha()
    }
    else{
        document.getElementById('mensagem').innerHTML = ""
        criarSenha(parseInt(tamanhoSenha))
    }
}