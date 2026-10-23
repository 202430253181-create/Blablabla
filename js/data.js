/**
 * BlablablaAbel — conteúdo pedagógico
 * Estrutura: níveis → trilhas (nível + matéria) → aulas → questões
 */
(function () {
  'use strict';

  const levels = [
    {
      id: 'fundamental-1',
      short: 'F1',
      name: 'Fundamental 1',
      range: '1º ao 5º ano',
      description: 'A base da leitura, da escrita e dos primeiros cálculos.',
      accent: 'sun',
      icon: 'sparkles'
    },
    {
      id: 'fundamental-2',
      short: 'F2',
      name: 'Fundamental 2',
      range: '6º ao 9º ano',
      description: 'Mais autonomia para interpretar, argumentar e resolver.',
      accent: 'sky',
      icon: 'book-open'
    },
    {
      id: 'ensino-medio',
      short: 'EM',
      name: 'Ensino Médio',
      range: '1ª à 3ª série',
      description: 'Conteúdo aprofundado para mandar bem na escola.',
      accent: 'cream',
      icon: 'graduation-cap'
    },
    {
      id: 'enem',
      short: 'EN',
      name: 'ENEM',
      range: 'Prova nacional',
      description: 'Estratégia, repertório e as competências que mais caem.',
      accent: 'blue',
      icon: 'target'
    },
    {
      id: 'concurso',
      short: 'CO',
      name: 'Concurso',
      range: 'Concursos públicos',
      description: 'Norma culta, raciocínio lógico e resolução sob pressão.',
      accent: 'lemon',
      icon: 'medal'
    }
  ];

  const subjects = [
    {
      id: 'portugues',
      name: 'Português',
      short: 'PT',
      icon: 'book-open',
      description: 'Leitura, escrita e gramática',
      accent: 'blue',
      tone: 'blue'
    },
    {
      id: 'matematica',
      name: 'Matemática',
      short: 'MA',
      icon: 'calculator',
      description: 'Números, lógica e resolução',
      accent: 'yellow',
      tone: 'yellow'
    }
  ];

  const q = (prompt, alternatives, answer, explanation) => ({ prompt, alternatives, answer, explanation });

  const lesson = (id, title, minutes, intro, sections, tip, questions) => ({
    id,
    title,
    minutes,
    xp: Math.max(20, Math.round(minutes * 2)),
    intro,
    sections,
    tip,
    questions
  });

  const trails = [
    /* ───────────────────────── FUNDAMENTAL 1 · PORTUGUÊS ───────────────────────── */
    {
      id: 'f1-portugues',
      levelId: 'fundamental-1',
      subjectId: 'portugues',
      title: 'Primeiros passos na leitura',
      description: 'Sílabas, ortografia e histórias para ler com mais confiança.',
      lessons: [
        lesson(
          'f1-pt-l1',
          'Sílabas e formação de palavras',
          8,
          'Toda palavra é feita de pedacinhos sonoros. Quando aprendemos a ouvir e separar esses pedaços, ler e escrever fica muito mais fácil.',
          [
            {
              title: 'O que é uma sílaba?',
              text: 'A sílaba é cada “batida” de voz que pronunciamos ao falar uma palavra. Em bo-la, temos duas sílabas: bo e la. Em ca-sa, também temos duas.',
              example: 'bo – bo – le – ta  →  bo/bo/le/ta (4 sílabas)'
            },
            {
              title: 'Vogais e consoantes',
              text: 'As vogais são a, e, i, o, u. Toda sílaba precisa de pelo menos uma vogal. As consoantes são as outras letras e geralmente acompanham as vogais.'
            },
            {
              title: 'Separando com cuidado',
              text: 'Dígrafos como ch, lh, nh, rr e ss ficam juntos na separação: bi-cha-no, fi-lho, car-ro, pas-so. Já encontros como gu e qu também costumam ficar juntos.'
            }
          ],
          'Bata palmas para cada sílaba. O corpo ajuda o ouvido a perceber o ritmo das palavras!',
          [
            q(
              'Quantas sílabas tem a palavra “borboleta”?',
              ['2 sílabas', '3 sílabas', '4 sílabas', '5 sílabas'],
              2,
              'Bo – bor – bo – le – ta? Não! A separação correta é bor/bo/le/ta, com 4 sílabas.'
            ),
            q(
              'Qual palavra está separada corretamente?',
              ['ca-sa', 'ca-s-a', 'cas-a', 'c-asa'],
              0,
              'A separação correta é ca-sa. Cada sílaba tem uma vogal.'
            )
          ]
        ),
        lesson(
          'f1-pt-l2',
          'Ortografia divertida: R, RR, S e SS',
          9,
          'Algumas letras mudam de som dependendo da companhia. Conhecer as regras de R/RR, S/SS e M antes de P e B evita muitas dúvidas na escrita.',
          [
            {
              title: 'R ou RR?',
              text: 'Usamos RR entre duas vogais quando o som é forte e seco, como em carro, cachorro e terra. Com um R só entre vogais, o som é suave: caro, careca, arara.',
              example: 'carro (som forte) • caro (som suave)'
            },
            {
              title: 'S ou SS?',
              text: 'O SS aparece entre vogais para manter o som de S: pássaro, classe, missa. Também usamos S no início ou depois de consoante: sapo, pasta.'
            },
            {
              title: 'M antes de P e B',
              text: 'Antes de P ou B, escrevemos M, e não N: campo, bomba, tempo, também. É uma regra simples que resolve muita coisa.'
            }
          ],
          'Leia a palavra em voz alta. Se o som do R for forte entre vogais, provavelmente ele é RR.',
          [
            q(
              'Em qual palavra usamos RR?',
              ['cachorro', 'mesa', 'bola', 'janela'],
              0,
              'Cachorro tem o som forte de R entre vogais e é escrito com RR.'
            ),
            q(
              'Complete corretamente: “O menino ___ a bola.”',
              ['chutou', 'xutou', 'chutol', 'chuto'],
              0,
              'A forma correta é “chutou”. Usamos CH no início dessa palavra.'
            )
          ]
        ),
        lesson(
          'f1-pt-l3',
          'Leitura e interpretação de fábulas',
          10,
          'Fábulas são histórias curtas com animais como personagens e sempre trazem um ensinamento. Ler com atenção nos ajuda a descobrir a ideia principal.',
          [
            {
              title: 'A raposa e as uvas',
              text: 'Uma raposa faminta viu um cacho de uvas pendurado bem alto. Tentou pular várias vezes, mas não conseguiu alcançar. Cansada, disse: “Essas uvas estão verdes mesmo!” e foi embora.',
              example: 'Moral: muitas vezes desprezamos aquilo que não conseguimos conquistar.'
            },
            {
              title: 'Encontrando a ideia principal',
              text: 'A ideia principal é o assunto mais importante do texto. Para descobri-la, pergunte: do que a história trata? O que aconteceu de mais importante?'
            },
            {
              title: 'Lendo nas entrelinhas',
              text: 'Interpretar é ir além das palavras escritas. Não está escrito que a raposa ficou com vergonha, mas podemos imaginar isso pela atitude dela.'
            }
          ],
          'Ao terminar de ler, conte a história para alguém em três frases. Se conseguir, você entendeu o essencial!',
          [
            q(
              'Qual é a lição da fábula “A raposa e as uvas”?',
              ['As uvas estavam realmente verdes.', 'Devemos aceitar com humildade o que não conseguimos.', 'Raposas não gostam de frutas.', 'É fácil pular alto.'],
              1,
              'A raposa desprezou as uvas porque não conseguiu alcançá-las. A moral fala sobre aceitar limites com humildade.'
            ),
            q(
              'Quem é a personagem principal da história?',
              ['O cacho de uvas', 'A raposa', 'O fazendeiro', 'Um pássaro'],
              1,
              'A raposa é quem age e vive o conflito da história.'
            )
          ]
        )
      ],
      challenge: [
        q(
          'Qual das palavras abaixo tem 3 sílabas?',
          ['sol', 'janela', 'escola', 'mar'],
          2,
          'Es/co/la tem 3 sílabas.'
        ),
        q(
          'Assinale a frase escrita sem erro de ortografia.',
          ['O cachorro latiu no quintal.', 'O cachoro latiu no quintal.', 'O cachorro latiu no quintau.', 'O caxorro latiu no quintal.'],
          0,
          '“Cachorro” é escrito com RR e “quintal” com QU.'
        )
      ]
    },

    /* ───────────────────────── FUNDAMENTAL 1 · MATEMÁTICA ───────────────────────── */
    {
      id: 'f1-matematica',
      levelId: 'fundamental-1',
      subjectId: 'matematica',
      title: 'Números do dia a dia',
      description: 'Adição, multiplicação, formas e medidas com exemplos do cotidiano.',
      lessons: [
        lesson(
          'f1-ma-l1',
          'Números e operações',
          8,
          'Os números estão em todo lugar: no preço do lanche, na idade, no número da casa. Vamos usar adição e subtração para resolver situações simples.',
          [
            {
              title: 'Valor de cada algarismo',
              text: 'No número 348, o 3 vale 300, o 4 vale 40 e o 8 vale 8. Isso acontece porque cada posição tem um valor: centena, dezena e unidade.'
            },
            {
              title: 'Adição sem susto',
              text: 'Para somar 27 + 15, juntamos as unidades (7 + 5 = 12), escrevemos 2 e levamos 1 dezena. Depois somamos as dezenas: 2 + 1 + 1 = 4. Resultado: 42.',
              example: '27 + 15 = 42'
            },
            {
              title: 'Subtração com troca',
              text: 'Em 52 − 18, não conseguimos tirar 8 de 2. Trocamos 1 dezena por 10 unidades: 12 − 8 = 4. Aí sobram 4 dezenas menos 1: 3. Resultado: 34.'
            }
          ],
          'Use desenhos ou palitos para representar dezenas e unidades. Ver a conta ajuda a entender!',
          [
            q(
              'Quanto é 27 + 15?',
              ['32', '42', '43', '52'],
              1,
              '27 + 15 = 42. Some primeiro 27 + 10 = 37 e depois 37 + 5 = 42.'
            ),
            q(
              'No número 348, qual algarismo ocupa a casa das dezenas?',
              ['3', '4', '8', '34'],
              1,
              'O 4 está na casa das dezenas e representa 40.'
            )
          ]
        ),
        lesson(
          'f1-ma-l2',
          'Multiplicação e divisão',
          9,
          'Multiplicar é somar quantidades iguais várias vezes. Dividir é repartir em partes iguais. As duas ideias caminham juntas.',
          [
            {
              title: 'Multiplicação é soma repetida',
              text: '3 × 4 significa 3 grupos de 4: 4 + 4 + 4 = 12. Também pode ser 4 grupos de 3. A ordem não muda o resultado.',
              example: '3 × 4 = 4 × 3 = 12'
            },
            {
              title: 'A tabuada como atalho',
              text: 'Saber a tabuada economiza tempo. Se você esquece 6 × 7, pode pensar em 6 × 5 = 30 e somar mais 6 + 6 = 12. Total: 42.'
            },
            {
              title: 'Divisão é repartir',
              text: '12 balas para 3 crianças: 12 ÷ 3 = 4 balas para cada uma. A divisão também responde “quantas vezes 3 cabe em 12?”.'
            }
          ],
          'Procure situações reais: caixas de ovos, rodas de bicicleta, fileiras de cadeiras. Matemática fica concreta!',
          [
            q(
              'Quanto é 4 × 6?',
              ['10', '20', '24', '28'],
              2,
              '4 × 6 = 24. Também poderia ser 6 + 6 + 6 + 6.'
            ),
            q(
              'Se 12 balas são divididas igualmente entre 3 crianças, cada uma recebe:',
              ['3 balas', '4 balas', '5 balas', '6 balas'],
              1,
              '12 ÷ 3 = 4. Cada criança recebe 4 balas.'
            )
          ]
        ),
        lesson(
          'f1-ma-l3',
          'Formas, medidas e perímetro',
          9,
          'As formas geométricas aparecem nas placas, janelas e embalagens. Medir e comparar ajuda a entender o mundo ao redor.',
          [
            {
              title: 'Formas planas',
              text: 'O quadrado tem 4 lados iguais. O retângulo tem 4 lados, mas só os opostos são iguais. O triângulo tem 3 lados e o círculo não tem lados retos.'
            },
            {
              title: 'Perímetro é a volta',
              text: 'Perímetro é a soma de todos os lados de uma figura. Um quadrado de lado 5 cm tem perímetro 5 + 5 + 5 + 5 = 20 cm.'
            },
            {
              title: 'Medindo o mundo',
              text: 'Usamos centímetro e metro para comprimento, grama e quilo para massa, e litro para líquidos. Escolher a unidade certa faz parte da resposta.'
            }
          ],
          'Use uma régua para medir objetos da sua mesa e calcule o perímetro de um livro. Anote as medidas!',
          [
            q(
              'Qual é o perímetro de um quadrado com lados de 5 cm?',
              ['10 cm', '15 cm', '20 cm', '25 cm'],
              2,
              'Como o quadrado tem 4 lados iguais: 5 + 5 + 5 + 5 = 20 cm.'
            ),
            q(
              'Qual unidade é mais adequada para medir a massa de uma maçã?',
              ['Metro', 'Litro', 'Grama', 'Hora'],
              2,
              'Massa é medida em gramas ou quilos. Uma maçã tem massa de aproximadamente 150 gramas.'
            )
          ]
        )
      ],
      challenge: [
        q(
          'Uma caixa tem 6 fileiras com 4 ovos cada. Quantos ovos há na caixa?',
          ['10', '18', '24', '30'],
          2,
          '6 × 4 = 24 ovos.'
        ),
        q(
          'João tinha 50 figurinhas e deu 18 para um amigo. Com quantas ficou?',
          ['22', '32', '38', '42'],
          1,
          '50 − 18 = 32 figurinhas.'
        )
      ]
    },

    /* ───────────────────────── FUNDAMENTAL 2 · PORTUGUÊS ───────────────────────── */
    {
      id: 'f2-portugues',
      levelId: 'fundamental-2',
      subjectId: 'portugues',
      title: 'Palavras em ação',
      description: 'Classes de palavras, interpretação e uma escrita mais clara.',
      lessons: [
        lesson(
          'f2-pt-l1',
          'Classes de palavras',
          10,
          'Cada palavra tem uma função dentro da frase. Reconhecer substantivos, adjetivos, verbos e pronomes ajuda a escrever com mais precisão.',
          [
            {
              title: 'Substantivo: o nome das coisas',
              text: 'Substantivo nomeia seres, lugares, sentimentos e objetos: menina, escola, saudade, caderno. Pode ser próprio (Brasil) ou comum (cidade).'
            },
            {
              title: 'Adjetivo: a característica',
              text: 'O adjetivo descreve o substantivo. Em “a menina gentil”, gentil é o adjetivo que caracteriza a menina.',
              example: 'casa amarela • livro interessante • dia chuvoso'
            },
            {
              title: 'Verbo: a ação ou estado',
              text: 'O verbo indica ação, estado ou fenômeno: correr, ser, chover. Ele muda conforme tempo, pessoa e número: eu estudo, nós estudamos, ele estudou.'
            }
          ],
          'Uma dica: se a palavra pode vir depois de “o/a” e nomeia algo, provavelmente é substantivo.',
          [
            q(
              'Em “A menina gentil brinca no jardim”, qual palavra é o adjetivo?',
              ['menina', 'gentil', 'brinca', 'jardim'],
              1,
              'Gentil caracteriza a menina, portanto é adjetivo.'
            ),
            q(
              'Qual palavra é um verbo?',
              ['correr', 'rápido', 'cidade', 'felicidade'],
              0,
              'Correr indica ação, então é verbo.'
            )
          ]
        ),
        lesson(
          'f2-pt-l2',
          'Interpretação: ideia central e inferência',
          12,
          'Ler bem não é decorar o texto. É identificar a mensagem principal e perceber informações que o autor sugere, mesmo sem escrever diretamente.',
          [
            {
              title: 'Ideia central',
              text: 'A ideia central é o ponto principal do texto. Ela costuma aparecer no início ou pode ser construída ao longo dos parágrafos. Pergunte: “se eu tivesse que resumir em uma frase, qual seria?”.'
            },
            {
              title: 'Inferência',
              text: 'Inferir é concluir algo a partir das pistas do texto. Se uma personagem pega o guarda-chuva antes de sair, podemos inferir que provavelmente vai chover.'
            },
            {
              title: 'Pistas de contexto',
              text: 'Palavras desconhecidas podem ser entendidas pelo contexto. Em “o rapaz estava exausto após a corrida”, o contexto indica que exausto significa muito cansado.'
            }
          ],
          'Sublinhe as palavras-chave de cada parágrafo. Elas funcionam como migalhas até a ideia central.',
          [
            q(
              'O que é a ideia central de um texto?',
              ['A primeira palavra do texto.', 'O ponto mais importante defendido ou narrado.', 'A opinião do leitor.', 'A quantidade de parágrafos.'],
              1,
              'A ideia central é a mensagem principal; é o que sustenta o texto.'
            ),
            q(
              'Se uma personagem boceja e olha para o relógio, podemos inferir que ela:',
              ['Está com fome.', 'Está com sono ou com pressa.', 'Está com raiva.', 'Está viajando.'],
              1,
              'Bocejar sugere sono; olhar o relógio sugere pressa. A inferência nasce das pistas do texto.'
            )
          ]
        ),
        lesson(
          'f2-pt-l3',
          'Concordância e pontuação',
          11,
          'Concordância é combinar as palavras de acordo com o sujeito. Pontuação é dar ritmo e sentido à frase. Juntas, elas evitam mal-entendidos.',
          [
            {
              title: 'Concordância verbal',
              text: 'O verbo concorda com o sujeito em número e pessoa. “Nós vamos” (plural), “eu vou” (singular). Em “a turma foi”, o sujeito coletivo fica no singular.'
            },
            {
              title: 'Concordância nominal',
              text: 'Artigos, adjetivos e substantivos devem combinar: “as casas amarelas”. Se o substantivo está no plural, os acompanhantes também ficam.'
            },
            {
              title: 'A vírgula tem função',
              text: 'Usamos vírgula para separar itens de uma lista, explicar algo ou isolar o vocativo. Ela não deve separar sujeito e verbo: “O aluno, estudou” está errado.'
            }
          ],
          'Leia a frase em voz alta e faça uma pausa onde está a vírgula. Se a pausa não faz sentido, a pontuação pode estar errada.',
          [
            q(
              'Complete corretamente: “Nós ___ à escola todos os dias.”',
              ['vai', 'vamos', 'vão', 'ir'],
              1,
              'O sujeito “nós” exige o verbo “vamos”.'
            ),
            q(
              'Qual frase está pontuada corretamente?',
              ['O aluno, estudou para a prova.', 'O aluno estudou, para a prova.', 'O aluno estudou para a prova.', 'O, aluno estudou para a prova.'],
              2,
              'Não se separa o sujeito do verbo com vírgula. A frase está correta sem a vírgula.'
            )
          ]
        )
      ],
      challenge: [
        q(
          'Assinale a frase com concordância adequada.',
          ['As meninas foi ao cinema.', 'As meninas foram ao cinema.', 'As menina foram ao cinema.', 'As menina foi ao cinema.'],
          1,
          'Sujeito plural “as meninas” pede verbo plural “foram”.'
        ),
        q(
          'Na frase “O rio parecia calmo naquela manhã”, qual é o adjetivo?',
          ['rio', 'parecia', 'calmo', 'manhã'],
          2,
          'Calmo caracteriza o substantivo rio.'
        )
      ]
    },

    /* ───────────────────────── FUNDAMENTAL 2 · MATEMÁTICA ───────────────────────── */
    {
      id: 'f2-matematica',
      levelId: 'fundamental-2',
      subjectId: 'matematica',
      title: 'Matemática na prática',
      description: 'Frações, equações e formas para resolver problemas reais.',
      lessons: [
        lesson(
          'f2-ma-l1',
          'Frações e porcentagem no dia a dia',
          12,
          'Frações e porcentagens são jeitos diferentes de representar partes de um todo. Elas aparecem em descontos, receitas e pesquisas.',
          [
            {
              title: 'Frações equivalentes',
              text: '1/2, 2/4 e 4/8 representam a mesma quantidade. Multiplicar ou dividir numerador e denominador pelo mesmo número não altera o valor.'
            },
            {
              title: 'Calculando a fração de um número',
              text: 'Para achar 3/4 de 40, divida 40 por 4 (10) e multiplique por 3: 30. Primeiro descubra o valor de uma parte, depois multiplique.',
              example: '3/4 de 40 = (40 ÷ 4) × 3 = 30'
            },
            {
              title: 'Porcentagem é fração de 100',
              text: '20% significa 20/100, ou seja, 20 partes de 100. Para calcular 20% de 150: 150 × 0,20 = 30.'
            }
          ],
          'Sempre que ver um desconto, calcule mentalmente 10% primeiro. Depois ajuste para chegar à porcentagem pedida.',
          [
            q(
              'Quanto é 3/4 de 40?',
              ['20', '25', '30', '35'],
              2,
              '40 ÷ 4 = 10 e 10 × 3 = 30.'
            ),
            q(
              'Quanto é 20% de 150?',
              ['20', '25', '30', '45'],
              2,
              '20% é 20/100 = 0,20. Então 150 × 0,20 = 30.'
            )
          ]
        ),
        lesson(
          'f2-ma-l2',
          'Equações do 1º grau',
          12,
          'Uma equação é uma balança: os dois lados precisam continuar iguais. Para descobrir o valor de x, fazemos operações iguais nos dois lados.',
          [
            {
              title: 'Isolando a incógnita',
              text: 'Em 2x + 5 = 17, primeiro subtraímos 5 dos dois lados: 2x = 12. Depois dividimos por 2: x = 6.',
              example: '2x + 5 = 17 → 2x = 12 → x = 6'
            },
            {
              title: 'O que é a incógnita?',
              text: 'x é um valor desconhecido que queremos encontrar. A igualdade só continua verdadeira se aplicarmos a mesma operação nos dois lados.'
            },
            {
              title: 'Traduzindo problemas',
              text: '“O dobro de um número mais 4 é 20” vira 2x + 4 = 20. Resolvendo: 2x = 16 e x = 8.'
            }
          ],
          'Confira sua resposta substituindo o valor de x na equação. Se os dois lados forem iguais, está certo!',
          [
            q(
              'Qual é a solução de 2x + 5 = 17?',
              ['4', '5', '6', '7'],
              2,
              '2x = 12, então x = 6. Substituindo: 2 × 6 + 5 = 17.'
            ),
            q(
              'A frase “o dobro de um número mais 4 é 20” corresponde a:',
              ['x + 4 = 20', '2x + 4 = 20', '2(x + 4) = 20', '4x + 2 = 20'],
              1,
              'O dobro de x é 2x. Somando 4, temos 2x + 4 = 20.'
            )
          ]
        ),
        lesson(
          'f2-ma-l3',
          'Ângulos, áreas e proporção',
          12,
          'Ângulos, áreas e proporções nos ajudam a medir espaços, construir e comparar. Vamos conectar geometria com situações do cotidiano.',
          [
            {
              title: 'A soma dos ângulos',
              text: 'A soma dos ângulos internos de um triângulo é sempre 180°. Se dois medem 50° e 60°, o terceiro mede 180 − 110 = 70°.'
            },
            {
              title: 'Área de retângulos',
              text: 'A área de um retângulo é base × altura. Um retângulo de 8 cm por 5 cm tem área de 40 cm².',
              example: 'Área = 8 × 5 = 40 cm²'
            },
            {
              title: 'Proporção',
              text: 'Duas razões são proporcionais quando mantêm a mesma relação. Se 2 cadernos custam R$ 10, 4 cadernos custam R$ 20.'
            }
          ],
          'Sempre escreva a unidade na resposta de área: cm², m². Isso mostra que você entendeu o que está medindo.',
          [
            q(
              'Qual é a área de um retângulo de 8 cm por 5 cm?',
              ['13 cm²', '26 cm²', '40 cm²', '80 cm²'],
              2,
              'Área = base × altura = 8 × 5 = 40 cm².'
            ),
            q(
              'Dois ângulos de um triângulo medem 50° e 60°. Quanto mede o terceiro?',
              ['50°', '60°', '70°', '80°'],
              2,
              'A soma dos ângulos internos é 180°. 180 − 50 − 60 = 70°.'
            )
          ]
        )
      ],
      challenge: [
        q(
          'Um produto de R$ 80 está com 25% de desconto. Qual é o preço final?',
          ['R$ 55', 'R$ 60', 'R$ 65', 'R$ 70'],
          1,
          '25% de 80 = 20. Então 80 − 20 = R$ 60.'
        ),
        q(
          'Se 3 cadernos custam R$ 18, quanto custam 5 cadernos?',
          ['R$ 24', 'R$ 30', 'R$ 36', 'R$ 40'],
          1,
          'Cada caderno custa R$ 6. Cinco cadernos custam 5 × 6 = R$ 30.'
        )
      ]
    },

    /* ───────────────────────── ENSINO MÉDIO · PORTUGUÊS ───────────────────────── */
    {
      id: 'em-portugues',
      levelId: 'ensino-medio',
      subjectId: 'portugues',
      title: 'Linguagem e argumentação',
      description: 'Funções da linguagem, literatura e textos que convencem.',
      lessons: [
        lesson(
          'em-pt-l1',
          'Funções da linguagem',
          10,
          'A linguagem pode informar, emocionar, convencer ou brincar com as palavras. Conhecer as funções ajuda a interpretar textos e propagandas.',
          [
            {
              title: 'Referencial e emotiva',
              text: 'A função referencial transmite informação objetiva, como uma notícia. A emotiva (ou expressiva) coloca o emissor em destaque, como em “Que dia incrível!”.'
            },
            {
              title: 'Conativa e poética',
              text: 'A conativa busca influenciar o receptor, comum em anúncios: “Venha conferir!”. A poética valoriza a forma da mensagem, com jogos sonoros e imagens.'
            },
            {
              title: 'Metalinguística e fática',
              text: 'A metalinguística usa a linguagem para falar dela mesma, como um dicionário. A fática testa ou mantém o canal: “Alô? Está me ouvindo?”.'
            }
          ],
          'Em uma propaganda, observe verbos no imperativo e vocativos. Eles costumam indicar função conativa.',
          [
            q(
              'A frase “Venha conhecer nossa nova loja!” evidencia qual função da linguagem?',
              ['Referencial', 'Emotiva', 'Conativa', 'Metalinguística'],
              2,
              'O verbo no imperativo e o convite direto ao receptor caracterizam a função conativa.'
            ),
            q(
              '“Alô? Está me ouvindo?” é um exemplo de função:',
              ['Fática', 'Poética', 'Referencial', 'Emotiva'],
              0,
              'A função fática testa ou mantém o canal de comunicação.'
            )
          ]
        ),
        lesson(
          'em-pt-l2',
          'Modernismo brasileiro',
          12,
          'O Modernismo rompeu com regras rígidas e trouxe a linguagem brasileira para a literatura. A Semana de Arte Moderna de 1922 é seu marco simbólico.',
          [
            {
              title: 'Primeira fase (1922–1930)',
              text: 'Fase heroica, marcada pela experimentação, pelo humor e pela valorização da identidade nacional. Mário de Andrade e Oswald de Andrade são nomes centrais.',
              example: '“Paulicéia Desvairada”, de Mário de Andrade, e o Manifesto Antropofágico, de Oswald.'
            },
            {
              title: 'Segunda fase (1930–1945)',
              text: 'O romance social ganha força, com obras que denunciam desigualdades. Graciliano Ramos, Rachel de Queiroz e Jorge Amado se destacam.'
            },
            {
              title: 'Terceira fase (1945–)',
              text: 'Maior rigor formal e experimentação estética. Clarice Lispector explora a interioridade; João Cabral de Melo Neto trabalha a construção do poema.'
            }
          ],
          'Não decore apenas datas: relacione cada fase a temas, linguagem e contexto histórico.',
          [
            q(
              'Qual evento é considerado o marco inicial do Modernismo brasileiro?',
              ['Semana de Arte Moderna de 1922', 'Publicação de “Dom Casmurro”', 'Movimento do Realismo', 'Criação da Academia Brasileira de Letras'],
              0,
              'A Semana de Arte Moderna, realizada em 1922, é o marco simbólico do Modernismo no Brasil.'
            ),
            q(
              'A segunda geração modernista ficou conhecida principalmente pelo:',
              ['Romance social e regionalista', 'Culto à forma clássica', 'Teatro medieval', 'Barroco religioso'],
              0,
              'A segunda fase trouxe o romance social, com forte crítica às desigualdades brasileiras.'
            )
          ]
        ),
        lesson(
          'em-pt-l3',
          'Argumentação e redação',
          12,
          'Um bom texto argumentativo tem uma tese clara, argumentos consistentes e uma conclusão que fecha o raciocínio. O leitor precisa acompanhar seu caminho.',
          [
            {
              title: 'Tese: a sua posição',
              text: 'A tese é a ideia que você defende. Ela deve ser clara e aparecer cedo, geralmente na introdução. “O acesso à leitura precisa ser ampliado” é uma tese.'
            },
            {
              title: 'Argumento e repertório',
              text: 'Argumentar é justificar a tese com dados, exemplos, comparações ou conhecimentos históricos e sociais. O repertório deve dialogar com o tema.'
            },
            {
              title: 'Conectivos e conclusão',
              text: 'Conectivos organizam as ideias: “além disso”, “portanto”, “no entanto”. A conclusão retoma a tese e pode apresentar uma proposta de solução.'
            }
          ],
          'Planeje em três blocos: o que defendo, por que defendo e o que proponho. O texto fica mais fácil de escrever.',
          [
            q(
              'O que é a tese de um texto argumentativo?',
              ['O exemplo mais longo.', 'A posição central defendida pelo autor.', 'A última frase do texto.', 'A citação de um autor famoso.'],
              1,
              'A tese é a posição que o autor defende ao longo do texto.'
            ),
            q(
              'Qual conectivo é adequado para indicar conclusão?',
              ['Por exemplo', 'No entanto', 'Portanto', 'Além disso'],
              2,
              '“Portanto” estabelece uma relação de conclusão entre as ideias.'
            )
          ]
        )
      ],
      challenge: [
        q(
          'Em um anúncio que afirma “Você merece esse descanso”, predomina qual função da linguagem?',
          ['Fática', 'Conativa', 'Metalinguística', 'Referencial'],
          1,
          'O anúncio procura influenciar diretamente o receptor, característica da função conativa.'
        ),
        q(
          'Qual elemento é essencial a uma conclusão argumentativa?',
          ['Mudar de assunto.', 'Retomar a tese e fechar o raciocínio.', 'Inserir uma nova tese.', 'Repetir a introdução palavra por palavra.'],
          1,
          'A conclusão deve retomar a discussão e apresentar um fechamento coerente com a tese.'
        )
      ]
    },

    /* ───────────────────────── ENSINO MÉDIO · MATEMÁTICA ───────────────────────── */
    {
      id: 'em-matematica',
      levelId: 'ensino-medio',
      subjectId: 'matematica',
      title: 'Funções e formas',
      description: 'Funções, trigonometria e probabilidade sem complicação.',
      lessons: [
        lesson(
          'em-ma-l1',
          'Funções do 1º e 2º grau',
          13,
          'Funções descrevem relações entre grandezas. Entender o gráfico e a fórmula ajuda a prever valores e resolver problemas.',
          [
            {
              title: 'Função do 1º grau',
              text: 'Tem a forma f(x) = ax + b e seu gráfico é uma reta. O coeficiente a indica a inclinação; b é onde a reta corta o eixo y.',
              example: 'f(x) = 2x − 6. A raiz é o x que faz f(x) = 0: 2x − 6 = 0 → x = 3.'
            },
            {
              title: 'Função do 2º grau',
              text: 'Tem a forma f(x) = ax² + bx + c e seu gráfico é uma parábola. Se a > 0, a concavidade é para cima; se a < 0, para baixo.'
            },
            {
              title: 'Vértice',
              text: 'O vértice é o ponto de mínimo (a > 0) ou máximo (a < 0). A coordenada x é dada por x = −b/2a.'
            }
          ],
          'Antes de calcular, identifique o tipo de função e desenhe o esboço do gráfico. Isso evita erros de interpretação.',
          [
            q(
              'Qual é a raiz da função f(x) = 2x − 6?',
              ['−3', '2', '3', '6'],
              2,
              'Igualando a zero: 2x − 6 = 0 → 2x = 6 → x = 3.'
            ),
            q(
              'Na função f(x) = −x² + 4, a concavidade da parábola é:',
              ['Para cima, pois a > 0.', 'Para baixo, pois a < 0.', 'Uma reta, pois não há x.', 'Não é possível saber.'],
              1,
              'O coeficiente de x² é −1, que é negativo. Por isso, a concavidade é para baixo.'
            )
          ]
        ),
        lesson(
          'em-ma-l2',
          'Trigonometria no triângulo retângulo',
          13,
          'Seno, cosseno e tangente relacionam ângulos e lados. Com eles, conseguimos medir alturas e distâncias que não alcançamos diretamente.',
          [
            {
              title: 'As três razões',
              text: 'Em um triângulo retângulo: seno = cateto oposto/hipotenusa; cosseno = cateto adjacente/hipotenusa; tangente = cateto oposto/cateto adjacente.'
            },
            {
              title: 'Ângulos notáveis',
              text: 'Vale memorizar: sen 30° = 1/2, sen 45° = √2/2, sen 60° = √3/2. O cosseno é a relação inversa entre 30° e 60°.',
              example: 'cos 30° = √3/2 e cos 60° = 1/2'
            },
            {
              title: 'Aplicando',
              text: 'Se a hipotenusa mede 10 e o ângulo é 30°, o cateto oposto mede 10 × sen 30° = 5.'
            }
          ],
          'Sempre desenhe o triângulo e marque o ângulo. Identifique quem é oposto, adjacente e hipotenusa antes de escolher a razão.',
          [
            q(
              'Quanto vale sen 30°?',
              ['0', '1/2', '√2/2', '1'],
              1,
              'Sen 30° = 1/2, um dos valores notáveis da trigonometria.'
            ),
            q(
              'Em um triângulo retângulo com hipotenusa 10 e ângulo de 30°, o cateto oposto mede:',
              ['5', '8', '10', '20'],
              0,
              'Cateto oposto = hipotenusa × sen 30° = 10 × 1/2 = 5.'
            )
          ]
        ),
        lesson(
          'em-ma-l3',
          'Probabilidade e estatística',
          12,
          'Probabilidade mede a chance de um evento acontecer. Estatística organiza e resume dados para nos ajudar a tomar decisões.',
          [
            {
              title: 'Média, mediana e moda',
              text: 'Média é a soma dividida pela quantidade. Mediana é o valor do meio quando os dados estão em ordem. Moda é o valor mais frequente.'
            },
            {
              title: 'Probabilidade simples',
              text: 'Probabilidade = casos favoráveis / casos possíveis. Ao lançar um dado, a chance de sair número par é 3/6 = 1/2.',
              example: 'P(par) = 3/6 = 0,5 = 50%'
            },
            {
              title: 'Lendo gráficos',
              text: 'Antes de tirar conclusões, observe título, eixos, unidades e escala. Um gráfico pode destacar uma tendência sem contar a história toda.'
            }
          ],
          'Em probabilidade, a resposta deve estar entre 0 e 1. Se der mais de 1, algo saiu errado.',
          [
            q(
              'Qual é a média dos números 4, 6, 8 e 10?',
              ['6', '7', '8', '9'],
              1,
              'A soma é 28. Dividindo por 4, a média é 7.'
            ),
            q(
              'Ao lançar um dado comum, qual é a probabilidade de sair um número par?',
              ['1/6', '1/3', '1/2', '2/3'],
              2,
              'São 3 casos favoráveis (2, 4, 6) em 6 possíveis. 3/6 = 1/2.'
            )
          ]
        )
      ],
      challenge: [
        q(
          'A média de três provas é 7. Se as duas primeiras notas foram 6 e 8, qual foi a terceira?',
          ['5', '6', '7', '8'],
          2,
          'A soma das três notas deve ser 21. 6 + 8 + 7 = 21, então a terceira nota foi 7.'
        ),
        q(
          'Na função f(x) = x² − 4x + 3, o x do vértice é:',
          ['1', '2', '3', '4'],
          1,
          'x = −b/2a = −(−4)/(2 × 1) = 4/2 = 2.'
        )
      ]
    },

    /* ───────────────────────── ENEM · PORTUGUÊS ───────────────────────── */
    {
      id: 'enem-portugues',
      levelId: 'enem',
      subjectId: 'portugues',
      title: 'Leitura estratégica',
      description: 'Gêneros, redação nota 1000 e gramática contextual.',
      lessons: [
        lesson(
          'enem-pt-l1',
          'Interpretação e gêneros textuais',
          12,
          'O ENEM cobra leitura de textos verbais e não verbais: charges, tirinhas, infográficos e anúncios. O segredo é relacionar forma, contexto e intenção.',
          [
            {
              title: 'Textos multimodais',
              text: 'Imagem, cores, tamanhos e posição também produzem sentido. Em uma charge, o exagero e o humor costumam carregar uma crítica social.'
            },
            {
              title: 'Inferência e intertextualidade',
              text: 'Muitas questões pedem uma conclusão que não está explícita. A intertextualidade ocorre quando um texto dialoga com outro, seja para concordar, parodiar ou criticar.'
            },
            {
              title: 'Comando da questão',
              text: 'Leia o enunciado antes do texto para saber o que procurar. Palavras como “principal”, “excerto” e “pressupõe” mudam o tipo de resposta esperada.'
            }
          ],
          'Cuidado com alternativas que trazem informações verdadeiras, mas que não respondem ao comando. Voltе sempre ao enunciado.',
          [
            q(
              'Em uma charge, o exagero visual e o humor geralmente servem para:',
              ['Decorar a imagem.', 'Fazer uma crítica social ou política.', 'Resumir uma notícia.', 'Substituir o texto verbal.'],
              1,
              'A charge usa humor e exagero como recursos de crítica e reflexão.'
            ),
            q(
              'A intertextualidade acontece quando um texto:',
              ['Tem mais de um parágrafo.', 'Dialoga com outro texto ou obra.', 'Usa apenas imagens.', 'É escrito em outra língua.'],
              1,
              'Intertextualidade é o diálogo entre textos, por meio de citações, paródias, referências ou retomadas.'
            )
          ]
        ),
        lesson(
          'enem-pt-l2',
          'Redação nota 1000',
          15,
          'A redação do ENEM é avaliada em cinco competências. Entender cada uma e treinar a estrutura é mais eficiente do que decorar fórmulas prontas.',
          [
            {
              title: 'As cinco competências',
              text: 'C1: norma culta. C2: compreensão do tema e repertório. C3: organização e argumentação. C4: coesão. C5: proposta de intervenção detalhada.'
            },
            {
              title: 'Estrutura dissertativa',
              text: 'Introdução com tese, dois parágrafos de desenvolvimento com repertório e argumentação, e conclusão com proposta de intervenção. Cada parte precisa conversar com a outra.'
            },
            {
              title: 'Proposta de intervenção',
              text: 'A proposta deve apresentar agente, ação, meio, finalidade e detalhamento. “O governo deve agir” é vago; “O Ministério da Educação deve ampliar, por meio de parcerias, o acesso a bibliotecas” é uma proposta mais completa.'
            }
          ],
          'Repertório não é enfeite. Use um dado, uma obra ou um fato que ajude a explicar seu argumento.',
          [
            q(
              'Qual competência avalia a proposta de intervenção?',
              ['Competência 1', 'Competência 3', 'Competência 4', 'Competência 5'],
              3,
              'A Competência 5 avalia a proposta de intervenção: agente, ação, meio, finalidade e detalhamento.'
            ),
            q(
              'A Competência 2 está relacionada a:',
              ['Norma culta.', 'Compreensão do tema e uso de repertório.', 'Coesão textual.', 'Proposta de intervenção.'],
              1,
              'A C2 avalia a compreensão do tema e a capacidade de usar repertório sociocultural pertinente.'
            )
          ]
        ),
        lesson(
          'enem-pt-l3',
          'Variação linguística e gramática contextual',
          12,
          'A língua muda conforme o lugar, o grupo e a situação. O ENEM costuma cobrar esse olhar contextual, sem transformar variação em erro.',
          [
            {
              title: 'Variação linguística',
              text: 'Há variações regionais, sociais, históricas e situacionais. “Nós vai” pode ser inadequado na norma culta, mas faz parte de uma variedade com regras próprias.'
            },
            {
              title: 'Preconceito linguístico',
              text: 'Não existe língua errada; existem variedades adequadas a contextos diferentes. O preconceito linguístico surge quando se desqualifica o falar do outro.'
            },
            {
              title: 'Norma culta em contexto',
              text: 'A norma culta é uma variedade de prestígio, exigida em situações formais. Saber adequar o registro é uma habilidade, não uma questão de “certo ou errado” absoluto.'
            }
          ],
          'Nas questões de variação, procure o contexto e a intenção. A resposta costuma valorizar a diversidade linguística.',
          [
            q(
              'A variação linguística ocorre porque a língua:',
              ['É imutável.', 'Muda conforme contexto, região e grupo social.', 'Só existe na escrita.', 'Deve ser sempre informal.'],
              1,
              'A língua é viva e varia conforme região, grupo social, situação e época.'
            ),
            q(
              'O preconceito linguístico consiste em:',
              ['Estudar gramática.', 'Desqualificar variedades linguísticas diferentes da norma de prestígio.', 'Falar mais de uma língua.', 'Usar gírias entre amigos.'],
              1,
              'O preconceito linguístico desqualifica falantes por sua variedade, ignorando que todas as variedades têm regras.'
            )
          ]
        )
      ],
      challenge: [
        q(
          'Em uma questão do ENEM, a alternativa correta deve:',
          ['Repetir palavras do texto.', 'Responder ao comando com base no texto.', 'Ser sempre a mais longa.', 'Trazer opinião pessoal sem apoio.'],
          1,
          'A resposta deve atender ao comando e estar sustentada pelo texto, não apenas repetir palavras.'
        ),
        q(
          'Na redação, o repertório sociocultural deve:',
          ['Aparecer solto na conclusão.', 'Contribuir para a argumentação sobre o tema.', 'Ser sempre uma citação famosa.', 'Substituir a tese.'],
          1,
          'O repertório precisa dialogar com a tese e ajudar a sustentar o argumento.'
        )
      ]
    },

    /* ───────────────────────── ENEM · MATEMÁTICA ───────────────────────── */
    {
      id: 'enem-matematica',
      levelId: 'enem',
      subjectId: 'matematica',
      title: 'Matemática que cai no ENEM',
      description: 'Proporção, geometria e estatística com foco na prova.',
      lessons: [
        lesson(
          'enem-ma-l1',
          'Proporcionalidade e matemática básica',
          12,
          'O ENEM cobra matemática aplicada. Regra de três, porcentagem e escalas aparecem em problemas com contexto e exigem interpretação antes da conta.',
          [
            {
              title: 'Grandezas proporcionais',
              text: 'Se 3 kg de arroz custam R$ 24, então 5 kg custam quanto? A relação é direta: 24/3 = 8 por kg; 5 × 8 = R$ 40.'
            },
            {
              title: 'Porcentagem e variação',
              text: 'Um aumento de 20% multiplica o valor por 1,20. Um desconto de 20% multiplica por 0,80. Descontos sucessivos não se somam: 20% + 10% não é 30%.'
            },
            {
              title: 'Escalas',
              text: 'Escala 1:100 significa que 1 cm no mapa representa 100 cm reais. Se o mapa mostra 5 cm, a distância real é 500 cm ou 5 m.'
            }
          ],
          'Em problemas contextualizados, retire primeiro os dados numéricos e a pergunta. Depois escolha a operação.',
          [
            q(
              'Se 3 kg de arroz custam R$ 24, quanto custam 5 kg?',
              ['R$ 32', 'R$ 36', 'R$ 40', 'R$ 48'],
              2,
              'O preço por quilo é R$ 8. Assim, 5 × 8 = R$ 40.'
            ),
            q(
              'Em um mapa com escala 1:100, 5 cm representam:',
              ['5 m', '50 m', '500 m', '5 km'],
              0,
              '5 cm × 100 = 500 cm = 5 m.'
            )
          ]
        ),
        lesson(
          'enem-ma-l2',
          'Geometria plana e espacial',
          13,
          'Calcular áreas e volumes é comum no ENEM, especialmente em problemas de embalagens, terrenos e reservatórios. Fórmulas precisam vir com interpretação.',
          [
            {
              title: 'Áreas essenciais',
              text: 'Retângulo: base × altura. Triângulo: base × altura / 2. Círculo: πr². Circunferência: 2πr. Identifique o que a questão pede: contorno ou superfície.'
            },
            {
              title: 'Volume de prismas e cilindros',
              text: 'Volume é área da base × altura. Um cubo de aresta 4 tem volume 4³ = 64. Um cilindro de raio 2 e altura 5 tem volume π × 2² × 5 = 20π.'
            },
            {
              title: 'Pitágoras',
              text: 'Em um triângulo retângulo, hipotenusa² = cateto² + cateto². É útil para diagonais, distâncias e medidas de tela.'
            }
          ],
          'Anote as unidades e converta antes de calcular. Trabalhar com metros e centímetros misturados é uma armadilha clássica.',
          [
            q(
              'Qual é a área de um círculo de raio 3?',
              ['3π', '6π', '9π', '27π'],
              2,
              'Área do círculo = πr² = π × 3² = 9π.'
            ),
            q(
              'O volume de um cubo com aresta 4 é:',
              ['12', '16', '48', '64'],
              3,
              'Volume do cubo = aresta³ = 4³ = 64.'
            )
          ]
        ),
        lesson(
          'enem-ma-l3',
          'Estatística, probabilidade e combinatória',
          13,
          'Esses temas aparecem em gráficos, pesquisas e situações de escolha. O foco é interpretar dados e contar possibilidades sem contar duas vezes.',
          [
            {
              title: 'Medidas de tendência central',
              text: 'Média é a soma dividida pela quantidade. Mediana é o valor central em dados ordenados. Em [2, 5, 7, 9, 12], a mediana é 7.'
            },
            {
              title: 'Probabilidade',
              text: 'Probabilidade = casos favoráveis / casos possíveis. A chance de tirar uma bola vermelha em uma urna com 2 vermelhas e 3 azuis é 2/5.'
            },
            {
              title: 'Princípio multiplicativo',
              text: 'Se uma escolha tem 3 opções e outra tem 2, o total de combinações é 3 × 2 = 6. Para eventos independentes, multiplique possibilidades.'
            }
          ],
          'Em combinatória, pergunte: a ordem importa? Se sim, permutação/arranjo; se não, combinação. No ENEM, muitas questões se resolvem pelo princípio multiplicativo.',
          [
            q(
              'Qual é a mediana dos números 2, 5, 7, 9 e 12?',
              ['5', '7', '8', '9'],
              1,
              'Com 5 valores em ordem, a mediana é o terceiro: 7.'
            ),
            q(
              'Uma pessoa tem 3 camisetas e 2 calças. De quantas maneiras diferentes pode se vestir?',
              ['5', '6', '8', '9'],
              1,
              'Pelo princípio multiplicativo: 3 × 2 = 6 combinações.'
            )
          ]
        )
      ],
      challenge: [
        q(
          'Um produto de R$ 200 recebeu 15% de desconto. O preço final é:',
          ['R$ 155', 'R$ 165', 'R$ 170', 'R$ 185'],
          2,
          '15% de 200 = 30. Então 200 − 30 = R$ 170.'
        ),
        q(
          'Em uma turma de 20 alunos, 12 gostam de Matemática. Escolhendo um aluno ao acaso, a probabilidade de ele gostar de Matemática é:',
          ['3/5', '2/5', '1/2', '5/3'],
          0,
          'A probabilidade é 12/20, que simplificada fica 3/5.'
        )
      ]
    },

    /* ───────────────────────── CONCURSO · PORTUGUÊS ───────────────────────── */
    {
      id: 'concurso-portugues',
      levelId: 'concurso',
      subjectId: 'portugues',
      title: 'Português de concurso',
      description: 'Norma culta, interpretação e redação oficial sem decoreba.',
      lessons: [
        lesson(
          'concurso-pt-l1',
          'Norma culta: crase, concordância e regência',
          12,
          'Em concursos, a gramática aparece em detalhes. Entender a lógica das regras é mais seguro do que apenas memorizar exceções.',
          [
            {
              title: 'Crase',
              text: 'A crase é a fusão da preposição “a” com o artigo “a”. Ocorre antes de palavra feminina: “Vou à escola”. Não ocorre antes de verbo, palavra masculina ou pronome pessoal.',
              example: 'Vou à escola. • Refiro-me a ela. • Começou a estudar.'
            },
            {
              title: 'Concordância verbal',
              text: 'O verbo concorda com o sujeito. Em “faz dez anos”, o verbo “fazer” indicando tempo decorrido fica no singular: “Faz dez anos que ele saiu”.'
            },
            {
              title: 'Regência',
              text: 'Alguns verbos exigem preposição: assistir a, obedecer a, preferir a. “Assisti ao filme” é a construção da norma culta.'
            }
          ],
          'Em prova, substitua a palavra feminina por uma masculina para testar a crase: “Vou à escola” → “Vou ao colégio”. Se aparecer “ao”, havia crase.',
          [
            q(
              'Assinale a alternativa em que a crase está correta.',
              ['Vou à escola.', 'Vou à pé.', 'Começou à estudar.', 'Refiro-me à ela.'],
              0,
              'A crase ocorre antes de substantivo feminino que admite artigo: “Vou à escola”.'
            ),
            q(
              'Assinale a frase em que a concordância está de acordo com a norma culta.',
              ['Fazem dez anos que ele partiu.', 'Faz dez anos que ele partiu.', 'Fazem dez ano que ele partiu.', 'Faz dez ano que ele partiu.'],
              1,
              'O verbo “fazer” indicando tempo decorrido fica no singular: “Faz dez anos”.'
            )
          ]
        ),
        lesson(
          'concurso-pt-l2',
          'Interpretação de texto em provas',
          12,
          'Nas provas de concurso, interpretar exige atenção ao comando e às inferências. A resposta precisa estar apoiada no texto, não no senso comum.',
          [
            {
              title: 'Leia o comando primeiro',
              text: 'O enunciado diz se você deve identificar a ideia principal, uma inferência, o sentido de uma palavra ou a função de um trecho. Cada comando pede um tipo de leitura.'
            },
            {
              title: 'Inferência x opinião',
              text: 'Inferência é uma conclusão autorizada pelo texto. Opinião pessoal é o que você acha sem apoio textual. Em prova, a inferência precisa ter pistas no texto.'
            },
            {
              title: 'Cuidado com extremos',
              text: 'Alternativas com “sempre”, “nunca”, “todos” e “exclusivamente” costumam ser fortes demais. Verifique se o texto realmente sustenta tanta certeza.'
            }
          ],
          'Volte ao trecho citado na questão. A resposta costuma estar escondida ali, não na sua memória sobre o assunto.',
          [
            q(
              'Em uma questão de interpretação, uma inferência correta deve:',
              ['Ser uma opinião pessoal do candidato.', 'Ter apoio em pistas do texto.', 'Repetir uma frase qualquer.', 'Contradizer o texto.'],
              1,
              'A inferência é uma conclusão autorizada pelas pistas do texto, não uma opinião solta.'
            ),
            q(
              'Quando uma alternativa usa “sempre” ou “nunca”, o candidato deve:',
              ['Marcá-la imediatamente.', 'Verificar se o texto sustenta uma afirmação absoluta.', 'Ignorar o texto.', 'Escolher a mais longa.'],
              1,
              'Termos absolutos exigem cuidado: muitas vezes generalizam além do que o texto permite.'
            )
          ]
        ),
        lesson(
          'concurso-pt-l3',
          'Redação oficial e clareza',
          12,
          'A redação oficial deve ser clara, formal, impessoal e concisa. O objetivo é comunicar com precisão, não impressionar com palavras difíceis.',
          [
            {
              title: 'Atributos da redação oficial',
              text: 'Clareza, concisão, formalidade, uniformidade e impessoalidade. O texto oficial trata de assuntos públicos e não deve expressar opiniões pessoais.'
            },
            {
              title: 'Documentos comuns',
              text: 'O ofício é usado para comunicação entre órgãos e com particulares. O memorando é uma comunicação interna entre unidades administrativas.'
            },
            {
              title: 'Clareza acima de tudo',
              text: 'Prefira frases diretas e evite redundâncias. “No sentido de” pode ser substituído por “para”; “devido ao fato de que” por “porque”.'
            }
          ],
          'Ao revisar, pergunte: o leitor entenderia na primeira leitura? Se houver dúvida, simplifique.',
          [
            q(
              'Qual é uma característica essencial da redação oficial?',
              ['Opinião pessoal.', 'Impessoalidade e clareza.', 'Uso de gírias.', 'Excesso de adjetivos.'],
              1,
              'A redação oficial deve ser impessoal, clara e objetiva.'
            ),
            q(
              'O documento usado para comunicação interna entre unidades administrativas é o:',
              ['Ofício', 'Memorando', 'Edital', 'Contrato'],
              1,
              'O memorando é a comunicação interna entre unidades administrativas.'
            )
          ]
        )
      ],
      challenge: [
        q(
          'Assinale a opção em que o uso da crase está incorreto.',
          ['Entreguei o livro à professora.', 'Cheguei à cidade.', 'Vou à escola.', 'Começou à chover.'],
          3,
          'Não ocorre crase antes de verbo. O correto é “Começou a chover”.'
        ),
        q(
          'A qualidade da redação oficial que evita opiniões pessoais é a:',
          ['Concisão.', 'Impessoalidade.', 'Informalidade.', 'Subjetividade.'],
          1,
          'Impessoalidade significa não expressar opiniões pessoais no texto oficial.'
        )
      ]
    },

    /* ───────────────────────── CONCURSO · MATEMÁTICA ───────────────────────── */
    {
      id: 'concurso-matematica',
      levelId: 'concurso',
      subjectId: 'matematica',
      title: 'Raciocínio sob pressão',
      description: 'Lógica, porcentagem e problemas de prova com método.',
      lessons: [
        lesson(
          'concurso-ma-l1',
          'Raciocínio lógico e sequências',
          13,
          'Raciocínio lógico é treinar a identificar padrões e relações. Em prova, o tempo é curto: buscar a regra antes de calcular é essencial.',
          [
            {
              title: 'Sequências numéricas',
              text: 'Observe as diferenças ou operações entre termos. Na sequência 2, 5, 10, 17, ... as diferenças são 3, 5, 7; a próxima é 9, então o termo é 26.',
              example: '2 (+3) 5 (+5) 10 (+7) 17 (+9) 26'
            },
            {
              title: 'Proposições',
              text: 'Uma proposição é uma frase que pode ser verdadeira ou falsa. “Brasília é a capital do Brasil” é proposição; “Que dia lindo!” não é.'
            },
            {
              title: 'Negação de quantificadores',
              text: 'A negação de “todos estudam” é “algum não estuda”. A negação de “existe alguém feliz” é “todos são infelizes” (ou “ninguém é feliz”).'
            }
          ],
          'Teste a regra em mais de um par de termos. Se funcionar em todos, provavelmente é o padrão.',
          [
            q(
              'Qual é o próximo termo da sequência 2, 5, 10, 17, ...?',
              ['24', '25', '26', '28'],
              2,
              'As diferenças são 3, 5, 7. A próxima é 9, então 17 + 9 = 26.'
            ),
            q(
              'A negação de “Todos os alunos estudam” é:',
              ['Todos os alunos não estudam.', 'Algum aluno não estuda.', 'Nenhum aluno estuda.', 'Alguns alunos estudam.'],
              1,
              'Para negar “todos”, basta que exista pelo menos um que não cumpra a condição: “algum não estuda”.'
            )
          ]
        ),
        lesson(
          'concurso-ma-l2',
          'Porcentagem, juros e descontos',
          13,
          'Concurso adora porcentagem aplicada a salários, preços e juros. Entender fatores multiplicativos resolve mais rápido do que regra de três a cada conta.',
          [
            {
              title: 'Aumentos e descontos',
              text: 'Aumento de 20%: multiplique por 1,20. Desconto de 15%: multiplique por 0,85. Um produto de R$ 200 com 15% de desconto sai por R$ 170.',
              example: '200 × 0,85 = 170'
            },
            {
              title: 'Juros simples',
              text: 'J = C × i × t. Um capital de R$ 1.000 a 2% ao mês durante 3 meses rende 1000 × 0,02 × 3 = R$ 60.'
            },
            {
              title: 'Variações sucessivas',
              text: 'Aumento de 10% e depois desconto de 10% não voltam ao preço original. O fator final é 1,10 × 0,90 = 0,99, ou seja, 1% menor.'
            }
          ],
          'Transforme porcentagens em fatores decimais. Isso agiliza contas e evita erros de soma de porcentagens.',
          [
            q(
              'Um produto de R$ 200 recebe 15% de desconto. Qual é o preço final?',
              ['R$ 155', 'R$ 165', 'R$ 170', 'R$ 185'],
              2,
              '200 × 0,85 = R$ 170.'
            ),
            q(
              'Um capital de R$ 1.000 a 2% ao mês, por 3 meses, em juros simples, rende:',
              ['R$ 20', 'R$ 40', 'R$ 60', 'R$ 80'],
              2,
              'J = 1000 × 0,02 × 3 = R$ 60.'
            )
          ]
        ),
        lesson(
          'concurso-ma-l3',
          'Regra de três e problemas',
          13,
          'Regra de três resolve problemas de proporção. O primeiro passo é decidir se as grandezas são direta ou inversamente proporcionais.',
          [
            {
              title: 'Proporção direta',
              text: 'Mais quantidade, mais valor. Se 2 litros custam R$ 8, então 5 litros custam R$ 20. As grandezas crescem juntas.'
            },
            {
              title: 'Proporção inversa',
              text: 'Mais trabalhadores, menos dias. Se 4 trabalhadores fazem uma obra em 6 dias, 6 trabalhadores farão em 4 dias, mantendo o mesmo ritmo.'
            },
            {
              title: 'Montagem segura',
              text: 'Organize as grandezas em colunas, compare o sentido de crescimento e só depois multiplique em cruz. Escrever as unidades ajuda a não inverter a conta.'
            }
          ],
          'Pergunte sempre: “se uma grandeza aumenta, a outra aumenta ou diminui?”. A resposta define o tipo de proporção.',
          [
            q(
              'Se 4 trabalhadores terminam uma obra em 6 dias, quantos dias levam 6 trabalhadores no mesmo ritmo?',
              ['3 dias', '4 dias', '5 dias', '9 dias'],
              1,
              'A relação é inversa: 4 × 6 = 24 dias de trabalho. 24 ÷ 6 = 4 dias.'
            ),
            q(
              'Um carro a 80 km/h faz um trajeto em 3 horas. A 120 km/h, o mesmo trajeto leva:',
              ['1 hora', '2 horas', '2,5 horas', '4 horas'],
              1,
              'Distância = 80 × 3 = 240 km. A 120 km/h: 240 ÷ 120 = 2 horas.'
            )
          ]
        )
      ],
      challenge: [
        q(
          'Uma camisa de R$ 120 tem aumento de 10% e depois desconto de 10%. O preço final é:',
          ['R$ 118,80', 'R$ 120,00', 'R$ 121,20', 'R$ 132,00'],
          0,
          '120 × 1,10 × 0,90 = 118,80.'
        ),
        q(
          'A negação de “Nenhum candidato foi aprovado” é:',
          ['Todos os candidatos foram aprovados.', 'Algum candidato foi aprovado.', 'Nenhum candidato estudou.', 'Todos os candidatos reprovaram.'],
          1,
          'A negação de “nenhum” é “pelo menos um”: algum candidato foi aprovado.'
        )
      ]
    }
  ];

  const byId = (list, id) => list.find((item) => item.id === id);

  function firstSentence(text) {
    const clean = String(text || '').replace(/\s+/g, ' ').trim();
    if (!clean) return '';
    const match = clean.match(/^.+?[.!?](?=\s|$)/);
    const sentence = match ? match[0] : clean;
    return sentence.length > 170 ? `${sentence.slice(0, 167)}...` : sentence;
  }

  function normalizeQuestion(question, topic) {
    return {
      ...question,
      alternatives: question.alternatives || question.options || [],
      topicId: topic.id,
      topicTitle: topic.title
    };
  }

  /* As páginas trabalham com "temas" (aulas). A conversão abaixo mantém o
     conteúdo das trilhas e expõe a API usada pela biblioteca, pela aula e
     pelo treino, sem duplicar o material didático. */
  const topics = trails.flatMap((trail) => {
    const level = byId(levels, trail.levelId);
    const subject = byId(subjects, trail.subjectId);

    const trailTopics = trail.lessons.map((item) => {
      const sections = Array.isArray(item.sections) ? item.sections : [];
      const examples = sections
        .filter((section) => section.example)
        .map((section) => ({ title: section.title, text: section.example }));

      return {
        id: item.id,
        title: item.title,
        description: firstSentence(item.intro) || trail.description,
        level: trail.levelId,
        subject: trail.subjectId,
        trailId: trail.id,
        trailTitle: trail.title,
        duration: item.minutes,
        xp: item.xp,
        theory: sections,
        examples,
        tip: item.tip,
        tags: [
          level?.short,
          level?.name,
          subject?.name,
          trail.title,
          trail.description,
          ...item.title.split(/\s+/)
        ].filter(Boolean),
        questions: item.questions.map((question) => normalizeQuestion(question, item))
      };
    });

    /* O desafio da trilha entra como questões extras do último tema. */
    const lastTopic = trailTopics[trailTopics.length - 1];
    if (lastTopic && Array.isArray(trail.challenge)) {
      trail.challenge.forEach((question) => {
        lastTopic.questions.push({
          ...normalizeQuestion(question, lastTopic),
          topicTitle: `${lastTopic.title} • Desafio`
        });
      });
    }

    return trailTopics;
  });

  function getTopic(id) {
    return byId(topics, id);
  }

  function topicsBy(levelId, subjectId) {
    return topics.filter(
      (topic) => (!levelId || topic.level === levelId) && (!subjectId || topic.subject === subjectId)
    );
  }

  function questionsBy(levelId, subjectId, topicId) {
    if (topicId) {
      const topic = getTopic(topicId);
      if (topic && (!levelId || topic.level === levelId) && (!subjectId || topic.subject === subjectId)) {
        return topic.questions;
      }
      return [];
    }
    return topicsBy(levelId, subjectId).flatMap((topic) => topic.questions);
  }

  function countTopics(levelId) {
    return topics.filter((topic) => !levelId || topic.level === levelId).length;
  }

  function countQuestions(levelId) {
    return topics
      .filter((topic) => !levelId || topic.level === levelId)
      .reduce((total, topic) => total + topic.questions.length, 0);
  }

  window.BLABLA_DATA = {
    levels,
    subjects,
    trails,
    topics,
    getLevel: (id) => byId(levels, id),
    getSubject: (id) => byId(subjects, id),
    getTrail: (id) => byId(trails, id),
    getTopic,
    topicsBy,
    questionsBy,
    countTopics,
    countQuestions,
    getLesson: (trailId, lessonId) => {
      const trail = byId(trails, trailId);
      return trail ? trail.lessons.find((item) => item.id === lessonId) : null;
    },
    getTrailsByLevel: (levelId) => trails.filter((trail) => trail.levelId === levelId),
    getTrailQuestions: (trail) => [
      ...trail.lessons.flatMap((item) => item.questions),
      ...(trail.challenge || [])
    ],
    getTrailMinutes: (trail) => trail.lessons.reduce((total, item) => total + item.minutes, 0)
  };

  /* Nome curto usado pelos módulos das páginas. */
  window.BLAB_DATA = window.BLABLA_DATA;
})();
