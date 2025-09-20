"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Coins, Trophy, Crown, Sparkles, Heart, Star, Zap, Target } from "lucide-react"

interface Step {
  id: number
  title: string
  content: string
  options?: Array<{
    text: string
    feedback: string
  }>
  isPopup?: boolean
  isLong?: boolean
}

const steps: Step[] = [
  {
    id: 1,
    title: "✨ Venda todos os dias seus doces no automático usando a Estrutura Premium™",
    content: `✨ Venda todos os dias seus doces no automático usando a Estrutura Premium™

🎯 **SEM MAIS SOFRIMENTO:**
✔️ Sem precisar ficar implorando desconto
✔️ Sem passar noites virada na cozinha à toa  
✔️ Sem depender de indicações ou "boca a boca"
✔️ Sem gastar rios de dinheiro em anúncios sem retorno

💔 **EU SEI COMO É...**
Já vi confeiteiras se matando na cozinha, passando madrugadas viradas fazendo bolo, gastando grana em ingredientes caros… só pra no final ganhar menos que uma diarista. 😡🍰

⚡ **POR MUITO TEMPO, EU TAMBÉM ACREDITEI QUE "ERA ASSIM MESMO":**
👉 Baixar preço pra não perder cliente
👉 Aceitar qualquer encomenda, mesmo no prejuízo  
👉 E postar no Instagram torcendo por uma curtida ou orçamento

👀 **QUER VER COMO ISSO FUNCIONA NA PRÁTICA?**

Digite seu nome abaixo e veja agora:`,
    isLong: true,
  },
  {
    id: 2,
    title: "🏆 TROFÉU DESBLOQUEADO: TOPO DE FUNIL",
    content: `🎉 **PARABÉNS {userName}!** 🎉

🏆 **TROFÉU DESBLOQUEADO: TOPO DE FUNIL**

✨ Olha só, {userName} 👩‍🍳… tu começou bem!
A maioria nem tem coragem de clicar no botão, mas você já tá aqui.

⚠️ **ATENÇÃO {userName}:** Não vem achando que já sabe de tudo não… porque se fosse assim, já tava vendendo seus doces no preço que eles merecem. 🍫💸

🎯 **TALVEZ** — e eu disse talvez — se você chegar até o final, {userName}, consiga acesso à estrutura que faz qualquer confeiteira vender todos os dias no automático, sem mendigar desconto.

🎮 **REGRA DO JOGO:**
👉 Cada passo certo = uma recompensa 
💎 Cada etapa = mais conhecimento premium
🚀 Final = método completo desbloqueado`,
    isPopup: true,
  },
  {
    id: 3,
    title: "🎯 Pergunta 1 – Ciclo da Estagnação",
    content: `💭 **"{userName}, o que faz mais sentido pra você hoje?"**

🤔 Escolha com sabedoria, {userName}... sua resposta revela muito sobre seu futuro! ⭐`,
    options: [
      {
        text: "😴 Continuar no ciclo: noites viradas, desconto pra todo mundo e lucro que não paga nem o gás.",
        feedback:
          "💔 {userName}, se escolher isso, aceita de vez que tua vida vai ser só cansaço e conta atrasada. Mas se tá lendo aqui, é porque lá no fundo sabe que merece sair dessa merda. 👀✨",
      },
      {
        text: "🚀 Aprender uma estrutura que te dá cliente todo dia sem precisar se matar na cozinha.",
        feedback:
          "🎯 **ESSA É A ESCOLHA CERTA, {userName}!** 🎯 Essa é a escolha de quem quer virar dona da confeitaria e não escrava dela. É exatamente esse passo que separa amadora de confeiteira premium. 🚀🍫💎",
      },
      {
        text: '🙈 Fingir que tá tudo bem e esperar um "milagre" cair do céu.',
        feedback:
          "⚡ **ACORDA, {userName}!** ⚡ Milagre não paga boleto, minha filha. Se tu continuar só sonhando sem agir, vai virar estatística de confeiteira falida. Acorda antes que seja tarde. 🔥",
      },
    ],
  },
  {
    id: 4,
    title: "⏳ Pergunta 2 – Tempo de Família",
    content: `💝 **"{userName}, se você tivesse que escolher… o que pesa mais?"**

👨‍👩‍👧‍👦 Sua família está esperando por você, {userName}... ⭐`,
    options: [
      {
        text: "❤️ Passar mais tempo com marido/filho sem viver escrava da confeitaria.",
        feedback:
          "💕 **É PRA ISSO QUE VOCÊ COMEÇOU ESSE SONHO, NÉ {userName}?** Se não arrumar um jeito de organizar as vendas, vai continuar trocando tempo com quem ama por fornada sem lucro. 💔✨",
      },
      {
        text: "😵‍💫 Continuar presa na cozinha, cansada, sem ver o dinheiro render.",
        feedback:
          "😤 **ESSA É A VIDA DA MAIORIA, {userName}...** mas não precisa ser a tua. Se apertar CONTINUAR, já começa a mudar esse ciclo que só te rouba energia e amor próprio. 🔥💪",
      },
      {
        text: '🤥 Achar que "família entende" e aceitar viver ausente.',
        feedback:
          "💔 **MENTIRA QUE VOCÊ SE CONTA, {userName}** pra suportar a dor. Teu filho não precisa só de bolo bonito — precisa de você presente. Esse peso vai te esmagar se não mudar. 😡⚡",
      },
    ],
  },
  {
    id: 5,
    title: "🔮 Pergunta 3 – Futuro da Confeitaria",
    content: `🚀 **"{userName}, se nada mudar nos próximos 6 meses, onde você acha que vai estar?"**

⏰ O tempo não para, {userName}... e você? ⭐`,
    options: [
      {
        text: "😰 Mais cansada, devendo, achando que confeitaria é só bico.",
        feedback:
          "💀 **ESSA É A ROTA DA EXAUSTÃO, {userName}.** Se aceitar isso, já se prepara pra largar a confeitaria ou virar só mais uma que faz bolo barato. 😡🔥",
      },
      {
        text: "🔄 Do mesmo jeito, sem crescimento, rodando em círculo.",
        feedback:
          "⚡ **ESTAGNAÇÃO MATA MAIS SONHO QUE FALÊNCIA, {userName}.** O tempo vai passar de qualquer jeito, só depende de você se vai ficar parada ou construir algo grande. 💣💪",
      },
      {
        text: "💎 Com uma estrutura rodando, vendendo no automático e vivendo da confeitaria de verdade.",
        feedback:
          "🎯 **ESSE É O FUTURO QUE VOCÊ MERECE, {userName}!** Não é sonho distante, é só ter a estratégia certa — e você já tá a um clique de colocar ela pra rodar. 💎🚀✨",
      },
    ],
  },
  {
    id: 6,
    title: "🏆 TROFÉU DESBLOQUEADO: VITRINE PREMIUM",
    content: `🎊 **INCRÍVEL, {userName}!** 🎊

🏆 **TROFÉU DESBLOQUEADO: VITRINE PREMIUM**

🔥 **VOCÊ PASSOU DA METADE DO JOGO, {userName}!**
Poucas chegam aqui, mas você já mostrou que tem visão de confeiteira premium.

🎁 **AGORA VOCÊ CONQUISTOU:**
✨ Capacidade de transformar seu Instagram em vitrine de luxo 📲
⭐ +15 pontos de XP premium
👑 Status de Candidata Premium em Formação
💎 Acesso ao próximo nível desbloqueado

🎯 **O FINAL DO JOGO** vai revelar seu Diagnóstico Exclusivo com os pontos que estão travando suas vendas, {userName}.

🚀 Continue... a recompensa final está próxima!`,
    isPopup: true,
  },
  {
    id: 7,
    title: "🌟 Transformação Comprovada",
    content: `🔥 **MAIS DE 327 CONFEITEIRAS** já aplicaram essa estrutura secreta e hoje vivem de confeitaria premium sem se matar na cozinha, {userName}.

💔 **ESSAS MULHERES ESTAVAM NA MESMA MERDA QUE VOCÊ:**
❌ Fazendo bolo madrugada inteira por mixaria
❌ Aceitando desconto de cliente folgado  
❌ Postando no Instagram e rezando por uma curtida

✨ **HOJE ELAS ESTÃO DO OUTRO LADO:**
✅ Fechando encomendas de R$500, R$800 e até R$1.500 sem negociar um centavo
✅ Escolhendo os clientes que querem atender
✅ Sendo chamadas de referência na cidade
✅ Com tempo de sobra pra ficar com família, viajar e aproveitar a vida

📸 **A DIFERENÇA?** Elas decidiram aplicar o método e não olharam pra trás.

🎯 Enquanto algumas continuam presas no ciclo de cansaço e frustração, essas confeiteiras estão construindo negócios de verdade, com vendas todos os dias no automático.

💎 **E SABE QUAL É A VERDADE MAIS DURA, {userName}?**
A única coisa que tá separando você delas é a decisão de começar AGORA.

⏳ **CADA DIA QUE VOCÊ ENROLA** é mais um dia de cozinha quente, desconto humilhante e lucro invisível.

🚀 **MAS SE CLICAR NO BOTÃO,** você entra pro mesmo caminho que fez centenas de confeiteiras virarem o jogo.

👑 **AGORA CHEGOU A SUA VEZ, {userName}.**`,
    isLong: true,
  },
  {
    id: 8,
    title: "🎉 SEU RELATÓRIO PREMIUM ESTÁ PRONTO — DESBLOQUEIE AGORA",
    content: `🎉 SEU RELATÓRIO PREMIUM ESTÁ PRONTO — DESBLOQUEIE AGORA 🍓✨

👩‍🍳 Você acabou de descobrir onde tá se sabotando e por que continua presa no ciclo da confeitaria barata, {userName}.

Agora chegou a hora de quebrar essa maldição e finalmente cobrar o preço que o seu trabalho merece.

✨ A chave exclusiva que quebra esse ciclo é o Método Confeitaria Premium™ ✨

Um sistema passo a passo que transforma receitas comuns em experiências irresistíveis — doces que se vendem sozinhos e fazem cliente implorar pra pagar mais.

👉 Dentro do método, você vai aprender:

🍰 Bolos crocantes premium que encantam pelo sabor e textura.

💎 Frutas vitrificadas de luxo que brilham como joias na vitrine.

❤️ Segredos dos Morangos, Uvas e Maracujás do Amor™ — clássicos que explodem de venda.

⚡ Massas e brigadeiros sem fogo: práticos, rápidos e impossíveis de copiar.

🍩 Donuts exclusivos + bônus surpresa que fazem você se diferenciar da manada.

💰 Cliente pagando caro só de olhar o visual dos seus doces — sem discutir preço.

📅 Agenda cheia de pedidos premium, você escolhendo quem merece ser atendido.

👑 Orgulho e confiança ao cobrar o valor que realmente vale, sem baixar a cabeça.

🕊️ Liberdade pra trabalhar menos, ganhar mais e ainda ter tempo pra família e pra você. 👑🍓

💡 O que antes era só mais um docinho, agora vira arte premium que justifica preço alto e fideliza cliente.`,
    isLong: true,
  },
  {
    id: 9,
    title: "🚀 OFERTA EXCLUSIVA - AGORA OU NUNCA",
    content: `💰 De R$197 → Apenas R$37 à vista
ou 7x de R$4,98 no cartão (menos que um café por dia ☕), {userName}.

⏳ Atenção: essa condição é única e temporária.

🔥 O valor volta pro preço cheio assim que o tempo acabar.

🎁 Os bônus exclusivos desaparecem junto com a oferta.

❌ Se você sair agora, não tem segunda chance.

👉 É literalmente agora ou nunca.

🎁 **BÔNUS EXCLUSIVOS**

🍓 Receita oficial dos Morangos do Amor™ 

💸 Planilha de precificação premium 

👑 Checklist de hábitos premium 

🔥 Suporte VIP por 7 dias  

🎁 2 presentes disponível na área de membro 

🤝 Faça network empresárias de sua região 

📈 Receba atualização de novas tendências 

✅ Garantia total de 7 dias — risco zero. Se não amar, devolvemos seu dinheiro.

🚀 **AGORA É SUA VEZ**

Não adianta sonhar em ser premium e continuar vendendo bolo barato, {userName}.

👉 Esse relatório foi gerado exclusivamente com base nas suas respostas.

Ele mostra exatamente onde você tá errando e o que precisa mudar pra se destacar na confeitaria.

⚠️ **SE VOCÊ SAIR AGORA, PERDE ESSA OPORTUNIDADE ÚNICA:**

📊 Acesso ao relatório personalizado só pra você.

🎁 Todos os bônus exclusivos que foram liberados nessa condição.

✨ A chance de aplicar o mesmo método que já transformou a vida de centenas de confeiteiras.

⏳ Depois que fechar, não tem como voltar. O acesso expira, os bônus somem e você continua presa no mesmo ciclo cansativo de sempre.

👑 A diferença entre ficar invisível ou ser lembrada como referência premium começa nesse clique, {userName}:`,
    isLong: true,
  },
]

export default function ConfeitariaPremium() {
  const [currentStep, setCurrentStep] = useState(1)
  const [userName, setUserName] = useState("")
  const [selectedOption, setSelectedOption] = useState<string>("")
  const [showFeedback, setShowFeedback] = useState(false)
  const [balance, setBalance] = useState(0)
  const [rewardValue, setRewardValue] = useState(67)
  const [showReward, setShowReward] = useState(false)
  const [musicStarted, setMusicStarted] = useState(false)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const buttonSoundRef = useRef<HTMLAudioElement | null>(null)
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null)
  const firstStepAudioRef = useRef<HTMLAudioElement | null>(null)
  const step6AudioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Initialize audio elements
    buttonSoundRef.current = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cashier-quotka-chingquot-sound-effect-129698-5Hd5YVkVR5rpd5DqNNFGJAsD4emLPs.mp3")
    backgroundMusicRef.current = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/curto%20rise-of-the-titans-281575-2_VUkidyxn-137MSaJM2NQlmlR96LfRcNr2jeGr4j.wav")
    firstStepAudioRef.current = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/clip-Ember-2025_09_15-xevbRLvjPco3iprLAiZxbjgTt6lqIH.wav")
    step6AudioRef.current = new Audio("https://blobs.vusercontent.net/blob/clip-Hem-2025_09_15-hAG9Ke3KN4Q3y0IK7Iz7O7lxXHAv16.wav")

    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.loop = true
      backgroundMusicRef.current.volume = 0.3
    }

    if (buttonSoundRef.current) {
      buttonSoundRef.current.volume = 0.5
    }

    if (firstStepAudioRef.current) {
      firstStepAudioRef.current.volume = 0.6
    }

    if (step6AudioRef.current) {
      step6AudioRef.current.volume = 0.6
    }
  }, [])

  useEffect(() => {
    const currentStepData = steps.find((step) => step.id === currentStep)
    if (currentStepData?.isLong) {
      setIsTyping(true)
      setDisplayedText("")

      if (currentStep === 1 && firstStepAudioRef.current && !musicStarted) {
        try {
          firstStepAudioRef.current.currentTime = 0
          const playPromise = firstStepAudioRef.current.play()
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.log("[v0] First step audio play failed:", error)
            })
          }
        } catch (error) {
          console.log("[v0] First step audio error:", error)
        }
      }

      const text = currentStepData.content.replace(/{userName}/g, userName || "")
      let index = 0

      const typeInterval = setInterval(
        () => {
          if (index < text.length) {
            setDisplayedText(text.slice(0, index + 1))
            index++
          } else {
            setIsTyping(false)
            clearInterval(typeInterval)
          }
        },
        currentStep === 1 ? 15 : currentStep === 7 ? 10 : 30,
      )

      return () => clearInterval(typeInterval)
    } else {
      setDisplayedText("")
      setIsTyping(false)

      if (currentStep === 6 && step6AudioRef.current) {
        try {
          step6AudioRef.current.currentTime = 0
          const playPromise = step6AudioRef.current.play()
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.log("[v0] Step 6 audio play failed:", error)
            })
          }
        } catch (error) {
          console.log("[v0] Step 6 audio error:", error)
        }
      }
    }
  }, [currentStep]) // Removed userName dependency to prevent restarting animation

  const playButtonSound = () => {
    if (buttonSoundRef.current) {
      try {
        buttonSoundRef.current.currentTime = 0
        const playPromise = buttonSoundRef.current.play()
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("[v0] Button sound play failed:", error)
            // Silently fail - don't break the user experience
          })
        }
      } catch (error) {
        console.log("[v0] Button sound error:", error)
        // Silently fail - don't break the user experience
      }
    }
  }

  const startBackgroundMusic = () => {
    if (backgroundMusicRef.current && !musicStarted) {
      try {
        const playPromise = backgroundMusicRef.current.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setMusicStarted(true)
            })
            .catch((error) => {
              console.log("[v0] Background music play failed:", error)
              // Silently fail - don't break the user experience
            })
        }
      } catch (error) {
        console.log("[v0] Background music error:", error)
        // Silently fail - don't break the user experience
      }
    }
  }

  const addReward = () => {
    setBalance((prev) => prev + rewardValue)
    setRewardValue((prev) => prev * 2)
    setShowReward(true)
    setTimeout(() => setShowReward(false), 2000)
  }

  const handleNextStep = () => {
    playButtonSound()
    addReward()

    if (currentStep === 1 && userName.trim() && userName.length >= 2) {
      startBackgroundMusic()
    }

    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1)
      setSelectedOption("")
      setShowFeedback(false)
    }
  }

  const handleOptionSelect = (option: string, feedback: string) => {
    playButtonSound()
    setSelectedOption(option)
    setShowFeedback(true)
  }

  const currentStepData = steps.find((step) => step.id === currentStep)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black border-b-2 border-yellow-500 p-4 shadow-lg shadow-yellow-500/20">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-[#1877F2] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">f</span>
            </div>
            <h1 className="text-xl font-bold text-[#1877F2]">Facebook</h1>
          </div>
          <div className="text-center">
            <h2 className="text-lg font-semibold text-white">✨ Confeitaria Premium™ ✨</h2>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 px-4 py-2 rounded-full border-2 border-yellow-400 shadow-lg">
            <Coins className="w-5 h-5 text-white" />
            <span className="font-bold text-white">{balance.toLocaleString()} CoinX</span>
          </div>
        </div>
      </header>

      {/* Reward Animation */}
      {showReward && (
        <div className="fixed top-20 right-4 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-full font-bold shadow-2xl border-2 border-yellow-300">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />+{(rewardValue / 2).toLocaleString()} CoinX
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6">
        {currentStepData && (
          <Card
            className={`bg-gray-900 border-2 ${
              currentStepData.isPopup
                ? "border-yellow-500 shadow-2xl shadow-yellow-500/30 bg-gradient-to-br from-gray-900 to-gray-800"
                : "border-yellow-600/50 shadow-xl shadow-yellow-600/10"
            } relative overflow-hidden`}
          >
            <div className="absolute top-0 left-0 w-16 h-16 border-l-4 border-t-4 border-yellow-500"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-r-4 border-t-4 border-yellow-500"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-l-4 border-b-4 border-yellow-500"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-4 border-b-4 border-yellow-500"></div>

            <CardContent className="p-8 relative z-10">
              {/* Step Header */}
              <div className="flex items-center justify-between mb-6">
                <Badge variant="outline" className="text-white border-[#1877F2] bg-[#1877F2] px-4 py-2 font-semibold">
                  ⭐ Etapa {currentStep} de {steps.length} ⭐
                </Badge>
                {currentStepData.isPopup && (
                  <div className="flex items-center gap-2">
                    <Trophy className="w-8 h-8 text-yellow-500 animate-pulse" />
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                  </div>
                )}
              </div>

              {/* Title */}
              <h2 className="text-3xl font-bold mb-8 text-center text-balance text-white bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                💎 Método Confeitaria Gold - {currentStepData.title}
              </h2>

              {currentStep === 1 && (
                <div className="mb-8 text-center">
                  <img
                    src="/confeitaria-premium.png"
                    alt="Método Confeitaria Premium"
                    className="w-full max-w-2xl mx-auto rounded-lg border-2 border-yellow-500 shadow-2xl shadow-yellow-500/30"
                  />
                </div>
              )}

              {/* Content */}
              <div className="prose prose-invert max-w-none mb-8">
                <div className="whitespace-pre-line text-lg leading-relaxed text-gray-100">
                  {currentStepData.isLong ? (
                    <>
                      {displayedText}
                      {isTyping && <span className="animate-pulse">|</span>}
                    </>
                  ) : (
                    currentStepData.content.replace(/{userName}/g, userName || "")
                  )}
                </div>
              </div>

              {/* Step 1 - Name Input */}
              {currentStep === 1 && !isTyping && (
                <div className="space-y-6 border-2 border-yellow-500/30 rounded-lg p-6 bg-gradient-to-r from-gray-800/50 to-gray-700/50">
                  <div className="text-center mb-4">
                    <Heart className="w-8 h-8 text-pink-500 mx-auto animate-pulse" />
                  </div>
                  <Input
                    type="text"
                    placeholder="✨ Digite seu nome completo aqui..."
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="bg-gray-800 border-2 border-yellow-500/50 text-white text-lg p-4 focus:border-yellow-500 transition-all"
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && userName.trim().length >= 2) {
                        handleNextStep()
                      }
                    }}
                    autoFocus
                  />
                  <Button
                    onClick={handleNextStep}
                    disabled={userName.trim().length < 2}
                    className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-6 text-xl border-2 border-pink-400 shadow-lg hover:shadow-pink-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    🍓 QUERO DESCOBRIR AGORA ✨
                  </Button>
                </div>
              )}

              {/* Options for question steps */}
              {currentStepData.options && !showFeedback && (
                <div className="space-y-4">
                  {currentStep === 3 && (
                    <div className="text-center mb-6">
                      <div className="relative inline-block">
                        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-4 border-yellow-300 shadow-2xl animate-pulse">
                          <span className="text-3xl">👩‍🍳</span>
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
                          <span className="text-white text-xs font-bold">🔥</span>
                        </div>
                      </div>
                      <div className="text-yellow-400 font-bold text-lg mb-2">⚡ CHEF PREMIUM MODE ⚡</div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="text-center mb-6">
                      <div className="relative inline-block">
                        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center border-4 border-pink-300 shadow-2xl animate-pulse">
                          <span className="text-3xl">🍰</span>
                        </div>
                        <div className="absolute -top-1 -left-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center animate-spin">
                          <span className="text-white text-xs">⭐</span>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                          <span className="text-white text-xs">💎</span>
                        </div>
                      </div>
                      <div className="text-pink-400 font-bold text-lg mb-2">🍰 FAMÍLIA & CONFEITARIA 🍰</div>
                    </div>
                  )}

                  {currentStepData.options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleOptionSelect(option.text, option.feedback)}
                      variant="outline"
                      className="w-full text-left p-3 sm:p-4 md:p-6 h-auto bg-gray-800 border-2 border-yellow-500/30 hover:bg-gray-700 hover:border-yellow-500 text-white transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20"
                    >
                      <div className="flex items-start gap-2 sm:gap-3 w-full">
                        <div className="flex-shrink-0 mt-1">
                          {index === 0 && <Target className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />}
                          {index === 1 && <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />}
                          {index === 2 && <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />}
                        </div>
                        <span className="text-xs sm:text-sm md:text-base leading-relaxed break-words flex-1 hyphens-auto word-break">
                          {option.text}
                        </span>
                      </div>
                    </Button>
                  ))}
                </div>
              )}

              {/* Feedback */}
              {showFeedback && selectedOption && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-3 sm:p-4 md:p-6 rounded-lg border-l-4 border-[#1877F2] border-2 border-yellow-500/30 shadow-lg">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 flex-shrink-0 mt-1" />
                      <p className="text-xs sm:text-sm md:text-lg leading-relaxed text-gray-100 break-words flex-1 hyphens-auto word-break">
                        {currentStepData.options
                          ?.find((opt) => opt.text === selectedOption)
                          ?.feedback.replace(/{userName}/g, userName || "")}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={handleNextStep}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-6 px-8 text-xl border-2 border-blue-400 shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                  >
                    🚀 CONTINUAR JORNADA ✨
                  </Button>
                </div>
              )}

              {/* Popup steps */}
              {currentStepData.isPopup && (
                <div className="text-center border-2 border-yellow-500 rounded-lg p-6 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10">
                  <div className="mb-4">
                    <Crown className="w-12 h-12 text-yellow-500 mx-auto animate-bounce" />
                  </div>
                  <Button
                    onClick={handleNextStep}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-6 px-8 text-xl border-2 border-green-400 shadow-lg hover:shadow-green-500/50 transition-all duration-300"
                  >
                    {currentStep === 2 ? "🚀 COMEÇAR AGORA ✨" : "💎 QUERO MÉTODO COMPLETO 🎯"}
                  </Button>
                </div>
              )}

              {/* Step 7 - Final CTA */}
              {currentStep === 7 && !isTyping && (
                <div className="text-center border-2 border-yellow-500 rounded-lg p-6 bg-gradient-to-r from-pink-500/10 to-red-500/10">
                  <div className="mb-4">
                    <div className="flex justify-center gap-2">
                      <Crown className="w-8 h-8 text-yellow-500 animate-pulse" />
                      <Heart className="w-8 h-8 text-pink-500 animate-pulse" />
                      <Star className="w-8 h-8 text-yellow-400 animate-pulse" />
                    </div>
                  </div>
                  <Button
                    onClick={handleNextStep}
                    className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-8 px-4 sm:px-8 border-2 border-pink-400 shadow-2xl hover:shadow-pink-500/50 transition-all duration-300"
                  >
                    <span className="text-lg sm:text-2xl">🍓 QUERO VIVER DA CONFEITARIA PREMIUM ✨</span>
                  </Button>
                </div>
              )}

              {/* Step 8 - Final Celebration */}
              {currentStep === 8 && !isTyping && (
                <div className="text-center border-2 border-yellow-500 rounded-lg p-6 bg-gradient-to-r from-pink-500/10 to-red-500/10">
                  <div className="mb-6">
                    <div className="flex justify-center gap-2 mb-4">
                      <Crown className="w-8 h-8 text-yellow-500 animate-pulse" />
                      <Heart className="w-8 h-8 text-pink-500 animate-pulse" />
                      <Star className="w-8 h-8 text-yellow-400 animate-pulse" />
                    </div>
                    <div className="text-2xl mb-4">🎉🎁🎊</div>
                  </div>
                  <Button
                    onClick={handleNextStep}
                    className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-8 px-2 sm:px-8 border-2 border-pink-400 shadow-2xl hover:shadow-pink-500/50 transition-all duration-300"
                  >
                    <span className="text-sm sm:text-lg md:text-xl leading-tight">
                      🍓 ACESSAR MEU RELATÓRIO E MÉTODO PREMIUM ✨
                    </span>
                  </Button>
                </div>
              )}

              {/* Step 9 - Final Celebration */}
              {currentStep === 9 && !isTyping && (
                <div className="text-center border-2 border-yellow-500 rounded-lg p-6 bg-gradient-to-r from-pink-500/10 to-red-500/10">
                  <div className="mb-8">
                    <img
                      src="/confeitaria-premium-final.png"
                      alt="Método Confeitaria Premium - Transformação Completa"
                      className="w-full max-w-lg mx-auto rounded-lg border-2 border-yellow-500 shadow-2xl shadow-yellow-500/30"
                    />
                  </div>
                  <div className="mb-6">
                    <div className="flex justify-center gap-2 mb-4">
                      <Crown className="w-8 h-8 text-yellow-500 animate-pulse" />
                      <Heart className="w-8 h-8 text-pink-500 animate-pulse" />
                      <Star className="w-8 h-8 text-yellow-400 animate-pulse" />
                    </div>
                    <div className="text-2xl mb-4">🎉🎁🎊</div>
                  </div>
                  <Button
                    onClick={() => {
                      playButtonSound()
                      window.open("https://pay.kiwify.com.br/yHioiZU", "_blank")
                    }}
                    className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-8 px-2 sm:px-8 border-2 border-pink-400 shadow-2xl hover:shadow-pink-500/50 transition-all duration-300"
                  >
                    <span className="text-xs sm:text-sm md:text-lg lg:text-xl leading-tight">
                      🍓 ACESSAR MEU RELATÓRIO E MÉTODO PREMIUM ✨
                    </span>
                  </Button>
                </div>
              )}

              {/* Final step */}
              {currentStep === 10 && (
                <div className="text-center space-y-6 border-2 border-yellow-500 rounded-lg p-8 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20">
                  <div className="flex justify-center gap-4">
                    <Crown className="w-16 h-16 text-yellow-500 animate-bounce" />
                    <Trophy className="w-16 h-16 text-yellow-400 animate-pulse" />
                    <Crown className="w-16 h-16 text-yellow-500 animate-bounce" />
                  </div>
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black p-8 rounded-lg border-2 border-yellow-400 shadow-2xl">
                    <h3 className="text-3xl font-bold mb-4 text-black">🎉 Parabéns {userName}! Jornada Completa! 🎉</h3>
                    <p className="text-xl text-black font-semibold">
                      💰 Você ganhou {balance.toLocaleString()} CoinX total! 💰
                    </p>
                    <div className="mt-4 flex justify-center gap-2">
                      <Sparkles className="w-6 h-6 text-black" />
                      <span className="text-lg font-bold text-black">CONFEITEIRA PREMIUM CERTIFICADA</span>
                      <Sparkles className="w-6 h-6 text-black" />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Celebration Animations */}
        {(currentStep === 8 || currentStep === 9) && (
          <>
            {/* Fireworks Animation */}
            <div className="fixed inset-0 pointer-events-none z-40">
              <div className="absolute top-10 left-10 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
              <div
                className="absolute top-20 right-20 w-3 h-3 bg-red-400 rounded-full animate-ping"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute top-32 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute top-16 right-1/3 w-3 h-3 bg-green-400 rounded-full animate-ping"
                style={{ animationDelay: "1.5s" }}
              ></div>
              <div
                className="absolute top-40 left-1/2 w-4 h-4 bg-purple-400 rounded-full animate-ping"
                style={{ animationDelay: "2s" }}
              ></div>
            </div>

            {/* Confetti Animation */}
            <div className="fixed inset-0 pointer-events-none z-30">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-2 h-2 ${
                    ["bg-yellow-400", "bg-pink-400", "bg-blue-400", "bg-green-400", "bg-red-400"][i % 5]
                  } animate-bounce`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${1 + Math.random()}s`,
                  }}
                />
              ))}
            </div>
          </>
        )}

        {/* Progress Bar */}
        <div className="mt-8 border-2 border-yellow-500/30 rounded-lg p-4 bg-gray-900/50">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>🎯 Progresso da Jornada</span>
            <span>{Math.round((currentStep / steps.length) * 100)}% Completo ✨</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3 border border-yellow-500/30">
            <div
              className="bg-gradient-to-r from-[#1877F2] to-yellow-400 h-3 rounded-full transition-all duration-500 shadow-lg"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t-2 border-yellow-500 p-6 mt-12 shadow-lg shadow-yellow-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-8 bg-[#1877F2] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">f</span>
            </div>
            <span className="text-[#1877F2] font-bold text-xl">Facebook</span>
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </div>
          <p className="text-gray-400 text-lg">
            ✨ Confeitaria Premium™ - Transformando confeiteiras em empresárias de sucesso ✨
          </p>
          <div className="mt-2 flex justify-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <Star className="w-4 h-4 text-yellow-400" />
            <Star className="w-4 h-4 text-yellow-400" />
            <Star className="w-4 h-4 text-yellow-400" />
            <Star className="w-4 h-4 text-yellow-400" />
          </div>
        </div>
      </footer>
    </div>
  )
}
