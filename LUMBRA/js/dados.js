window.Lumi = window.Lumi || {};

Lumi.idMarca = function (nome) {
    return nome
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
};

Lumi.menu = [
    {
        nome: "Cabelo",
        categoria: "Cabelo",
        tipos: [
            "Shampoo",
            "Condicionador",
            "Hidratação",
            "Tintura",
            "Tonalizantes",
            "Óleos",
            "Kits Tratamento",
            "Escovas/Pentes"
        ],
        marcas: [
            "Acquaflora",
            "Wella",
            "Truss",
            "Inoar",
            "Cadiveu",
            "Schwarzkopf",
            "L'Oréal Professionnel",
            "Eudora/Siàge",
            "Bio Extratus",
            "Amend"
        ]
    },
    {
        nome: "Maquiagem",
        categoria: "Maquiagem",
        tipos: [
            "Batons",
            "Máscaras de Cílios",
            "Iluminadores",
            "Lápis/Lapiseira",
            "Cílios Postiços",
            "Kits Pincéis"
        ],
        marcas: [
            "Maybelline",
            "Mari Maria",
            "Dailus",
            "Vult",
            "Revlon",
            "Kiss New York"
        ]
    },
    {
        nome: "Depilação",
        categoria: "Depilação e estética",
        tipos: [
            "Ceras",
            "Creme Depilatório",
            "Lenços Removedores",
            "Loção",
            "Firmadores"
        ],
        marcas: [
            "Veet",
            "Depil Bella"
        ]
    },
    {
        nome: "Higiene",
        categoria: "Higiene e cuidados",
        tipos: [
            "Desodorantes",
            "Esfoliantes",
            "Hidratantes",
            "Perfumes",
            "Protetor Solar",
            "Sabonetes"
        ],
        marcas: [
            "Nivea",
            "Unilever",
            "Giovanna Baby",
            "Australian Gold",
            "Eudora/Instance"
        ]
    },
    {
        nome: "Facial",
        categoria: "Facial",
        tipos: [
            "Cremes",
            "Gel de Limpeza",
            "Máscara",
            "Sérum",
            "Protetor Labial"
        ],
        marcas: [
            "Cicatricure/Genommalab",
            "Payot",
            "Nivea"
        ]
    },
    {
        nome: "Elétricos",
        categoria: "Elétricos",
        tipos: [
            "Pranchas/Chapinhas",
            "Secadores",
            "Modeladores",
            "Escovas",
            "Difusores"
        ],
        marcas: [
            "Kiss New York",
            "Taiff",
            "Revlon"
        ]
    },
    {
        nome: "Unha",
        categoria: "Unha",
        tipos: [
            "Esmaltes",
            "Removedores",
            "Finalizadores"
        ],
        marcas: [
            "Risqué",
            "Dailus",
            "Vult"
        ]
    },
    {
        nome: "Marcas",
        categoria: null,
        tipos: [],
        marcas: [
            "Acquaflora",
            "Alumi Hair",
            "Amend",
            "Australian Gold",
            "Belliz Company",
            "Bio Extratus",
            "Cadiveu",
            "Cicatricure/Genommalab",
            "DaBelle",
            "Dailus",
            "Depil Bella",
            "Embeleze",
            "Eudora/Instance",
            "Eudora/Siàge",
            "Giovanna Baby",
            "Gummy Hair",
            "Hard Hair",
            "Haskell",
            "Inoar",
            "Kiss New York",
            "Lacan",
            "Lizz",
            "L'Oréal",
            "L'Oréal Professionnel",
            "Macrilan",
            "Mari Maria",
            "Maybelline",
            "Misuric",
            "Niasi",
            "Niely",
            "Nivea",
            "Payot",
            "Portier",
            "Raavi",
            "Revlon",
            "Risqué",
            "Salon Line",
            "Schwarzkopf",
            "Taiff",
            "Trifil",
            "Triskle",
            "Truss",
            "Unilever",
            "Urban Men",
            "Veet",
            "Vult",
            "Wella",
            "Wella Profissional",
            "Zulu"
        ]
    }
];

Lumi.marcasDestaque = [
    "Acquaflora",
    "Eudora/Siàge",
    "Wella",
    "Kiss New York",
    "Cicatricure/Genommalab"
];

Lumi.marcaLogos = {
    "acquaflora": "img/marcas/acquaflora.png",
    "eudora-siage": "img/marcas/eudora.png",
    "wella": "img/marcas/wella.png",
    "kiss-new-york": "img/marcas/kiss-new-york.jpg",
    "cicatricure-genommalab": "img/marcas/cicatricure.png"
};

Lumi.produtos = [
    {
        id: 1,
        marca: "Kiss NY",
        marcaId: "kiss-new-york",
        forma: "modelador",
        cor: "#8b7bb0",
        nome: "Modelador de Cachos Instawave Bivolt",
        imagem: "img/produtos/MODELADOR.png",
        categoria: "Elétricos"
    },
    {
        id: 2,
        marca: "Wella",
        marcaId: "wella",
        forma: "tintura",
        cor: "#e8d08a",
        nome: "Tintura Koleston 120 Louro Claríssimo Natural",
        imagem: "img/produtos/KOLESTON.png",
        categoria: "Cabelo"
    },
    {
        id: 3,
        marca: "Wella Professionals",
        marcaId: "wella",
        forma: "tintura",
        cor: "#b08650",
        nome: "Color Touch 7.0 Louro Médio",
        imagem: "img/produtos/COLOR.png",
        categoria: "Cabelo"
    },
    {
        id: 4,
        marca: "Eudora Siàge",
        marcaId: "eudora-siage",
        forma: "caixa",
        cor: "#d98aa8",
        nome: "Kit Combo Nutri Rosé: shampoo, condicionador e leave-in",
        imagem: "img/produtos/KIT.png",
        categoria: "Cabelo"
    },
    {
        id: 5,
        marca: "Acquaflora",
        marcaId: "acquaflora",
        forma: "tubo",
        cor: "#6fa8b5",
        nome: "Condicionador Brilho 3D",
        imagem: "img/produtos/BRILHO_3D.png",
        categoria: "Cabelo"
    },
    {
        id: 6,
        marca: "Cicatricure",
        marcaId: "cicatricure-genommalab",
        forma: "pote",
        cor: "#c7a46b",
        nome: "Creme Facial Gold Lift Diurno FPS 30, 50g",
        imagem: "img/produtos/CICATRICURE.PNG",
        categoria: "Facial"
    }
];

(function () {
    const idsDoMenu = new Set();

    Lumi.menu.forEach(function (aba) {
        aba.marcas.forEach(function (marca) {
            idsDoMenu.add(Lumi.idMarca(marca));
        });
    });

    Lumi.produtos.forEach(function (produto) {
        if (!idsDoMenu.has(produto.marcaId)) {
            console.warn(
                '[Lumi] O produto "' +
                produto.nome +
                '" tem marcaId "' +
                produto.marcaId +
                '", que não existe no menu.'
            );
        }
    });

    Lumi.marcasDestaque.forEach(function (marca) {
        const temProduto = Lumi.produtos.some(function (p) {
            return p.marcaId === Lumi.idMarca(marca);
        });

        if (!temProduto) {
            console.warn(
                '[Lumi] A marca em destaque "' +
                marca +
                '" ainda não tem nenhum produto.'
            );
        }
    });
})();