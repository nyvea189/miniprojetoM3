class Produto {
  constructor(id, nome, preco, descricao, imagem) {
    this.id = id;
    this.nome = nome;
    this.preco = preco;
    this.descricao = descricao;
    this.imagem = imagem;
  }
}

const produto = JSON.parse(localStorage.getItem("produtos")) || [
  new Produto(Date.now(), "Camiseta Azul", 49.9, "Camiseta 100% algodão", "https://via.placeholder.com/100"),
  new Produto(Date.now() + 1, "Tênis Esportivo", 129.9, "Ideal para corridas", "https://via.placeholder.com/100")
];

const form = document.getElementById("form-produto");
const lista = document.getElementById("lista-produtos");

function salvarProdutos() {
  localStorage.setItem("produtos", JSON.stringify(produtos));
}

function renderizarLista() {
  lista.innerHTML = "";
  produtos.forEach(prod => {
    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${prod.imagem}" width="50" />
      <strong>${prod.nome}</strong> - R$ ${prod.preco.toFixed(2)}<br>
      ${prod.descricao}
      <button onclick="editarProduto(${prod.id})">Editar</button>
      <button onclick="deletarProduto(${prod.id})">Excluir</button>
    `;
    lista.appendChild(li);
  });
}

form.onsubmit = function (e) {
  e.preventDefault();
  const idInput = document.getElementById("produto-id");
  const nome = document.getElementById("nome").value;
  const preco = parseFloat(document.getElementById("preco").value);
  const descricao = document.getElementById("descricao").value;
  const imagem = document.getElementById("imagem").value;

  if (!imagem.trim()) {
    alert("A imagem é obrigatória.");
    return;
  }

  const id = idInput.value ? parseInt(idInput.value) : Date.now();

  const index = produtos.findIndex(p => p.id === id);
  if (index >= 0) {
    produtos[index] = new Produto(id, nome, preco, descricao, imagem);
  } else {
    produtos.push(new Produto(id, nome, preco, descricao, imagem));
  }

  salvarProdutos();
  renderizarLista();
  form.reset();
  idInput.value = "";
};

function editarProduto(id) {
  const produto = produtos.find(p => p.id === id);
  document.getElementById("produto-id").value = produto.id;
  document.getElementById("nome").value = produto.nome;
  document.getElementById("preco").value = produto.preco;
  document.getElementById("descricao").value = produto.descricao;
  document.getElementById("imagem").value = produto.imagem;
}

function deletarProduto(id) {
  const index = produtos.findIndex(p => p.id === id);
  if (index >= 0) {
    produtos.splice(index, 1);
    salvarProdutos();
    renderizarLista();
  }
}

renderizarLista();

const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
const container = document.getElementById("cards-container");

produtos.forEach(prod => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${prod.imagem}" alt="${prod.nome}" width="150">
    <h3>${prod.nome}</h3>
    <p>${prod.descricao}</p>
    <strong>R$ ${prod.preco.toFixed(2)}</strong>
  `;
  container.appendChild(card);
});

