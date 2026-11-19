(function () {
  const grade = document.getElementById("grade");
  const vazio = document.getElementById("vazio");
  const filtro = document.getElementById("filtro");
  const filtroTexto = document.getElementById("filtro-texto");
  const contagem = document.getElementById("contagem");

  function classeCategoria(categoria) {
    const mapa = {
      "Facial": "cat-facial",
      "Elétricos": "cat-eletricos",
      "Maquiagem": "cat-maquiagem",
      "Higiene e cuidados": "cat-higiene",
      "Depilação e estética": "cat-depilacao",
      "Unha": "cat-unha"
    };

    return mapa[categoria] || "cat-cabelo";
  }

  function criarCard(produto) {
    const card = document.createElement("article");
    card.className = "prod";
    card.innerHTML =
      '<div class="produto-visual"><span class="tag"></span><span class="produto-embalagem" aria-hidden="true"></span></div>' +
      '<small></small><h3></h3><button class="big" type="button">Adicionar ao Carrinho <span aria-hidden="true">＋</span></button>';

    const visual = card.querySelector(".produto-visual");
    visual.classList.add(classeCategoria(produto.categoria));

    const embalagem = card.querySelector(".produto-embalagem");
    embalagem.textContent = produto.marca;

    if (produto.imagem) {
      const imagem = document.createElement("img");
      imagem.src = produto.imagem;
      imagem.alt = produto.nome;
      imagem.loading = "lazy";
      visual.classList.add("com-imagem");
      visual.append(imagem);
      embalagem.hidden = true;
    }

    if (produto.forma) embalagem.dataset.forma = produto.forma;
    if (produto.cor) visual.style.setProperty("--cor", produto.cor);

    card.querySelector(".tag").textContent = produto.categoria;
    card.querySelector("small").textContent = produto.marca;
    card.querySelector("h3").textContent = produto.nome;

    const botao = card.querySelector("button");

    botao.addEventListener("click", function () {
      Lumi.carrinho.adicionar(produto.id);

      botao.innerHTML = 'Adicionado <span aria-hidden="true">✓</span>';
      botao.classList.add("adicionado");
      botao.setAttribute("aria-label", produto.nome + " adicionado ao Carrinho");

      window.setTimeout(function () {
        botao.innerHTML = 'Adicionar ao Carrinho <span aria-hidden="true">＋</span>';
        botao.classList.remove("adicionado");
        botao.setAttribute("aria-label", "Adicionar " + produto.nome + " ao carrinho ");
      }, 1400);
    });

    botao.setAttribute("aria-label", "Adicionar " + produto.nome + " ao carrinho");

    return card;
  }

  document.getElementById("filtro-limpar").addEventListener("click", function () {
    Lumi.busca.limpar();
  });

  Lumi.produtosView = {
    mostrar(lista, rotulo) {
      grade.replaceChildren(...lista.map(criarCard));
      vazio.hidden = lista.length > 0;

      contagem.textContent =
        lista.length + (lista.length === 1 ? " produto" : " produtos");

      filtro.hidden = !rotulo;
      filtroTexto.textContent = rotulo || "";
    }
  };
})();