import React from 'react';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';

const Footer = () => {
  return (
    <div className="p-3 bg-dark my-2 rounded">
    <Toast>
      <ToastHeader>
        Trabalho DEV1
      </ToastHeader>
      <ToastBody>
       &copy; 2019 Adriano Cavalheiro.
      </ToastBody>
    </Toast>
  </div>
  )
}
export default Footer