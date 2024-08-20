import { useRecoilValue } from "recoil";
import { expensesState } from "../state/expenses";
import { groupMembersState } from "../state/groupMemebers";

export const calculateMinimumTransaction = (
  members,
  expenses,
  amountPerPerson
) => {
  const minTransaction = [];

  if (amountPerPerson === 0) {
    return minTransaction;
  }

  // 1. 사람별로 냈어야 할 금액
  const membersToPay = {};
  members.forEach((member) => {
    membersToPay[member] = amountPerPerson;
  });

  // 2. 사람별로 냈어야 . 할금액 업데이트
  expenses.forEach(({ payer, amount }) => {
    // - 받을 돈
    // + 낼 돈
    membersToPay[payer] -= amount;
  });

  // 3. amount별로 오름차순으로 sorting이 된 리스트(배열)을 만들어준다.
  const sortedMemebersToPay = Object.keys(membersToPay)
    .map((member) => ({
      member,
      amount: membersToPay[member],
    }))
    .sort((a, b) => a.amount - b.amount);

  // 4.
  var left = 0;
  var right = sortedMemebersToPay.length - 1;
  while (left < right) {
    while (sortedMemebersToPay[left].amount === 0) {
      left++;
    }
    while (left < right && sortedMemebersToPay[right].amount === 0) {
      right--;
    }
    const toReceive = sortedMemebersToPay[left];
    const toSend = sortedMemebersToPay[right];
    const amountToReceive = Math.abs(toReceive.amount);
    const amountToSend = Math.abs(toSend.amount);

    if (amountToSend > amountToReceive) {
      minTransaction.push({
        receiver: toReceive.memeber,
        sender: toSend.memeber,
        amount: amountToReceive,
      });
      toReceive.amount = 0;
      toSend.amount -= amountToReceive;
      left++;
    } else {
      minTransaction.push({
        receiver: toReceive.member,
        sender: toSend.member,
        amount: amountToSend,
      });
      toReceive.amount += amountToSend;
      toSend.amount = 0;
      right--;
    }
  }

  return minTransaction;
};

export const SettlementSummary = () => {
  const expenses = useRecoilValue(expensesState);
  const members = useRecoilValue(groupMembersState);

  const groupMembersCount = members.length;
  // const totalExpenseAmount = 0;
  const totalExpenseAmount = parseInt(
    expenses.reduce(
      (prevAmount, curExpense) => prevAmount + parseInt(curExpense.amount),
      0
    )
  );
  const splitAmount = totalExpenseAmount / groupMembersCount;
  const minimumTransaction = calculateMinimumTransaction(
    members,
    expenses,
    splitAmount
  );

  return (
    <div>
      <h3>2. 정산은 이렇게</h3>
      {totalExpenseAmount > 0 && groupMembersCount > 0 && (
        <>
          <span>
            {groupMembersCount} 명이서 총 {totalExpenseAmount} 원 지출
          </span>
          <span>한 사람 당 {splitAmount}원</span>

          <ul>
            {minimumTransaction.map(({ receiver, sender, amount }, index) => (
              <li key={index}>
                <span>
                  {sender}가 {receiver}에게 {amount} 원 보내기
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
