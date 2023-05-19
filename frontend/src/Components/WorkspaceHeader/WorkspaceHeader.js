import './WorkspaceHeader.css';
import SearchBar from '../SearchBar/SearchBar';
import { useNav } from '../../Hooks/useNav';

const WorkspaceHeader = () => {
	const { navState } = useNav();

	const searchableRoutes = ['/employee'];
	
	console.log(searchableRoutes.filter(route => route == navState.path).length);
	return (
		<header id="workspaceHeader">
			{ searchableRoutes.filter(route => route == navState.path).length != 0 && <SearchBar /> }
		</header>
	);
}

export default WorkspaceHeader;
