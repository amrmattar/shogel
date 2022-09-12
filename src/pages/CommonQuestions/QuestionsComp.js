import { useState } from "react";
import cls from "./Qustions.module.scss";
import { AiOutlineMinus } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";

const QueComp = ({ ele }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cls.container}>
      <div onClick={() => setOpen(!open)} className={cls.titleH}>
        <h3>{ele.q}</h3>
        {open ? <AiOutlineMinus /> : <BsPlusLg />}
      </div>
      <p className={open ? cls.pOpen : cls.pClosed}> {ele.a}</p>
    </div>
  );
};
export default QueComp;
