import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import Modal from 'react-modal';
import './wheel.scss';

Modal.setAppElement('#root');

const defaultOptions = [
  { option: 'Default 1' },
  { option: 'Default 2' },
  { option: 'Default 3' },
  { option: 'Default 4' },
  { option: 'Default 5' },
  { option: 'Default 6' },
  { option: 'Default 7' },
  { option: 'Default 8' }
];

const WheelComponent = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [options, setOptions] = useState(defaultOptions);
  const [newOption, setNewOption] = useState("");
  const [buttonVisible, setButtonVisible] = useState(true);

  const handleSpinClick = () => {
    if (options.length === 0) {
      alert("Please add some options before spinning the wheel.");
      return;
    }
    const newPrizeNumber = Math.floor(Math.random() * options.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setButtonVisible(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddOption = () => {
    if (newOption.trim() === "") {
      alert("Option cannot be empty.");
      return;
    }
    const updatedOptions = options.filter(option => !defaultOptions.includes(option));
    setOptions([...updatedOptions, { option: newOption }]);
    setNewOption("");
  };

  return (
    <div className="wheel-container">
      <div className='wheel'>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={options}
          onStopSpinning={() => {
            setMustSpin(false);
            setIsModalOpen(true);
            setButtonVisible(true);
          }}
          backgroundColors={['#1a1a1a', '#ffffff']}
          textColors={['#FF0000']}
          outerBorderColor={'#000000'}
          outerBorderWidth={4}
          innerBorderColor={'#000000'}
          innerBorderWidth={options.length > 1 ? 4 : 0}
          radiusLineColor={'#000000'}
          radiusLineWidth={options.length > 1 ? 4 : 0}
          fontSize={16}
          perpendicularText={true}
          height={300}
          width={300}
        />
        {buttonVisible && (
          <button className='spin-button' onClick={handleSpinClick}>Spin</button>
        )}
      </div>
      <div className="inputs">
        <input
          type="text"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          placeholder="Add a new option"
        />
        <button onClick={handleAddOption}>Add Option</button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Winning Option"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>{options[prizeNumber]?.option}</h2>
        <button onClick={handleCloseModal}>Close</button>
      </Modal>
    </div>
  );
};

export default WheelComponent;
