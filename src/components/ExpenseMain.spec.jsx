import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { ExpenseMain } from "./ExpenseMain";
import userEvent from "@testing-library/user-event";

const renderComponent = () => {
  render(
    <RecoilRoot>
      <ExpenseMain />
    </RecoilRoot>
  );

  // i - Ignore case 를 표현하며 대상 문자열에 대해서 대/소문자를 식별하지 않는 것을 의미
  const dateInput = screen.getByPlaceholderText(/결제한 날짜/i);
  const descriptionInput = screen.getByPlaceholderText(/비용에 대한 설명/i);
  const amountInput = screen.getByPlaceholderText(/비용은 얼마/i);
  const payerInput = screen.getByPlaceholderText(/누가 결제/i);
  const addButton = screen.getByText(/추가하기/i);

  return { dateInput, descriptionInput, amountInput, payerInput, addButton };
};

describe("비용 정산 메인 페이지", () => {
  describe("비용 추가 컴포넌트", () => {
    test("비용 추가 컴포넌트 렌더링", () => {
      const {
        dateInput,
        descriptionInput,
        amountInput,
        payerInput,
        addButton,
      } = renderComponent();

      expect(dateInput).toBeInTheDocument();
      expect(descriptionInput).toBeInTheDocument();
      expect(amountInput).toBeInTheDocument();
      expect(payInput).toBeInTheDocument();
      expect(addButton).toBeInTheDocument();
    });

    test("비용 추가의 필수적인 값을 입력하지 않고 '추가' 버튼 클릭시, 에러 메시지를 노출한다.", async () => {
      const { addButton } = renderComponent();

      expect(addButton).toBeInTheDocument();

      await userEvent.click(addButton);

      const descriptionErrorMessage = screen.getByText(
        "비용 내용을 입력해 주셔야 됩니다."
      );
      expect(descriptionErrorMessage).toBeInTheDocument();

      const payErrorMessage =
        screen.getByText("결제자를 선택해 주셔야 합니다.");
      expect(payErrorMessage).toBeInTheDocument();

      const amountErrorMessage =
        screen.getByText("금액을 입력해 주셔야 합니다.");
      expect(amountErrorMessage).toBeInTheDocument();
    });

    test("비용 추가의 필수적인 값을 입력하고 '추가' 버튼 클릭시, 저장에 성공한다.", async () => {
      const { descriptionInput, amountInput, payerInput, addButton } =
        renderComponent();

      await userEvent.type(descriptionInput, "장보기");
      await userEvent.type(amountInput, "30000");
      await userEvent.selectOptions(payerInput, "영수"); // 테스트 전에 payerList(멤버들이름)을 셋업해야 한다.
      await userEvent.click(addButton);

      const descriptionErrorMessage = screen.queryByText(
        "비용 내용을 입력해 주셔야 됩니다."
      );
      expect(descriptionErrorMessage).not.toBeInTheDocument();

      const payErrorMessage =
        screen.queryByText("결제자를 선택해 주셔야 합니다.");
      expect(payErrorMessage).not.toBeInTheDocument();

      const amountErrorMessage =
        screen.queryByText("금액을 입력해 주셔야 합니다.");
      expect(amountErrorMessage).not.toBeInTheDocument();
    });
  });
});
