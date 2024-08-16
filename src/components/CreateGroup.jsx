import React from "react";
import { CenteredOverlayForm } from "./CenteredOverlayForm";
import { Container, Row, Button, Form } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { groupNameState } from "../state/groupName";
import { useState } from "react";
import styled from "styled-components";

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

  return (
    <CenteredOverlayForm>
      <Container>
        <Form validated={validate} onSubmit={handleSubmit}>
          <StyledRow>
            <Row className="align-content-start">
              <StyledH2>먼저, 더체 페이할 그룹의 이름을 정해볼까요?</StyledH2>
            </Row>
            <Row className="align-items-center">
              <Form.Group>
                <Form.Control
                  type="text"
                  required
                  placeholder="2022 제주도 여행"
                  value={groupName || ""}
                  onChange={(e) => setGroupName(e.target.value)}
                />
                <Form.Control.Feedback
                  type="invalid"
                  data-valid={validGroupName}
                >
                  그룹 이름을 입력해 주세요.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
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
