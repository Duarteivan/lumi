(function () {
  const CHAVE_SESSAO = "lumi-usuario";
  const CHAVE_CONTAS = "lumi-contas";

  function lerContas() {
    try {
      const lista = JSON.parse(localStorage.getItem(CHAVE_CONTAS));
      return Array.isArray(lista) ? lista : [];
    } catch (e) {
      return [];
    }
  }

  function salvarContas(lista) {
    try {
      localStorage.setItem(CHAVE_CONTAS, JSON.stringify(lista));
      return true;
    } catch (e) {
      return false;
    }
  }

  function normalizar(email) {
    return email.trim().toLowerCase();
  }

  function paraHex(buffer) {
    return Array.from(new Uint8Array(buffer))
      .map(function (b) {
        return b.toString(16).padStart(2, "0");
      })
      .join("");
  }

  function protecaoDisponivel() {
    return typeof crypto !== "undefined" && !!crypto.subtle;
  }

  const ERRO_PROTECAO = "Este navegador não permite proteger a senha nesta página. Abra o site por https ou por localhost.";

  async function gerarHash(senha, sal) {
    const bytes = new TextEncoder().encode(sal + senha);
    return paraHex(await crypto.subtle.digest("SHA-256", bytes));
  }

  function novoSal() {
    return paraHex(crypto.getRandomValues(new Uint8Array(16)));
  }

  Lumi.usuario = {
    atual() {
      try {
        return JSON.parse(localStorage.getItem(CHAVE_SESSAO));
      } catch (e) {
        return null;
      }
    },

    entrar(nome, email) {
      try {
        localStorage.setItem(
          CHAVE_SESSAO,
          JSON.stringify({ nome: nome, email: email })
        );

        return true;
      } catch (e) {
        return false;
      }
    },

    sair() {
      try {
        localStorage.removeItem(CHAVE_SESSAO);
      } catch (e) {
      }
    },

    emailValido(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    async cadastrar(nome, email, senha) {
      if (!protecaoDisponivel()) {
        return { ok: false, erro: ERRO_PROTECAO };
      }

      email = normalizar(email);

      const contas = lerContas();

      if (contas.some(function (c) {
        return c.email === email;
      })) {
        return {
          ok: false,
          erro: "Já existe uma conta com esse e-mail. Use a aba Entrar."
        };
      }

      const sal = novoSal();
      let hash;

      try {
        hash = await gerarHash(senha, sal);
      } catch (e) {
        return { ok: false, erro: ERRO_PROTECAO };
      }

      contas.push({
        nome: nome,
        email: email,
        sal: sal,
        hash: hash
      });

      if (!salvarContas(contas)) {
        return {
          ok: false,
          erro: "Não foi possível salvar a conta neste navegador."
        };
      }

      return { ok: true, nome: nome, email: email };
    },

    async autenticar(email, senha) {
      if (!protecaoDisponivel()) {
        return { ok: false, erro: ERRO_PROTECAO };
      }

      email = normalizar(email);

      const conta = lerContas().find(function (c) {
        return c.email === email;
      });

      const invalido = {
        ok: false,
        erro: "E-mail ou senha incorretos."
      };

      if (!conta) return invalido;

      let hash;

      try {
        hash = await gerarHash(senha, conta.sal);
      } catch (e) {
        return { ok: false, erro: ERRO_PROTECAO };
      }

      if (hash !== conta.hash) return invalido;

      return { ok: true, nome: conta.nome, email: conta.email };
    }
  };
})();