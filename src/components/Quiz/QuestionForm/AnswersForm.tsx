type Props={
    inputType:string,
    answer: { value:string,recomended:number[] }
    onSelect:(value: { value:string,recomended:number[] })=>void
    selected:boolean
}
export default function AnswersForm({inputType,answer,onSelect,selected}:Props){
    return (<div style={{display:'grid',gridTemplateColumns:'auto auto',alignItems:'center',justifyContent:'center'}}>
        {inputType !== 'button' && <span>{answer.value as string}</span>}
         <input onClick={()=>onSelect(answer) } style={{backgroundColor:selected ? 'black' :'white', maxWidth:inputType === 'checkbox' ? 40 : 140,maxHeight:inputType === 'checkbox' ? 30 : 30,color:selected ? 'white':'black'}}  type={inputType} value={answer.value} />
    </div>)
}
