import { useSelector } from 'react-redux';
import AddChannelModal from './AddModal';
import RenameChannel from './RenameChannel';
import RemoveChannel from './RemoveChannel';

const modals = {
  adding: AddChannelModal,
  removing: RenameChannel,
  renaming: RemoveChannel,
};

const ShowModal = () => {
  const type = useSelector((state) => state.modal.type);

  const ComponentModal = modals[type];
  return (
    (ComponentModal === undefined ? null : <ComponentModal />)
  );
};

export default ShowModal;
