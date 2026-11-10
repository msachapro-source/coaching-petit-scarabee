import {days, moments, choices, composition, nutrition, dayTotal, extra} from './menu.js';

const el = id => document.getElementById(id);
const dialog = el('details');
const icons = ['☼','◒','✿','☾'];
const shortDays = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];
const measure = ['kcal','Protéines','Glucides','Lipides'];
const rounded = new Intl.NumberFormat('fr-FR',{maximumFractionDigits:0});
const lastWeek = 52;
const storageKey = 'a-table-menu-v1';
let data = {};
try {
  const parsed = JSON.parse(localStorage.getItem(storageKey));
  if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) data = parsed;
} catch {}
let week = Number.isInteger(data.week) && data.week >= 1 && data.week <= lastWeek ? data.week : 1;
let day = Number.isInteger(data.day) && data.day >= 0 && data.day < days.length ? data.day : 0;
let slot = 0;
let preview = 0;
let opener;
const key = () => week + ':' + day;
function state() {
  const saved = data[key()];
  const picks = moments.map((_,i) => [0,1,2].includes(saved?.picks?.[i]) ? saved.picks[i] : 0);
  const keepPreviousThird = moments.map((_,i) => {
    if (i === 2 || (i === 1 && day < 5)) return false;
    return saved?.keepPreviousThird ? saved.keepPreviousThird[i] === true : picks[i] === 2;
  });
  return {
    picks:picks.map((pick,i) => !saved?.keepPreviousThird && keepPreviousThird[i] ? 1 : pick),
    keepPreviousThird,
    extra:saved?.extra === true
  };
}
function persist(current = state()) {
  data[key()] = current;
  data.week = week;
  data.day = day;
  try {localStorage.setItem(storageKey,JSON.stringify(data));} catch {}
}
function metrics(values, start) {
  return values.slice(start).map((value,i) => {
    const index = i + start;
    return '<div class="metric"><b>' + rounded.format(value) + (index ? ' g' : '') +
      '</b><span>' + measure[index] + '</span></div>';
  }).join('');
}
const quickBadge = '<span class="quick-badge">Version de la flemme</span>';
function render() {
  const current = state();
  el('week').textContent = week;
  el('prev').disabled = week === 1;
  el('next').disabled = week === lastWeek;
  el('selected-day').textContent = days[day];
  el('day-nav').innerHTML = days.map((name,index) =>
    '<button type="button" data-day="'+index+'" aria-label="'+name+'"'+(index===day?' aria-current="true"':'')+'><span class="day-long">'+name+'</span><span class="day-short">'+shortDays[index]+'</span></button>'
  ).join('');
  el('meal-list').innerHTML = moments.map((moment,i) => {
    const meal = choices(week,day,i,current.keepPreviousThird[i])[current.picks[i]];
    return '<button type="button" class="meal" data-slot="'+i+'"><span class="meal-icon" aria-hidden="true">'+icons[i]+'</span><span><span class="meal-label">'+moment+(meal.quick?quickBadge:'')+'</span><span class="meal-name">'+meal.title+'</span></span><span class="meal-meta"><span>'+rounded.format(nutrition(meal)[0])+' kcal</span><b aria-hidden="true">›</b></span></button>';
  }).join('');
  const values = dayTotal(week,day,current.picks,current.extra,current.keepPreviousThird);
  el('day-total').innerHTML = '<div class="energy"><b>'+rounded.format(values[0])+'</b> kcal</div><div class="metrics">'+metrics(values,1)+'</div>';
  el('include-extra').checked = current.extra;
}
function renderDetails() {
  const isExtra = slot === -1;
  const current = state();
  const options = isExtra ? [] : choices(week,day,slot,current.keepPreviousThird[slot]);
  const meal = isExtra ? extra : options[preview];
  el('detail-context').textContent = days[day] + ' · ' + (isExtra ? 'COMPLÉMENT' : moments[slot].toUpperCase());
  el('detail-title').textContent = meal.title;
  el('alternatives').innerHTML = isExtra ? '' :
    '<p class="choice-label">Choisis parmi 3 options</p><div class="choice-list">' +
    options.map((option,i) => '<button type="button" class="choice" data-choice="'+i+'" aria-pressed="'+(i===preview)+'">'+option.title+(option.quick?quickBadge:'')+'<small>'+rounded.format(nutrition(option)[0])+' kcal'+(current.picks[slot]===i?' · Au menu':'')+'</small></button>').join('') + '</div>';
  el('detail-macros').innerHTML = '<div class="metrics detail-metrics">'+metrics(nutrition(meal),0)+'</div>';
  el('ingredients').innerHTML = composition(meal).map(({name,grams}) => '<li><b>'+grams+' g</b> · '+name+'</li>').join('');
  el('step-title').textContent = meal.title.startsWith('CROUS') ? 'Au restaurant' : 'Préparation';
  el('steps').innerHTML = meal.steps.map(step => '<li>'+step+'</li>').join('');
  el('detail-note').textContent = meal.note;
  el('detail-note').hidden = !meal.note;
  el('select-meal').textContent = isExtra
    ? (current.extra ? 'Retirer le complément' : 'Ajouter à la journée')
    : (current.picks[slot] === preview ? 'Fermer la fiche' : 'Choisir ce repas');
}
function openDetails(index,button) {
  slot = index;
  opener = button;
  preview = state().picks[index] ?? 0;
  renderDetails();
  dialog.showModal();
  dialog.scrollTop = 0;
}
el('day-nav').addEventListener('click',event => {
  const button = event.target.closest('[data-day]');
  if (!button) return;
  day = Number(button.dataset.day);
  persist();
  render();
  el('day-nav').querySelector('[aria-current]').focus();
});
el('prev').addEventListener('click',() => {if (week > 1) {week--; persist(); render();}});
el('next').addEventListener('click',() => {if (week < lastWeek) {week++; persist(); render();}});
el('meal-list').addEventListener('click',event => {
  const button = event.target.closest('[data-slot]');
  if (button) openDetails(Number(button.dataset.slot),button);
});
el('open-extra').addEventListener('click',event => openDetails(-1,event.currentTarget));
el('include-extra').addEventListener('change',event => {
  const current = state();
  current.extra = event.target.checked;
  persist(current);
  render();
});
el('alternatives').addEventListener('click',event => {
  const button = event.target.closest('[data-choice]');
  if (!button) return;
  preview = Number(button.dataset.choice);
  renderDetails();
  el('alternatives').querySelector('[aria-pressed="true"]').focus();
});
el('select-meal').addEventListener('click',() => {
  const current = state();
  if (slot === -1) current.extra = !current.extra;
  else current.picks[slot] = preview;
  persist(current);
  render();
  dialog.close();
});
dialog.addEventListener('close',() => {
  const button = opener?.isConnected ? opener : el('meal-list').querySelector('[data-slot="'+slot+'"]');
  button?.focus();
});
render();
