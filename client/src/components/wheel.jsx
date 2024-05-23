import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import Modal from 'react-modal';
import './wheel.scss';

Modal.setAppElement('#root'); // To handle accessibility for the modal

const data = [
  { option: 'Option 1' },
  { option: 'Option 2' },
  { option: 'Option 3' },
  { option: 'Option 4' },
  { option: 'Option 5' },
  { option: 'Option 6' },
  { option: 'Option 7' },
  { option: 'Option 8' },
  { option: 'Option 9' },
  { option: 'Option 10' }
];

const WheelComponent = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="wheel-container">
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        onStopSpinning={() => {
          setMustSpin(false);
          setIsModalOpen(true);
        }}
        backgroundColors={['#000000', '#ffffff']}
        textColors={['#FF0000']}
        outerBorderColor={'#000000'}
        outerBorderWidth={4}
        innerBorderColor={'#000000'}
        innerBorderWidth={4}
        radiusLineColor={'#000000'}
        radiusLineWidth={4}
        fontSize={16}
        perpendicularText={true}
        height={300}
        width={300}
      />
      <button onClick={handleSpinClick}>Spin</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Winning Option"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>{data[prizeNumber].option} won</h2>
        <button onClick={handleCloseModal}>Close</button>
      </Modal>
    </div>
  );
};

export default WheelComponent;