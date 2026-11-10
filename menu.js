/* Grammes et repères nutritionnels arrondis par 100 g d'aliment. */
const foods = {
  blanc: ['Fromage blanc nature', 55, 7, 4, 1],
  whey: ['Whey (1 scoop = 30 g, hypothèse)', 380, 70, 10, 6.7],
  skyr: ['Skyr nature', 60, 10, 4, .4],
  pomme: ['Pomme', 52, .3, 11.6, .2],
  poire: ['Poire', 57, .4, 12.1, .2],
  kiwi: ['Kiwi', 61, 1, 11, .5],
  orange: ['Orange', 47, .9, 9, .2],
  fruits: ['Fruits rouges', 48, 1, 8, .5],
  compote: ['Compote de pommes sans sucres ajoutés', 55, .2, 12, .1],
  avoine: ['Flocons d’avoine', 370, 13, 59, 7],
  noix: ['Noix', 680, 15, 7, 65],
  pain: ['Pain complet', 245, 9, 42, 3],
  steak: ['Steak haché (poids cru estimé)', 180, 20, 0, 11],
  boeuf: ['Bœuf haché cru', 150, 21, 0, 7],
  poulet: ['Filet de poulet cru', 110, 23, 0, 2],
  dinde: ['Filet de dinde cru', 110, 24, 0, 1.6],
  poisson: ['Filet de colin cru', 85, 19, 0, 1],
  sardine: ['Sardines égouttées', 200, 24, 0, 11],
  oeufs: ['Œufs sans coquille (100 g ≈ 2 œufs)', 145, 13, .7, 10],
  riz: ['Riz cru', 355, 7, 78, 1],
  rizCuit: ['Riz cuit', 130, 2.6, 28, .3],
  semoule: ['Semoule crue', 355, 12, 72, 1.5],
  pommes: ['Pommes de terre (poids cru)', 78, 2, 16, .1],
  pommesCuites: ['Pommes de terre cuites', 85, 2, 18, .1],
  lentilles: ['Lentilles cuites', 115, 9, 16, .5],
  courgette: ['Courgettes', 18, 1.2, 2.1, .3],
  haricots: ['Haricots verts', 32, 1.8, 4, .3],
  brocoli: ['Brocoli', 35, 2.8, 3.8, .4],
  legumes: ['Légumes variés', 35, 1.5, 5, .4],
  crudites: ['Crudités (tomate, concombre, carotte)', 25, 1, 4, .2],
  carotte: ['Carottes', 40, .8, 7, .2],
  coulis: ['Coulis de tomate nature', 32, 1.5, 5, .3],
  olive: ['Huile d’olive', 900, 0, 0, 100],
  colza: ['Huile de colza', 900, 0, 0, 100],
  citron: ['Jus de citron', 24, .4, 2.5, .2],
  paprika: ['Paprika', 280, 14, 19, 13]
};
const recipe = (title, ingredients, steps, note = '') => ({title, ingredients, steps, note});
const breakfast = [
  recipe('Fromage blanc & whey', [['blanc',200],['whey',30]], ['Mélanger la whey avec quelques cuillères de fromage blanc.', 'Incorporer le reste du fromage blanc.'], 'Base habituelle. Les quantités et la composition de la scoop sont des hypothèses à vérifier sur les étiquettes.'),
  recipe('Fromage blanc, whey & fruits rouges', [['blanc',200],['whey',30],['fruits',100]], ['Préparer le mélange habituel, puis ajouter les fruits rouges frais ou décongelés.'], 'Même base, avec une garniture facultative.'),
  recipe('Fromage blanc, whey & avoine', [['blanc',200],['whey',30],['avoine',35]], ['Mélanger le fromage blanc et la whey. Ajouter les flocons et laisser reposer quelques minutes si tu les préfères souples.'], 'Même base, avec des flocons facultatifs.')
];
const crousNote = 'Plateau indicatif selon le menu. Les portions, les sauces et la cuisson du CROUS peuvent changer les valeurs. Un steak haché de 100 g représente ici 20 g de protéines pour le steak seul.';
const crous = [
  recipe('CROUS · Steak, riz & légumes', [['steak',100],['rizCuit',200],['legumes',150],['olive',10],['pomme',150]], ['Si le steak est proposé, le prendre avec le féculent et les légumes du jour.', 'Le modèle compte un fruit et 10 g de matière grasse de cuisson ou d’assaisonnement.'], crousNote),
  recipe('CROUS · Poisson, pommes de terre & légumes', [['poisson',100],['pommesCuites',230],['haricots',150],['olive',10],['orange',150]], ['Choisir le poisson quand il est proposé et garder l’accompagnement de féculents et de légumes.', 'Les valeurs correspondent à un filet nature avec le plateau indiqué.'], crousNote),
  recipe('CROUS · Deux œufs, riz & légumes', [['oeufs',100],['rizCuit',200],['legumes',150],['olive',10],['poire',150]], ['Prendre l’option aux œufs si elle existe, avec la garniture et le fruit.', 'Si la portion servie est petite, tu peux sélectionner le goûter à 250 g de skyr.'], crousNote)
];
const lunches = [
  recipe('Bowl poulet, semoule & légumes', [['poulet',90],['semoule',70],['legumes',200],['olive',10],['pomme',150]], ['Réhydrater la semoule selon le paquet.', 'Faire revenir le poulet jusqu’à cuisson à cœur et cuire les légumes.', 'Assembler le bowl. Garder la pomme pour le dessert.']),
  recipe('Œufs, lentilles & pain complet', [['oeufs',100],['lentilles',120],['pain',60],['crudites',200],['colza',10],['orange',150]], ['Cuire les œufs durs, puis les couper.', 'Assaisonner les lentilles et les crudités avec l’huile de colza. Servir avec le pain et le fruit.']),
  recipe('Salade de sardines & pommes de terre', [['sardine',90],['pommes',300],['crudites',200],['olive',10],['citron',15],['poire',150]], ['Cuire les pommes de terre à l’eau, puis les couper.', 'Ajouter les sardines égouttées et les crudités. Assaisonner d’huile et de citron. Garder la poire pour le dessert.'])
];
const dinners = [
  recipe('Poulet citron-paprika, riz & courgettes', [['poulet',120],['riz',75],['courgette',200],['olive',10],['citron',15],['paprika',2]], ['Cuire le riz.', 'Couper les courgettes et les faire revenir. Assaisonner le poulet au citron et au paprika et le cuire à cœur.']),
  recipe('Filet de colin, pommes de terre & haricots verts', [['poisson',145],['pommes',300],['haricots',200],['olive',5]], ['Cuire les pommes de terre à l’eau et les haricots à la vapeur.', 'Cuire le colin à cœur à la poêle et servir avec l’huile d’olive.']),
  recipe('Salade tiède d’œufs & lentilles', [['oeufs',100],['lentilles',180],['pain',50],['crudites',200],['colza',10]], ['Cuire les œufs durs et réchauffer les lentilles.', 'Mélanger les lentilles, les crudités et l’huile. Ajouter les œufs et servir avec le pain.']),
  recipe('Riz à la bolognaise de bœuf', [['boeuf',110],['riz',75],['coulis',150],['carotte',150],['olive',5]], ['Cuire le riz. Faire revenir les carottes émincées avec l’huile.', 'Ajouter le bœuf et le cuire à cœur. Verser le coulis, laisser mijoter et servir sur le riz.']),
  recipe('Lentilles, œufs & brocoli', [['lentilles',220],['oeufs',100],['brocoli',200],['riz',60],['olive',10]], ['Cuire le riz et le brocoli. Réchauffer les lentilles égouttées.', 'Cuire les œufs durs ou à la poêle. Assembler le bol et ajouter l’huile d’olive.']),
  recipe('Tartines de sardines & crudités', [['sardine',100],['pain',80],['crudites',200],['olive',10],['citron',15]], ['Griller le pain et écraser les sardines dessus.', 'Servir avec les crudités assaisonnées d’huile et de citron.']),
  recipe('Dinde, semoule & légumes rôtis', [['dinde',110],['semoule',75],['legumes',200],['olive',10]], ['Rôtir les légumes avec l’huile. Réhydrater la semoule.', 'Cuire la dinde à cœur à la poêle et servir avec les légumes.'])
];
const fruits = ['pomme','poire','kiwi','pomme','orange','poire','kiwi'];
function snack(fruit, grams) {
  return recipe('Skyr & ' + foods[fruit][0].toLowerCase(), [['skyr',grams],[fruit,fruit==='kiwi'?100:150]], ['Verser le skyr dans un bol. Laver ou peler le fruit et servir.']);
}
const snacks = (day, shift) => [
  snack(fruits[(day + shift) % fruits.length], day < 5 ? 200 : 150),
  recipe('Skyr, fruits rouges & avoine', [['skyr',200],['fruits',100],['avoine',35]], ['Mélanger le skyr et les flocons. Ajouter les fruits rouges frais ou décongelés.']),
  recipe('Skyr 250 g, poire & noix', [['skyr',250],['poire',150],['noix',15]], ['Couper la poire et la servir avec le skyr et les noix.'], 'Option à 250 g de skyr si le déjeuner a été léger en protéines, selon la faim.')
];
const quickRecipe = (title, ingredients, steps, note = '') =>
  ({...recipe(title, ingredients, steps, note), quick:true});

const quickBreakfast = quickRecipe('Fromage blanc, whey & compote',
  [['blanc',200],['whey',30],['compote',100]],
  ['Mélanger le fromage blanc et la whey. Ajouter la compote.'],
  'Même base habituelle. Environ 2 min, sans cuisson.');

const quickLunch = quickRecipe('Salade express de lentilles & sardines',
  [['lentilles',200],['sardine',70],['pain',60],['carotte',100],['citron',15]],
  ['Rincer et égoutter les lentilles en boîte. Ajouter les sardines égouttées et la carotte râpée.', 'Assaisonner au citron et servir avec le pain.'],
  'Environ 5 min, sans cuisson. Les lentilles et les sardines peuvent sortir du placard.');

const quickDinners = [
  quickRecipe('Omelette, lentilles & tartines',
    [['oeufs',100],['lentilles',160],['pain',60],['olive',5]],
    ['Battre les œufs et les cuire à la poêle avec l’huile. Réchauffer les lentilles en boîte, puis servir avec le pain.'],
    'Environ 10 min. Une poêle et des lentilles en boîte.'),
  quickRecipe('Bol de riz, sardines & haricots verts',
    [['rizCuit',200],['sardine',100],['haricots',150],['citron',15]],
    ['Réchauffer le riz déjà cuit et les haricots verts surgelés en suivant leurs indications.', 'Ajouter les sardines égouttées et le citron.'],
    'Environ 8 min avec du riz déjà cuit ou précuit et des haricots verts surgelés.')
];
const quickCrous = {...crous[2], quick:true};

function withQuick(options, quick, keepPreviousThird) {
  return [options[0], options[keepPreviousThird ? 2 : 1], quick];
}
function rotateThree(pool, index) {
  return [0,1,2].map(offset => pool[(index + offset) % pool.length]);
}
export const days = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];
export const moments = ['Petit-déjeuner','Déjeuner','Goûter','Dîner'];
export function choices(week, day, slot, keepPreviousThird = false) {
  const shift = (week - 1) % 7;
  if (slot === 0) return withQuick(breakfast, quickBreakfast, keepPreviousThird);
  if (slot === 1 && day < 5) {
    return rotateThree(crous, ([0,1,0,0,1][day] + shift) % 3)
      .map(option => option === crous[2] ? quickCrous : option);
  }
  if (slot === 1) return withQuick(rotateThree(lunches, (day - 5 + shift) % 3), quickLunch, keepPreviousThird);
  if (slot === 2) {
    const options = snacks(day, shift);
    return [{...options[0], quick:true}, options[1], options[2]];
  }
  return withQuick(rotateThree(dinners, (day + shift) % 7), quickDinners[(day + shift) % 2], keepPreviousThird);
}
export const extra = recipe('Pain complet, poire & noix', [['pain',60],['poire',150],['noix',25]], ['Servir le pain avec la poire et les noix.'], 'Complément à répartir sur la journée selon la faim, les séances et les portions réellement servies.');
export function composition(meal) {
  return meal.ingredients.map(([id, grams]) => ({name:foods[id][0], grams}));
}
export function nutrition(meal) {
  return meal.ingredients.reduce((total,[id, grams]) =>
    total.map((value,i) => value + foods[id][i+1] * grams / 100), [0,0,0,0]);
}
export function dayTotal(week, day, selections, includeExtra, keepPreviousThird = []) {
  const meals = moments.map((_,slot) => choices(week,day,slot,keepPreviousThird[slot])[selections[slot] ?? 0]);
  if (includeExtra) meals.push(extra);
  return meals.map(nutrition).reduce((a,b) => a.map((n,i) => n + b[i]), [0,0,0,0]);
}
