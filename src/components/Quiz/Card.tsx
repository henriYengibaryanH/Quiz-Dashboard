type Props ={
    image:string,title:string,price:number
}
export default function Card({image,title,price}:Props){
    return (<div style={{display:'flex',flexDirection:'column',gap:10,border:'1px solid gray',justifyContent:'space-between',alignItems:'center'}}>
        <img width={200} height={180} src={image} alt={title}/>
        <span style={{fontSize:14}}>{title}</span>
        <button style={{width:160,height:30,background:'black',color:'white',borderRadius:'8px'}}>Add to Card</button>
        <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
        </span>

    </div>)

}