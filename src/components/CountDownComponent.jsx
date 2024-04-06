const CountDownComponent = ({ countdown }) => {
  return (
    <div className="flex bg-[#121419]">
      <ul className="mx-3">
        <li className="text-[#05c37c] text-2xl font-semibold bg-[#121419]">
          {countdown.days} :
        </li>
        <li className="text-[#a0a1a4]  bg-[#121419] text-xs">DAYS</li>
      </ul>
      <ul className="mx-3">
        <li className="text-[#05c37c] text-2xl font-semibold bg-[#121419]">
          {countdown.hours} :
        </li>
        <li className="text-[#a0a1a4] bg-[#121419] text-xs">HOURS</li>
      </ul>
      <ul className="mx-3">
        <li className="text-[#05c37c] text-2xl font-semibold bg-[#121419]">
          {countdown.minutes} :
        </li>
        <li className="text-[#a0a1a4] bg-[#121419] text-xs">MINS</li>
      </ul>
      <ul className="mx-3 ">
        <li className="text-[#05c37c] text-2xl font-semibold bg-[#121419]">
          {countdown.seconds}
        </li>
        <li className="text-[#a0a1a4] bg-[#121419] text-xs">SECS</li>
      </ul>
    </div>
  );
};

export default CountDownComponent;
