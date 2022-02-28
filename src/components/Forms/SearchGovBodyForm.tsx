import { useState } from "react";
import { searchGovBody } from "../../api/representative";
import { GovBody } from "../../customIntefaces/APITypes";
import SearchItem from "../Buttons/SearchItem";
import SearchForm from "./SearchForm";

interface SearchFormProps {
    setSelected: (x:number|null) => void, 
    selected: number | null
}

const SearchGovBodyForm:React.FC<SearchFormProps> = ({ setSelected, selected}) => {
    const [govBodyList, setGovBodyList] = useState<Array<GovBody>>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    
    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch();
    }


    const onSearch = async () => {
        let res:Array<GovBody> = await searchGovBody(searchTerm); 
        setSelected(null);
        if(res)
        {
          setGovBodyList(res)
        }
      }

    return (     
    <>   
        {/* Search Field */}
        <SearchForm handleSubmit={handleSubmit} onSearch={onSearch} setSearchTerm={setSearchTerm}>
            {/* Select Results */}
            {
                govBodyList.map((g)=>{
                return <SearchItem key={g.id} mainText={g.currentName} subText1={g.address} subText2={g.type} selected={g.id === selected}
                onClick={()=>{setSelected(g.id);}}/>; 
                })
            }
        </SearchForm>
    </> 
    );
}

export default SearchGovBodyForm;