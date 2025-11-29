// app.js - funcionalidade de cadastro, filtros e modal
const STORAGE_KEY = 'connectpets_profissionais';
const svcModal = document.getElementById('serviceModal');
const svcTitle = document.getElementById('svcTitle');
const svcDesc = document.getElementById('svcDesc');

function openServiceDetails(title, desc){
  if(!svcModal) return;
  svcTitle.textContent = title;
  svcDesc.textContent = desc;
  svcModal.setAttribute('aria-hidden', 'false');
  svcModal.style.display = 'flex';
}

function closeServiceDetails(){
  if(!svcModal) return;
  svcModal.setAttribute('aria-hidden', 'true');
  svcModal.style.display = 'none';
}

function closeModal(e){
  if(e.target === svcModal) closeServiceDetails();
}

// Form handling e localStorage
function loadProfessionals(){
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch(e){ return []; }
}
function saveProfessionals(list){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list || []));
  renderList();
}

function submitForm(e){
  e.preventDefault();
  const fd = new FormData(e.target);
  const newProf = {
    nome: fd.get('nome').trim(),
    cidade: fd.get('cidade').trim(),
    servico: fd.get('servico').trim(),
    contato: fd.get('contato').trim(),
    descricao: fd.get('descricao').trim(),
    id: Date.now()
  };
  const list = loadProfessionals();
  list.unshift(newProf);
  saveProfessionals(list);
  e.target.reset();
  alert('Profissional cadastrado com sucesso!');
  document.getElementById('lista').scrollIntoView({behavior:'smooth'});
  return false;
}

function renderList(){
  const list = loadProfessionals();
  const container = document.getElementById('listContainer');
  const empty = document.getElementById('emptyNotice');
  const filterCity = document.getElementById('filterCity').value.trim().toLowerCase();
  const filterService = document.getElementById('filterService').value.trim().toLowerCase();

  const filtered = list.filter(p=>{
    const matchCity = filterCity ? (p.cidade || '').toLowerCase().includes(filterCity) : true;
    const matchService = filterService ? (p.servico || '').toLowerCase() === filterService : true;
    return matchCity && matchService;
  });

  container.innerHTML = '';
  if(filtered.length === 0){
    empty.style.display = 'block';
    return;
  } else {
    empty.style.display = 'none';
  }

  filtered.forEach(p=>{
    const card = document.createElement('div');
    card.className = 'prof-card';
    card.innerHTML = ''
      + '<strong>' + escapeHtml(p.nome) + '</strong>'
      + '<div><strong>Serviço:</strong> ' + escapeHtml(p.servico) + '</div>'
      + '<div><strong>Cidade:</strong> ' + escapeHtml(p.cidade) + '</div>'
      + '<div><strong>Contato:</strong> ' + escapeHtml(p.contato) + '</div>'
      + '<p>' + escapeHtml(p.descricao || '—') + '</p>';
    container.appendChild(card);
  });
}

function clearFilters(){
  document.getElementById('filterCity').value = '';
  document.getElementById('filterService').value = '';
  renderList();
}

function escapeHtml(s){
  if(!s) return '';
  return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
}

function fillExample(){
  const sample = {
    nome: 'Mariana Silva',
    cidade: 'São Paulo',
    servico: 'Pet Sitter',
    contato: 'whatsapp: (11) 9xxxx-xxxx',
    descricao: 'Amante dos animais, 5 anos de experiência com cuidados domiciliares.'
  };
  document.getElementById('nome').value = sample.nome;
  document.getElementById('cidade').value = sample.cidade;
  document.getElementById('servico').value = sample.servico;
  document.getElementById('contato').value = sample.contato;
  document.getElementById('descricao').value = sample.descricao;
}

// Listeners filtros
document.addEventListener('DOMContentLoaded', function(){
  const filterCityEl = document.getElementById('filterCity');
  const filterServiceEl = document.getElementById('filterService');
  if(filterCityEl) filterCityEl.addEventListener('input', renderList);
  if(filterServiceEl) filterServiceEl.addEventListener('change', renderList);
  const modalEl = document.getElementById('serviceModal');
  if(modalEl) modalEl.addEventListener('click', closeModal);

  // Inicialização
  if(loadProfessionals().length === 0){
    const demo = [{
      nome: 'Ana Clara',
      cidade: 'Curitiba',
      servico: 'Dog Walker',
      contato: 'ana@exemplo.com | (41) 9xxxx-xxxx',
      descricao: 'Caminhadas diárias, cuidado e socialização.',
      id: Date.now() - 10000
    },{
      nome: 'Lucas Martins',
      cidade: 'Porto Alegre',
      servico: 'Adestrador',
      contato: 'lucas@exemplo.com',
      descricao: 'Adestramento com reforço positivo.',
      id: Date.now() - 8000
    }];
    saveProfessionals(demo);
  } else {
    renderList();
  }
});

