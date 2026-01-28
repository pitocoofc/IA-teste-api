const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // Para servir o index.html

// --- CONFIGURAÇÕES DO BOT ---
const palavrasProibidas = ['rato', 'bolo', 'rua'];
const respostasFixas = {
    "oi": "Olá! Como você está?",
    "tudo bem": "Comigo está tudo ótimo, e com você?",
    "sim": "Que bom! Fico feliz em saber.",
    "tchau": "Até a próxima!"
};

let memoriaContexto = {}; // Guarda o último assunto por "Sessão"

// --- LÓGICA DE RACIOCÍNIO ---
function processarResposta(texto, idUsuario = 'web-test') {
    const input = texto.toLowerCase().trim();

    // 1. Filtro
    if (palavrasProibidas.some(p => input.includes(p))) {
        return "Ops! Não posso falar sobre isso.";
    }

    // 2. Lógica de Sequência (Contexto)
    const anterior = memoriaContexto[idUsuario];
    memoriaContexto[idUsuario] = input;

    if (input === "e você?" || input === "e vc?") {
        if (anterior === "oi" || anterior === "tudo bem") return "Estou muito bem, obrigado por perguntar!";
    }

    // 3. Resposta Fixa
    if (respostasFixas[input]) return respostasFixas[input];

    // 4. Fallback (Aqui entraria sua Markov se quiser)
    return `Você disse: "${texto}". Ainda estou aprendendo a responder frases longas!`;
}

// --- ROTAS DA API ---
app.post('/api/chat', (req, res) => {
    const { mensagem, user } = req.body;
    const resposta = processarResposta(mensagem, user);
    res.json({ resposta });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
