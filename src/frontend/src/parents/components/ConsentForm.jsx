import * as React from "react";

function ConsentButton({ text, className }) {
  return (
    <button
      type="button"
      className={`self-stretch px-4 py-2.5 my-auto rounded-lg min-h-[40px] min-w-[240px] w-[300px] ${className}`}
      tabIndex={0}
      role="button"
      aria-label={text}
    >
      {text}
    </button>
  );
}

function ConsentForm() {
  const consentButtons = [
    {
      text: "I consent",
      variant: "primary",
      className: "text-white bg-slate-900"
    },
    {
      text: "I do not consent",
      variant: "secondary",
      className: "text-blue-600 bg-white border-blue-600 border-solid border-[1.5px]"
    }
  ];

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center items-center px-16 py-44 w-full max-md:px-5 max-md:py-24 max-md:max-w-full">
        <form className="flex overflow-hidden flex-wrap gap-12 justify-center items-start pt-5 pr-8 pb-12 pl-2.5 -mb-9 max-w-full bg-white min-h-[666px] w-[720px] max-md:pr-5 max-md:mb-2.5">
          <div className="flex grow shrink gap-10 justify-center items-start text-3xl tracking-normal leading-10 text-center text-black min-w-[240px] w-[598px] max-md:max-w-full">
            <div className="px-2.5 py-5 min-w-[240px]">
              <span className="font-bold">Recording Consent</span>
            </div>
          </div>
          <div className="p-2.5 text-3xl tracking-normal leading-9 text-center text-black min-w-[240px] max-md:max-w-full">
            We kindly ask for your consent to record
            <br />
            video and audio. This recording may be
            <br />
            used for analyzing responses and
            <br />
            ensuring the quality of the assessment.
            <br />
            Your data will be handled securely, only
            <br />
            viewable by your clinician and used
            <br />
            solely for the purpose outlined above.
            <br /> <br />
            Do you consent to the recording of
            <br />
            video and audio for this assessment?
          </div>
          <div className="flex flex-wrap grow shrink gap-10 justify-between items-center text-xl leading-none min-w-[240px] w-[548px] max-md:max-w-full">
            {consentButtons.map((button, index) => (
              <ConsentButton
                key={index}
                text={button.text}
                variant={button.variant}
                className={button.className}
              />
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConsentForm;