import './WorkspaceHeader.css';
import SearchBar from '../SearchBar/SearchBar';
import { useWorkspaceHeader } from '../../Hooks/useWorkspaceHeader';

const WorkspaceHeader = () => {
  const { workspaceHeaderState } = useWorkspaceHeader();
  
  return (
    <header id="workspaceHeader">
        <h1>{ workspaceHeaderState.header }</h1>
        <SearchBar />
    </header>
  );
}

export default WorkspaceHeader;
