(function () {
  const menu = document.getElementById("menu");
  const nav = document.getElementById("pills");
  const painel = document.getElementById("painel");
  const LARGURA_PAINEL = 290;
  const MOBILE = window.matchMedia("(max-width: 680px)");
  let abaAberta = null;

  const topo = document.querySelector(".top-inner");
  topo.classList.add("com-menu");

  const btnMenu = document.createElement("button");
  btnMenu.type = "button";
  btnMenu.className = "btn-menu";
  btnMenu.setAttribute("aria-label", "Abrir categorias");
  btnMenu.setAttribute("aria-expanded", "false");
  btnMenu.setAttribute("aria-controls", "menu");
  btnMenu.innerHTML = '<span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>';

  document.querySelector(".busca-wrap").before(btnMenu);

  const fundo = document.createElement("div");
  fundo.className = "menu-fundo";
  document.body.append(fundo);

  const cabecalhoMenu = document.createElement("div");
  cabecalhoMenu.className = "menu-topo";
  cabecalhoMenu.innerHTML = '<strong>Categorias</strong><button type="button" class="menu-fechar" aria-label="Fechar categorias">×</button>';

  menu.prepend(cabecalhoMenu);

  const btnFechar = cabecalhoMenu.querySelector(".menu-fechar");

  function abrirMenuLateral() {
    menu.classList.add("aberto");
    fundo.classList.add("aberto");
    btnMenu.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    btnFechar.focus();
  }

  function fecharMenuLateral(devolverFoco) {
    if (!menu.classList.contains("aberto")) return;

    menu.classList.remove("aberto");
    fundo.classList.remove("aberto");
    btnMenu.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";

    fechar();

    if (devolverFoco) btnMenu.focus();
  }

  btnMenu.addEventListener("click", abrirMenuLateral);

  btnFechar.addEventListener("click", function () {
    fecharMenuLateral(true);
  });

  fundo.addEventListener("click", function () {
    fecharMenuLateral(true);
  });

  MOBILE.addEventListener("change", function () {
    fecharMenuLateral(false);
  });

  function fechar() {
    if (!abaAberta) return;

    abaAberta.classList.remove("aberta");
    abaAberta.setAttribute("aria-expanded", "false");
    painel.hidden = true;
    abaAberta = null;
  }

  function criarBotao(texto, aoClicar) {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = texto;
    botao.addEventListener("click", aoClicar);

    return botao;
  }

  function adicionarSecao(titulo, classe, botoes) {
    const cabecalho = document.createElement("h4");
    cabecalho.textContent = titulo;

    const caixa = document.createElement("div");
    caixa.className = classe;
    caixa.append(...botoes);

    painel.append(cabecalho, caixa);
  }

  function aplicar(acao) {
    acao();
    fechar();
    fecharMenuLateral(false);
    document.getElementById("produtos").scrollIntoView();
  }

  function montarPainel(item) {
    painel.replaceChildren();

    const titulo = document.createElement("h3");
    titulo.textContent = item.nome;
    painel.append(titulo);

    if (item.categoria) {
      const tudo = criarBotao("Ver tudo de " + item.nome, function () {
        aplicar(function () {
          Lumi.busca.categoria(item.categoria);
        });
      });

      const caixa = document.createElement("div");
      caixa.className = "lista";
      caixa.append(tudo);

      painel.append(caixa);
    }

    if (item.tipos.length) {
      adicionarSecao("Tipos", "lista", item.tipos.map(function (tipo) {
        return criarBotao(tipo, function () {
          aplicar(function () {
            Lumi.busca.limpar();
            Lumi.busca.texto(tipo);
            document.getElementById("busca").value = tipo;
          });
        });
      }));
    }

    if (item.marcas.length) {
      adicionarSecao("Marcas", "chips", item.marcas.map(function (marca) {
        return criarBotao(marca, function () {
          aplicar(function () {
            Lumi.busca.marca(marca);
          });
        });
      }));
    }
  }

  function abrir(botao, item) {
    fechar();
    montarPainel(item);

    if (MOBILE.matches) {
      botao.after(painel);
    } else if (painel.parentNode !== menu) {
      menu.append(painel);
    }

    painel.hidden = false;
    botao.classList.add("aberta");
    botao.setAttribute("aria-expanded", "true");
    abaAberta = botao;

    if (window.innerWidth > 820) {
      const limite = menu.clientWidth - LARGURA_PAINEL;
      painel.style.left = Math.max(0, Math.min(botao.offsetLeft, limite)) + "px";
    } else {
      painel.style.left = "";
    }
  }

  Lumi.menu.forEach(function (item) {
    const aba = criarBotao(item.nome, function () {
      if (abaAberta === aba) {
        fechar();
      } else {
        abrir(aba, item);
      }
    });

    aba.setAttribute("aria-expanded", "false");
    aba.setAttribute("aria-controls", "painel");
    nav.append(aba);
  });

  document.addEventListener("click", function (evento) {
    if (!menu.contains(evento.target)) fechar();
  });

  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") {
      fechar();
      fecharMenuLateral(true);
    }
  });
})();