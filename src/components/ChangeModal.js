import { IconAlertHexagon, IconAlertHexagonFilled } from "@tabler/icons-react";
import React from "react";

const ChangeModal = ({ context, id }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <IconAlertHexagon color="#F9BC60" size={64} stroke={1} />
      <p className="mt-4 font-semibold text-lg text-center text-grey600">
        Өөрийн биеэр ирж солиулалт хийх боломжтой{" "}
      </p>
    </div>
  );
};

export default ChangeModal;
