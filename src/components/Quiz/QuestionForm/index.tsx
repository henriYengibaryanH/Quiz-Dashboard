type Props ={
    question:string
}
export default function QuestionForm({question}:Props){


    return <span style={{fontSize:'25px' , fontWeight:500 , color:'gray'}}>{question }</span>
}