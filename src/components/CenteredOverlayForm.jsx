import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import { OverlayWrapper } from "./shared/OverlayWrapper";

export const CenteredOverlayForm = ({ children }) => {
  return (
    <StyledCenteralizedContainer>
      <StyledHeader>Dutch Pay</StyledHeader>
      <OverlayWrapper>{children}</OverlayWrapper>
    </StyledCenteralizedContainer>
  );
};

const StyledHeader = styled.h1`
  font-weight: 700;
  letter-spacing: 10px;
  color: slateblue;
  text-align: center;
  margin-bottom: 0%.8em;
`;

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
