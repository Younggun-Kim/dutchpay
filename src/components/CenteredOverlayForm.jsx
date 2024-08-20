import React from "react";
import { Container, Button, Row, Form } from "react-bootstrap";
import styled from "styled-components";
import { OverlayWrapper } from "./shared/OverlayWrapper";
import { ServiceLogo } from "./shared/ServiceLogo";

export const CenteredOverlayForm = ({
  title,
  validate,
  handleSubmit,
  children,
}) => {
  return (
    <StyledCenteralizedContainer>
      <ServiceLogo />
      <OverlayWrapper>
        <Container>
          <Form noValidate validate={`${validate}`} onSubmit={handleSubmit}>
            <StyledRow>
              <Row className="align-content-start">
                <StyledH2>{title}</StyledH2>
              </Row>
              <Row className="align-items-center">{children}</Row>
              <Row className="align-items-end">
                <StyledButton>저장</StyledButton>
              </Row>
            </StyledRow>
          </Form>
        </Container>
      </OverlayWrapper>
    </StyledCenteralizedContainer>
  );
};

const StyledCenteralizedContainer = styled(Container)`
  width: 50%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 10px;
`;

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
