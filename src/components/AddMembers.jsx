import { React, useState } from "react";
import { CenteredOverlayForm } from "./CenteredOverlayForm";
import { Container, Row, Button, Form } from "react-bootstrap";
import styled from "styled-components";
import { InputTags } from "react-bootstrap-tagsinput";
import { useRecoilState, useRecoilValue } from "recoil";
import { groupMembersState } from "../state/groupMemebers";
import { groupNameState } from "../state/groupName";

export const AddMembers = () => {
  const [groupMemebers, setGroupMembers] = useRecoilState(groupMembersState);
  const groupName = useRecoilValue(groupNameState);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <CenteredOverlayForm>
      <Container>
        <Form noValidate onSubmit={handleSubmit}>
          <StyledRow>
            <Row className="align-content-start">
              <StyledH2>
                {groupName} 그룹에 속한 사람들의 이름을 모두 적어 주세요.
              </StyledH2>
            </Row>

            <InputTags
              placeholder="이름 간 띄워쓰기"
              onTags={(value) => setGroupMembers(value.values)}
            />
            {formSubmitted && groupMemebers.length === 0 && (
              <span>그룹 멤버들의 이름을 입력해주세요.</span>
            )}

            <Row className="align-items-end">
              <StyledButton>저장</StyledButton>
            </Row>
          </StyledRow>
        </Form>
      </Container>
    </CenteredOverlayForm>
  );
};

const StyledH2 = styled.h2`
  text-align: right;
  font-weight: 700;
  line-height: 1.2;
  overflow-wrap: break-word;
  word-break: keep-all;
`;

const StyledButton = styled(Button).attrs({
  type: "submit",
})`
  width: 60%;
  margin: 0 auto;
  background-color: #6610f2;
  border-radius: 8px;
  border: none;

  &:hover {
    background-color: #6610f2;
    filter: brightness(80%);
  }
`;

const StyledRow = styled(Row)`
  align-items: center;
  justify-content: center;
  height: 60vh;
`;
