import VolumeButton from "../../../assets/volumebutton.svg";

const instructions = [
  {
    number: 1,
    text: (
      <>
        Press the{" "}
        <img
          loading="lazy"
          src={VolumeButton}
          alt="Play button"
          className="inline-block w-6 h-6 mx-1"
        />{" "}
        button to <span className="font-bold">Play</span> the Question Audio
      </>
    ),
  },
  {
    number: 2,
    text: (
      <>
        The{" "}
        <img
          loading="lazy"
          src={VolumeButton}
          alt="Play button"
          className="inline-block w-6 h-6 mx-1"
        />{" "}
        button can only be pressed <span className="font-bold">2 times</span>
      </>
    ),
  },
  {
    number: 3,
    text: (
      <>
        Choose the <span className="font-bold">picture</span> that matches the
        audio
      </>
    ),
  },
  {
    number: 4,
    text: (
      <>
        Press <span className="font-bold">Next</span> to save your answer and go
        to the <span className="font-bold">next question</span>
      </>
    ),
  },
  {
    number: 5,
    text: (
      <>
        Press <span className="font-bold">Finish</span> to complete the test
      </>
    ),
  },
];

export default instructions;
