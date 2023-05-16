import './SearchBar.css';
import { useWorkspaceHeader } from '../../Hooks/useWorkspaceHeader';

const SearchBar = () => {
    const { workspaceHeaderState } = useWorkspaceHeader();
	

    return (
		<>
			{ workspaceHeaderState.searchEnabled && 
				<div id="searchBar">
					<i className="fa-solid fa-search"></i> 
					<input type='text'></input>
				</div> }
		</>
  	);
}

export default SearchBar;
