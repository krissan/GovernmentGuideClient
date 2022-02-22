import { useState } from "react";
import { searchBill } from "../../api/bill";
import { Bill } from "../../customIntefaces/APITypes";
import SearchItem from "../Buttons/SearchItem";
import SearchForm from "./SearchForm";

interface SearchFormProps {
    setSelected: (x:number|null) => void, 
    selected: number | null
}

const SearchBillForm:React.FC<SearchFormProps> = ({ setSelected, selected}) => {
    const [billList, setBillList] = useState<Array<Bill>>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    
    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await onSearch();
    }


    const onSearch = async () => {
        let res:Array<Bill> = await searchBill(searchTerm); 
        setSelected(null);

        if(res)
        {
            setBillList(res)
        }
      }


    return (     
    <>   
        {/* Search Field */}
        <SearchForm handleSubmit={handleSubmit} onSearch={onSearch} setSearchTerm={setSearchTerm}>
            {/* Select Results */}
            {
                billList.map((b)=>{
                return <SearchItem key={b.id} mainText={b.billNum.toString()} subText1={b.description} subText2={b.createDate?.toString()} selected={b.id===selected}
                onClick={()=>{setSelected(b.id);}}/>; 
                })
            }
        </SearchForm>
    </> 
    );
}

export default SearchBillForm;