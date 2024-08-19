import React from "react";
import { CenteredOverlayForm } from "./CenteredOverlayForm";
import { Form } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { groupNameState } from "../state/groupName";
import { useState } from "react";

export const CreateGroup = () => {
  const [validate, setValidate] = useState(false);
  const [validGroupName, setValidGroupName] = useState(false);
  const [groupName, setGroupName] = useRecoilState(groupNameState);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      setValidGroupName(true);
    } else {
      event.stopPropagation();
      setValidGroupName(false);
    }
    // validate는 Form이 validate 검사를 했냐 안했냐다. 맞다 아니다가 아니다
    setValidate(true);
  };

  let isValid = groupName.length > 0;

  return (
    <CenteredOverlayForm
      title="먼저, 더체 페이할 그룹의 이름을 정해볼까요?"
      validate={validate}
      handleSubmit={handleSubmit}
    >
      <Form.Group>
        <Form.Control
          type="text"
          required
          placeholder="2022 제주도 여행"
          value={groupName || ""}
          isInvalid={!isValid}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <Form.Control.Feedback type="invalid" data-valid={validGroupName}>
          그룹 이름을 입력해 주세요.
        </Form.Control.Feedback>
      </Form.Group>
    </CenteredOverlayForm>
  );
};
