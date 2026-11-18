/*
  EDITE SEUS PROJETOS AQUI.
  - categoria: "Front-end" ou "Games" (para funcionar com os filtros)
  - demo: endereço do site publicado; use "" se ainda não tiver.
  - codigo: repositório correto; use "" se ainda não tiver.
  Os projetos abaixo são EXEMPLOS. Confirme e personalize os links.
*/
const projetos = [
  {
    titulo: 'TravelTech',
    categoria: 'Front-end',
    descricao: 'Interface para explorar destinos e planejar viagens, construída com componentes reutilizáveis.',
    tecnologias: ['React', 'CSS', 'Supabase'],
    codigo: '',
    demo: '',
    arte: 'art-one',
    simbolo: 'i-code',
    rotulo: 'TRAVEL / WEB'
  },
  {
    titulo: 'ClimaTech',
    categoria: 'Front-end',
    descricao: 'Aplicação de previsão do tempo com busca de cidades e informações meteorológicas.',
    tecnologias: ['React', 'JavaScript', 'API'],
    codigo: '',
    demo: '',
    arte: 'art-two',
    simbolo: 'i-spark',
    rotulo: 'CLIMA / APP'
  },
  {
    titulo: 'AvançaFlix',
    categoria: 'Front-end',
    descricao: 'Catálogo de filmes e séries para praticar páginas, componentes, navegação e estilização.',
    tecnologias: ['React', 'Router', 'CSS'],
    codigo: '',
    demo: '',
    arte: 'art-three',
    simbolo: 'i-code',
    rotulo: 'STREAMING / UI'
  },
  {
    titulo: 'Experiências em Unity',
    categoria: 'Games',
    descricao: 'Protótipos de jogos e experiências interativas com foco em desenvolvimento 2D, 3D e imersivo.',
    tecnologias: ['Unity', 'C#', 'Games'],
    codigo: '',
    demo: '',
    arte: 'art-four',
    simbolo: 'i-game',
    rotulo: 'GAME DEV'
  }
];

const grade = document.querySelector('#project-grid');
const contador = document.querySelector('#project-count');
const filtros = document.querySelectorAll('.filter-button');

function elemento(tag, classe, texto) {
  const el = document.createElement(tag);
  if (classe) el.className = classe;
  if (texto !== undefined) el.textContent = texto;
  return el;
}
function adicionarLink(pai, texto, url, icone) {
  if (!url) return;
  let destino;
  try {
    destino = new URL(url);
    if (!['http:', 'https:'].includes(destino.protocol)) return;
  } catch { return; }
  const link = elemento('a', '', texto);
  link.href = destino.href;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.setAttribute('aria-label', `${texto} (abre em nova aba)`);
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class','icon');
  svg.setAttribute('aria-hidden','true');
  const use = document.createElementNS('http://www.w3.org/2000/svg','use');
  use.setAttribute('href',`#${icone}`);
  svg.appendChild(use);
  link.appendChild(svg);
  pai.appendChild(link);
}
function criarCartao(projeto) {
  const card = elemento('article','project-card');
  const art = elemento('div',`project-art ${projeto.arte || 'art-one'}`);
  art.setAttribute('aria-hidden','true');
  const artSvg = document.createElementNS('http://www.w3.org/2000/svg','svg');
  artSvg.setAttribute('class','icon art-icon');
  const artUse = document.createElementNS('http://www.w3.org/2000/svg','use');
  artUse.setAttribute('href',`#${projeto.simbolo || 'i-code'}`);
  artSvg.appendChild(artUse);
  art.append(artSvg,elemento('span','art-label',projeto.rotulo || 'PROJETO'));
  const content = elemento('div','project-content');
  const tipo = elemento('span','project-type',projeto.categoria);
  const titulo = elemento('h3','',projeto.titulo);
  const descricao = elemento('p','',projeto.descricao);
  const tags = elemento('div','project-tags');
  for (const tecnologia of projeto.tecnologias) tags.appendChild(elemento('span','tag',tecnologia));
  const links = elemento('div','project-links');
  adicionarLink(links,'Ver projeto',projeto.demo,'i-external');
  adicionarLink(links,'Código',projeto.codigo,'i-github');
  if (!links.children.length) links.appendChild(elemento('span','project-type','LINKS EM BREVE'));
  content.append(tipo,titulo,descricao,tags,links);
  card.append(art,content);
  return card;
}
function renderizarProjetos(categoria='Todos') {
  const filtrados = categoria === 'Todos' ? projetos : projetos.filter(p => p.categoria === categoria);
  grade.replaceChildren(...filtrados.map(criarCartao));
  contador.textContent = `${filtrados.length} ${filtrados.length === 1 ? 'projeto' : 'projetos'}`;
}
filtros.forEach(botao => botao.addEventListener('click',() => {
  const categoria = botao.dataset.filter;
  filtros.forEach(item => {const ativo = item === botao; item.classList.toggle('active',ativo);item.setAttribute('aria-pressed',String(ativo));});
  renderizarProjetos(categoria);
}));
renderizarProjetos();
document.querySelector('#year').textContent = new Date().getFullYear();


/*
  CURSOS — CADASTRE SEUS CURSOS AQUI QUANDO ESTIVEREM PRONTOS.
  Se deixar vazio, a seção mostrará o aviso "Em breve".
  Para adicionar um curso, copie o modelo abaixo para dentro da lista:

  {
    titulo: 'Nome do curso',
    formato: 'Online ou presencial',
    descricao: 'Uma breve explicação sobre o curso.',
    topicos: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://seusite.com/curso'
  }

  Deixe link como '' se ainda não existir página de inscrição.
*/
const cursos = [];

const gradeCursos = document.querySelector('#course-grid');
const avisoCursos = document.querySelector('#course-empty');
const contadorCursos = document.querySelector('#course-count');

function criarCartaoCurso(curso) {
  const card = elemento('article', 'course-card');
  const topo = elemento('div', 'course-card-top');
  const icone = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  icone.setAttribute('class', 'icon');
  icone.setAttribute('aria-hidden', 'true');
  const uso = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  uso.setAttribute('href', '#i-book');
  icone.appendChild(uso);
  topo.append(icone, elemento('span', 'course-format', curso.formato || 'Curso'));
  const titulo = elemento('h3', '', curso.titulo || 'Curso sem título');
  const descricao = elemento('p', '', curso.descricao || 'Descrição em breve.');
  const tags = elemento('div', 'project-tags');
  for (const topico of (curso.topicos || [])) {
    tags.appendChild(elemento('span', 'tag', topico));
  }
  const rodape = elemento('div', 'course-card-bottom');
  adicionarLink(rodape, 'Conhecer curso', curso.link, 'i-arrow');
  if (!rodape.children.length) {
    rodape.appendChild(elemento('span', 'course-soon', 'Detalhes em breve'));
  }
  card.append(topo, titulo, descricao, tags, rodape);
  return card;
}

function renderizarCursos() {
  const existemCursos = cursos.length > 0;
  gradeCursos.hidden = !existemCursos;
  avisoCursos.hidden = existemCursos;
  contadorCursos.textContent = existemCursos
    ? `${cursos.length} ${cursos.length === 1 ? 'curso' : 'cursos'}`
    : 'Em preparação';
  if (existemCursos) gradeCursos.replaceChildren(...cursos.map(criarCartaoCurso));
}
renderizarCursos();
