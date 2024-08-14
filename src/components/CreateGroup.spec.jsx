import userEvent from "@testing-library/user-event";
import { CreateGroup } from "./CreateGroup";
import { render, screen } from "@testing-library/react";

const renderComponent = () => {
  render(<CreateGroup />);

  // screen은 렌더링 된 화면
  const input = screen.getByPlaceholderText("2022 제주도 여행");
  const save = screen.getByText("저장");
  const errorMessage = screen.queryByText("그룹 이름을 입력해 주세요.");

  return { input, save, errorMessage };
};

describe("그룹 생성 페이지", () => {
  test("그룹 이름 입력 컴포넌트가 렌더링 되는가?", () => {
    const { input, save } = renderComponent();

    expect(input).not.toBeNull();
    expect(save).not.toBeNull();
  });

  test('그룹 이름을 입력하지 않고 "저장" 버튼 킬릭시, 에러 메시지를 노출한다.', async () => {
    const { save, errorMessage } = renderComponent();
    await userEvent.click(save);
    expect(errorMessage).not.toBeNull();
  });

  test('그룹 이름을 입력 후 "저장" 버튼 클릭시, 저장 성공', async () => {
    const { input, save, errorMessage } = renderComponent();
    await userEvent.type(input, "예시 그룹명");
    await userEvent.click(save);
    expect(errorMessage).toBeNull();
  });
});
