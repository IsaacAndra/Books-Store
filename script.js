async function buscaEndereco(cep) {
    const mensageErro = document.getElementById('erro');
    mensageErro.innerHTML = '';
    try {
    const consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const consultaCepConvertida = await consultaCep.json();


    if(consultaCepConvertida.erro) {
        throw Error('Cep nao existente!');
    }
    
    const cidade = document.getElementById('cidade');
    const logradouro = document.getElementById('endereco');
    const estado = document.getElementById('estado');
    const bairro = document.getElementById('bairro');

    cidade.value = consultaCepConvertida.localidade;
    logradouro.value = consultaCepConvertida.logradouro;
    estado.value = consultaCepConvertida.uf;
    bairro.value = consultaCepConvertida.bairro;
    
    return consultaCepConvertida;
    } catch (erro) {
        mensageErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
        console.log(erro);
    }
}


const cep = document.getElementById('cep');
cep.addEventListener('focusout', () => buscaEndereco(cep.value));