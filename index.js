const prompt = require('prompt-sync')();

/**
  Logo que este programa é iniciado, ocorre o cadastro das informações do aluno sobre suas matérias,
  conforme os dados são captados eles também são validados, para garantir que sejam salvos no objeto aluno
  no formato válido.  
  Após este cadastro, as notas médias são cálculadas e atribuídas ao aluno, assim como seus status.
  Caso o aluno, em determinada matéria, tenha tirado notas abaixo de 7 e não tiver sido reprovado por falta, 
  o programa pede as notas de recuperação, onde novamente ocorrerá o processo de cálculo da média, 
  e o aluno poderá ser aprovado ou reprovado.
 */

// Regex para a validação das entradas dos valores númericos
const regexNotas = /^[\d,.]+$/;
const regexFaltas = /^\d+$/;

// Quantidade de matérias cadastradas
let quantidadeMaterias = 0;

// Criação do objeto aluno
let objetoAluno = new Object();

// Indica se o aluno está de recuperação
let recuperacao = false;

// Nota mínima
let notaMinima = 6;

// Quantidade de faltas permitidas
let maximoFaltas = 5;

// Quantidade definida de notas por matéria
let quantidadeNotas = 3;

let objAluno = {
  nomeAluno: 'Silas',
  materias: [
    {
      nomeMateria: 'português',
      notas: [10, 2.3, 7],
      faltas: 3,
      status: '',
      // media 6,4333 - aprov
    },
    {
      nomeMateria: 'matemática',
      notas: [8, 7.6, 3],
      faltas: 7,
      status: '',
      //media 6.2 reprovado falta
    },
    {
      nomeMateria: 'geografia',
      notas: [8, 4, 2],
      faltas: 3,
      status: '',
      // media 4,6.. recuperação -> aprov
    },
    {
      nomeMateria: 'física',
      notas: [4, 2, 2],
      faltas: 8,
      status: '',
      // 2.66.. reprovado por falta e nota
    },
    {
      nomeMateria: 'química',
      notas: [7, 2, 2],
      faltas: 3,
      status: '',
      // media 3,6.. recuperação -> reprov
    },
  ]
}


function cadastrarNotas(nomeMateria){
  /** 
    Esta função é responsável por cadastrar as notas do aluno, nele há um for para cada nota
    que será cadastrada, dentro de cada iteração há um while, onde contém a entrada do valor da nota,
    o tratamento da nota (se necessário troca da vírgula por ponto), e a chamada da função de validação.
    Caso o valor da nota inserida pelo usuário seja inválido, a validação retornará 'true', para que o while se 
    repita até que seja válido. Caso o valor nota seja válido, ele será adicionado
    a um array que será retornado no final da função. Esta função pode é uilizada no cadastro das
    informações do aluno e no momento da recuperação.
  */

  // Variável para controlar a validação dentro do loop while
  let validaNota;

  // Lista de notas
  let notas = [];

  console.log('');
  console.log(`Sobre as notas de ${nomeMateria}`);

  // for para tratar de cada nota
  for(let i = 0; i < quantidadeNotas; i++){

    validaNota = true;

    // while para a validação e cadastro de nota 
    while(validaNota){

      // Entrada da nota
      let nota = prompt(`${i+1} - Informe a nota: `);

      if(nota.includes(',')){
        nota = nota.replace(',','.');
      }
      // Validação
      validaNota = validarEntrada('nota', nota);

      // Caso a nota seja válida o valor sera atribuido ao array
      if(!validaNota){
        notas[i] = +nota;
      }
    }
  }
  return notas;
}


function validarEntrada(tipo, valor){

  // Função responsável pela validação das informações, o parâmetro 'tipo' indica o tipo de validação
  // e o 'valor' é o valor que será validado. Se o valor for inválido será retornado true, e se for válido
  // será retornado false.

  // Se houver espaços no início ou no fim do valor, serão retirados.
  valor = valor.trim();

  // Esta validação passa por todos os tipos de validação, onde verificará se o valor estiver vazio
  if(valor == ''){
    console.error('Por favor, insira um valor.\n');
    return true;
  }
  /** 
    Como a validação do nome do aluno e do nome da matéria são equivalentas a 
    validação anterior, ao chegar neste 'if', significa que o valor está válido e 
    será retornado um 'false' para prosseguir o cadastro. 
  */
  if(tipo == 'nome'){
    return false;
  }

  if(tipo == 'nota'){

    // Caso o valor não seja numérico
    if(!regexNotas.test(valor)){
      console.error('O valor inserido de nota não é válido, pois não é numérico.\n');
      return true;
    }
    // Caso o valor seja negativo
    if(!(parseFloat(valor) >= 0)){
      console.error('O valor inserido de notas não é valido, pois é negativo.\n');
      return true;
    }
    // Nota válida
    return false;
  }

  if(tipo == 'faltas'){

    // Esta regex aceita apenas valores númericos inteiros
    if(!regexFaltas.test(valor)){
      console.error('O valor inserido de faltas não é válido, pois não é numérico ou inteiro.\n');
      return true;
    } 
    // Caso o valor seja negativo
    if(!(parseFloat(valor) >= 0)){
      console.error('O valor inserido de faltas não é valido, pois é negativo.\n');
      return true;
    }
    // Falta válida
    return false;
  }

  if(tipo == 'resposta'){

    // Validação para continuar
    if(valor == 's' || valor == 'S'){
      return false;
    } 
    // Validação para parar
    else if (valor == 'n' || valor == 'N'){
      // Só pode parar o cadastro se a quantidade de matérias cadastradas for maior ou igual a 3
      if(quantidadeMaterias >= 3){
        return false;
      } else {
        console.error('A quantidade de matérias cadastradas por aluno, não pode ser menor que 3.\n');
        return true;
      }
    }
    // Caso o valor inserido não for válido
    else {
      console.error('O valor inserido de resposta não é válido. Por favor, informe o valor correto.\n');
      return true;
    }
  }
}

function cadastroInfoAluno(){
  /** 
    Função responsável pelos cadastros das informações do aluno e suas matérias no objeto aluno.
    Assim como na função de cadastro de notas, também foram implementados loops while para a captação e
    validação de cada dado (nome do aluno, matérias, faltas, reposta), de forma a assegurar que os dados do aluno
    sejam gravados nos formatos adequados. Nesta função também ocorre a chamada da função de cadastrar notas.
  */
  // Adicionando a propriedade matéria ao objeto aluno
  objetoAluno['materia'] = [];

 // Variável que controla a validação do nome do aluno
  let validaNomeAluno = true;
  
  // Cadastro do nome do aluno
  while(validaNomeAluno){

    // Entrada do nome do aluno
    const nomeAluno = prompt('Informe o nome do aluno: ');

    // Chama a função de validação para validar o nome do aluno.
    validaNomeAluno = validarEntrada('nome', nomeAluno);

    // Caso o nome esteja no formato válido, o nome será adicionado ao objeto aluno
    if(!validaNomeAluno){
      objetoAluno['nomeAluno'] = nomeAluno;
    } 
  }

  let nomeMateria = '';
  let faltas = 0;

  console.log('');
  console.log(`---- Cadastro das informações escolares de ${objetoAluno.nomeAluno} ----`);
  console.log('---- É necessário que no mínimo 3 matérias sejam cadastradas ----');
  console.log('');

  // Indica se o cadastro pode prosseguir ou não
  let prosseguirCadastro = true;

  // Cadastro de matéria
  while(prosseguirCadastro){
    
    // Criar objeto matéria
    let objetoMateria = new Object();

    // Variável que controla a validação na matéria
    let validaMateria = true;

    // Cadastro de matéria
    while(validaMateria){

      // Entrada do nome da matéria
      nomeMateria = prompt('Informe o nome da matéria: ');

      // Chama a função de validação 
      validaMateria = validarEntrada('nome', nomeMateria);

    // Caso a o nome da matéria esteja no formato válido, será adicionado ao objeto matéria
      if(!validaMateria){
        objetoMateria['nomeMateria'] = nomeMateria; 
      } 
    }

    // Chama a função para a entrada de notas.
    objetoMateria['notas'] = cadastrarNotas(nomeMateria);

    // Variável que controla a validação em faltas
    let validaFaltas = true;

    // Cadastro de faltas
    while(validaFaltas){

      // Entrada de faltas
      console.log('');
      faltas = prompt(`Informe quantas faltas ocorreram nesta matéria: `);
      console.log('');
      // Chama a função de validação 
      validaFaltas = validarEntrada('faltas', faltas);

      // Caso a falta esteja no formato válido, ela será adicionada ao objeto matéria
      if(!validaFaltas){
        objetoMateria['faltas'] = +faltas;
      } 
    }

    // Adiciona mais uma matéria no contador 
    quantidadeMaterias++;

    // Adicionando a propriedade status ao objeto matéria
    objetoMateria['status'] = '';

    // Adiciona a matéria no objeto aluno
    objetoAluno['materia'].push(objetoMateria);
 
    //Indica se o loop while deve continuar, se o usuário deseja prosseguir;
    let validaProsseguirCadastro = true;
    let reposta = '';

    // Resposta do usuário para continuar o cadastro de matérias
    while(validaProsseguirCadastro){
      
      // Entrada da resposta
      reposta = prompt('Deseja continuar o cadastro? - "s" ou "S" para continuar - "n" ou "N" para parar: ');
      console.log('');
      // validação da resposta
      validaProsseguirCadastro = validarEntrada('resposta', reposta);

      // Caso a resposta seja válida, o fluxo será excutado de acordo com a resposta
      if(!validaProsseguirCadastro){
        if(reposta == 's' || reposta == 'S'){
          prosseguirCadastro = true;
        } else if(reposta == 'n' || reposta == 'N'){
          prosseguirCadastro = false;
        }
      }
    }
  }
}

function consolidarFaltas(faltas){
  //Função que verifica se houve reprovação por falta
  if(faltas > maximoFaltas){
    return 'Reprovado por falta';
  }
  return '';
}

function calcularMedia(notas){
  // Função que cálcula a média
  let media = 0;

  notas.forEach((nota) => {
    media += nota;
  })

  media = media / quantidadeNotas;
  return media;
}


function gestaoStatusAluno(){

  // Nesta função há um for que passará por cada matéria cadastrada, onde será chamada a função 
  // de cálculo de média e a atribuição dos status. 
  
  // Iteração por cada matéria 
  for(let i = 0; i < objetoAluno.materia.length; i++){
    
    // Esta condição do 'if' é válido para a primeira vez que 'for' estiver executando
    if(objetoAluno.materia[i].status == ''){
      
      // Chamada da função de cálculo da média e atribuição do valor ao objeto 
      let media = calcularMedia(objetoAluno.materia[i].notas);
      objetoAluno.materia[i].notaMedia = media;

      // Chamada da função responsável pelas faltas onde verificará se o aluno foi reporvado por faltas
      let faltaStatus = consolidarFaltas(objetoAluno.materia[i].faltas);
      if(faltaStatus){
        objetoAluno.materia[i].status = faltaStatus;
      }
      /** 
        De acordo com a média, serão distribuídos os seguintes status para cada matéria:
        Aprovado: se a nota for maior que 6
        Reprovado por falta: se o aluno faltou mais que 5 vezes
        Recuperação: se a média do aluno for inferior que 7
        Reprovado por falta e nota: além de ter sido reprovado por falta, o aluno também teve a média baixa.
      */
      if(objetoAluno.materia[i].notaMedia < notaMinima){
        if(objetoAluno.materia[i].status == 'Reprovado por falta'){
          objetoAluno.materia[i].status = 'Reprovado por falta e nota';
        } else {
          recuperacao = true;
          objetoAluno.materia[i].status = 'Recuperacao';
        }
      } else if (!(objetoAluno.materia[i].status == 'Reprovado por falta')){
        objetoAluno.materia[i].status = 'Aprovado';
      }
    } 
    // A segunda execução do 'for' ocorre quando o aluno estiver de recuperação em
    // determinada matéria
    else if(objetoAluno.materia[i].status == 'Recuperacao'){
        let media = calcularMedia(objetoAluno.materia[i].notas);
        objetoAluno.materia[i].notaMedia = media;

        // Verificação e atribuição de status após a recuperação, caso o aluno consiga
        // recuperar a nota seu status é aprovado, caso contrário é reprovado.
        if(objetoAluno.materia[i].notaMedia < notaMinima){
          objetoAluno.materia[i].status = 'Reprovado por nota';
        } else if(objetoAluno.materia[i].status == 'Recuperacao'){
          objetoAluno.materia[i].status = 'Aprovado';
        } 
      }
  }
}

function exibeResultados(){
  // Função responsável por exibir os resultados no terminal
  console.log('');
  console.log('Resultados')
  console.log('-----------------------------------------------');
  objetoAluno.materia.forEach((materia) => {
    console.log(`Matéria: ${materia.nomeMateria}`);
    console.log(`Nota Média: ${materia.notaMedia.toFixed(2)}`);
    console.log(`Faltas: ${materia.faltas}`);
    console.log(`Status: ${materia.status}`);
    console.log('-----------------------------------------------');
  })
}

function recuperacaoMaterias(){
  // Função responsável por chamar a função cadastrar notas para as matérias
  // que o aluno ficou de recuperação, a atribuir as novas notas médias ao objeto
  for(let i = 0; i < objetoAluno.materia.length; i++){
    if(objetoAluno.materia[i].status == 'Recuperacao'){
      objetoAluno.materia[i].notas = cadastrarNotas(objetoAluno.materia[i].nomeMateria);
    }
  }
}

// Início do fluxo do programa
console.log('---- Inicio do programa ---- \n');

cadastroInfoAluno();
gestaoStatusAluno();
exibeResultados();

if(recuperacao){
  console.log(`---- Recuperação de ${objetoAluno.nomeAluno} ----`)
  recuperacaoMaterias();
  gestaoStatusAluno();
  exibeResultados();
}

console.log(`---- Fim do programa ----`)

