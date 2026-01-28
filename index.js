const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// --- 1. BASE DE CONHECIMENTO (35+ Linhas para a Markov) ---
const conhecimentoBase = `
O universo é vasto e cheio de mistérios esperando para serem descobertos.
A inteligência artificial busca simular o raciocínio humano através de algoritmos.
Desenvolver código é como escrever poesia, mas para máquinas.
Soberania digital significa ter controle total sobre seus dados e ferramentas.
O Node.js permite executar JavaScript no lado do servidor com alta performance.
Cadeias de Markov são modelos estatísticos que prevêem o próximo estado.
A lógica de programação é a base para qualquer sistema complexo.
Servidores na nuvem como o Render facilitam o deploy de aplicações modernas.
O Discord é uma plataforma excelente para criar comunidades e bots úteis.
A tecnologia evolui rápido, mas os fundamentos da lógica permanecem os mesmos.
Privacidade é um direito fundamental no mundo digital conectado.
Sistemas híbridos combinam o melhor de dois mundos para eficiência.
A criatividade humana é o combustível para a inovação tecnológica.
Aprender a programar abre portas para criar suas próprias realidades.
Dados são o novo petróleo, mas o processamento é a refinaria.
Um bot de sucesso precisa ser útil, rápido e ter personalidade.
APIs conectam diferentes serviços de forma transparente e eficaz.
O código aberto permite que o conhecimento seja compartilhado globalmente.
Segurança da informação é um desafio constante para desenvolvedores.
A internet das coisas conecta o mundo físico ao mundo digital.
Algoritmos de busca facilitam encontrar agulhas em palheiros digitais.
A arquitetura de software define como os componentes interagem entre si.
Otimizar código é a arte de fazer mais com menos recursos.
A experiência do usuário deve estar no centro de todo projeto.
Bancos de dados guardam a memória de longo prazo das aplicações.
O futuro pertence àqueles que entendem como as máquinas pensam.
JavaScript é a linguagem que move a web moderna e interativa.
Testar seu código é garantir que o inesperado não aconteça.
Deploy contínuo agiliza a entrega de novas funcionalidades.
Escalabilidade permite que sistemas cresçam conforme a demanda aumenta.
Documentar o código é um ato de carinho com seu eu do futuro.
Interfaces limpas tornam a interação mais intuitiva e agradável.
O hardware é o corpo, mas o software é a mente do computador.
A colaboração no GitHub impulsiona o desenvolvimento de software livre.
Cada linha de código escrita é um passo na evolução do seu bot.
`;

// --- 2. LÓGICA DA CADEIA DE MARKOV (Manual e Independente) ---
let markovChain = {};
const treinarMarkov = () => {
    const palavras = conhecimentoBase.toLowerCase().split(/\s+/);
    for (let i = 0; i < palavras.length - 1; i++) {
        let p1 = palavras[i];
        let p2 = palavras[i + 1];
        if (!markovChain[p1]) markovChain[p1] = [];
        markovChain[p1].push(p2);
    }
};
treinarMarkov();

function gerarFraseMarkov(semente = "") {
    let palavra = semente.split(' ').pop() || "o";
    if (!markovChain[palavra]) {
        const chaves = Object.keys(markovChain);
        palavra = chaves[Math.floor(Math.random() * chaves.length)];
    }
    
    let resultado = [palavra];
    for (let i = 0; i < 12; i++) {
        let possiveis = markovChain[palavra];
        if (!possiveis) break;
        palavra = possiveis[Math.floor(Math.random() * possiveis.length)];
        resultado.push(palavra);
    }
    return resultado.join(' ') + "...";
}

// --- 3. CONFIGURAÇÕES HÍBRIDAS ---
const CONFIG = {
    proibidas: ['rato', 'bolo', 'rua'],
    respostas: {
        "oi": "Olá! Tudo bem?",
        "tudo bem": "Comigo está tudo ótimo, e com você?",
        "quem é você": "Sou um bot soberano rodando IA híbrida!",
        "tchau": "Até mais, foi um prazer!"
    }
};

let memoria = {};

// --- 4. MOTOR DE RACIOCÍNIO ---
function pensar(texto, user) {
    const input = texto.toLowerCase().trim();
    
    if (CONFIG.proibidas.some(p => input.includes(p))) return "⚠️ Conteúdo bloqueado pelo sistema.";

    const anterior = memoria[user] || "";
    memoria[user] = input;

    // Lógica de Sequência
    if (input === "e você?" && (anterior === "oi" || anterior === "tudo bem")) {
        return "Estou funcionando perfeitamente nos servidores do Render!";
    }

    // Resposta Fixa
    if (CONFIG.respostas[input]) return CONFIG.respostas[input];

    // Markov (Raciocínio Aleatório)
    return gerarFraseMarkov(input);
}

// --- 5. API E SERVIDOR ---
app.post('/api/chat', (req, res) => {
    const { mensagem, user } = req.body;
    const resposta = pensar(mensagem || "", user || "anonimo");
    res.json({ resposta });
});

// Interface simples servida pelo próprio Render
app.get('/', (req, res) => {
    res.send(`
        <html>
        <body style="background:#222; color:#fff; font-family:sans-serif; text-align:center; padding:50px;">
            <h1>🚀 Bot Híbrido Online</h1>
            <p>Sua API está pronta para receber requisições.</p>
            <p>Use o endpoint <code>/api/chat</code> via POST.</p>
        </body>
        </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API SOBERANA NA PORTA ${PORT}`));
