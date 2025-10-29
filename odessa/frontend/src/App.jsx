<<<<<<< HEAD
import React from 'react'
import './App.css'

export default function App() {
  return (
    <div style={{maxWidth:800, margin:'2rem auto'}}>
      <h1>Odessa - Frontend</h1>
      <p>Usa el menú para iniciar sesión y ver los lotes.</p>
    </div>
  )
}
=======
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
    </>
  );
}

export default App;
>>>>>>> eda8afd64bb009ae7c33eed6d7bc5721e509975d
