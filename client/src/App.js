
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [state, setstate] = useState(null)
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((state) => {
        console.log(state);
        setstate(state.message)
      }
      ).catch((err)=>{
        console.log(err);
      })
  }, [])
  // console.log(state);
  return (

    < div className="App" >
      <h1>Home</h1>
      <p>{!state ? "Loading" : state}</p>
    </div >
  );
}

export default App;
