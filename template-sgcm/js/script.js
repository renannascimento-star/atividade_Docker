let form = document.querySelector('form');
let botaoAdd = document.querySelector('a#add');
let botaoCancelar = document.querySelector('input[value="Cancelar"]');
let btnSalvar = document.querySelector('input[type="submit"]');
let tabela = document.querySelector('table');

// Adiciona o evento de click ao botão de adicionar
botaoAdd.addEventListener('click', () => {
  form.classList.remove('inativo');
});

// Adiciona o evento de click ao botão de cancelar
botaoCancelar.addEventListener('click', () => {
  form.classList.add('inativo');
  // Limpa os campos do formulário
  form.reset();
});
