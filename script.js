      // Variáveis do jogo
let playerName = '';
let revenue = 120000;
let reputation = 80;
let clientCount = 200;
let currentScenario = 0;
let selectedICP = '';

// Função auxiliar para formatar o nome do jogador
const formatPlayerName = () => `<b style="color: var(--easyjur-desastre-juridico-secondary-color);">${playerName}</b>`;

// Cenários do jogo por ICP
const scenarios = {
    ICP1: {
        intro: () => `Doutor(a) ${formatPlayerName()}, você faz tudo ao mesmo tempo (peticiona, atende, controla prazos e ainda tenta respirar). Vamos mostrar como isso impacta o seu dia a dia.`,
        questions: [
            {
                text: () => `Doutor(a) ${formatPlayerName()}, você tem um prazo amanhã. Onde está anotado?`,
                options: [
                    {
                        text: "No caderno",
                        consequence: () => `Doutor(a) ${formatPlayerName()}, o caderno ficou na gaveta e você esqueceu o prazo!`,
                        revenueChange: -10000,
                        reputationChange: -10,
                        clientChange: -5
                    },
                    {
                        text: "No WhatsApp",
                        consequence: () => `Doutor(a) ${formatPlayerName()}, a mensagem se perdeu em meio a tantas conversas. Prazo perdido!`,
                        revenueChange: -12000,
                        reputationChange: -15,
                        clientChange: -7
                    },
                    {
                        text: "Na cabeça (mesmo sabendo que pode esquecer)",
                        consequence: () => `Doutor(a) ${formatPlayerName()}, você confiou na memória e... esqueceu completamente!`,
                        revenueChange: -15000,
                        reputationChange: -20,
                        clientChange: -10
                    }
                ]
            },
            {
                text: () => `Doutor(a) ${formatPlayerName()}, como você controla as finanças do escritório hoje?`,
                options: [
                    {
                        text: "Uso planilha simples (ou nenhuma)",
                        consequence: () => `Doutor(a) ${formatPlayerName()}, sem controle, você deixou de cobrar honorários de 3 clientes.`,
                        revenueChange: -8000,
                        reputationChange: -5,
                        clientChange: -3
                    },
                    {
                        text: "Faço anotações soltas ou recebo do contador",
                        consequence: () => `Doutor(a) ${formatPlayerName()}, as anotações se perderam e o contador atrasou. Fluxo de caixa comprometido!`,
                        revenueChange: -10000,
                        reputationChange: -10,
                        clientChange: -5
                    },
                    {
                        text: "Não tenho visibilidade clara",
                        consequence: () => `Doutor(a) ${formatPlayerName()}, sem visibilidade, você não percebeu um rombo financeiro até ser tarde demais.`,
                        revenueChange: -12000,
                        reputationChange: -15,
                        clientChange: -7
                    }
                ]
            },
            {
                text: () => `Doutor(a) ${formatPlayerName()}, sua rotina ideal seria...`,
                options: [
                    {
                        text: "Ter paz para focar só na advocacia",
                        consequence: () => `Doutor(a) ${formatPlayerName()}, sem organização, você continua sobrecarregado e perde tempo com tarefas operacionais.`,
                        revenueChange: -5000,
                        reputationChange: -5,
                        clientChange: -2
                    },
                    {
                        text: "Organizar melhor meus dias",
                        consequence: () => `Doutor(a) ${formatPlayerName()}, sem um sistema, seus dias seguem caóticos e improdutivos.`,
                        revenueChange: -7000,
                        reputationChange: -10,
                        clientChange: -4
                    },
                    {
                        text: "Parar de correr atrás de prejuízos",
                        consequence: () => `Doutor(a) ${formatPlayerName()}, sem processos claros, os prejuízos continuam acumulando.`,
                        revenueChange: -9000,
                        reputationChange: -15,
                        clientChange: -6
                    }
                ]
            },
            {
                text: () => `Doutor(a) ${formatPlayerName()}, quando pensa em implantar um sistema, você sente que...`,
                options: [
                    {
                        text: "Vai ser difícil de usar",
                        consequence: () => `Doutor(a) ${formatPlayerName()}, o medo de um sistema complexo te mantém preso ao caos atual.`,
                        revenueChange: -6000,
                        reputationChange: -5,
                        clientChange: -3
                    },
                    {
                        text: "Não tem tempo pra isso",
                        consequence: () => `Doutor(a) ${formatPlayerName()}, sem investir tempo agora, você continuará perdendo horas no futuro.`,
                        revenueChange: -8000,
                        reputationChange: -10,
                        clientChange: -5
                    },
                    {
                        text: "Já tentou e parou no meio",
                        consequence: () => `Doutor(a) ${formatPlayerName()}, desistir no passado te mantém refém da desorganização atual.`,
                        revenueChange: -10000,
                        reputationChange: -15,
                        clientChange: -7
                    }
                ]
            }
        ],
        conclusion: () => `Doutor(a) ${formatPlayerName()}, seu escritório pequeno e desorganizado está à beira do colapso. <br><br><strong>Ponto Crítico:</strong> A falta de um sistema de gestão faz você perder prazos, clientes e receita, enquanto vive sobrecarregado. Sem mudanças urgentes, seu escritório não sobreviverá por muito tempo.`
    },
    ICP2: {
        intro: () => `Doutor(a) ${formatPlayerName()}, você não está mais sozinho, mas mesmo com uma equipe, sente que há retrabalho, sobrecarga e falta de padrão. Vamos ver como isso afeta seus resultados.`,
        questions: [
            {
                text: () => `Doutor(a) ${formatPlayerName()}, como você acompanha a produtividade da sua equipe?`,
                options: [
                    {
                        text: "Pergunto individualmente",
                        consequence: () => `Doutor(a) ${formatPlayerName()}, esse acompanhamento manual consome seu tempo e não gera dados confiáveis.`,
                        revenueChange: -10000,
                        reputationChange: -10,
                        clientChange: -5
                    },
                    {
                        text: "Recebo relatórios esporádicos",
                        consequence: () => `Doutor(a) ${formatPlayerName()}, relatórios esporádicos deixam lacunas que custam caro.`,
                        revenueChange: -12000,
                        reputationChange: -15,
                        clientChange: -7
                    },
                    {
                        text: "Não tenho um padrão confiável",
                        consequence: () => `Doutor(a) ${formatPlayerName()}, sem padrões, sua equipe trabalha no escuro, comprometendo resultados.`,
                        revenueChange: -15000,
                        reputationChange: -20,
                        clientChange: -10
                    }
                ]
            },
            {
                text: () => `Doutor(a) ${formatPlayerName()}, o que mais atrasa sua operação hoje?`,
                options: [
                    {
                        text: "Falta de padrão entre núcleos",
                        consequence: () => `Doutor(a) ${formatPlayerName()}, sem padronização, cada núcleo opera como um escritório diferente, gerando conflitos.`,
                        revenueChange: -8000,
                        reputationChange: -5,
                        clientChange: -3
                    },
                    {
                        text: "Perda de tempo com atividades repetitivas",
                        consequence: () => `Doutor(a) ${formatPlayerName()}, atividades manuais consomem horas que poderiam ser usadas em estratégias.`,
                        revenueChange: -10000,
                        reputationChange: -10,
                        clientChange: -5
                    },
                    {
                        text: "Dificuldade em delegar",
                        consequence: () => `Doutor(a) ${formatPlayerName()}, sua dificuldade em delegar sobrecarrega você e limita o crescimento.`,
                        revenueChange: -12000,
                        reputationChange: -15,
                        clientChange: -7
                    }
                ]
            },
            {
                text: () => `Doutor(a) ${formatPlayerName()}, você sente que sua equipe está...`,
                options: [
                    {
                        text: "Trabalhando no limite",
                        consequence: () => `Doutor(a) ${formatPlayerName()}, uma equipe sobrecarregada gera erros e insatisfação dos clientes.`,
                        revenueChange: -7000,
                        reputationChange: -10,
                        clientChange: -4
                    },
                    {
                        text: "Perdida em prioridades",
                        consequence: () => `Doutor(a) ${formatPlayerName()}, sem clareza nas prioridades, sua equipe desperdiça esforço em tarefas erradas.`,
                        revenueChange: -9000,
                        reputationChange: -15,
                        clientChange: -6
                    },
                    {
                        text: "Entregando menos do que poderia",
                        consequence: () => `Doutor(a) ${formatPlayerName()}, o potencial da sua equipe está sendo desperdiçado por falta de processos claros.`,
                        revenueChange: -11000,
                        reputationChange: -20,
                        clientChange: -8
                    }
                ]
            },
            {
                text: () => `Doutor(a) ${formatPlayerName()}, quando pensa em melhorar a gestão, você...`,
                options: [
                    {
                        text: "Não sabe por onde começar",
                        consequence: () => `Doutor(a) ${formatPlayerName()}, a paralisia por falta de direção mantém seu escritório estagnado.`,
                        revenueChange: -6000,
                        reputationChange: -5,
                        clientChange: -3
                    },
                    {
                        text: "Enfrenta resistência interna",
                        consequence: () => `Doutor(a) ${formatPlayerName()}, a resistência da equipe trava melhorias que poderiam salvar seu escritório.`,
                        revenueChange: -8000,
                        reputationChange: -10,
                        clientChange: -5
                    },
                    {
                        text: "Já tentou, mas não sustentou",
                        consequence: () => `Doutor(a) ${formatPlayerName()}, tentativas frustradas minam sua confiança em buscar soluções eficazes.`,
                        revenueChange: -10000,
                        reputationChange: -15,
                        clientChange: -7
                    }
                ]
            }
        ],
        conclusion: () => `Doutor(a) ${formatPlayerName()}, sua equipe está sobrecarregada e sem padrões claros, resultando em retrabalho e perdas. <br><br><strong>Ponto Crítico:</strong> A falta de processos estruturados compromete a produtividade e a qualidade do serviço. Sem um sistema de gestão, seu escritório não alcançará seu potencial.`
    },
    ICP3: {
        intro: () => `Doutor(a) ${formatPlayerName()}, seu escritório já tem estrutura e tecnologia, mas ainda há gargalos que comprometem a performance. Vamos explorar os pontos que mais travam sua escala.`,
        questions: [
            {
                text: () => `Doutor(a) ${formatPlayerName()}, como você avalia o ROI por área do seu escritório?`,
                options: [
                    {
                        text: "Tenho dados espalhados em vários sistemas",
                        consequence: () => `Doutor(a) ${formatPlayerName()}, dados fragmentados dificultam decisões estratégicas precisas.`,
                        revenueChange: -15000,
                        reputationChange: -10,
                        clientChange: -5
                    },
                    {
                        text: "Levo dias para consolidar",
                        consequence: () => `Doutor(a) ${formatPlayerName()}, o tempo gasto em consolidação atrasa ações que poderiam maximizar lucros.`,
                        revenueChange: -18000,
                        reputationChange: -15,
                        clientChange: -7
                    },
                    {
                        text: "Ainda não consigo medir",
                        consequence: () => `Doutor(a) ${formatPlayerName()}, sem métricas claras, você perde oportunidades de otimização.`,
                        revenueChange: -20000,
                        reputationChange: -20,
                        clientChange: -10
                    }
                ]
            },
            {
                text: () => `Doutor(a) ${formatPlayerName()}, o que mais gera retrabalho hoje?`,
                options: [
                    {
                        text: "Falta de integração entre sistemas",
                        consequence: () => `Doutor(a) ${formatPlayerName()}, sistemas desconexos criam retrabalho e erros caros.`,
                        revenueChange: -12000,
                        reputationChange: -10,
                        clientChange: -5
                    },
                    {
                        text: "Processos manuais ainda presentes",
                        consequence: () => `Doutor(a) ${formatPlayerName()}, processos manuais consomem tempo e reduzem a eficiência.`,
                        revenueChange: -15000,
                        reputationChange: -15,
                        clientChange: -7
                    },
                    {
                        text: "Equipe ainda depende muito da gestão",
                        consequence: () => `Doutor(a) ${formatPlayerName()}, a dependência da gestão trava a autonomia e a escalabilidade.`,
                        revenueChange: -18000,
                        reputationChange: -20,
                        clientChange: -10
                    }
                ]
            },
            {
                text: () => `Doutor(a) ${formatPlayerName()}, quando precisa tomar uma decisão estratégica, você...`,
                options: [
                    {
                        text: "Fica refém de relatórios parciais",
                        consequence: () => `Doutor(a) ${formatPlayerName()}, relatórios incompletos levam a decisões equivocadas.`,
                        revenueChange: -10000,
                        reputationChange: -10,
                        clientChange: -5
                    },
                    {
                        text: "Leva tempo demais pra cruzar os dados",
                        consequence: () => `Doutor(a) ${formatPlayerName()}, a demora em obter dados claros atrasa ações críticas.`,
                        revenueChange: -12000,
                        reputationChange: -15,
                        clientChange: -7
                    },
                    {
                        text: "Toma decisões com base em 'feeling'",
                        consequence: () => `Doutor(a) ${formatPlayerName()}, confiar no instinto sem dados sólidos é arriscado e custa caro.`,
                        revenueChange: -15000,
                        reputationChange: -20,
                        clientChange: -10
                    }
                ]
            },
            {
                text: () => `Doutor(a) ${formatPlayerName()}, o que te impede de avançar com mais performance?`,
                options: [
                    {
                        text: "Falta de visibilidade em tempo real",
                        consequence: () => `Doutor(a) ${formatPlayerName()}, sem dados em tempo real, você perde oportunidades de otimização imediata.`,
                        revenueChange: -10000,
                        reputationChange: -10,
                        clientChange: -5
                    },
                    {
                        text: "Time operacional sem autonomia suficiente",
                        consequence: () => `Doutor(a) ${formatPlayerName()}, a falta de autonomia trava a escalabilidade do seu time.`,
                        revenueChange: -12000,
                        reputationChange: -15,
                        clientChange: -7
                    },
                    {
                        text: "Processos complexos demais",
                        consequence: () => `Doutor(a) ${formatPlayerName()}, processos complicados reduzem a eficiência e aumentam erros.`,
                        revenueChange: -15000,
                        reputationChange: -20,
                        clientChange: -10
                    }
                ]
            }
        ],
        conclusion: () => `Doutor(a) ${formatPlayerName()}, seu escritório tem potencial, mas gargalos de integração e processos travam sua escala. <br><br><strong>Ponto Crítico:</strong> A falta de visibilidade e autonomia impede que você maximize a performance e alcance resultados consistentes.`
    }
};

// Elementos DOM
const startBtn = document.getElementById('easyjur-desastre-juridico-start-btn');
const nameInput = document.getElementById('easyjur-desastre-juridico-name-input');
const nameError = document.getElementById('easyjur-desastre-juridico-name-error');
const rulesSection = document.querySelector('.easyjur-desastre-juridico-rules');
const popup = document.getElementById('easyjur-desastre-juridico-popup');
const closePopup = document.getElementById('easyjur-desastre-juridico-close');
const formContainer = document.getElementById('easyjur-desastre-juridico-form');
const loader = document.getElementById('easyjur-desastre-juridico-loader');
const countdownElement = document.getElementById('easyjur-desastre-juridico-countdown');
const progressSection = document.getElementById('easyjur-desastre-juridico-progress');
const progressBar = document.getElementById('easyjur-desastre-juridico-progress-bar');
const statsSection = document.getElementById('easyjur-desastre-juridico-stats');
const scenarioContainer = document.getElementById('easyjur-desastre-juridico-scenario-container');
const scenarioText = document.getElementById('easyjur-desastre-juridico-scenario-text');
const optionsContainer = document.getElementById('easyjur-desastre-juridico-options');
const consequenceSection = document.getElementById('easyjur-desastre-juridico-consequence');
const continueBtn = document.getElementById('easyjur-desastre-juridico-continue-btn');
const resultSection = document.getElementById('easyjur-desastre-juridico-result');
const resultText = document.getElementById('easyjur-desastre-juridico-result-text');
const solutionSection = document.getElementById('easyjur-desastre-juridico-solution');

// Validação do input de nome
startBtn.addEventListener('click', () => {
    playerName = nameInput.value.trim();
    if (playerName === '') {
        nameInput.classList.add('error');
        nameError.style.display = 'block';
    } else {
        nameInput.classList.remove('error');
        nameError.style.display = 'none';
        popup.style.display = 'flex';
        closePopup.style.display = 'block';
        if (!hubspotLoaded) {
            loadHubspotForm();
        }
    }
});

// Carregar HubSpot Forms API
let hubspotLoaded = false;
function loadHubspotForm() {
    if (window.hbspt && !hubspotLoaded) {
        hubspotLoaded = true;
        formContainer.innerHTML = ''; // Limpa container antes de criar
        hbspt.forms.create({
            portalId: "44225969",
            formId: "01ccecff-4e3b-4db2-a47f-9fdfb36ca3e2",
            region: "na1",
            target: '#easyjur-desastre-juridico-form',
            css: '',
            errorMessageClass: 'easyjur-desastre-juridico-hs-error',
            onFormReady: function($form) {
                // Estilizar formulário
                const inputs = $form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], select, textarea');
                inputs.forEach(input => {
                    input.style.padding = '12px';
                    input.style.border = `2px solid var(--easyjur-desastre-juridico-accent-color)`;
                    input.style.borderRadius = '8px';
                    input.style.width = '100%';
                    input.style.marginBottom = '15px';
                    input.style.fontFamily = `'Montserrat', sans-serif`;
                    input.style.fontSize = '1rem';
                    input.style.backgroundColor = '#fff';
                    input.style.color = `var(--easyjur-desastre-juridico-primary-color)`;
                    input.style.transition = 'border-color 0.3s';
                    input.addEventListener('focus', () => {
                        input.style.borderColor = `var(--easyjur-desastre-juridico-secondary-color)`;
                    });
                    input.addEventListener('blur', () => {
                        input.style.borderColor = `var(--easyjur-desastre-juridico-accent-color)`;
                    });
                });
                const labels = $form.querySelectorAll('label');
                labels.forEach(label => {
                    label.style.color = `var(--easyjur-desastre-juridico-primary-color)`;
                    label.style.fontSize = '0.9rem';
                    label.style.marginBottom = '5px';
                    label.style.display = 'block';
                });
                const submit = $form.querySelector('input[type="submit"]');
                if (submit) {
                    submit.style.padding = '12px 20px';
                    submit.style.background = `var(--easyjur-desastre-juridico-secondary-color)`;
                    submit.style.color = `var(--easyjur-desastre-juridico-light-color)`;
                    submit.style.border = 'none';
                    submit.style.borderRadius = '8px';
                    submit.style.cursor = 'pointer';
                    submit.style.fontSize = '1rem';
                    submit.style.fontWeight = '600';
                    submit.style.width = '100%';
                    submit.style.transition = 'all 0.3s';
                    submit.addEventListener('mouseover', () => {
                        submit.style.transform = 'translateY(-2px)';
                        submit.style.boxShadow = '0 4px 10px rgba(229, 41, 63, 0.3)';
                    });
                    submit.addEventListener('mouseout', () => {
                        submit.style.transform = 'translateY(0)';
                        submit.style.boxShadow = 'none';
                    });
                }
                // Personalizar mensagens de erro
                const errorContainers = $form.querySelectorAll('.hs-error-msgs');
                errorContainers.forEach(container => {
                    const input = container.closest('.hs-form-field').querySelector('input');
                    const fieldName = input ? input.name : '';
                    let customMessage = '';
                    switch (fieldName) {
                        case 'email':
                            customMessage = `Doutor(a) ${formatPlayerName()}, por favor, insira um e-mail válido.`;
                            break;
                        case 'phone':
                            customMessage = `Doutor(a) ${formatPlayerName()}, por favor, insira um número de telefone válido.`;
                            break;
                        case 'firstname':
                            customMessage = `Doutor(a) ${formatPlayerName()}, por favor, insira seu nome.`;
                            break;
                        default:
                            customMessage = `Doutor(a) ${formatPlayerName()}, este campo é obrigatório.`;
                    }
                    container.querySelectorAll('.hs-error-msg').forEach(msg => {
                        msg.innerHTML = customMessage;
                        msg.classList.add('easyjur-desastre-juridico-hs-error');
                    });
                });
                // Estilizar mensagens de erro
                const errors = $form.querySelectorAll('.easyjur-desastre-juridico-hs-error');
                errors.forEach(error => {
                    error.style.color = `var(--easyjur-desastre-juridico-secondary-color)`;
                    error.style.fontSize = '0.85rem';
                    error.style.marginTop = '5px';
                    error.style.fontFamily = `'Montserrat', sans-serif`;
                });
                // Observar mudanças dinâmicas no formulário
                const observer = new MutationObserver(() => {
                    const newErrors = $form.querySelectorAll('.hs-error-msgs');
                    newErrors.forEach(container => {
                        const input = container.closest('.hs-form-field').querySelector('input');
                        const fieldName = input ? input.name : '';
                        let customMessage = '';
                        switch (fieldName) {
                            case 'email':
                                customMessage = `Doutor(a) ${formatPlayerName()}, por favor, insira um e-mail válido.`;
                                break;
                            case 'phone':
                                customMessage = `Doutor(a) ${formatPlayerName()}, por favor, insira um número de telefone válido.`;
                                break;
                            case 'firstname':
                                customMessage = `Doutor(a) ${formatPlayerName()}, por favor, insira seu nome.`;
                                break;
                            default:
                                customMessage = `Doutor(a) ${formatPlayerName()}, este campo é obrigatório.`;
                        }
                        container.querySelectorAll('.hs-error-msg').forEach(msg => {
                            msg.innerHTML = customMessage;
                            msg.classList.add('easyjur-desastre-juridico-hs-error');
                            msg.style.color = `var(--easyjur-desastre-juridico-secondary-color)`;
                            msg.style.fontSize = '0.85rem';
                            msg.style.marginTop = '5px';
                            msg.style.fontFamily = `'Montserrat', sans-serif`;
                        });
                    });
                });
                observer.observe($form, { childList: true, subtree: true });
            },
            onFormSubmitted: function($form) {
                formContainer.style.display = 'none';
                closePopup.style.display = 'none'; // Remove o botão de fechar durante o loader
                loader.style.display = 'flex';
                let countdown = 10;
                countdownElement.textContent = countdown;
                const interval = setInterval(() => {
                    countdown--;
                    countdownElement.textContent = countdown;
                    if (countdown <= 0) {
                        clearInterval(interval);
                        popup.style.display = 'none';
                        startGame();
                    }
                }, 1000);
            }
        });
    } else if (!window.hbspt) {
        setTimeout(loadHubspotForm, 100);
    }
}

// Fechar popup
closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Iniciar o jogo
function startGame() {
    rulesSection.style.display = 'none'; // Esconde a seção com o botão
    progressSection.style.display = 'block';
    statsSection.style.display = 'grid';
    scenarioContainer.style.display = 'block';
    updateStats();
    showScenario();
}

// Mostrar pergunta de segmentação
function showSegmentationQuestion() {
    scenarioText.innerHTML = `Doutor(a) ${formatPlayerName()}, qual é o seu perfil?`;
    optionsContainer.innerHTML = '';
    const icpOptions = [
        { text: "Escritório pequeno e desorganizado", icp: 'ICP1' },
        { text: "Tenho equipe e processos em andamento", icp: 'ICP2' },
        { text: "Sou gestor buscando mais performance e previsibilidade", icp: 'ICP3' }
    ];
    icpOptions.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'easyjur-desastre-juridico-option';
        button.innerHTML = option.text;
        button.addEventListener('click', () => {
            selectedICP = option.icp;
            currentScenario = 0;
            updateProgress();
            showScenario();
        });
        optionsContainer.appendChild(button);
    });
    consequenceSection.style.display = 'none';
    continueBtn.style.display = 'none';
}

// Mostrar cenário
function showScenario() {
    if (!selectedICP) {
        showSegmentationQuestion();
        return;
    }
    const icpScenarios = scenarios[selectedICP];
    if (currentScenario === 0) {
        scenarioText.innerHTML = icpScenarios.intro();
        optionsContainer.innerHTML = '';
        const button = document.createElement('button');
        button.className = 'easyjur-desastre-juridico-option';
        button.innerHTML = 'Continuar';
        button.addEventListener('click', () => {
            currentScenario++;
            updateProgress();
            showScenario();
        });
        optionsContainer.appendChild(button);
        consequenceSection.style.display = 'none';
        continueBtn.style.display = 'none';
        return;
    }

    if (currentScenario > icpScenarios.questions.length) {
        endGame();
        return;
    }

    const scenario = icpScenarios.questions[currentScenario - 1];
    scenarioText.innerHTML = scenario.text();
    optionsContainer.innerHTML = '';
    scenario.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'easyjur-desastre-juridico-option';
        button.innerHTML = option.text;
        button.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(button);
    });
    consequenceSection.style.display = 'none';
    continueBtn.style.display = 'none';
}

// Selecionar opção
function selectOption(optionIndex) {
    const scenario = scenarios[selectedICP].questions[currentScenario - 1];
    const option = scenario.options[optionIndex];

    // Aplicar consequências
    revenue += option.revenueChange;
    if (revenue < 0) revenue = 0;
    reputation += option.reputationChange;
    if (reputation < 0) reputation = 0;
    clientCount += option.clientChange;
    if (clientCount < 0) clientCount = 0;

    updateStats();

    // Mostrar consequência
    consequenceSection.innerHTML = `<p>${option.consequence()}</p>`;
    consequenceSection.style.display = 'block';

    // Desabilitar opções
    const buttons = optionsContainer.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = true;
        button.style.opacity = '0.6';
    });

    // Mostrar botão Continuar
    continueBtn.style.display = 'block';
    continueBtn.onclick = () => {
        currentScenario++;
        updateProgress();
        showScenario();
    };
}

// Atualizar estatísticas
function updateStats() {
    document.getElementById('easyjur-desastre-juridico-revenue').textContent = `R$ ${revenue.toLocaleString('pt-BR')}`;
    document.getElementById('easyjur-desastre-juridico-reputation').textContent = `${reputation}%`;
    document.getElementById('easyjur-desastre-juridico-client-count').textContent = clientCount;
}

// Atualizar barra de progresso
function updateProgress() {
    const totalScenarios = scenarios[selectedICP].questions.length + 1; // Inclui intro
    const progress = (currentScenario / totalScenarios) * 100;
    progressBar.style.width = `${progress}%`;
}

// Finalizar o jogo
function endGame() {
    scenarioContainer.style.display = 'none';
    resultSection.style.display = 'block';
    const icpScenarios = scenarios[selectedICP];
    let resultMessage = icpScenarios.conclusion();
    resultMessage += `<br><br>• Receita final: R$ ${revenue.toLocaleString('pt-BR')} (perdeu R$ ${Math.max(0, 120000 - revenue).toLocaleString('pt-BR')})`;
    resultMessage += `<br>• Reputação final: ${reputation}% (queda de ${Math.max(0, 80 - reputation)} pontos)`;
    resultMessage += `<br>• Clientes restantes: ${clientCount} (perdeu ${Math.max(0, 200 - clientCount)})`;
    resultText.innerHTML = resultMessage;

    // Mostrar solução após 3 segundos
    setTimeout(() => {
        solutionSection.style.display = 'block';
        solutionSection.querySelector('h3').innerHTML = `Existe uma solução para evitar esses desastres, ${formatPlayerName()}! 🛱`;
    }, 3000);
}

// Solução EasyJur
solutionSection.querySelector('button').addEventListener('click', () => {
    alert(`${playerName}, o EasyJur pode transformar sua prática jurídica com:\n\n` +
          `• Controle automático de prazos ⏖\n` +
          `• Organização inteligente de documentos 📂\n` +
          `• Gestão de clientes 👥\n` +
          `• Cobrança automática de honorários 💰\n` +
          `• Comunicação digitalizada com clientes 📲\n` +
          `• Relatórios visuais do escritório 📊\n\n` +
          `Visite nosso site para uma demonstração gratuita!`);
});