import { useMemo, useState } from 'react';
import { Activity, Apple, Dumbbell, LineChart, Search, Scale } from 'lucide-react';

type Tab = 'overview' | 'training' | 'nutrition' | 'progress';
type FoodCategory = 'Protein' | 'Carbohydrate' | 'Dairy' | 'Fruit' | 'Fat' | 'Legume';

type Food = {
  name: string;
  category: FoodCategory;
  state: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
};

const cards = [
  { label: 'Workouts this week', value: '4', icon: Dumbbell },
  { label: 'Daily protein target', value: '160 g', icon: Apple },
  { label: 'Bodyweight', value: '78.4 kg', icon: Activity },
  { label: 'Progress trend', value: '+3.2%', icon: LineChart },
];

const workouts = [
  ['Upper A', 'Incline press · Row · Lateral raise'],
  ['Lower', 'Squat · Romanian deadlift · Calf raise'],
  ['Upper B', 'Pulldown · Chest press · Curl'],
];

const foods: Food[] = [
  { name: 'Chicken breast', category: 'Protein', state: 'cooked, skinless', kcal: 165, protein: 31.0, carbs: 0, fat: 3.6 },
  { name: 'Turkey breast', category: 'Protein', state: 'roasted, skinless', kcal: 135, protein: 29.0, carbs: 0, fat: 1.6 },
  { name: 'Egg', category: 'Protein', state: 'whole', kcal: 143, protein: 12.6, carbs: 0.7, fat: 9.5 },
  { name: 'Egg white', category: 'Protein', state: 'plain', kcal: 52, protein: 10.9, carbs: 0.7, fat: 0.2 },
  { name: 'Atlantic salmon', category: 'Protein', state: 'cooked', kcal: 206, protein: 22.1, carbs: 0, fat: 12.4 },
  { name: 'Tuna', category: 'Protein', state: 'canned in water, drained', kcal: 116, protein: 25.5, carbs: 0, fat: 0.8 },
  { name: 'Cod', category: 'Protein', state: 'cooked', kcal: 89, protein: 19.9, carbs: 0, fat: 0.7 },
  { name: 'Greek yogurt', category: 'Dairy', state: 'plain, non-fat', kcal: 59, protein: 10.3, carbs: 3.6, fat: 0.4 },
  { name: 'Skyr', category: 'Dairy', state: 'plain', kcal: 63, protein: 11.0, carbs: 4.0, fat: 0.2 },
  { name: 'Cottage cheese', category: 'Dairy', state: 'low-fat', kcal: 82, protein: 11.1, carbs: 3.4, fat: 2.3 },
  { name: 'White rice', category: 'Carbohydrate', state: 'cooked', kcal: 130, protein: 2.7, carbs: 28.2, fat: 0.3 },
  { name: 'Potato', category: 'Carbohydrate', state: 'boiled', kcal: 87, protein: 1.9, carbs: 20.1, fat: 0.1 },
  { name: 'Sweet potato', category: 'Carbohydrate', state: 'baked', kcal: 90, protein: 2.0, carbs: 20.7, fat: 0.2 },
  { name: 'Oats', category: 'Carbohydrate', state: 'dry', kcal: 379, protein: 13.2, carbs: 67.7, fat: 6.5 },
  { name: 'Whole-wheat bread', category: 'Carbohydrate', state: 'typical loaf', kcal: 247, protein: 12.5, carbs: 41.4, fat: 3.4 },
  { name: 'Pasta', category: 'Carbohydrate', state: 'cooked', kcal: 158, protein: 5.8, carbs: 30.9, fat: 0.9 },
  { name: 'Quinoa', category: 'Carbohydrate', state: 'cooked', kcal: 120, protein: 4.4, carbs: 21.3, fat: 1.9 },
  { name: 'Lentils', category: 'Legume', state: 'cooked', kcal: 116, protein: 9.0, carbs: 20.1, fat: 0.4 },
  { name: 'Chickpeas', category: 'Legume', state: 'cooked', kcal: 164, protein: 8.9, carbs: 27.4, fat: 2.6 },
  { name: 'Banana', category: 'Fruit', state: 'raw', kcal: 89, protein: 1.1, carbs: 22.8, fat: 0.3 },
  { name: 'Apple', category: 'Fruit', state: 'raw, with skin', kcal: 52, protein: 0.3, carbs: 13.8, fat: 0.2 },
  { name: 'Blueberries', category: 'Fruit', state: 'raw', kcal: 57, protein: 0.7, carbs: 14.5, fat: 0.3 },
  { name: 'Avocado', category: 'Fat', state: 'raw', kcal: 160, protein: 2.0, carbs: 8.5, fat: 14.7 },
  { name: 'Olive oil', category: 'Fat', state: 'extra virgin', kcal: 884, protein: 0, carbs: 0, fat: 100 },
  { name: 'Almonds', category: 'Fat', state: 'raw', kcal: 579, protein: 21.2, carbs: 21.6, fat: 49.9 },
];

function App() {
  const [tab, setTab] = useState<Tab>('overview');
  const [foodQuery, setFoodQuery] = useState('');
  const [category, setCategory] = useState<'All' | FoodCategory>('All');
  const [sourceFood, setSourceFood] = useState('White rice');
  const [targetFood, setTargetFood] = useState('Potato');
  const [sourceGrams, setSourceGrams] = useState(100);

  const tabs = useMemo(() => [
    ['overview', 'Overview'],
    ['training', 'Training'],
    ['nutrition', 'Nutrition'],
    ['progress', 'Progress'],
  ] as const, []);

  const filteredFoods = foods.filter(food => {
    const matchesQuery = food.name.toLowerCase().includes(foodQuery.toLowerCase());
    const matchesCategory = category === 'All' || food.category === category;
    return matchesQuery && matchesCategory;
  });

  const source = foods.find(food => food.name === sourceFood) ?? foods[0];
  const target = foods.find(food => food.name === targetFood) ?? foods[0];
  const sourceCalories = (source.kcal * Math.max(sourceGrams, 0)) / 100;
  const equivalentGrams = target.kcal > 0 ? (sourceCalories / target.kcal) * 100 : 0;

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brandMark">T</div>
          <div><strong>TITÁN</strong><span>Open Core</span></div>
        </div>
        <nav>
          {tabs.map(([id, label]) => (
            <button className={tab === id ? 'active' : ''} onClick={() => setTab(id)} key={id}>{label}</button>
          ))}
        </nav>
        <div className="sideNote">
          <p>Early-stage open-source edition focused on a clean, extensible fitness foundation.</p>
        </div>
      </aside>

      <main>
        <header>
          <div>
            <p className="eyebrow">OPEN-SOURCE FITNESS STARTER</p>
            <h1>{tabs.find(([id]) => id === tab)?.[1]}</h1>
          </div>
          <div className="status">v0.2 · in active development</div>
        </header>

        {tab === 'overview' && <>
          <section className="hero">
            <div>
              <p className="eyebrow">BUILD · TRACK · ITERATE</p>
              <h2>A simple foundation for training, nutrition and progress tracking.</h2>
              <p>TITÁN Open Core is an early-stage project designed to evolve in public with a modular architecture and a clear contributor path.</p>
            </div>
            <Dumbbell size={82} strokeWidth={1.2} />
          </section>
          <section className="grid">
            {cards.map(({label, value, icon: Icon}) => (
              <article className="card" key={label}><Icon size={22}/><span>{label}</span><strong>{value}</strong></article>
            ))}
          </section>
        </>}

        {tab === 'training' && <section className="panel">
          <h2>Training plan</h2>
          <p className="muted">A basic example plan for the public starter edition.</p>
          <div className="list">{workouts.map(([name, detail], i) => (
            <div className="row" key={name}><span className="badge">{i + 1}</span><div><strong>{name}</strong><small>{detail}</small></div></div>
          ))}</div>
        </section>}

        {tab === 'nutrition' && <div className="nutritionLayout">
          <section className="panel nutritionPanel">
            <div className="sectionHeading">
              <div>
                <h2>Food library</h2>
                <p className="muted">Reference values per 100 g. Use them as a practical comparison tool, not as product-label replacements.</p>
              </div>
              <span className="foodCount">{filteredFoods.length} foods</span>
            </div>

            <div className="nutritionTools">
              <label className="searchBox">
                <Search size={17}/>
                <input value={foodQuery} onChange={e => setFoodQuery(e.target.value)} placeholder="Search foods" />
              </label>
              <select value={category} onChange={e => setCategory(e.target.value as 'All' | FoodCategory)}>
                <option>All</option>
                <option>Protein</option>
                <option>Carbohydrate</option>
                <option>Dairy</option>
                <option>Fruit</option>
                <option>Fat</option>
                <option>Legume</option>
              </select>
            </div>

            <div className="foodTableWrap">
              <table className="foodTable">
                <thead><tr><th>Food</th><th>kcal</th><th>Protein</th><th>Carbs</th><th>Fat</th></tr></thead>
                <tbody>{filteredFoods.map(food => (
                  <tr key={food.name}>
                    <td><strong>{food.name}</strong><small>{food.state}</small></td>
                    <td>{food.kcal}</td>
                    <td>{food.protein.toFixed(1)} g</td>
                    <td>{food.carbs.toFixed(1)} g</td>
                    <td>{food.fat.toFixed(1)} g</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
            <p className="dataNote">Values are representative food-composition references and can vary by brand, variety, preparation and water content. Cooked/raw state is shown because it materially affects values per 100 g.</p>
          </section>

          <section className="panel equivalencePanel">
            <div className="equivalenceTitle"><Scale size={22}/><div><h2>Calorie equivalence</h2><p className="muted">Compare portions with approximately the same energy.</p></div></div>
            <div className="equivalenceForm">
              <label>From<select value={sourceFood} onChange={e => setSourceFood(e.target.value)}>{foods.map(food => <option key={food.name}>{food.name}</option>)}</select></label>
              <label>Portion (g)<input type="number" min="0" value={sourceGrams} onChange={e => setSourceGrams(Number(e.target.value))}/></label>
              <label>Equivalent food<select value={targetFood} onChange={e => setTargetFood(e.target.value)}>{foods.map(food => <option key={food.name}>{food.name}</option>)}</select></label>
            </div>
            <div className="equivalenceResult">
              <span>{sourceGrams || 0} g {source.name}</span>
              <strong>≈ {Math.round(equivalentGrams)} g {target.name}</strong>
              <small>Both provide about {Math.round(sourceCalories)} kcal.</small>
            </div>
            <p className="dataNote">This equivalence matches calories only. Protein, carbohydrate, fat, fibre and micronutrients can be very different between foods.</p>
          </section>
        </div>}

        {tab === 'progress' && <section className="panel">
          <h2>Progress</h2>
          <p className="muted">Static sample data in the current public edition.</p>
          <div className="progressBox">
            <div><span>Weight</span><strong>78.4 kg</strong></div>
            <div><span>Waist</span><strong>84 cm</strong></div>
            <div><span>Workouts</span><strong>4 / week</strong></div>
            <div><span>Adherence</span><strong>86%</strong></div>
          </div>
        </section>}
      </main>
    </div>
  );
}

export default App;
