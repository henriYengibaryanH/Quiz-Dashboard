import {useCallback, useEffect, useState} from "react";
import Card from "./Card";
import {Product} from "../../App";

type Props ={
    recommendations:number[][]
}

 export default function FinalPage({recommendations}:Props){

     useEffect(() => {
         getProducts()
     }, []);
    const[ finalProduct ,setFinalProduct] = useState<Product[]>([])



     const getProducts = useCallback(async () => {
                if(recommendations.length<1){
                    return
                }
             const responses = await Promise.all(
                 recommendations[0].map((id) =>
                      fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
                 )
             )

             const products = await Promise.all(
                 responses.map((res) => res.json())
             )

             setFinalProduct(products)
     }, [recommendations])


    return (<div style={{display:'flex',flexDirection:'column',width:'100%',height:'100%',gap:15,alignItems:'center'}}>
        <span style={{fontSize:26, color:'gray'}}>Lorem Ispum is Lorem</span>
        <span style={{fontSize:14 ,color:'gray' }}> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</span>
        <span style={{fontSize:20 , color:'gray'}}>Product we recomended for you</span>

        <div style={{display:'flex',flexDirection:'row',overflowX:'hidden',maxHeight:430,maxWidth:620,overflow:'auto',gap:10
        }}>
            {finalProduct.map((el)=>{
                return <Card image={el.images[0]} title={el.title} price={el.price}/>
            })}
        </div>

    </div>)
 }