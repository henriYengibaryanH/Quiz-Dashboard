type Props = {
onchange:()=>void
}
export default  function WelcomePage({onchange}:Props){

    return <div style={{display:'flex',flexDirection:'column',gap:20,alignItems:'center',justifyContent:'center',width:'100%',height:'100%', paddingBottom:120}}>
    <span style={{fontSize:25,fontWeight:400,color:'black' ,fontStyle:'italic'}}>FIND OUT YOUR HAIR TYPE</span>
        <span style={{width:400,fontSize:'14px',fontWeight:400,color:'gray'}}> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</span>
        <button style={{cursor:'pointer',width:180,height:40,borderRadius:'8px',backgroundColor:'black',color:'white',fontSize:14}} onClick={onchange}>Take Our Quiz</button>
    </div>
}