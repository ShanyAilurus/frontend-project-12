import React from 'react';
import { useSelector } from 'react-redux';
import getModal from './modalWindow/index';
import getModalInfo from '../selectors/modalInfo.js';

const Modal = () => {
  const modalInfo = useSelector(getModalInfo);
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component />;
};

export default Modal;
