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
  ] = useSelector((state) => {
    return [
      state.userData.id,
      state.profileUpdate,
      state.languageSkills.fAllSkills,
      state.userFullData,
      state.registerCategory,
      state.messages,
      state.socailMedia,
      state?.certificateSkills?.fCertificate,
      state.coreData,
    ];
  });

  const dispatch = useDispatch();

  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateSocail, setUpdateSocail] = useState(false);

  const [socialData, setSocialData] = useState([]);
  const [socialLoading, setSocialLoading] = useState([]);

  const handleSocial = async () => {
    const social = new FormData();

    dispatch(
      getMessages({
        messages: "جارى التحديث",
        messageType: "info",
        messageClick: true,
      })
    );
    socialData.forEach(({ social_id, idx, value }) => {
      social.append(`social[${idx}][social_id]`, social_id);
      social.append(`social[${idx}][value]`, value || socialLoading?.value);
    });

    updateProfile
      ._POST_UpdateProfile(userID, social)
      .then((res) => {
        dispatch(
          getMessages({
            messages: res?.data?.message,
            messageType: "success",
            messageClick: true,
          })
        );
        setUpdateSocail(false);
      })
      .catch((err) => {
        dispatch(
          getMessages({
            messages: err?.response?.data?.message,
            messageType: "error",
            messageClick: true,
          })
        );
        return err.response;
      });
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
      const currentSite = coreData?.social.find(
        (site) => site.name === el.title
      );
      setSocialLoading((prev) => [
        ...prev,
        {
          ...el,
          social_id: currentSite.id,
          idx: currentSite.id - 1,
        },
      ]);
    });
  }, [userData?.social, coreData?.social, socialLoading]);

  useEffect(() => {
    if (!socialLoading.length) return;
    setSocialData(socialLoading);
  }, [socialLoading]);

  const [newfile, setFiles] = useState({
    images: [],
    videos: [],
    document: [],
  });

  const [filenames, setNames] = useState([]);

  const fileHandler = (files) => {
    const extention = files;
    for (let allFile of extention) {
      if (allFile.type.match("video/")) {
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
    // setUpdateLoading(true);
    await handleSocial();

    dispatch(
      getMessages({
        messages: "جـارى تحديث البيانات ",
        messageType: "warning",
        messageClick: true,
      })
    );
    newfile.videos?.forEach((video, idx) => {
      return mySkill.append(`document[${idx}]`, video);
    });
    newfile.images?.forEach((image, idx) => {
      return mySkill.append(`document[${idx}]`, image);
    });
    newfile.document?.forEach((docx, idx) => {
      return mySkill.append(`document[${idx}]`, docx);
    });

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
    getAllUserUpdate?.updateData?.description !== undefined &&
      mySkill.append("description", getAllUserUpdate?.updateData.description);
    getAllUserUpdate?.updateData?.countriesID !== undefined &&
      mySkill.append("country_id", getAllUserUpdate?.updateData.countriesID);
    getAllUserUpdate?.updateData?.citiesID !== undefined &&
      mySkill.append("city_id", getAllUserUpdate?.updateData.citiesID);
    getAllUserUpdate?.updateData?.stateID !== undefined &&
      mySkill.append("state_id", getAllUserUpdate?.updateData.stateID);
    getAllUserUpdate?.updateData?.areaID !== undefined &&
      mySkill.append("area_id", getAllUserUpdate?.updateData.areaID);

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
        self.findIndex((skl) => skl.id === skill.id && skl.type === skill.type);

      return isDuplicate;
    });

    sklsResult?.forEach((skill, idx) => {
      mySkill.append(`skill[${idx}][skill]`, skill.skill);
      mySkill.append(`skill[${idx}][type]`, skill.type);
      mySkill.append(`skill[${idx}][level_id]`, skill.level_id);
    });

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

        setUpdateLoading(false);
        window.location.reload(false);
      })
      .catch((err) => {
        const errorMsg =
          typeof err?.message === "string"
            ? err?.message
            : err?.response?.data?.message ||
              "خطأ غير معروف يرجي المحاوله لاحقا";

        toast.error(errorMsg);
        dispatch(
          getMessages([
            {
              messages: errorMsg,
              messageType: "error",
              messageClick: true,
            },
          ])
        );

        setUpdateLoading(false);
      });
    localStorage.setItem("valid", 1);
  };

  return (
    <div>
      <UserFeedBackShared
        message={messages.messages}
        type={messages?.messageType}
        clickMe={messages?.messageClick}
      />

      <FlancerMyEditAccountPage
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
