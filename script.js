// Variáveis do jogo
        let playerName = '';
        let revenue = 25000;
        let reputation = 80;
        let clientCount = 0;
        let currentScenario = 0;

        // Cenários do jogo - agora com mais consequências para clientes
        const scenarios = [
            {
                text: `📅 <b>${playerName}</b>, você tem 7 prazos processuais importantes esta semana em casos diferentes. Como vai organizar tudo?`,
                options: [
                    {
                        text: "🗒️ Confiar na memória e anotar alguns no bloco de notas",
                        consequence: `<b>${playerName}</b>, você esqueceu um prazo crucial! O cliente processou você por negligência profissional.`,
                        revenueChange: -7000,
                        reputationChange: -20,
                        clientChange: -2
                    },
                    {
                        text: "📅 Usar a agenda física que já está cheia de compromissos",
                        consequence: `Doutor(a) <b>${playerName}</b>, a agenda ficou ilegível e você perdeu 3 prazos importantes.`,
                        revenueChange: -5000,
                        reputationChange: -15,
                        clientChange: -1
                    },
                    {
                        text: "👩‍💼 Pedir para sua secretária controlar (ela já está sobrecarregada)",
                        consequence: `Advogado(a) <b>${playerName}</b>, ela se confundiu com tantas tarefas e você perdeu um prazo chave em um caso grande.`,
                        revenueChange: -8000,
                        reputationChange: -25,
                        clientChange: -3
                    }
                ]
            },
            {
                text: `📞 <b>${playerName}</b>, o cliente <i>Silva & Associados</i> está furioso porque não recebeu atualizações sobre o caso deles há 3 semanas. O que você faz?`,
                options: [
                    {
                        text: "🤞 Prometer que vai atualizá-lo em breve (sem sistema de acompanhamento)",
                        consequence: `Doutor(a) <b>${playerName}</b>, você esqueceu novamente. O cliente rescindiu o contrato e falou mal para outros 5 clientes em potencial.`,
                        revenueChange: -10000,
                        reputationChange: -30,
                        clientChange: -4
                    },
                    {
                        text: "📧 Passar 6 horas revirando e-mails e documentos para achar o status",
                        consequence: `Advogado(a) <b>${playerName}</b>, você perdeu um dia inteiro de trabalho produtivo e ainda assim não conseguiu todas as informações corretas.`,
                        revenueChange: -3000,
                        reputationChange: -10,
                        clientChange: -1
                    },
                    {
                        text: "🤷‍♂️ Improvisar uma resposta genérica sem conferir os detalhes",
                        consequence: `<b>${playerName}</b>, o cliente percebeu que você não estava por dentro do caso e ficou ainda mais irritado, pedindo para retirar o processo.`,
                        revenueChange: -6000,
                        reputationChange: -20,
                        clientChange: -2
                    }
                ]
            },
            {
                text: `💰 <b>${playerName}</b>, é final do mês e você precisa enviar os honorários para 15 clientes. Como vai controlar os pagamentos?`,
                options: [
                    {
                        text: "📊 Usar uma planilha do Excel desatualizada",
                        consequence: `Doutor(a) <b>${playerName}</b>, você esqueceu de cobrar 5 clientes e enviou valores errados para outros 3, tendo que devolver dinheiro depois.`,
                        revenueChange: -12000,
                        reputationChange: -25,
                        clientChange: -3
                    },
                    {
                        text: "🟨 Anotar em post-its e depois tentar organizar",
                        consequence: `Advogado(a) <b>${playerName}</b>, os post-its se perderam e você não cobrou ninguém este mês. O fluxo de caixa está crítico!`,
                        revenueChange: -15000,
                        reputationChange: -30,
                        clientChange: -5
                    },
                    {
                        text: "🧑‍🎓 Pedir para o estagiário controlar (ele nunca fez isso antes)",
                        consequence: `<b>${playerName}</b>, ele cometeu vários erros graves e você teve que devolver honorários para 4 clientes insatisfeitos.`,
                        revenueChange: -9000,
                        reputationChange: -20,
                        clientChange: -2
                    }
                ]
            },
            {
                text: `📂 <b>${playerName}</b>, você precisa preparar uma petição urgente para amanhã, mas não encontra os documentos do caso. O que faz?`,
                options: [
                    {
                        text: "🗃️ Procurar em pilhas de papéis na sua mesa (que já estão lá há meses)",
                        consequence: `Doutor(a) <b>${playerName}</b>, você perdeu a noite toda procurando e ainda assim entregou a petição incompleta e com atraso.`,
                        revenueChange: -5000,
                        reputationChange: -15,
                        clientChange: -1
                    },
                    {
                        text: "🙏 Pedir cópias ao cliente novamente (pela 3ª vez)",
                        consequence: `Advogado(a) <b>${playerName}</b>, o cliente ficou furioso com sua desorganização e rescindiu o contrato na hora.`,
                        revenueChange: -8000,
                        reputationChange: -25,
                        clientChange: -3
                    },
                    {
                        text: "🧠 Tentar reconstruir os documentos de memória",
                        consequence: `<b>${playerName}</b>, você cometeu erros graves nos documentos e prejudicou irremediavelmente o caso do cliente.`,
                        revenueChange: -10000,
                        reputationChange: -35,
                        clientChange: -4
                    }
                ]
            },
            {
                text: `👥 <b>${playerName}</b>, seu escritório está crescendo! Agora tem 3 advogados associados. Como vai coordenar a equipe sem um sistema?`,
                options: [
                    {
                        text: "💬 Fazer reuniões diárias de 2 horas com todos",
                        consequence: `Doutor(a) <b>${playerName}</b>, ninguém tem tempo para trabalhar de verdade. Produtividade caiu 60% e os clientes estão reclamando.`,
                        revenueChange: -10000,
                        reputationChange: -20,
                        clientChange: -3
                    },
                    {
                        text: "📱 Usar 5 apps diferentes (WhatsApp, e-mail, Slack, etc)",
                        consequence: `Advogado(a) <b>${playerName}</b>, as informações se perderam entre tantos apps. Dois casos foram prejudicados por falta de comunicação.`,
                        revenueChange: -12000,
                        reputationChange: -25,
                        clientChange: -4
                    },
                    {
                        text: "🤯 Deixar cada um fazer do seu jeito",
                        consequence: `<b>${playerName}</b>, caos total! Clientes recebendo informações conflitantes de diferentes advogados do mesmo escritório.`,
                        revenueChange: -15000,
                        reputationChange: -40,
                        clientChange: -6
                    }
                ]
            }
        ];

        // Elementos DOM
        const startSection = document.getElementById('easyjur-desastre-juridico-start');
        const progressSection = document.getElementById('easyjur-desastre-juridico-progress');
        const progressBar = document.getElementById('easyjur-desastre-juridico-progress-bar');
        const statsSection = document.getElementById('easyjur-desastre-juridico-stats');
        const scenarioContainer = document.getElementById('easyjur-desastre-juridico-scenario-container');
        const scenarioText = document.getElementById('easyjur-desastre-juridico-scenario-text');
        const optionsContainer = document.getElementById('easyjur-desastre-juridico-options');
        const consequenceSection = document.getElementById('easyjur-desastre-juridico-consequence');
        const resultSection = document.getElementById('easyjur-desastre-juridico-result');
        const resultText = document.getElementById('easyjur-desastre-juridico-result-text');
        const solutionSection = document.getElementById('easyjur-desastre-juridico-solution');
        const revenueElement = document.getElementById('easyjur-desastre-juridico-revenue');
        const reputationElement = document.getElementById('easyjur-desastre-juridico-reputation');
        const clientCountElement = document.getElementById('easyjur-desastre-juridico-client-count');

        // Iniciar jogo
        document.getElementById('easyjur-desastre-juridico-start-btn').addEventListener('click', function() {
            playerName = document.getElementById('easyjur-desastre-juridico-name').value.trim();
            clientCount = parseInt(document.getElementById('easyjur-desastre-juridico-clients').value) || 10;
            
            if (!playerName) {
                alert("Por favor, insira seu nome para personalizarmos a experiência.");
                return;
            }
            
            if (clientCount < 1) {
                alert("Por favor, insira um número válido de clientes (pelo menos 1).");
                return;
            }

            startSection.style.display = 'none';
            progressSection.style.display = 'block';
            statsSection.style.display = 'grid';
            scenarioContainer.style.display = 'block';
            
            updateStats();
            updateProgress();
            showScenario();
        });

        // Mostrar cenário
        function showScenario() {
            if (currentScenario >= scenarios.length) {
                endGame();
                return;
            }

            const scenario = scenarios[currentScenario];
            scenarioText.innerHTML = scenario.text.replace(/\${playerName}/g, playerName);
            
            optionsContainer.innerHTML = '';
            scenario.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.className = 'easyjur-desastre-juridico-option';
                button.innerHTML = option.text;
                button.addEventListener('click', () => selectOption(index));
                optionsContainer.appendChild(button);
            });

            consequenceSection.style.display = 'none';
        }

        // Selecionar opção
        function selectOption(optionIndex) {
            const scenario = scenarios[currentScenario];
            const option = scenario.options[optionIndex];
            
            // Aplicar consequências
            revenue += option.revenueChange;
            if (revenue < 0) revenue = 0;
            
            reputation += option.reputationChange;
            if (reputation < 0) reputation = 0;
            
            if (option.clientChange) {
                clientCount += option.clientChange;
                if (clientCount < 0) clientCount = 0;
            }
            
            updateStats();
            
            // Mostrar consequência com o nome do usuário
            consequenceSection.innerHTML = `<p>${option.consequence.replace(/\${playerName}/g, playerName)}</p>`;
            consequenceSection.style.display = 'block';
            
            // Desabilitar opções
            const buttons = optionsContainer.querySelectorAll('button');
            buttons.forEach(button => {
                button.disabled = true;
                button.style.opacity = '0.6';
            });
            
            // Próximo cenário após 3 segundos
            setTimeout(() => {
                currentScenario++;
                updateProgress();
                showScenario();
            }, 3000);
        }

        // Atualizar estatísticas
        function updateStats() {
            revenueElement.textContent = `R$ ${revenue.toLocaleString('pt-BR')}`;
            reputationElement.textContent = `${reputation}%`;
            clientCountElement.textContent = clientCount;
        }

        // Atualizar barra de progresso
        function updateProgress() {
            const progress = (currentScenario / scenarios.length) * 100;
            progressBar.style.width = `${progress}%`;
        }

        // Finalizar jogo
        function endGame() {
            scenarioContainer.style.display = 'none';
            resultSection.style.display = 'block';
            
            let resultMessage = '';
            let emoji = '';
            
            if (revenue <= 5000 || reputation <= 20 || clientCount <= 2) {
                emoji = '😱';
                resultMessage = `<b>${playerName}</b>, seu escritório está em situação crítica! Sem organização, você:`;
                resultMessage += `<br><br>• Perdeu R$ ${(25000 - revenue).toLocaleString('pt-BR')} em receita potencial`;
                resultMessage += `<br>• Sua reputação caiu ${80 - reputation} pontos percentuais`;
                resultMessage += `<br>• Perdeu ${parseInt(document.getElementById('easyjur-desastre-juridico-clients').value) - clientCount} clientes`;
                resultMessage += `<br><br>Se continuar assim, seu escritório não sobreviverá por muito tempo.`;
            } else if (revenue <= 15000 || reputation <= 40 || clientCount <= 5) {
                emoji = '😨';
                resultMessage = `Doutor(a) <b>${playerName}</b>, você está em apuros! Seu desempenho:`;
                resultMessage += `<br><br>• Receita final: R$ ${revenue.toLocaleString('pt-BR')} (perdeu R$ ${(25000 - revenue).toLocaleString('pt-BR')})`;
                resultMessage += `<br>• Reputação final: ${reputation}% (queda de ${80 - reputation} pontos)`;
                resultMessage += `<br>• Clientes restantes: ${clientCount} (perdeu ${parseInt(document.getElementById('easyjur-desastre-juridico-clients').value) - clientCount})`;
                resultMessage += `<br><br>Você precisa urgentemente melhorar sua gestão!`;
            } else {
                emoji = '😅';
                resultMessage = `Advogado(a) <b>${playerName}</b>, você sobreviveu, mas a que custo?`;
                resultMessage += `<br><br>• Você deixou de ganhar R$ ${(25000 - revenue).toLocaleString('pt-BR')}`;
                resultMessage += `<br>• Sua reputação caiu ${80 - reputation} pontos`;
                resultMessage += `<br>• Perdeu ${parseInt(document.getElementById('easyjur-desastre-juridico-clients').value) - clientCount} clientes`;
                resultMessage += `<br><br>Imagine como seria se você tivesse evitado esses problemas...`;
            }
            
            resultText.innerHTML = `${emoji} ${resultMessage}`;
            
            // Mostrar solução após 3 segundos
            setTimeout(() => {
                solutionSection.style.display = 'block';
                solutionSection.querySelector('h3').innerHTML = `Doutor(a) <b>${playerName}</b>, existe uma solução para evitar esses desastres! 🛡️`;
            }, 3000);
        }

        // Solução EasyJur
        solutionSection.querySelector('button').addEventListener('click', function() {
            alert(`${playerName}, o EasyJur pode transformar sua prática jurídica com:\n\n` +
                  `• Controle automático de prazos ⏰\n` +
                  `• Organização inteligente de documentos 📂\n` +
                  `• Gestão completa de clientes 👥\n` +
                  `• Cobrança automática de honorários 💰\n` +
                  `• Comunicação integrada com clientes 📲\n` +
                  `• Relatórios detalhados do escritório 📊\n\n` +
                  `Visite nosso site para uma demonstração gratuita!`);
        });