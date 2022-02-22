import { useState } from "react";
import { searchElectionRiding } from "../../api/election";
import { ElectionRidingData } from "../../customIntefaces/APITypes";
import SearchItem from "../Buttons/SearchItem";
import SearchForm from "./SearchForm";

interface SearchFormProps {
    setSelected: (x:number|null) => void, 
    selected: number | null,
    electionId: number
}

const SearchElectionRidingForm:React.FC<SearchFormProps> = ({ setSelected, selected, electionId }) => {
    const [electionRidingList, setElectionRidingList] = useState<Array<ElectionRidingData>>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    
    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await onSearch();
    }


    const onSearch = async () => {
        let res:Array<ElectionRidingData> = await searchElectionRiding(searchTerm, electionId); 
        setSelected(null);

        if(res)
        {
            setElectionRidingList(res)
        }
      }

    return (     
    <>   
        {/* Search Field */}
        <SearchForm handleSubmit={handleSubmit} onSearch={onSearch} setSearchTerm={setSearchTerm}>
        {/* Select Results */}
            {
                electionRidingList.map((er)=>{
                return <SearchItem key={er.id} mainText={er.boundaryName} subText1={er.status} subText2={er.votingPopulation.toString()} selected={er.id===selected}
                onClick={()=>{setSelected(er.id)}}/>; 
                })
            }
        </SearchForm>
    </> 
    );
}

export default SearchElectionRidingForm;