import React, { useState, createContext } from "react";

export const LabelContext = createContext();

export const LabelProvider = (props) => {
  const [page, setPage] = useState(0);

  const [labelInfo, setlabelInfo] = useState({
    clientView: {
      email: "",
      password: "",
      username: "",

    },
    freelancerView: {
      username: "",
      email: "",
      city: "",
      state: "",
      zipCode: ""
    },
    weight: "",
    user: ""
  });

  const nextPage = () => {
    setPage(page + 1);
  };
  const jumpPage = (num) => {
    setPage(num);
  };

  const prevPage = () => {
    setPage(page - 1);
  };
  const handleChange = (prop) => (event) => {
    setlabelInfo({ ...labelInfo, [prop]: event?.target?.attributes?.name?.value });
    switch (event?.target?.attributes?.name?.value) {
      case 'worker':
          return  jumpPage(4)
      case 'freelancer':
          return  jumpPage(3)
      case 'company':
          return  jumpPage(4)
      case 'backCompany':
          return  jumpPage(3)
      default:
        return  jumpPage(page)
    }

  };

  const setDataDetails = (prop) => (event) => {
    setlabelInfo({
      ...labelInfo,
      clientView: { ...labelInfo.clientView, [prop]: event.target.value }
    });
  };
  const setFrelacerDetails = (prop) => (event) => {
    setlabelInfo({
      ...labelInfo,
      freelancerView: { ...labelInfo.freelancerView, [prop]: event.target.value }
    });
  };
  const setRecevierInfo = (prop) => (event) => {
    setlabelInfo(prop);
  };


  const accountType = {
    userKind: labelInfo.user,
  }

  return (
    <LabelContext.Provider
      value={{
        page,
        accountType,
        nextPage,
        jumpPage,
        prevPage,
        labelInfo,
        handleChange,
        setDataDetails,
        setRecevierInfo
      }}
    >
      {props.children}
    </LabelContext.Provider>
  );
};
