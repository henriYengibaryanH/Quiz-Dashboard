import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import Dashboard from "./components/Dashboard";
import Quiz from "./components/Quiz";
export type Product = {
  id: number
  title: string
  slug: string
  price: number
  description: string
  category:  {
    id: number
    name: string
    image: string
    slug: string
  }
  images: string[]
}
function App() {
  const [adminView,setAdminVieew] =useState(false)
  const onMoveToDashboardView = ()=>setAdminVieew(true)
  const onMoveToQuizView = ()=>setAdminVieew(false)
  const [products,setProducts] = useState<Product[]>([])
  const getProducts =useCallback(async ()=>{
    const response = await  fetch('https://api.escuelajs.co/api/v1/products')

    if(response){
      const res =  await response.json()
      setProducts(res)
    }
  },[])
  useEffect(() => {
    getProducts()
  }, []);

  return (
    <div className="App">
      <div className={'routerDiv'}>
        <button onClick={onMoveToDashboardView}>Dashboard</button>
        <button onClick={onMoveToQuizView}>Quiz</button>
      </div>
        <div style={{display:'flex',width:'70%',height:'60%',padding:50 , alignItems:'center',justifyContent:'center',border:'1px solid gray'}}>

        {adminView ? <Dashboard products={products}/> : <Quiz/>}
        </div>

    </div>
  );
}

export default App;
