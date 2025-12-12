type OptionProps = {
    value: string;
    onChange: (value: string) => void;
}

export default function Option({ value, onChange }: OptionProps){
    return <input style={{width:180,height:30,borderRadius:'8px',border:'1px solid gray'}}  type={'text'} value={value} onChange={(e)=>onChange(e.target.value)} />
}