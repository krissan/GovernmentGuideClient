import { useEffect, useState } from "react";
import { searchElection } from "../../api/election";
import { Election } from "../../customIntefaces/APITypes";
import SearchItem from "../Buttons/SearchItem";
import SubHeader from "../Text/SubHeader";

interface SearchFormProps {
    setSelected: (x:number|null) => void, 
    selected: number | null,
    govBodyId:number,
    refresh?: boolean
}

const SearchElectionForm:React.FC<SearchFormProps> = ({ setSelected, selected, govBodyId, refresh=true}) => {
    const [electionList, setElectionList] = useState<Array<Election>>([]);
    
    /*const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await onSearch();
    }*/

    useEffect(()=>{
        const onSearch = async () => {
            if(refresh === true){

                let res:Array<Election> = await searchElection(govBodyId); 
                setSelected(null);
        
                if(res)
                {
                    setElectionList(res)
                }
            }
          }

        onSearch();

        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[govBodyId, refresh]);

    return (     
    <>  
        {/* Select Results */}
        {electionList.length > 0 ?
            electionList.map((e)=>{
            return <SearchItem key={e.id} mainText={e.startDate?.toString()} subText1={e.endDate?.toString()} selected={e.id===selected}
                onClick={()=>{setSelected(e.id);}}/>; 
            })
            :
            <SubHeader>No Elections Found</SubHeader>
        }
    </> 
    );
}

export default SearchElectionForm;