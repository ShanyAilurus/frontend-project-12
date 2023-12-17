import AddChannelModal from './AddModal';
import RenameChannel from './RenameChannel';
import RemoveChannel from './RemoveChannel';

const modals = {
  add: AddChannelModal,
  rename: RenameChannel,
  delete: RemoveChannel,
};

export default (channelName) => modals[channelName];
