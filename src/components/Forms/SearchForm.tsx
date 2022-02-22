import { StdProps } from "../../customIntefaces/StdProps";
import StandardSearchField from "../Input/StandardSearchField";

interface SearchFormProps extends StdProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    onSearch: () => Promise<void>, 
    setSearchTerm: (s:string)=>void
}

const SearchForm:React.FC<SearchFormProps> = ({handleSubmit, onSearch, setSearchTerm, style, children}) => {
 
    return (         
        <div style={style}>
             {/* Search Field */}
            <form onSubmit={handleSubmit}
                style={{paddingBottom:20, width:"100%"}}>
                <StandardSearchField onEnter={onSearch} onChange={(e)=>{setSearchTerm(e.target.value)}}/>
            </form>
            {/* Select Results */}
            <div style={{flexDirection:"column", display:"flex"}}>
            {
                children
            }
            </div>
        </div>        
    );
}

export default SearchForm;