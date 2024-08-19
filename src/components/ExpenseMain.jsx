import React from "react";
import { AddExpenseForm } from "./AddExpenseForm";

export const ExpenseMain = () => {
  return (
    <div>
      <div>
        <AddExpenseForm />
        {/* TODO: 정산 결과 컴포넌트 렌더링 */}
      </div>

      <div>
        {/* TODO: 그룹 헤더 렌더링 */}
        {/* TODO: 비용 리스트 컴포넌트 렌더링 */}
      </div>
    </div>
  );
};
