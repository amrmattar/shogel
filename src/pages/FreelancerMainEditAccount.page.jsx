import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataReducer } from "../core/redux/reducers/UserDataReducer/UserDataReducer.core";
import { userProfile } from "../core/services/userProfile/FreelancerProfile/FreelancerProfile.core";
import { updateProfile } from "../core/services/userProfile/UpdateProfile/UpdateProfile.core";
import FlancerMyEditAccountPage from "./FlancerPages/flancerAccountManagement/FlancerMyEditAccountPage/FlancerMyEditAccount.page";
import { useParams } from "react-router-dom";
import UserFeedBackShared from "../shared/UserFeedBack/UserFeedBack.shared";
import { getMessages } from "../core/redux/reducers/Messages/Messages.core";
import { toast } from "react-toastify";

const FreelancerMainEditAccountPage = () => {
  const [selectedAreName, setSelectedAreName] = useState("");

  const mySkill = new FormData();
  const [
    userID,
    getAllUserUpdate,
    fAllSkills,
    userData,
    categorySkills,
    messages,
    site,
    currentSkls,
    coreData,
    locationID,
    { convertToFreeLancerMode },
  ] = useSelector((state) => {
    return [
      state.userData?.id,
      state.profileUpdate,
      state.languageSkills.fAllSkills,
      state.userFullData,
      state.registerCategory,
      state.messages,
      state.socailMedia,
      state?.certificateSkills?.fCertificate,
      state.coreData,
      state?.locationID,
      state?.convertToFreeLancerMode,
    ];
  });
  const dispatch = useDispatch();

  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateSocail, setUpdateSocail] = useState(false);

  const [socialData, setSocialData] = useState([]);
  const [socialLoading, setSocialLoading] = useState([]);

  const [filenames, setNames] = useState([]);
  const [newfile, setFiles] = useState({
    images: [],
    videos: [],
    document: [],
  });

  const handleSocial = async () => {
    const social = new FormData();

    socialData
      ?.filter((social) => social?.value != "__empty__")
      .forEach(({ social_id, id, value }, idx, array) => {
        if (isNaN(social_id || id)) return;

        social.append(`social[${idx}][social_id]`, social_id || id);
        social.append(
          `social[${idx}][value]`,
          value || socialLoading?.value || "__empty__"
        );
      });

    if (!socialData?.filter((social) => social?.value != "__empty__")?.length) {
      social.append(`social[${1}][social_id]`, 1);
      social.append(`social[${1}][value]`, "__empty__");
    }

    updateProfile
      ._POST_UpdateProfile(userID, social)
      .then((res) => {
        setUpdateSocail(false);
      })
      .catch((err) => {
        return err.response;
      });
  };
  const fileHandler = (files) => {
    const extention = files;
    for (let allFile of extention) {
      if (allFile.type.startsWith("video/")) {
        newfile.videos.push(allFile);
      } else if (allFile.type.match("image/")) {
        newfile.images.push(allFile);
      } else {
        newfile.document.push(allFile);
      }
    }

    const extension = files[0].name.split(".")[1]?.toLowerCase();
    if (extension !== undefined) {
      const fNames = Object.keys(files).map((name) => {
        return {
          name: files[name].name,
          icon: files[name].name.split(".")[1]?.toUpperCase().trim(),
        };
      });
      setNames((prev) => [...prev, fNames].flat());
    } else {
      alert("file type not supported");
    }
  };
  const deleteFiles = (e, file, indx) => {
    let imgs = newfile.images.filter((ele) => ele.name != file);
    let docs = newfile.document.filter((ele) => ele.name != file);
    let vids = newfile.videos.filter((ele) => ele.name != file);
    setNames(filenames.filter((ele) => ele.name != file));

    setFiles({ images: imgs, videos: vids, document: docs });
  };
  const postUpdate = async () => {
    if (updateLoading) return;
    // check description
    if (
      !getAllUserUpdate?.updateData.description &&
      !getAllUserUpdate?.discription &&
      convertToFreeLancerMode
    ) {
      return dispatch(
        getMessages({
          messages: "نبذه عني حقل مطلوب",
          messageType: "error",
          messageClick: true,
        })
      );
    }

    // check categorySkills
    if (!categorySkills?.length && convertToFreeLancerMode) {
      return dispatch(
        getMessages({
          messages: "يرجي ادخال مجالات الاختصاص",
          messageType: "error",
          messageClick: true,
        })
      );
    }

    setUpdateLoading(true);
    await handleSocial();

    dispatch(
      getMessages({
        messages: "جـارى تحديث البيانات ",
        messageType: "warning",
        messageClick: true,
      })
    );

    const docs = [...newfile.videos, ...newfile.images, ...newfile.document];

    docs?.forEach((doc, idx) => {
      return mySkill.append(`document[${idx}]`, doc);
    });

    mySkill.append("role_convert", convertToFreeLancerMode);
    getAllUserUpdate?.updateData?.description !== undefined &&
      mySkill.append(
        "description",
        getAllUserUpdate?.updateData.description ||
          getAllUserUpdate?.discription
      );

    mySkill.append("email", getAllUserUpdate?.updateData.email);
    getAllUserUpdate?.discription &&
      mySkill.append("info", getAllUserUpdate?.discription);
    mySkill.append("fullname", getAllUserUpdate?.updateData.fullname);
    getAllUserUpdate?.updateData.gender_id &&
      mySkill.append("gender_id", getAllUserUpdate?.updateData.gender_id);
    getAllUserUpdate?.updateData.job_name_id &&
      mySkill.append("job_name_id", getAllUserUpdate?.updateData.job_name_id);
    mySkill.append("mobile", getAllUserUpdate?.updateData.mobile);
    getAllUserUpdate?.updateData.nationality_id &&
      mySkill.append(
        "nationality_id",
        getAllUserUpdate?.updateData.nationality_id
      );
    getAllUserUpdate?.updateData.nationality_number &&
      mySkill.append(
        "nationality_number",
        getAllUserUpdate?.updateData.nationality_number
      );

    (getAllUserUpdate?.updateData?.countriesID || locationID?.countriesID) &&
      mySkill.append(
        "country_id",
        getAllUserUpdate?.updateData.countriesID || locationID?.countriesID
      );
    (getAllUserUpdate?.updateData?.citiesID || locationID?.citiesID) &&
      mySkill.append(
        "city_id",
        getAllUserUpdate?.updateData?.citiesID || locationID?.citiesID
      );
    (getAllUserUpdate?.updateData?.stateID || locationID?.stateID) &&
      mySkill.append(
        "state_id",
        getAllUserUpdate?.updateData?.stateID || locationID?.stateID
      );
    (getAllUserUpdate?.updateData?.areaID !== null ||
      locationID?.areaID !== null) &&
      mySkill.append(
        "area_id",
        getAllUserUpdate?.updateData.areaID || locationID?.areaID
      );
    (getAllUserUpdate?.updateData?.areaID || locationID?.areaID) == "0" &&
      mySkill.set("area_name", selectedAreName);

    categorySkills?.forEach((cate, idx) => {
      mySkill.append(`category[${idx}]`, cate);
    });

    const compainSkls = [
      ...(fAllSkills?.length ? fAllSkills : []),
      ...(currentSkls?.length ? currentSkls : []),
    ];

    const sklsResult = compainSkls.filter((skill, idx, self) => {
      const isDuplicate =
        idx ===
        self?.findIndex(
          (skl) => skl?.id === skill?.id && skl.type === skill.type
        );

      return isDuplicate;
    });

    sklsResult?.forEach((skill, idx) => {
      mySkill.append(`skill[${idx}][skill]`, skill.skill);
      mySkill.append(`skill[${idx}][type]`, skill.type);
      mySkill.append(`skill[${idx}][level_id]`, skill.level_id);
    });

    if (!sklsResult?.length) {
      mySkill.append(`skill[${0}][skill]`, "___empty___");
      mySkill.append(`skill[${0}][type]`, "skill");
      mySkill.append(`skill[${0}][level_id]`, 1);
    }

    updateProfile
      ._POST_UpdateProfile(userID, mySkill)
      .then((res) => {
        dispatch(
          getMessages({
            messages: res?.data?.message,
            messageType: "success",
            messageClick: true,
          })
        );

        setTimeout(() => {
          setUpdateLoading(false);
          window.location.reload(false);
        }, 2000);
      })
      .catch((err) => {
        const errorMsg =
          err?.response?.data?.message[
            Object.keys(err?.response?.data?.message)?.[0]
          ]?.[0] || "خطأ غير معروف يرجي المحاوله لاحقا";

        dispatch(
          getMessages({
            messages: errorMsg,
            messageType: "error",
            messageClick: true,
          })
        );
        setUpdateLoading(false);
      });
    localStorage.setItem("valid", 1);
  };

  useEffect(() => {
    if (userID !== 0) {
      return userProfile._GET_ProfileData(userID).then((res) => {
        dispatch(getUserDataReducer(res.data.data));
      });
    }
  }, [dispatch, userID, updateSocail]);

  useEffect(() => {
    if (socialLoading.length) return;

    userData?.social?.forEach((el) => {
      const currentSite = coreData?.social?.find(
        (site) => site.name === el.title
      );
      setSocialLoading((prev) => [
        ...prev,
        {
          ...el,
          social_id: currentSite?.id,
          idx: currentSite?.id - 1,
        },
      ]);
    });
  }, [userData?.social, coreData?.social, socialLoading]);

  useEffect(() => {
    if (!socialLoading.length) return;
    setSocialData(socialLoading);
  }, [socialLoading]);

  return (
    <div>
      <UserFeedBackShared
        message={messages.messages}
        type={messages?.messageType}
        clickMe={messages?.messageClick}
      />

      <FlancerMyEditAccountPage
        selectedAreName={selectedAreName}
        setSelectedAreName={setSelectedAreName}
        setCheck={setUpdateSocail}
        fileUploads={filenames}
        onClick={fileHandler}
        updateLoading={updateLoading}
        handleClick={postUpdate}
        personalData={userData}
        Sdelet={deleteFiles}
        setSocialData={setSocialData}
        socialLoading={socialLoading}
      />
    </div>
  );
};

export default React.memo(FreelancerMainEditAccountPage);
