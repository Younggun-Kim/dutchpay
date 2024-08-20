import { render, screen, within } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { ExpenseMain } from "./ExpenseMain";
import userEvent from "@testing-library/user-event";
import { groupMembersState } from "../state/groupMemebers";

const renderComponent = () => {
  render(
    <RecoilRoot
      initializeState={(snap) => {
        snap.set(groupMembersState, ["영수", "영희"]);
      }}
    >
      <ExpenseMain />
    </RecoilRoot>
  );

  // i - Ignore case 를 표현하며 대상 문자열에 대해서 대/소문자를 식별하지 않는 것을 의미
  const dateInput = screen.getByPlaceholderText(/결제한 날짜/i);
  const descriptionInput = screen.getByPlaceholderText(/비용에 대한 설명/i);
  const amountInput = screen.getByPlaceholderText(/비용은 얼마/i);
  const payerInput = screen.getByDisplayValue(/누가 결제/i);
  const addButton = screen.getByText(/추가하기/i);
  const descriptionErrorMessage = screen.queryByText(
    "비용 내용을 입력해 주셔야 됩니다."
  );
  const payErrorMessage = screen.queryByText("결제자를 선택해 주셔야 합니다.");
  const amountErrorMessage = screen.queryByText("금액을 입력해 주셔야 합니다.");

  return {
    dateInput,
    descriptionInput,
    amountInput,
    payerInput,
    addButton,
    descriptionErrorMessage,
    payErrorMessage,
    amountErrorMessage,
  };
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
      expect(payerInput).toBeInTheDocument();
      expect(addButton).toBeInTheDocument();
    });

    test("비용 추가의 필수적인 값을 입력하지 않고 '추가' 버튼 클릭시, 에러 메시지를 노출한다.", async () => {
      const {
        addButton,
        descriptionErrorMessage,
        payErrorMessage,
        amountErrorMessage,
      } = renderComponent();

      expect(addButton).toBeInTheDocument();

      await userEvent.click(addButton);

      expect(descriptionErrorMessage).toHaveAttribute("data-valid", "false");

      expect(payErrorMessage).toHaveAttribute("data-valid", "false");

      expect(amountErrorMessage).toHaveAttribute("data-valid", "false");
    });

    test("비용 추가의 필수적인 값을 입력하고 '추가' 버튼 클릭시, 저장에 성공한다.", async () => {
      const {
        descriptionInput,
        amountInput,
        payerInput,
        addButton,
        descriptionErrorMessage,
        payErrorMessage,
        amountErrorMessage,
      } = renderComponent();

      await userEvent.type(descriptionInput, "장보기");
      await userEvent.type(amountInput, "30000");
      await userEvent.selectOptions(payerInput, "영수"); // 테스트 전에 payerList(멤버들이름)을 셋업해야 한다.
      await userEvent.click(addButton);

      expect(descriptionErrorMessage).toHaveAttribute("data-valid", "true");

      expect(payErrorMessage).toHaveAttribute("data-valid", "true");

      expect(amountErrorMessage).toHaveAttribute("data-valid", "true");
    });
  });

  describe("비용 리스트 컴포넌트", () => {
    test("비용 리스트 컴포넌트가 렌더링 되었는가?", () => {
      renderComponent();

      const listComponent = screen.getByTestId("expenseList");
      expect(listComponent).toBeInTheDocument();
    });

    test("비용 데이터가 존재하는 경우, 날짜, 내용, 결제자, 금액 데이터가 보여지는가?", () => {
      renderComponent();

      const listComponent = screen.getByTestId("expenseList");
    });
  });

  describe("새로운 비용이 입력되었을 때", () => {
    const addNewExpense = async () => {
      const {
        dateInput,
        descriptionInput,
        payerInput,
        amountInput,
        addButton,
      } = renderComponent();

      await userEvent.type(dateInput, "2024-08-20");
      await userEvent.type(descriptionInput, "장보기");
      await userEvent.clear(amountInput);
      await userEvent.type(amountInput, "30000");
      await userEvent.selectOptions(payerInput, "영수");
      await userEvent.click(addButton);
    };
    test("날짜, 내용, 결제자, 금액 데이터가 정산 리스트에 추가 된다.", async () => {
      await addNewExpense();

      const listComponent = screen.getByTestId("expenseList");

      // 새로운 비용을 입력
      const dateValue = within(listComponent).getByText("2024-08-20");
      expect(dateValue).toBeInTheDocument();

      const descValue = within(listComponent).getByText("장보기");
      expect(descValue).toBeInTheDocument();

      const amountValue = within(listComponent).getByText("30000 원");
      expect(amountValue).toBeInTheDocument();

      const payerInput = within(listComponent).getByText("영수");
      expect(payerInput).toBeInTheDocument();
    });

    test("정산 결과 또한 업데이트가 된다", async () => {
      await addNewExpense();

      const totalText = screen.getByText(/2명 - 총 30000 원 지출/);
      expect(totalText).toBeInTheDocument();

      const transactionText = screen.getByText(/영희가 영수에게 15000원/);
      expect(transactionText).toBeInTheDocument();
    });
  });

  describe("비용 정산 결과 컴포넌트", () => {
    test("정산 결과 컴포넌트가 렌더링 되는가?", () => {
      const component = screen.getByText(/정산은 이렇게/i);
      expect(component).toBeInTheDocument();
    });
  });
});
