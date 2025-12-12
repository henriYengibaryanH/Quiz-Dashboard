import { useEffect, useMemo, useState} from "react";
import {Scheme} from "../Dashboard";
import QuestionForm from "./QuestionForm";
import AnswersForm from "./QuestionForm/AnswersForm";
import WelcomePage from "./WelcomePage";
import FinalPage from "./FinalPage";


export default function Quiz(){
 const [list,setList] = useState<Scheme[]>([])
    const [recomendationIds,setRecomendataionIds] =useState<number[][]>([])
    const [isFinished,setIsFinished] = useState(false);
    const [selected,setSelected ] = useState<string[]>([])
    const [current,setCurrent] = useState(0)
    const [isStarted,setIsStarted] = useState(false)
    const handleSave=()=>{
       localStorage.removeItem('questionList')
        setIsFinished(true)
    }
    const handleStartClick = ()=>{
     setIsStarted(true)
    }
    useEffect(() => {
      const questions =   localStorage.getItem('questionList')
        if(questions){
            setList(JSON.parse(questions))
        }
    }, []);
    console.log(list)

    const currentQuestion = useMemo(()=>{
        return list[current]
    },[current,list])
const onMoveNext=()=>{
     setCurrent((prev)=>prev+1)

    }
    const onMoveBack=()=>{
        setCurrent((prev)=>prev-1)
    }
    const onSelect = (value: {value: string,recomended:number[] })=> {

     if(selected.includes(value.value)){
     const filteredList = selected.filter((item:any)=>item !==value.value)
         setSelected(filteredList)
         return
     }
        setSelected([...selected,value.value])
    }
    useEffect(() => {
        if (!list.length) return

        const newRec = list[current].answers.filter((el) => {
            return selected.includes(el.value as string)
        }).map((el )=>el.recomended as number[])

     setRecomendataionIds(newRec)

    }, [selected, list, current])
 return(
     <div
         style={{
             width: '100%',
             height: '100%',
             display: 'flex',
             flexDirection: 'column',
             padding: 20,
         }}
     >
         {isFinished ? (
              < FinalPage recommendations = {recomendationIds} />
         ) : !isStarted ? (
             <WelcomePage onchange={handleStartClick} />
         ) : (
             <>
                 {currentQuestion && (
                     <div style={{ width: '100%', height: '100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:15 }}>
                         <span>{current+1} of {list.length}</span>
                         <QuestionForm question={currentQuestion.question} />
                            <div style={{display:'grid',gridTemplateColumns:'auto auto',gap:10,width:'60%',height:'60%'}}>

                         {currentQuestion.answers.map((el) => (
                             <AnswersForm
                                 key={el.value as string}
                                 inputType={currentQuestion.answerType}
                                 answer={el as { value: string; recomended: number[] }}
                                 onSelect={onSelect}
                                 selected={selected.includes(el.value as string)}
                             />
                         ))}
                            </div>
                         <input width={'160'} height={'45'} defaultValue={''} placeholder={'Add Yours'} />
                     </div>
                 )}

                 <div
                     style={{
                         display: 'flex',
                         flexDirection: 'row',
                         alignItems: 'end',
                         justifyContent:
                             list.length - 1 === current ? 'center' : 'space-between',
                         width: '100%',
                         height: '100%',
                     }}
                 >
                     {list.length - 1 !== current && (
                         <button onClick={onMoveBack}>Back</button>
                     )}

                     {list.length - 1 === current ? (
                         <button onClick={handleSave}>Save</button>
                     ) : (
                         <button onClick={onMoveNext}>Next</button>
                     )}
                 </div>
             </>
         )}
     </div>
 )

}