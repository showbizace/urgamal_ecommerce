import Mail from "@/components/Profile/Mail";
import Mobile from "@/components/Profile/Mobile";
import Password from "@/components/Profile/Password";
import ProfileButton from "@/components/Profile/ProfileButton";
import UserEdit from "@/components/Profile/UserEdit";
import { Text, Title } from "@mantine/core";
import { useState } from "react";

const ProfileInfo = (props) => {
  const { data, setUserInfo, refresh } = props;
  const [tabs, setTabs] = useState("info");
  const handleTabs = (type) => {
    if (type === "info") {
      setTabs("info");
    }
    if (type === "change") {
      setTabs("change");
    }
    if (type === "mobile") {
      setTabs("mobile");
    }
    if (type === "email") {
      setTabs("email");
    }
  };

  return (
    <div className="flex flex-col w-full bg-white px-8 py-6 rounded-md">
      {tabs === "info" && (
        <>
          <Title order={3}>Хувийн мэдээлэл</Title>
          <Text size="sm" c="dimmed">
            Та хувийн мэдээллээ доорх талбаруудаар засварлаарай
          </Text>
        </>
      )}
      {tabs === "change" && (
        <>
          <Title order={3}>Гар утас</Title>
          <Text size="sm" c="dimmed">
            Та нууц үгээ доорх талбаруудаар засварлаарай
          </Text>
        </>
      )}
      {tabs === "mobile" && (
        <>
          <Title order={3}>Гар утас баталгаажуулах</Title>
          <Text size="sm" c="dimmed">
            Та гар утсаа доорх талбаруудаар баталгаажуулаарай
          </Text>
        </>
      )}
      <ProfileButton handleTabs={handleTabs} tabs={tabs} />
      {tabs === "info" && (
        <UserEdit data={data} setUserInfo={setUserInfo} refresh={refresh} />
      )}
      {tabs === "change" && <Password setTabs={setTabs} />}
      {tabs === "mobile" && <Mobile />}
      {tabs === "email" && <Mail />}
    </div>
  );
};

export default ProfileInfo;
