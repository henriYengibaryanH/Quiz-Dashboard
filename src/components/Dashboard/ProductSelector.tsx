import { Product } from '../../App';

type Props = {
    products: Product[];
    onChange: (selectedIds: number) => void;
    selected:number[]
};

export default  function ProductSelector ({ products, onChange ,selected}:Props) {

    return (
           <div style={{ display: 'flex', gap: 6,flexDirection:'row', alignItems:'center',maxHeight:160,overflow:'auto',maxWidth:300 }}>
       {products.map(product => (
             <label key={product.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
   <img src={product.images[0]} alt={product.title} width={80} height={80} />
                    <input
        type="checkbox"
                  checked={selected.includes(product.id)}
              onChange={() => onChange(product.id as number)}
            />
                    <span style={{width:30,height:20,textOverflow:'auto',overflow:'auto'}}>{product.title}</span>
                </label>
            ))}
        </div>
    );
};
