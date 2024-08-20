import { styled } from "styled-components";

export const OverlayWrapper = ({ children, padding, minHeight }) => (
  <StyledContainer padding={padding} minheight={minHeight}>
    {children}
  </StyledContainer>
);

const StyledContainer = styled.div`
  border-radius: 15px;
  background-color: white;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  min-height: ${(props) => props.minheight || "0px"};
  padding: ${(props) => props.padding || "5vw"};
`;
