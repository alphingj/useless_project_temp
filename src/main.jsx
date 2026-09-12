import { StrictMode, useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const aunties = [
  { name: 'Lissy Aunty', role: 'Gossip Queen', emoji: '👩🏽‍🦱', color: 'coral', initials: 'LA' },
  { name: 'Mini Aunty', role: 'Overconfident', emoji: '👩🏽‍🦳', color: 'blue', initials: 'MA' },
  { name: 'Bindhu Aunty', role: 'Friend Paranju', emoji: '👩🏽‍🦰', color: 'yellow', initials: 'BA' },
  { name: 'Sujatha Aunty', role: 'Breaking News', emoji: '👩🏽‍🦲', color: 'green', initials: 'SA' },
  { name: 'Remya Aunty', role: 'Practical Advice', emoji: '👩🏽', color: 'purple', initials: 'RA' },
]

const malayalamAunties = [
  { name: 'ലിസ്സി ആന്റി', role: 'ഗോസിപ്പ് ക്വീൻ' },
  { name: 'മിനി ആന്റി', role: 'ഓവർ കോൺഫിഡന്റ്' },
  { name: 'ബിന്ദു ആന്റി', role: 'ഫ്രണ്ട് പറഞ്ഞത്' },
  { name: 'സുജാത ആന്റി', role: 'ബ്രേക്കിംഗ് ന്യൂസ്' },
  { name: 'രമ്യ ആന്റി', role: 'പ്രാക്ടിക്കൽ ഉപദേശം' },
]

const phraseBanks = {
  openers: [
    (n) => `${n}-ne kurichu njan oru kaaryam parayatte... ee peru kettappozhe enikku oru mysterious energy thonni. Evidence illa, pakshe feeling strong aanu.`,
    (n) => `Ente ponno, ${n}-ne discuss cheyyumbozhum meeting-room-il valiya silence varum. Avan/aval ithokke ariyumo?`,
    (n) => `Daivame, ${n} entry akki vanna pole konjam mild flame maarunnille. Ee generation...`,
    (n) => `Sherikkum? ${n} oru mystery aanu ennathu enikku ippo kandal Mathi. Enikku ithu kandappozhe doubt undayirunnu!`,
    (n) => `Njan parayunnath kettal mathi: ${n} life-il oru hidden chapter undennu thonni. Pinne oru dramatic music thudangum.`,
    (n) => `Enikku appozhe thonni! ${n} oorma nilavil varaan kshanam alla. Suspense-u double decker sandwich aanu.`,
    (n) => `Ormakku vannu... ${n}oru nimisham normal aayirunnu, pinne atmosphere change. Alla mole, ithrayum quick aano?`,
    (n) => `Sush, ${n} peru kettappol enikku pre-sentiment vannu. Mood-u ting-teng-tung aayirunnu.`,
  ],
  observations: [
    (n) => `${n} avasanam oru proper timetable undakkanam. 6:17 AM ezhunelkkuka, moonu thavana ceiling fan count cheyyuka.`,
    (n) => `Last week ${n} oru glass vellam eduthappol athu clockwise aayirunnu. Athu clear sign aanu... athalla enikku appozhe thonni.`,
    (n) => `${n}-inte tea style: strong enough to dissolve spoon. Ee generation strong feelings undu, pakshe taste nannavalle.`,
    (n) => `${n}-inte daily step count unexpected aanu. Walking pattern zig-zag aayirikkum. Evidence? Ningalkku vendi.`,
    (n) => `${n}-inte phone lock screen-il daily different flower aanu. Ithoru mystery serial aakum enn arinjal...`,
    (n) => `${n}-inte favourite colour cycle: Monday red, Tuesday purple, baaki divasam full green. Green generation aanu.`,
    (n) => `${n}-inte lunch box-il rice, pickle, oru overripe banana. Balanced diet aanu, pakshe timing... Daivame!`,
    (n) => `${n} oru divasam sandhya samayam oru random bus stop-il poyi. Mazha vannilla. Ithinte prequel undo?`,
    (n) => `${n}-inte WhatsApp status cycle: Monday motivation, Tuesday meme, Wednesday vague quote, Thursday selfie, Friday silence.`,
    (n) => `${n}-inte hair-style daily oru geometry pole maarum. Morning ponytail, afternoon loose, evening... enthaayaalo.`,
    (n) => `${n}-inte shopping bag colours dress-umayi always clash aakum. Signature style aano, atho laziness aano? Enthina ingane?`,
    (n) => `${n}-inte sneeze pattern double allenkil triple aanu. Single sneeze undayaal athu suspicious aanu.`,
    (n) => `${n}-inte handwriting right side-ilekku lean cheyyunnu, athukond optimistic aanu. Straight aanel government form filler.`,
    (n) => `${n}-inte kitchen smell neighbour veedu vare ethum. Athu cooking alla, community service aanu.`,
  ],
  friendSaid: [
    (n) => `Ente oru friend paranjatha... actually friend-inte friend-inte neighbour aanu. ${n} orikkal tea kudichittu cup-ne nokki chirichu.`,
    (n) => `Ente oru friend paranjatha, ${n} oru divasam umbrella thurannittu mazha varan wait cheythu. Mazha vannilla. Enthokkeyo brew cheyyunnundu.`,
    (n) => `Ente oru friend paranjatha, ${n} moonnu divasam consecutive same shirt ittu. Laundry issue aano, atho oru secret plan aano?`,
    (n) => `Ente oru friend paranjatha, ${n} last week grocery shop-il coconut oil bottle kandappol extra care eduthu. Over-respect aanu.`,
    (n) => `Ente oru friend paranjatha, ${n} Thursday evening oru unknown number-il call cheythu, pinne silent aayi. Purpose valare mysterious aanu.`,
    (n) => `Ente oru friend paranjatha, ${n} bus stop-il 4:08 PM daily kaanum. Completely irrelevant aanu, pakshe pattern undu.`,
    (n) => `Ente oru friend paranjatha, ${n} Saturday morning oru ariyatha plant pot vaangi. Peru ariyilla, maintenance suspicious.`,
    (n) => `Ente oru friend paranjatha, ${n} auto driver-nu extra cash koduthu. Generosity aano, atho hidden membership aano?`,
    (n) => `Ente oru friend paranjatha, ${n} last month phone-il oru contact delete cheythu. Aaranu ennu ariyilla, oru chapter close aayi.`,
    (n) => `Ente oru friend paranjatha, ${n} night 9:15-il vegetable chop cheythu. Sound-inu rhythm normal alla.`,
    (n) => `Ente oru friend paranjatha, ${n} elevator mirror-il kurachu extra minutes nokkum. Reflection study session aanennu thonnunnu.`,
    (n) => `Ente oru friend paranjatha, ${n} late night fridge thurannu light-ne 17 seconds nokki. Meditation aano?`,
  ],
  dramaticReactions: [
    (n) => `Sherikkum?! ${n} normal alla! Daivame, ithu breaking news aanu! Njan ippo thanne chair-il ninnu ezhunnettu poyi veendum irikkum.`,
    (n) => `Ayyo! ${n}-ne kurichu ithu kettappol enikku mood thanne nasam aayi! Enthoru kaaryam?`,
    (n) => `${n} ennaalum overthinking aanu, pakshe athaanu real spice! Ente ponno, conversation-u ABCD aayirikkum.`,
    (n) => `Ithu sheri villain entry pole aanu, ${n}! Scene full dramatic aanu, pakshe bgm mathram missing.`,
    (n) => `Ente ponno, nammal ivide irunnu ithu discuss cheyyunnu ennathu thanne historic aanu!`,
    (n) => `${n}-ne kandappol enikku goosebumps vannu. Serial-inte next episode release aayirikkum!`,
    (n) => `Daivame, ${n} oru cinema story pole aanu! Thriller, comedy, family drama ellam mix.`,
    (n) => `Enthina ingane? ${n} normal aayal mathi, pakshe normal alla ennathu thanne twist aanu.`,
    (n) => `${n} ennaalum innocent aanu, pakshe innocent-u extra spicy aayirikkum!`,
    (n) => `Ithu story-yude first part aanu. Part two eppozha varunnathu?`,
  ],
  advice: [
    (n) => `Alla mole, ithokke vittu ${n} oru proper routine undakkanam. 6:17 AM ezhunelkkuka, moonu thavana ceiling fan count cheyyuka, pinne balanced breakfast.`,
    (n) => `${n} should stop overthinking and start watering plants. Plant-ne advice koduthalum mathi. Pinne, Saturday 4 manikku banana chips kondu varanam.`,
    (n) => `${n} daily 10-minute face yoga cheyyanam. Pinne selfie-il filter kurayum. Community welfare aanu.`,
    (n) => `${n}-inte phone screen brightness 60% aakki vekkanam. Kanninu nallathaanennu ente viswasam.`,
    (n) => `${n} weekly oru coconut oil massage cheyyanam. Hair silky, mind calm.`,
    (n) => `${n} oru low-maintenance plant konduvaranam. Zero-care aanelum emotional support kittum.`,
    (n) => `${n} daily randu litre vellam kudikkanam. Dehydration mood-ne influence cheyyum.`,
    (n) => `${n} oru nalla notebook kondu idea note cheyyanam. Memory short aanu, paper permanent aanu.`,
    (n) => `${n} Saturday 4:12 PM exact door lock check cheyyanam. Paranoid aanu, pakshe safe aanu.`,
    (n) => `${n}-inte tea-il moonu teaspoon-il kooduthal sugar venda. Sweetness limit kazhinju.`,
    (n) => `${n} morning sun-ne 10 minute nokki nilkkanam. Vitamin D government scheme pole free aanu.`,
    (n) => `${n} 4:08 PM random bus stop-il visit cheyyanam ennu njan parayunnath kettal mathi.`,
  ],
  interruptions: [
    (n) => `Wait... nammal entha discuss cheythathu? Ah, yes, ${n}. Pakshe sathyam paranjaal banana chips crispy aano soft aano ennathaanu real issue.`,
    (n) => `Enikku appozhe thonni! ${n}-inu random things-ne kurichu valiya confidence undu, pakshe coriander evide vechennu ariyilla. Ee generation...`,
    (n) => `Wait, ${n} oru topic switch! Tea brand discussion thudangiyalo?`,
    (n) => `Interrupt cheyyane, ${n} peru kettappol enikku oru déjà vu vannu. Previous life-il oru gossip session undayirunnu.`,
    (n) => `Wait wait, ${n}-ne kandappol enikku oru completely unrelated memory vannu... appo nammal entha cheythathu?`,
    (n) => `Ava ellaam vittu, ${n} oru proper naamam kettan padunnu. Nickname-u confusion aanu.`,
    (n) => `Stop stop! ${n}-inu oru hidden talent undennu thonni. Athu engane kandupidikkum?`,
    (n) => `Actually, ${n}-ne kandappol oru old anecdote orma vannu. 2019 moonam lakshya... ayyo, wrong file.`,
    (n) => `Hold on, ${n}-inte topic maattam. WhatsApp status review thudangiyalo?`,
    (n) => `One minute, ${n}-ne kurichu oru technical doubt. Clockwise aano anti-clockwise aano, pakshe...`,
  ],
  closing: [
    (n) => `Enikku thonnilla, ${n} oru harmless mystery aanu. Ithu investigate cheyyunnavarankilum petty award kodukkanam.`,
    (n) => `${n}-inte story mystery aanu, pakshe main message ithaanu: korachu peace, korachu pickle, korachu pazham.`,
    (n) => `Meeting grand finale: ${n} ordinary aanu, pakshe extra sparkle undu. Kaaryam onnum illa, pakshe fun aanu.`,
    (n) => `${n}-ne kurichu soft-spicy verdict: watch cheyyuka, guess cheyyuka, snacks kazhikkuka.`,
    (n) => `Conclusion: ${n} oru ordinary neighbourhood-inu valare mysterious aanu. Meeting unanimous alla, pakshe ellavarum watch cheyyam ennu sammathichu.`,
    (n) => `Final chapter: ${n} innocent aanu... pakshe suspiciously interesting aanu!`,
    (n) => `Investigation theernnu: ${n} safe aanu, harmless aanu, pakshe legendary potential undu.`,
    (n) => `Closing statement: ${n} oru silent blockbuster aanu. Neighbourhood mind-il daily 8 PM premiere.`,
  ],
}

const pick = (items) => items[Math.floor(Math.random() * items.length)]
const detailWords = {
  objects: ['coconut', 'steel glass', 'pressure cooker', 'mango pickle jar', 'plastic chair', 'rubber slipper', 'tiffin box', 'mosquito coil', 'jackfruit', 'old calendar', 'folded umbrella', 'one lonely spoon'],
  moments: ['6:17 AM', 'after the second tea', 'last Tuesday at exactly 3:04', 'during the power cut', 'before the rain started', 'at yesterday\'s vegetable shop visit', 'between two WhatsApp forwards', 'just after the evening prayer'],
  topics: ['tea cup', 'umbrella', 'coriander', 'WhatsApp last seen', 'ceiling fan', 'banana chips', 'one suspiciously folded towel', 'a plant that grew one new leaf', 'the neighbour\'s pressure cooker', 'a slipper facing north'],
  futures: ['international coconut consultant', 'district-level snack analyst', 'chief coordinator of unnecessary meetings', 'global umbrella strategist', 'future minister of tea timing', 'professional plant motivator', 'CEO of suspiciously confident opinions'],
}

const extraBanks = {
  openers: [
    (n) => `Njan observe cheythu: ${n} ${pick(detailWords.objects)} randu pravashyam thottu. Coincidence ennu parayunnavar onnum kaanunnilla.`,
    (n) => `${n}-inte silence polum loud aanu. ${pick(detailWords.moments)} oru word polum parayathe tea stir cheythu.`,
    (n) => `Njan evidence collect cheyyunnundu... ippo evidence oru feeling mathram aanu, pakshe very premium feeling aanu.`,
    (n) => `${n} secretly ${pick(detailWords.futures)} aakanulla preparation aanu nadathunnathu. Signs okke enikku ariyam.`,
    (n) => `Ee ${n} case-il oru pattern undu. Pattern entha ennu ippo marannu, pakshe pattern definitely undu.`,
  ],
  observations: [
    (n) => `Njan calculate cheythu: ${n} future-il ${pick(detailWords.futures)} aakum. Calculator use cheythilla, ennalum accurate aanu.`,
    (n) => `${n} ${pick(detailWords.topics)}-ne kurichu ariyilla ennu ellavarum parayum. Sathyathil avar athinte hidden CEO aanu.`,
    (n) => `Ithu simple coincidence alla. ${pick(detailWords.objects)}-inte shadow ${n}-inte shadow-ne touch cheythu. Universe confirm cheythu.`,
    (n) => `${n} oru divasam moonu tea kudichal nere village legend aakum. Maths njan cheythittundu.`,
    (n) => `Coriander ariyathath kondaanu ${n} ithrayum creative. Ithaanu science, alla, ente swantham science.`,
  ],
  friendSaid: [
    (n) => `Ente friend-inde friend paranju, ${n} ${pick(detailWords.moments)} ${pick(detailWords.topics)}-ne nokki chirichu.`,
    (n) => `Njan friend-inde cousin-inde tuition teacher-il ninnanu kettathu: ${n} ${pick(detailWords.objects)}-ne secret code pole use cheyyunnu.`,
    (n) => `Friend paranjathu aanu, ${n} oru plant-inodu “strong aayi nilkku” ennu paranjittundu. Plant ippo valare confident aanu.`,
    (n) => `Ente friend-inte friend paranju, ${n} WhatsApp-il “typing...” vechittu pinne onnum ayachilla. Enthina ee drama?`,
    (n) => `Friend paranjatha, ${n} ${pick(detailWords.moments)} slippers align cheythu. Ordinary action alla, mole.`,
  ],
  dramaticReactions: [
    (n) => `Sherikkum?! ${n} ${pick(detailWords.topics)}-ne nokkiyo?! Daivame, breaking news!`,
    (n) => `Ayyo ayyo, ${n} ${pick(detailWords.objects)} eduthappol tiny sound undakki! Nammal prepared aano?`,
    (n) => `Ithu national-level situation aanu. ${n} ${pick(detailWords.moments)} moonu seconds late aayi vannu!`,
    (n) => `Ente ponno! ${n} oru chair choose cheythu. Enthina aa chair? Vere chair enthukondu venda?`,
    (n) => `Breaking breaking breaking: ${n} normal pole nadannu. Normal pole thanne!`,
  ],
  advice: [
    (n) => `${n} aadyam ${pick(detailWords.objects)} clean cheyyuka, pinne life decisions edukkuka.`,
    (n) => `${n}-inu daily five minutes silent sitting venam. Pakshe fan count cheyyumbol silent sitting alla.`,
    (n) => `Advice number one: tea time fix cheyyuka. Number two: ${pick(detailWords.topics)}-ne overanalyse cheyyaruthu.`,
    (n) => `${n} unnecessary thoughts-inu oru notebook vecholu. Page one-il ${pick(detailWords.futures)} ennu ezhutham.`,
    (n) => `Saturday ${pick(detailWords.moments)} ${n} banana chips kondu varanam. Community requirement aanu.`,
  ],
}

Object.entries(extraBanks).forEach(([bank, additions]) => phraseBanks[bank].push(...additions))

const gossipCases = [
  { action: 'tea cup-ne nokki moonu second chirichu', object: 'tea cup', place: 'chaayakkada-yude purathu', theory: 'aarodum parayatha oru tea preference undennu thonnunnu', advice: 'tea order cheyyumbol sugar level clear aayi parayuka' },
  { action: 'mazha illathappol umbrella thurannu nadannu', object: 'umbrella', place: 'bus stop-il', theory: 'weather report already kittiyittundu ennu thonnunnu', advice: 'umbrella edukkumbol sky onnu nokkuka' },
  { action: 'oru plastic chair randu pravashyam thirichu nokki choose cheythu', object: 'plastic chair', place: 'Kudumbashree meeting room-il', theory: 'meeting-il aarude aduthu irikkanam ennu nannayi plan cheythittundu', advice: 'chair choose cheyyumbol athu free aano ennu chodikkuka' },
  { action: 'oru puthiya plant-ine “strong aayi nilkku” ennu paranju', object: 'plant pot', place: 'veetinte gate-inte aduthu', theory: 'plant-ne family member pole treat cheyyunnu', advice: 'plant-inu vellam kodukkunnathu calendar-il mark cheyyuka' },
  { action: 'WhatsApp-il typing kaanichittu message ayachilla', object: 'WhatsApp message', place: 'vaikunneram phone nokki irikkumbol', theory: 'message ezhuthi pinne overthink cheythu maayichu', advice: 'typing start cheythaal message complete cheyyuka' },
  { action: 'coriander evide vechennu marannu pinne fan-ne nokki ninnu', object: 'coriander', place: 'kitchen-il', theory: 'kitchen-il entho valiya planning nadakkunnu ennu thonnunnu', advice: 'coriander-inu oru fixed place vecholu' },
  { action: 'banana chips crispy aano soft aano ennu randu group aakki', object: 'banana chips', place: 'palliyude aduthulla bakery-il', theory: 'snack opinion valare serious aayi edukkunnu', advice: 'chips-ne kurichu opinion parayumbol sample konduvaruka' },
  { action: 'oru steel glass table-il vechittu pinne athu evide vechennu marannu', object: 'steel glass', place: 'Kudumbashree hall-il', theory: 'meeting tension kondaanu small things marakkunnathu', advice: 'steel glass-inu oru fixed spot kodukkuka' },
  { action: 'oru saree colour moonnu pravashyam maatti nokki pinne same colour thanne eduthu', object: 'saree colour', place: 'textile shop-inte munnil', theory: 'decision edukkaan valare time edukkunnu', advice: 'saree choose cheyyumbol randu options mathram nokkuka' },
  { action: 'mango pickle jar thurannu manam nokki pinne veendum adachu', object: 'mango pickle jar', place: 'kitchen counter-inte aduthu', theory: 'pickle fresh aano ennu valare serious aayi check cheythu', advice: 'pickle jar thurakkumbol spoon ready aakki vekku' },
  { action: 'oru old calendar-il innathe date randu pravashyam circle cheythu', object: 'old calendar', place: 'veetinte verandayil', theory: 'date marakkathirikkan extra careful aanu', advice: 'calendar-il oru reminder mathram mathi' },
]

const createGossipCase = (name) => ({ name, ...pick(gossipCases), time: pick(detailWords.moments) })

const meetingFlavor = () => ({
  opener: pick(['Njan parayunnath kettal mathi', 'Enikku appozhe thonni', 'Ente ponno, ithu njan parayathe vayya', 'Ayyo, ee kaaryam paranjillel enikku samadhanam kittilla']),
  openerMl: pick(['ഞാൻ പറയുന്നത് കേട്ടാൽ മതി', 'എനിക്ക് അപ്പോഴേ തോന്നി', 'എന്റെ പൊന്നോ, ഇത് ഞാൻ പറയാതെ വയ്യ', 'അയ്യോ, ഈ കാര്യം പറഞ്ഞില്ലെങ്കിൽ എനിക്ക് സമാധാനം കിട്ടില്ല']),
  reaction: pick(['Ayyo, ente ponno', 'Sherikkum, Daivame', 'Enthina ingane', 'Enikku ithu kandappozhe doubt undayirunnu']),
  reactionMl: pick(['അയ്യോ, എന്റെ പൊന്നോ', 'ശരിക്കും, ദൈവമേ', 'എന്തിനാ ഇങ്ങനെ', 'എനിക്ക് ഇത് കണ്ടപ്പോഴേ സംശയമുണ്ടായിരുന്നു']),
  disagreement: pick(['Alla mole, athalla kaaryam', 'Njan athinodu agree cheyyilla', 'Ithu njan accept cheyyilla', 'Wait, ente theory vere aanu']),
  disagreementMl: pick(['അല്ല മോളേ, അതല്ല കാര്യം', 'ഞാൻ അതിനോട് agree ചെയ്യില്ല', 'ഇത് ഞാൻ accept ചെയ്യില്ല', 'Wait, എന്റെ theory വേറെയാണ്']),
  derailment: pick(['Pakshe athu vittu', 'Anyway, ee case okke pinne nokkam', 'Athu sheri, pakshe main question ithaanu', 'Ippo oru important kaaryam']),
  derailmentMl: pick(['പക്ഷേ അത് വിട്ട്', 'Anyway, ഈ case ഒക്കെ പിന്നെ നോക്കാം', 'അത് ശരി, പക്ഷേ main question ഇതാണ്', 'ഇപ്പോൾ ഒരു important കാര്യം']),
})

const connectedDialogue = [
  (c) => ({ speaker: 0, text: `${c.opener}: ${c.name}-ne kurichu oru kaaryam parayatte... ${c.time} ${c.place}-il ${c.action}. Evidence illa, pakshe ee level confidence vechu njan parayum: ${c.name}-inte common sense innu leave-il aanu.` }),
  (c) => ({ speaker: 1, text: `${c.reaction}, Lissy! ${c.name} ithu casual aayi cheythathaano? Ente calculation prakaram ${c.name}-inte decision-making oru wet biscuit pole aanu. ${c.theory}.` }),
  (c) => ({ speaker: 2, text: `Ente oru friend paranjatha... friend-inte friend-inte neighbour aanu. Avarum ${c.name}-ne ${c.object} sambandhichu kandittundu. Same pattern alla mole, full season aanu.`, }),
  (c) => ({ speaker: 3, text: `${c.reaction}?! ${c.name} ${c.object} veendum?! Daivame, ithu breaking news aanu! Oru tiny choice-ne ithra confidence-ode disaster aakkiyathu talent aanu.` }),
  (c) => ({ speaker: 4, text: `Alla mole, roast mathi. ${c.name} ithu repeat cheyyathirikkan ${c.advice}. Njan parayunnath kettal mathi, allenkil next meeting-il homework konduvaranam.` }),
  (c) => ({ speaker: 0, text: `Calm aakan pattilla, Remya. Puthiya clue undu: ${c.name} ${c.object}-ne nokkiyappol face-il expression undayirunnu. Athu expression alla, confidence-inte unpaid advertisement aanu.` }),
  (c) => ({ speaker: 1, text: `${c.disagreement}! ${c.theory} aanu. Pakshe Lissy, ${c.name} ithu manage cheytha style kandittu future-il ${pick(detailWords.futures)} aakumennu thonnunnu. Qualification onnum venda, confidence mathi.` }),
  (c) => ({ speaker: 2, text: `Ente friend paranjathil correction undu. ${c.name} ${c.object}-ne kandappol onnu thirinjunokki. Athu curiosity alla, swantham comedy kandittu reaction aanennu friend paranju.` }),
  (c) => ({ speaker: 3, text: `Ayyo, thirinjunokkiyo?! First look, second look, pinne nammade meeting! ${c.name}-inte case oru full serial aanu; script weak, confidence strong.` }),
  (c) => ({ speaker: 4, text: `${c.name}, ee case-il ninnu padikkanam. ${c.advice}. Pinne Saturday banana chips konduvaranam; at least snack department-ilenkilum performance kaanikku.` }),
  (c) => ({ speaker: 0, text: `${c.derailment}, nammal ${c.name}-inte ${c.object} alle discuss cheythathu? Ippo banana chips ethi. Sathyam paranjaal ${c.name}-inte life-il oru topic polum straight aayi finish aakilla.` }),
]

const connectedDialogueMalayalam = [
  (c) => ({ speaker: 0, text: `${c.openerMl}: ${c.name}-നെക്കുറിച്ച് ഒരു കാര്യം പറയട്ടെ... ${c.time} ${c.placeMl}-ൽ ${c.actionMl}. തെളിവില്ല, പക്ഷേ ഈ ലെവൽ കോൺഫിഡൻസ് കണ്ടിട്ട് പറയാം: ${c.name}-ന്റെ കോമൺ സെൻസ് ഇന്ന് ലീവിലാണ്.` }),
  (c) => ({ speaker: 1, text: `${c.reactionMl}, ലിസ്സി! ${c.name} ഇത് casual ആയി ചെയ്തതാണോ? എന്റെ കണക്കുപ്രകാരം ${c.name}-ന്റെ decision-making നനഞ്ഞ ബിസ്കറ്റ് പോലെയാണ്. ${c.theoryMl}.` }),
  (c) => ({ speaker: 2, text: `എന്റെ ഒരു ഫ്രണ്ട് പറഞ്ഞതാ... ഫ്രണ്ടിന്റെ ഫ്രണ്ടിന്റെ അയൽക്കാരിയാണ്. ${c.name}-നെ ${c.objectMl}-ന്റെ കാര്യത്തിൽ അവരും കണ്ടിട്ടുണ്ട്. Same pattern അല്ല മോളേ, full season ആണ്.` }),
  (c) => ({ speaker: 3, text: `${c.reactionMl}?! ${c.name} വീണ്ടും ${c.objectMl}-ന്റെ അടുത്തോ?! ദൈവമേ, ഇത് ബ്രേക്കിംഗ് ന്യൂസ് ആണ്! ഒരു tiny choice-നെ ഇത്ര confidence-ോടെ disaster ആക്കിയത് talent ആണ്.` }),
  (c) => ({ speaker: 4, text: `അല്ല മോളേ, roast മതി. ${c.name} ഇത് വീണ്ടും ചെയ്യാതിരിക്കാൻ ${c.adviceMl}. ഞാൻ പറയുന്നത് കേട്ടാൽ മതി; അല്ലെങ്കിൽ അടുത്ത മീറ്റിംഗിൽ homework കൊണ്ടുവരണം.` }),
  (c) => ({ speaker: 0, text: `ശാന്തരാകാൻ പറ്റില്ല, രമ്യ. പുതിയ ക്ലൂ ഉണ്ട്: ${c.name} ${c.objectMl}-നെ നോക്കിയപ്പോൾ മുഖത്ത് ഒരു expression ഉണ്ടായിരുന്നു. അത് expression അല്ല, confidence-ന്റെ unpaid advertisement ആണ്.` }),
  (c) => ({ speaker: 1, text: `${c.disagreementMl}! ${c.theoryMl} ആണ്. പക്ഷേ ലിസ്സി, ${c.name} ഇത് manage ചെയ്ത style കണ്ടിട്ട് ഭാവിയിൽ ${c.futureMl} ആകുമെന്ന് തോന്നുന്നു. Qualification ഒന്നും വേണ്ട, confidence മതി.` }),
  (c) => ({ speaker: 2, text: `എന്റെ ഫ്രണ്ട് പറഞ്ഞതിൽ correction ഉണ്ട്. ${c.name} ${c.objectMl}-നെ കണ്ടപ്പോൾ ഒന്ന് തിരിഞ്ഞുനോക്കി. അത് curiosity അല്ല, സ്വന്തം comedy കണ്ടുള്ള reaction ആണെന്ന് ഫ്രണ്ട് പറഞ്ഞു.` }),
  (c) => ({ speaker: 3, text: `അയ്യോ, തിരിഞ്ഞുനോക്കിയോ?! ആദ്യം ഒരു നോട്ടം, രണ്ടാമത് ഒരു നോട്ടം, പിന്നെ നമ്മുടെ മീറ്റിംഗ്! ${c.name}-ന്റെ കേസ് full serial ആണ്; script weak, confidence strong.` }),
  (c) => ({ speaker: 4, text: `${c.name}, ഈ കേസിൽ നിന്ന് പഠിക്കണം. ${c.adviceMl}. പിന്നെ ശനിയാഴ്ച ബനാന ചിപ്സ് കൊണ്ടുവരണം; snack department-ിലെങ്കിലും performance കാണിക്കൂ.` }),
  (c) => ({ speaker: 0, text: `${c.derailmentMl}, നമ്മൾ ${c.name}-ന്റെ ${c.objectMl} അല്ലേ ചർച്ച ചെയ്തത്? ഇപ്പോൾ ബനാന ചിപ്സും എത്തി. സത്യം പറഞ്ഞാൽ ${c.name}-ന്റെ life-ൽ ഒരു topic പോലും straight ആയി finish ആകില്ല.` }),
]

// Different meeting rhythms keep the aunties from repeating the same choreography.
const conversationArcs = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [0, 2, 3, 1, 5, 4, 7, 6, 8, 10],
  [0, 3, 2, 4, 1, 6, 5, 8, 7, 9, 10],
  [0, 1, 4, 2, 3, 7, 6, 5, 9, 8, 10],
  [0, 2, 1, 5, 3, 6, 4, 8, 7, 10],
  [0, 3, 1, 2, 6, 4, 5, 7, 9, 8],
]

const chooseArc = () => pick(conversationArcs)

const malayalamCaseValues = {
  'tea cup': { objectMl: 'ചായക്കപ്പ്', actionMl: 'ചായക്കപ്പിനെ നോക്കി മൂന്ന് സെക്കന്റ് ചിരിച്ചു', placeMl: 'ചായക്കടയുടെ പുറത്ത്', theoryMl: 'രഹസ്യ ചായ സിഗ്നലാണ്', adviceMl: 'ചായക്കപ്പ് നേരെ വെച്ചിട്ട് മാത്രം കുടിക്കുക', futureMl: 'അന്താരാഷ്ട്ര തേങ്ങാ കൺസൾട്ടന്റ്' },
  umbrella: { objectMl: 'കുട', actionMl: 'മഴയില്ലാത്തപ്പോൾ കുട തുറന്ന് നടന്നു', placeMl: 'ബസ് സ്റ്റോപ്പിൽ', theoryMl: 'കാലാവസ്ഥ നിയന്ത്രിക്കാനുള്ള പരിശീലനമാണ്', adviceMl: 'കുട തുറക്കുന്നതിന് മുമ്പ് ആകാശം നോക്കുക', futureMl: 'ആഗോള കുട സ്ട്രാറ്റജിസ്റ്റ്' },
  'plastic chair': { objectMl: 'പ്ലാസ്റ്റിക് കസേര', actionMl: 'ഒരു പ്ലാസ്റ്റിക് കസേര രണ്ടുതവണ തിരിഞ്ഞുനോക്കി തിരഞ്ഞെടുത്തു', placeMl: 'കുടുംബശ്രീ മീറ്റിംഗ് റൂമിൽ', theoryMl: 'കസേരയ്ക്ക് ഒരു രഹസ്യ ശക്തിയുണ്ടെന്ന് അറിയാം', adviceMl: 'കസേര തിരഞ്ഞെടുക്കുമ്പോൾ കമ്മിറ്റിയെ അറിയിക്കുക', futureMl: 'അനാവശ്യ മീറ്റിംഗുകളുടെ ചീഫ് കോർഡിനേറ്റർ' },
  'plant pot': { objectMl: 'ചെടിച്ചട്ടി', actionMl: 'ഒരു പുതിയ ചെടിയോട് “ശക്തമായി നിൽക്കൂ” എന്ന് പറഞ്ഞു', placeMl: 'വീട്ടിന്റെ ഗേറ്റിന്റെ അടുത്ത്', theoryMl: 'ചെടിയെ ഒരു രഹസ്യ പ്രോജക്ടാക്കി മാറ്റുകയാണ്', adviceMl: 'ചെടിക്ക് ദിവസവും ഹാജർ എടുക്കുക', futureMl: 'പ്രൊഫഷണൽ പ്ലാന്റ് മോട്ടിവേറ്റർ' },
  'WhatsApp message': { objectMl: 'വാട്സ്ആപ്പ് മെസേജ്', actionMl: 'വാട്സ്ആപ്പിൽ ടൈപ്പിംഗ് കാണിച്ചിട്ട് മെസേജ് അയച്ചില്ല', placeMl: 'വൈകുന്നേരം ഫോൺ നോക്കിയിരിക്കുമ്പോൾ', theoryMl: 'മെസേജ് അല്ല, സസ്പെൻസാണ് ടൈപ്പ് ചെയ്തത്', adviceMl: 'ടൈപ്പിംഗ് കാണിച്ചാൽ മെസേജ് പൂർത്തിയാക്കുക', futureMl: 'ചായ സമയത്തിന്റെ ഭാവി മന്ത്രി' },
  coriander: { objectMl: 'മല്ലിയില', actionMl: 'മല്ലിയില എവിടെ വെച്ചെന്ന് മറന്ന് ഫാനിനെ നോക്കി നിന്നു', placeMl: 'അടുക്കളയിൽ', theoryMl: 'അടുക്കളയിലെ സാധനങ്ങളെ മൈൻഡ്-കൺട്രോൾ ചെയ്യുകയാണ്', adviceMl: 'മല്ലിയിലയ്ക്ക് ഒരു സ്ഥിരം വിലാസം നൽകുക', futureMl: 'ജില്ലാതല സ്നാക്ക് അനലിസ്റ്റ്' },
  'banana chips': { objectMl: 'ബനാന ചിപ്സ്', actionMl: 'ബനാന ചിപ്സ് ക്രിസ്പിയാണോ സോഫ്റ്റാണോ എന്ന് രണ്ടായി തിരിച്ചു', placeMl: 'പള്ളിയുടെ അടുത്തുള്ള ബേക്കറിയിൽ', theoryMl: 'സ്നാക്ക് പൊളിറ്റിക്സ് തുടങ്ങുകയാണ്', adviceMl: 'ചിപ്സിനെക്കുറിച്ച് അഭിപ്രായം പറയുമ്പോൾ സാമ്പിൾ കൊണ്ടുവരുക', futureMl: 'കോൺഫിഡന്റ് അഭിപ്രായങ്ങളുടെ സി.ഇ.ഒ' },
  'steel glass': { objectMl: 'സ്റ്റീൽ ഗ്ലാസ്', actionMl: 'ഒരു സ്റ്റീൽ ഗ്ലാസ് മേശയിൽ വെച്ചിട്ട് പിന്നെ എവിടെ വെച്ചെന്ന് മറന്നു', placeMl: 'കുടുംബശ്രീ ഹാളിൽ', theoryMl: 'മീറ്റിംഗ് ടെൻഷൻ കൊണ്ട് ചെറിയ കാര്യങ്ങൾ മറക്കുകയാണ്', adviceMl: 'സ്റ്റീൽ ഗ്ലാസിന് ഒരു സ്ഥിരം സ്ഥലം കൊടുക്കുക', futureMl: 'ജില്ലാതല സ്നാക്ക് അനലിസ്റ്റ്' },
  'saree colour': { objectMl: 'സാരി നിറം', actionMl: 'ഒരു സാരി നിറം മൂന്ന് തവണ മാറ്റിനോക്കി അവസാനം അതേ നിറം തന്നെ എടുത്തു', placeMl: 'ടെക്സ്റ്റൈൽ ഷോപ്പിന്റെ മുന്നിൽ', theoryMl: 'തീരുമാനം എടുക്കാൻ വളരെ സമയം എടുക്കുകയാണ്', adviceMl: 'സാരി തിരഞ്ഞെടുക്കുമ്പോൾ രണ്ട് ഓപ്ഷനുകൾ മാത്രം നോക്കുക', futureMl: 'അനാവശ്യ മീറ്റിംഗുകളുടെ ചീഫ് കോർഡിനേറ്റർ' },
  'mango pickle jar': { objectMl: 'മാങ്ങാ അച്ചാർ ഭരണി', actionMl: 'മാങ്ങാ അച്ചാർ ഭരണി തുറന്ന് മണം നോക്കി വീണ്ടും അടച്ചു', placeMl: 'അടുക്കളയിലെ കൗണ്ടറിന്റെ അടുത്ത്', theoryMl: 'അച്ചാർ ഫ്രഷ് ആണോ എന്ന് വളരെ സീരിയസായി പരിശോധിക്കുകയാണ്', adviceMl: 'അച്ചാർ ഭരണി തുറക്കുമ്പോൾ സ്പൂൺ റെഡിയാക്കി വെക്കുക', futureMl: 'പ്രൊഫഷണൽ പ്ലാന്റ് മോട്ടിവേറ്റർ' },
  'old calendar': { objectMl: 'പഴയ കലണ്ടർ', actionMl: 'പഴയ കലണ്ടറിൽ ഇന്നത്തെ തീയതി രണ്ടുതവണ വട്ടമിട്ടു', placeMl: 'വീടിന്റെ വരാന്തയിൽ', theoryMl: 'തീയതി മറക്കാതിരിക്കാൻ extra careful ആണ്', adviceMl: 'കലണ്ടറിൽ ഒരു reminder മാത്രം മതി', futureMl: 'ചായ സമയത്തിന്റെ ഭാവി മന്ത്രി' },
}

const toMalayalamCase = (caseFile) => ({ ...caseFile, ...(malayalamCaseValues[caseFile.object] || malayalamCaseValues['tea cup']) })

const verdicts = (caseFile) => {
  const { name, object, theory, advice } = caseFile
  const conclusionPool = [
    `${name}-ന്റെ ${object} incident ഒരു ordinary neighbourhood-ന് വളരെ mysterious ആണ്. Meeting unanimous അല്ല, പക്ഷേ എല്ലാവരും watch ചെയ്യാം എന്ന് സമ്മതിച്ചു.`,
    `${name} ഒരു walking mystery novel ആണ്. ഓരോ chapter തുറക്കുമ്പോഴും suspense കൂടുന്നു.`,
    `Meeting conclusion: ${name} harmless ആണ്, പക്ഷേ ${theory} എന്ന theory ഇപ്പോൾ official ആയി.`,
    `${name}-ന്റെ life simple ആണ്, പക്ഷേ നമ്മുടെ interpretation complex ആണ്. ഇതാണ് real story.`,
    `${name} ഓരോ ${object} incident-നും മുമ്പ് dramatic music request ചെയ്യണം. Community standards ആണ്.`,
  ]
  const advicePool = [
    [
       advice,
      'Tea cup table-ൽ വെക്കുന്നതിന് മുമ്പ് clockwise ആണോ എന്ന് check ചെയ്യുക.',
      'Saturday banana chips കൊണ്ടുവരണം. ഇത് suggestion അല്ല, community requirement ആണ്.',
    ],
    [
       'Daily 10-minute face yoga ചെയ്യുക, selfie filter കുറയ്ക്കുക. Community welfare mission ആണ്.',
       'Oru low-maintenance plant വെക്കുക. അത് survive ചെയ്താൽ നീ trustworthy ആണ്.',
       'Saturday 4:12 PM exact door lock check ചെയ്യുക. Paranoid ആണ്, പക്ഷേ safe ആണ്.',
    ],
    [
       'Water intake exactly രണ്ട് litre. Mood swings ആണെങ്കിൽ dehydration ആയിരിക്കാം.',
       'Ceiling fan count-ൽ overanalysis വേണ്ട. അത് വെറും fan ആണ്.',
       'Tea sugar spoon count ചെയ്യുക. കൂടിയാൽ sugar conspiracy theory ആണ്.',
    ],
    [
       'Oru notebook വാങ്ങുക. Daily മൂന്ന് ideas എഴുതുക. Full ആയാൽ actual planning start ചെയ്യുക.',
       'Morning 10-minute sun gazing ചെയ്യുക. Vitamin D free ആണ്, subscription വേണ്ട.',
       'നിനക്കായി ഒരു surprise snack ഒളിപ്പിച്ച് വെക്കുക. ആരും കണ്ടുപിടിച്ചില്ലെങ്കിൽ double win.',
    ],
    [
       'Clockwise assumptions കുറയ്ക്കുക. ചിലപ്പോൾ വെള്ളം വെറുതെ കറങ്ങും.',
       'Strict snack calendar maintain ചെയ്യുക. Schedule ഇല്ലാത്ത chips community unrest ഉണ്ടാക്കും.',
       'Balcony-ൽ ഒരു weird plant വെക്കുക. Neighbours gossip ചെയ്താൽ mission accomplished.',
    ],
  ]
  const finalPool = [
    `Final verdict: ${name} innocent ആണ്... പക്ഷേ ${object} സംബന്ധിച്ച് suspiciously interesting ആണ്!`,
    `Final verdict: ${name} ഒരു soft blockbuster ആണ്. Neighbourhood mind-ൽ daily 8 PM premiere.`,
    `Final verdict: ${name} calm ആയി നിൽക്കൂ, extra banana chips കയ്യിൽ വെച്ചോളൂ.`,
    `Final verdict: ${name}-ന്റെ life normal ആണ്, പക്ഷേ ഈ ${object} case നമ്മുടെ director's cut ആണ്.`,
    `Final verdict: ${name}-നെ gentle monitoring-നും frequent snacking-നും recommend ചെയ്യുന്നു.`,
  ]
  return {
    conclusion: conclusionPool[Math.floor(Math.random() * conclusionPool.length)],
    advice: advicePool[Math.floor(Math.random() * advicePool.length)],
    final: finalPool[Math.floor(Math.random() * finalPool.length)],
  }
}

function buildMeeting(name, length = 11) {
  const caseFile = { ...createGossipCase(name), ...meetingFlavor() }
  const arc = chooseArc()
  const meetingLength = Math.min(length, arc.length)
  return {
    caseFile,
    lines: arc.slice(0, meetingLength).map((index) => connectedDialogueMalayalam[index](toMalayalamCase(caseFile))),
    malayalamLines: arc.slice(0, meetingLength).map((index) => connectedDialogue[index](caseFile)),
  }
}

function App() {
  const [name, setName] = useState('')
  const [activeName, setActiveName] = useState('')
  const [visible, setVisible] = useState(0)
  const [isMeeting, setIsMeeting] = useState(false)
  const [meetingId, setMeetingId] = useState(0)

  const meeting = useMemo(() => activeName ? buildMeeting(activeName) : null, [activeName, meetingId])
  const lines = meeting?.lines || []
  const malayalamLines = meeting?.malayalamLines || []
  const currentSpeaker = lines.length && visible > 0 ? aunties[lines[Math.min(visible - 1, lines.length - 1)].speaker] : null
  const result = useMemo(() => meeting ? verdicts(meeting.caseFile) : null, [meeting])

  useEffect(() => {
    if (!isMeeting || visible >= lines.length) return
    const timer = setTimeout(() => setVisible((count) => count + 1), visible === 0 ? 450 : 1350)
    return () => clearTimeout(timer)
  }, [isMeeting, visible, lines.length])

  useEffect(() => {
    if (isMeeting && visible >= lines.length && lines.length) setIsMeeting(false)
  }, [isMeeting, visible, lines.length])

  function startMeeting(event) {
    event.preventDefault()
    const cleanName = name.trim()
    if (!cleanName) return
    setActiveName(cleanName)
    setVisible(0)
    setMeetingId((id) => id + 1)
    setIsMeeting(true)
  }

  function resetMeeting() {
    setActiveName('')
    setName('')
    setVisible(0)
    setIsMeeting(false)
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-lockup">
          <span className="brand-mark">KS</span>
          <span>KudumbaSree <b>AI</b></span>
        </div>
        <div className="topbar-note"><span className="live-dot" /> FICTIONAL MEETING SIMULATOR</div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">NEIGHBOURHOOD INTELLIGENCE / 01</p>
          <h1>One name.<br /><em>Infinite</em> opinions.</h1>
          <p className="intro">Enter a name. Five Malayalam aunties will audit their entire personality from one tea, one text, and one suspiciously slow reply.</p>
          <form className="name-form" onSubmit={startMeeting}>
            <label htmlFor="person-name">Who are we discussing today?</label>
            <div className="input-row">
              <input id="person-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Type a name..." autoComplete="off" />
              <button type="submit">Start meeting <span>↗</span></button>
            </div>
          </form>
          <p className="form-note">NO EVIDENCE · MAXIMUM ROAST · ZERO APPEAL</p>
        </div>

        <div className="hero-scene" aria-label="Illustration of a Kudumbashree gossip meeting">
          <div className="scene-label">MEETING ROOM / KERALA</div>
          <div className="sun-disc" />
          <div className="palm palm-one">♧</div><div className="palm palm-two">♧</div>
          <div className="meeting-table" />
          <div className="aunty-ring">
            {aunties.map((aunty, index) => <div className={`portrait portrait-${index + 1} ${aunty.color}`} key={aunty.name}><span>{aunty.emoji}</span><small>{aunty.initials}</small></div>)}
          </div>
          <div className="speech-bubble bubble-one">Ayyo!</div>
          <div className="speech-bubble bubble-two">Sherikkum?</div>
          <div className="tea-cup">☕</div>
        </div>
      </section>

      <section className="meeting-section" id="meeting">
        <div className="section-heading">
          <div><p className="eyebrow">THE COURT OF UNNECESSARY OPINIONS</p><h2>{activeName ? `Why is ${activeName} like this?` : 'The agenda is already off-track'}</h2></div>
          <div className="meeting-status"><span className={isMeeting ? 'pulse-dot' : 'status-dot'} /> {isMeeting ? 'AUNTIES ARE TALKING' : activeName ? 'MEETING COMPLETE' : 'WAITING FOR A NAME'}</div>
        </div>

        {!activeName ? <div className="empty-meeting"><span className="empty-number">00</span><p>Nothing is private once the plastic chairs are arranged.<br />Give the aunties a name. We will find the problem.</p></div> : <div className="meeting-layout">
          <div className="chat-area">
            <div className="chat-columns">
            <div className="transcript chat-box">
              <div className="chat-box-heading"><strong>കുടുംബശ്രീ ഗോസിപ്പ്</strong><span>മലയാളം + English</span></div>
              {lines.slice(0, visible).map((line, index) => { const aunty = aunties[line.speaker]; return <article className={`message ${index === visible - 1 && isMeeting ? 'message-active' : ''}`} key={`ml-${index}`}><div className={`message-avatar ${aunty.color}`}>{aunty.emoji}</div><div><div className="message-meta"><strong>{aunty.name}</strong><span>{aunty.role}</span></div><p>{line.text}</p></div></article> })}
            </div>
            <div className="transcript chat-box malayalam-chat">
              <div className="chat-box-heading"><strong>Manglish gossip</strong><span>English letters</span></div>
              {malayalamLines.slice(0, visible).map((line, index) => { const aunty = aunties[line.speaker]; return <article className={`message ${index === visible - 1 && isMeeting ? 'message-active' : ''}`} key={`manglish-${index}`}><div className={`message-avatar ${aunty.color}`}>{aunty.emoji}</div><div><div className="message-meta"><strong>{aunty.name}</strong><span>{aunty.role}</span></div><p>{line.text}</p></div></article> })}
            </div>
            </div>
            <div className="chat-controls">
              {isMeeting && <div className="typing"><i /><i /><i /> {currentSpeaker?.name || 'Aunty'} is preparing evidence...</div>}
              {!isMeeting && <button className="new-meeting" onClick={resetMeeting}>Discuss someone else <span>↗</span></button>}
            </div>
          </div>
          <aside className="verdict-card"><div className="verdict-top"><span>📋</span><p>KUDUMBASHREE<br /><b>VERDICT</b></p></div><div className="verdict-stamp">OFFICIALLY<br />UNNECESSARY</div><p className="verdict-conclusion">{result?.conclusion}</p><h3>Three things {activeName} should do immediately:</h3><ol>{result?.advice.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ol><div className="final-verdict">{result?.final}</div></aside>
        </div>}
      </section>

      <footer><span>Made with chai, confidence &amp; absolutely no evidence.</span><span>⚠ All conversations are fictional parody.</span></footer>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
