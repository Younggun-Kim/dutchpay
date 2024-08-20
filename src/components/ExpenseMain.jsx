import React from "react";
import { AddExpenseForm } from "./AddExpenseForm";
import { ExpenseTable } from "./ExpenseTable";
import { Container, Row, Col } from "react-bootstrap";
import { styled } from "styled-components";
import { groupNameState } from "../state/groupName";
import { useRecoilValue } from "recoil";

export const ExpenseMain = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={12} sm={5} md={4}>
          <LeftPane />
        </Col>
        <Col>
          <RightPane />
        </Col>
      </Row>
    </Container>
  );
};

const LeftPane = () => {
  return (
    <Container>
      {/* TODO: 정산 결과 컴포넌트 렌더링 */}
      <AddExpenseForm />
    </Container>
  );
};

const RightPane = () => {
  const groupName = useRecoilValue(groupNameState);
  return (
    <StyledContainer>
      <Row>
        <StyledGroupName>{groupName || "그룹명"}</StyledGroupName>
      </Row>
      <Row>
        <ExpenseTable />
      </Row>
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  padding: 100px 32px;
`;

const StyledGroupName = styled.h2`
  margin-bottom: 80px;
  text-align: center;
  font-weight: 700;
  font-size: 48px;
  line-height: 48px;
`;
