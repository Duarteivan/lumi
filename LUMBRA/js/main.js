(function () {
  const marcas = document.getElementById("marcas-destaque");

  Lumi.marcasDestaque.forEach(function (marca) {
    const botao = document.createElement("button");
    botao.type = "button";
    const nome = marca.split("/")[0];
    const logo = Lumi.marcaLogos[Lumi.idMarca(marca)];

    botao.setAttribute("aria-label", "Ver produtos " + nome);

    if (logo) {
      const img = document.createElement("img");
      img.src = logo;
      img.alt = nome;
      img.loading = "lazy";
      img.addEventListener("error", function () {
        img.remove();
        botao.classList.remove("com-logo");
        botao.prepend(nome);
      });
      botao.classList.add("com-logo");
      botao.append(img);
    } else {
      botao.textContent = nome;
    }

    botao.addEventListener("click", function () {
      Lumi.busca.marca(marca);
      document.getElementById("produtos").scrollIntoView();
    });

    marcas.append(botao);
  });

  document.getElementById("busca").addEventListener("input", function (evento) {
    Lumi.busca.texto(evento.target.value);
  });

  Lumi.produtosView.mostrar(Lumi.produtos, "");
})();