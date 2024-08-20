import { useRecoilValue } from "recoil";
import { expansesState } from "../state/expanses";
import { Table } from "react-bootstrap";
import { OverlayWrapper } from "./shared/OverlayWrapper";
import { styled } from "styled-components";

export const ExpenseTable = () => {
  const expenses = useRecoilValue(expansesState);

  return (
    <OverlayWrapper minHeight={"73vh"}>
      <Table data-testid="expenseList" borderless hover responsive>
        <StyledThead>
          <tr>
            <th>날짜</th>
            <th>내용</th>
            <th>결제자</th>
            <th>금액</th>
          </tr>
        </StyledThead>
        <StyledBody>
          {expenses.map(({ date, desc, amount, payer }, index) => (
            <tr key={index}>
              <td>{date}</td>
              <td>{desc}</td>
              <td>{payer}</td>
              <td>{amount} 원</td>
            </tr>
          ))}
        </StyledBody>
      </Table>
    </OverlayWrapper>
  );
};

const StyledThead = styled.thead`
  color: #683da6;
  text-align: center;

  th {
    color: #683da6;
    padding: 20px 8px;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
  }
`;

const StyledBody = styled.tbody`
  td {
    font-weight: 400;
    font-size: 24px;
    line-height: 59px;
  }
`;
