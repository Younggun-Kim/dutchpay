import React from "react";
import { AddExpenseForm } from "./AddExpenseForm";
import { ExpenseTable } from "./ExpenseTable";
import { Container, Row, Col, Stack } from "react-bootstrap";
import { styled } from "styled-components";
import { groupNameState } from "../state/groupName";
import { useRecoilValue } from "recoil";
import { SettlementSummary } from "./SettlementSummary";
import { ServiceLogo } from "./shared/ServiceLogo";

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
      <StyledGapRow>
        <Row>
          <ServiceLogo />
        </Row>
        <Row>
          <AddExpenseForm />
        </Row>
        <Row>
          <SettlementSummary />
        </Row>
      </StyledGapRow>
    </Container>
  );
};

const StyledGapRow = styled(Row)`
  gap: 5vh;
  padding: 90px 0 0 0;
  justify-content: center;
`;

const RightPane = () => {
  const groupName = useRecoilValue(groupNameState);
  return (
    <StyledRightPaneWrapper>
      <Row>
        <StyledGroupName>{groupName || "그룹명"}</StyledGroupName>
      </Row>
      <Row>
        <ExpenseTable />
      </Row>
    </StyledRightPaneWrapper>
  );
};

const StyledRightPaneWrapper = styled(Container)`
  padding: 100px 32px;
`;

const StyledGroupName = styled.h2`
  margin-bottom: 80px;
  text-align: center;
  font-weight: 700;
  font-size: 48px;
  line-height: 48px;
`;
