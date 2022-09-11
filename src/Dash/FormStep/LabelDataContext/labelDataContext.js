import React, { useState, createContext } from "react";

export const LabelContext = createContext();

export const LabelProvider = (props) => {
  const [page, setPage] = useState(0);

  const [labelInfo, setlabelInfo] = useState({
    clientView: {
      email: "",
      password: "",
      username: "",
      fullName: "",
      description: "",
      info: "",
      nation: {},
      id: "",
      area: {},
      gender: "",
      img: {},
      files: [],
    },
    freelancerView: {
      username: "",
      email: "",
      city: "",
      state: "",
      zipCode: "",
    },
    skills: [],
    weight: "",
    user: "",
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
    setlabelInfo({
      ...labelInfo,
      [prop]: event?.target?.attributes?.name?.value,
    });
    jumpPage(3);
  };
  const setImg = ({ prop, e }) => {
    setlabelInfo({
      ...labelInfo,
      clientView: { ...labelInfo.clientView, [prop]: e },
    });
  };
  const setFiles = (files) => {
    setlabelInfo({
      ...labelInfo,
      clientView: { ...labelInfo.clientView, files: files },
    });
  };
  const setDataDetails = (prop) => (event) => {
    prop == "id"
      ? event.target.value.length < 11 &&
        setlabelInfo({
          ...labelInfo,
          clientView: {
            ...labelInfo.clientView,
            [prop]: event.target.value.replace(/[^0-9٠-٩]/gi, ""),
          },
        })
      : prop == "nation"
      ? setlabelInfo({
          ...labelInfo,
          clientView: { ...labelInfo.clientView, [prop]: event },
        })
      : setlabelInfo({
          ...labelInfo,
          clientView: { ...labelInfo.clientView, [prop]: event.target.value },
        });
  };
  const setSkills = (skills) => {
    setlabelInfo({
      ...labelInfo,
      skills: skills,
    });
  };
  const setFrelacerDetails = (prop) => (event) => {
    setlabelInfo({
      ...labelInfo,
      freelancerView: {
        ...labelInfo.freelancerView,
        [prop]: event.target.value,
      },
    });
  };
  const setRecevierInfo = (prop) => (event) => {
    setlabelInfo(prop);
  };

  const accountType = {
    userKind: labelInfo.user,
  };

  return (
    <LabelContext.Provider
      value={{
        page,
        accountType,
        nextPage,
        jumpPage,
        prevPage,
        setImg,
        setFiles,
        labelInfo,
        handleChange,
        setDataDetails,
        setRecevierInfo,
        setSkills,
      }}
    >
      {props.children}
    </LabelContext.Provider>
  );
};
