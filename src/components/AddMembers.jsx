import { React, useState } from "react";
import { CenteredOverlayForm } from "./CenteredOverlayForm";
import { InputTags } from "react-bootstrap-tagsinput";
import { useRecoilState, useRecoilValue } from "recoil";
import { groupMembersState } from "../state/groupMemebers";
import { groupNameState } from "../state/groupName";
import { styled } from "styled-components";

export const AddMembers = () => {
  const [groupMemebers, setGroupMembers] = useRecoilState(groupMembersState);
  const groupName = useRecoilValue(groupNameState);
  const [validate, setValidate] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setValidate(true);
  };

  return (
    <CenteredOverlayForm
      title={`${groupName} 그룹에 속한 사람들의 이름을 모두 적어 주세요.`}
      validate={validate}
      handleSubmit={handleSubmit}
    >
      <InputTags
        data-testid="input-member-names"
        placeholder="이름 간 띄워쓰기"
        onTags={(value) => setGroupMembers(value.values)}
      />
      {validate && groupMemebers.length === 0 && (
        <StyledErrorMessage>
          그룹 멤버들의 이름을 입력해주세요.
        </StyledErrorMessage>
      )}
    </CenteredOverlayForm>
  );
};

const StyledErrorMessage = styled.span`
  color: red;
`;
