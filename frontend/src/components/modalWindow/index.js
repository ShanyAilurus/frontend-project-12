import { useSelector } from 'react-redux';
import AddChannelModal from './AddModal';
import RenameChannel from './RenameChannel';
import RemoveChannel from './RemoveChannel';
import { getModalType } from '../../slices/channelsSelectors';

const modals = {
  adding: AddChannelModal,
  renaming: RenameChannel,
  removing: RemoveChannel,
};

const ShowModal = () => {
  const type = useSelector(getModalType);

  const ComponentModal = modals[type];
  return (
    (ComponentModal === undefined ? null : <ComponentModal />)
  );
};

export default ShowModal;
