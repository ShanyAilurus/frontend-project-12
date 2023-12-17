import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import AddingChannel from './AddingChannel';
import ModalWindowControl from './ModalWindowControl';

import { actions as modalsActions } from '../../slice/modalsSlice';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const showModal = (type, item = null) => dispatch(modalsActions.openModal({ type, item }));

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <span className="bold-text">{t('channels')}</span>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={() => showModal('add')}
        >
          <AddingChannel />
          <span className="visually-hidden">{t('plus')}</span>
        </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        <ModalWindowControl showModal={showModal} />
      </ul>
    </div>
  );
};

export default Channels;
