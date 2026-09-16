import { useMemo, useState } from 'react';
import { Activity, Apple, Dumbbell, LineChart } from 'lucide-react';

type Tab = 'overview' | 'training' | 'nutrition' | 'progress';

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

const meals = [
  ['Breakfast', 'Greek yogurt · oats · berries'],
  ['Lunch', 'Potatoes · chicken · vegetables'],
  ['Dinner', 'Fish · salad · olive oil'],
];

function App() {
  const [tab, setTab] = useState<Tab>('overview');
  const tabs = useMemo(() => [
    ['overview', 'Overview'],
    ['training', 'Training'],
    ['nutrition', 'Nutrition'],
    ['progress', 'Progress'],
  ] as const, []);

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
          <div className="status">v0.1 · in active development</div>
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

        {tab === 'nutrition' && <section className="panel">
          <h2>Nutrition</h2>
          <p className="muted">Simple meal examples and targets for demonstration purposes.</p>
          <div className="list">{meals.map(([name, detail]) => (
            <div className="row" key={name}><Apple size={20}/><div><strong>{name}</strong><small>{detail}</small></div></div>
          ))}</div>
        </section>}

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
