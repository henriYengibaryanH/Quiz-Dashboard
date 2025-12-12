import {useState} from "react";
import Option from "./Options";
import {Product} from "../../App";
import ProductSelector from "./ProductSelector";
enum InputType  {
    BUTTON='button',
    CHECKBOX='checkbox',
    RADIO='radio'
}
export type Scheme = {
    id:number,
    question:string,
    answerType:InputType,
    answers:Array<Record<string, string|number[]>>
}


const TYPES:InputType[] = [InputType.BUTTON,InputType.CHECKBOX,InputType.RADIO];
type Props ={
    products : Product[]
}
export default function Dashboard({products}:Props) {
    const [scheme, setScheme] = useState<Scheme[]>([])
    const [questionId, setQuestionId] = useState(0)
    const [type, setType] = useState<InputType>(InputType.BUTTON);
    const [answers, setAnswers] = useState<Array<Record<string, string | number[]>>>([{value: '', recomended: []}])
    const [questionValue, setQuestionValue] = useState<string>('')
    const [recomended, setRecomended] = useState<number[]>([])
    const [showProducts, setShowProducts] = useState(false)
    const onHandleAnswer = () => {
        if (answers.length >= 8 || answers[answers.length-1].value.length<1) {
            return alert('Please use max of 8 columns');
        }
        const updatedAnswers = [...answers];
        updatedAnswers[updatedAnswers.length - 1] = {
            ...updatedAnswers[updatedAnswers.length - 1],
            recomended: recomended
        };
        setAnswers([...updatedAnswers, { value: '', recomended: [] }]);
        setRecomended([]);
    };
        const onResetForm = () => {
            if (!questionValue.trim()) return alert('Please fill missing input')
            onSaveData()
            setRecomended([])
            setAnswers([{value: '', recomended: []}])
            setQuestionValue('')
            setQuestionId((prev) => prev + 1)

        }
        const onSaveData = () => {
            const body: Scheme = {
                id: questionId, answerType: type,
                answers: answers, question: questionValue,

            }
            setScheme([...scheme, body])

        }

    const onSaveToLocalStorage = () => {
        if (!questionValue.trim()) return
        onSaveData();
        setTimeout(() => {
            localStorage.setItem('questionList', JSON.stringify([...scheme, {
                id: questionId,
                answerType: type,
                answers: answers,
                question: questionValue,
            }]));
            onResetForm();
        }, 0);
    };

        const handleRecomendedChange = (value: number) => {
            setRecomended([...recomended, value])
        }
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'start',
                    gap: 20,
                    width: '100%',
                    height: '100%',
                }}
            >
                <input
                    style={{
                        width: '60%',
                        height: 40,
                        paddingLeft: '10px',
                        borderRadius: '8px',
                        border: '1px solid gray',
                    }}
                    type="text"
                    value={questionValue}
                    placeholder="Write your question here"
                    onChange={(e) => setQuestionValue(e.target.value)}
                />

                <div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
                    <span style={{fontSize: '14px'}}>Select Answer Type</span>
                    <select
                        value={type}
                        style={{width: 80, height: 20, fontSize: 12, fontWeight: 600}}
                        onChange={(e) => setType(e.target.value as InputType)}
                    >
                        {TYPES.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto auto',
                        gap: '10px',
                    }}
                >
                    {answers.length > 0
                        ? answers.map((el, idx) => (
                            <Option
                                key={idx}
                                value={el.value as string}
                                onChange={(value) => {
                                    const next = [...answers]
                                    next[idx].value = value
                                    setAnswers(next)
                                }}
                            />
                        ))
                        : null}
                </div>

                <button onClick={() => setShowProducts(!showProducts)}>
                    {showProducts ? 'Hide Products' : 'Show Products'}
                </button>

                {showProducts && (
                    <ProductSelector
                        products={products}
                        selected={recomended}
                        onChange={handleRecomendedChange}
                    />
                )}

                <button
                    style={{
                        width: 150,
                        height: 40,
                        fontSize: '14px',
                        color: 'black',
                        fontWeight: '500',
                        backgroundColor: 'darkgray',
                        border: 'none',
                        borderRadius: '6px',
                    }}
                    onClick={onHandleAnswer}
                >
                    Add Field
                </button>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        gap: 40,
                    }}
                >
                    <button
                        style={{
                            width: 110,
                            height: 30,
                            fontSize: '14px',
                            color: 'white',
                            fontWeight: '500',
                            backgroundColor: 'darkslategray',
                            border: 'none',
                            borderRadius: '6px',
                        }}
                        onClick={onResetForm}
                    >
                        Next
                    </button>

                    <button
                        onClick={onSaveToLocalStorage}
                        style={{
                            width: 110,
                            height: 30,
                            fontSize: '14px',
                            color: 'white',
                            fontWeight: '500',
                            backgroundColor: 'darkgreen',
                            border: 'none',
                            borderRadius: '6px',
                        }}
                    >
                        Save
                    </button>
                </div>
            </div>
        )
}
