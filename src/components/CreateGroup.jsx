import React from "react";
import { CenteredOverlayForm } from "./CenteredOverlayForm";
import { Container, Row, Button, Form } from "react-bootstrap";
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

  return (
    <div>
      <h1>Dutch Pay</h1>
      {/* <CenteredOverlayForm></CenteredOverlayForm> */}
      <Container>
        <Form validated={validate} onSubmit={handleSubmit}>
          <Row>
            <h2>먼저, 더체 페이할 그룹의 이름을 정해볼까요?</h2>
          </Row>
          <Row>
            <Form.Group>
              <Form.Control
                type="text"
                required
                placeholder="2022 제주도 여행"
                value={groupName || ""}
                onChange={(e) => setGroupName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid" data-valid={validGroupName}>
                그룹 이름을 입력해 주세요.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Button type="submit">저장</Button>
          </Row>
        </Form>
      </Container>
    </div>
  );
};
