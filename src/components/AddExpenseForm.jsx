import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { expansesState } from "../state/expanses";
import { groupMembersState } from "../state/groupMemebers";

/**
 * 비용 추가 컴포넌트
 */
export const AddExpenseForm = () => {
  const currentDate = new Date();
  const today = [
    currentDate.getFullYear(),
    (currentDate.getMonth() + 1).toString().padStart(2, "0"),
    currentDate.getDate(),
  ].join("-");
  const [formValidate, setFormValidate] = useState(false);
  const [date, setDate] = useState(today);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState(0);
  const [payer, setPayer] = useState(null);
  const [isDescValid, setIsDescValid] = useState(false);
  const [isAmountValid, setIsAmountValid] = useState(false);
  const [isPayerValid, setIsPayerValid] = useState(false);

  const members = useRecoilValue(groupMembersState);
  const setExpanse = useSetRecoilState(expansesState);

  const checkForValidity = () => {
    const descValid = desc.length > 0;
    const amountValid = amount > 0;
    const payerValid = payer != null;
    setIsDescValid(descValid);
    setIsAmountValid(amountValid);
    setIsPayerValid(payerValid);

    return descValid && amountValid && payerValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (checkForValidity()) {
      const newExpanse = {
        date,
        desc,
        amount,
        payer,
      };
      setExpanse((expanse) => [...expanse, newExpanse]);
    }

    setFormValidate(true);
  };
  return (
    <div>
      <Form noValidate onSubmit={handleSubmit}>
        <h3>1. 비용 추가</h3>
        <Form.Group>
          <Form.Control
            type="date"
            name="expenseDate"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            placeholder="결제한 날짜를 선택해 주세요"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            name="expenseDescription"
            value={desc}
            onChange={(event) => setDesc(event.target.value)}
            placeholder="비용에 대한 설명을 입력해 주세요"
            isValid={isDescValid}
            isInvalid={!isDescValid && formValidate}
          ></Form.Control>
          <Form.Control.Feedback type="invalid" data-valid={isDescValid}>
            비용 내용을 입력해 주셔야 됩니다.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="number"
            name="expenseAmount"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="비용은 얼마였나요?"
            isValid={isAmountValid}
            isInvalid={!isAmountValid && formValidate}
          ></Form.Control>
          <Form.Control.Feedback type="invalid" data-valid={isAmountValid}>
            금액을 입력해 주셔야 합니다.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Select
            name="expensePayer"
            defaultValue=""
            isValid={isPayerValid}
            isInvalid={!isPayerValid && formValidate}
            onChange={(event) => setPayer(event.target.value)}
          >
            <option disabled value="">
              누가 결제했나요?
            </option>
            {members.map((member) => (
              <option key={member} value={member}>
                {member}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid" data-valid={isPayerValid}>
            결제자를 선택해 주셔야 합니다.
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit">추가하기</Button>
      </Form>
    </div>
  );
};
