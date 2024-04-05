let participantes = [
    {
        nome: "Bernardo Gassen",
        email: "bernardo@gmail.com",
        dataInscricao: new Date(2024, 1, 2, 21, 12),
        dataCheckin: new Date(2024, 2, 1, 20, 20)
    },
    {
        nome: "Ingrid Gassen",
        email: "ingrid@gmail.com",
        dataInscricao: new Date(2024, 1, 2, 19, 23),
        dataCheckin: null
    },
    {
        nome: "Fernando Silva",
        email: "fernando@gmail.com",
        dataInscricao: new Date(2024, 0, 3, 19, 23),
        dataCheckin: new Date(2024, 0, 3, 20, 20)
    },
    {
        nome: "Carla Oliveira",
        email: "carla@gmail.com",
        dataInscricao: new Date(2023, 11, 4, 19, 23),
        dataCheckin: null
    },
    {
        nome: "Mariana Santos",
        email: "mariana@gmail.com",
        dataInscricao: new Date(2023, 10, 5, 19, 23),
        dataCheckin: new Date(2023, 10, 5, 20, 20)
    },
    {
        nome: "Lucas Martins",
        email: "lucas@gmail.com",
        dataInscricao: new Date(2023, 9, 6, 19, 23),
        dataCheckin: new Date(2023, 9, 6, 20, 20)
    },
    {
        nome: "Patricia Souza",
        email: "patricia@gmail.com",
        dataInscricao: new Date(2023, 8, 7, 19, 23),
        dataCheckin: new Date(2023, 8, 7, 20, 20)
    },
    {
        nome: "Felipe Lima",
        email: "felipe@gmail.com",
        dataInscricao: new Date(2023, 7, 8, 19, 23),
        dataCheckin: new Date(2023, 7, 8, 20, 20)
    },
    {
        nome: "Ana Costa",
        email: "ana@gmail.com",
        dataInscricao: new Date(2023, 6, 9, 19, 23),
        dataCheckin: new Date(2023, 6, 9, 20, 20)
    },
    {
        nome: "Gabriel Oliveira",
        email: "gabriel@gmail.com",
        dataInscricao: new Date(2023, 5, 10, 19, 23),
        dataCheckin: new Date(2023, 5, 10, 20, 20)
    }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckin = dayjs(Date.now()).to(participante.dataCheckin)



  //CONDICIONAL
  if(participante.dataCheckin == null){
    dataCheckin = `
      <button 
        data-email="${participante.email}"
        onclick="fazerCheckin(event)"
      >
        Confirmar Check-in
      
      </button>
    `
  }

  return `<tr>
      <td>
        <strong>
          ${participante.nome}
          </strong>
          <br>
          <small>
            ${participante.email}
          </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckin}</td>
    </tr>`
}

const atualizarLista = (participantes) => {
  let output = ""
  // estrutura de repetição-loop
  for(let participante of participantes){
    output = output + criarNovoParticipante(participante)
  }  
  //Pegar informação do HTML




  //Substituir informação do HTML
  document.querySelector("tbody").innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosFormulario = new FormData(event.target)
  
  const participante = {
    nome: dadosFormulario.get('nome'),
    email: dadosFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckin: null
  }

  const participanteExiste = participantes.find(
    (p) => {
      return p.email == participante.email
    }
  )

  if(participanteExiste) {
    alert('E-mail já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  //Limpar Formulário
  event.target.querySelector('[name="nome"]').value=""
  event.target.querySelector('[name="email"]').value=""
}

const fazerCheckin = (event) =>{

  const resultado = "Tem certeza que deseja fazer o Check-in?"

  if(confirm(resultado) == false){
    return
  }

  alert(resultado)
  // encontrar o participante dentro da lista
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })
  //atualizar o check-in do participante
  participante.dataCheckin = new Date()
  
  //atualizar a lista de participantes
  atualizarLista(participantes)
}