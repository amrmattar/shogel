import cls from "./Stepper.module.scss";
const StepperComp = ({ activeStep, steps }) => {
  const widthRatio = ((activeStep - 3) / steps) * 100;
  console.log(widthRatio);
  console.log(steps);
  console.log(activeStep);
  return (
    <div
      style={{
        width: `${activeStep > 3 ? (widthRatio <= 100 ? widthRatio : 0) : 0}%`,
      }}
      className={cls.Stepper}
    ></div>
  );
};
export default StepperComp;
